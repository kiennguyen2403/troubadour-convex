"use node";
import Mux from "@mux/mux-node";
import Stripe from 'stripe';
import axios from "axios";
import {
  query,
  action,
  mutation,
  internalAction,
  internalMutation,
  internalQuery,
} from "./_generated/server";
import { api, internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { v } from "convex/values";
import { env } from "process";
import process from "process";


const { video } = new Mux({
  tokenId: "d65d514a-06c6-4fd3-803f-5d3aea75889f",
  tokenSecret:
    "8iEJtQyTMXv0JMn8vuIUYFdZlc9lvW3AsuUf72jWK8jIw6jsoDl1Mqk5FsW4Qv9ldFs5YmK2AOb",
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_51NQeoyGV1HCIrqOZx8hmXUZn8Nsfo3AOuJyywhITVaHZNe3YqCJxoGZj8h6s3dbPqFUJZiE9uU7jNq6PGaxZQScE000RYDNKHE");

export const createEvent = action({
  args: {
    name: v.string(),
    description: v.string(),
    status: v.string(),
    genre: v.array(v.string()),
    xCoordinate: v.number(),
    yCoordinate: v.number(),
    ticketsNumber: v.number(),
    users: v.array(v.id("user")),
    // comments: v.array(v.id("comment")),
    date: v.optional(v.string()),
    isOffline: v.boolean(),
    price: v.number(),
  },
  handler: async (ctx, args) => {
    try {
      const streamKey = await video.liveStreams.create({
        playback_policy: ["public"],
        new_asset_settings: {
          playback_policy: ["public"],
        },
      });


      const tickets: Id<"ticket">[] = [];
      for (let i = 0; i < args.ticketsNumber; i++) {
        const ticket = await ctx.runMutation(internal.ticket.post, {
          name: args.name,
          fee: args.price,
        });
        console.log(ticket);
        if (
          ticket !== "No name provided for ticket post"
          && ticket !== "No fee provided for ticket post"
          && ticket !== "failure"
        )
          tickets.push(ticket);
      }


      if (!args.date) args.date = new Date().toISOString();

      await ctx.runMutation(internal.event.post, {
        name: args.name,
        description: args.description,
        status: args.status,
        genre: args.genre,
        xCoordinate: args.xCoordinate,
        yCoordinate: args.yCoordinate,
        ticketsNumber: args.ticketsNumber,
        tickets: tickets,
        users: args.users,
        streamKey: streamKey.stream_key,
        date: args.date,
        isOffline: args.isOffline,
        playbackID: streamKey.playback_ids ? streamKey.playback_ids[0].id : "",
      });

      return streamKey.stream_key;
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const getEvent = internalAction({
  args: {
    id: v.string(),
  },
  handler: async (ctx, { id }) => {
    try {
      const events = await video.liveStreams.retrieve(id);
      return events;
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const getEvents = internalAction({
  args: {},
  handler: async (ctx, args) => {
    try {
      const events = await video.liveStreams.list();
      return events.data;
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const deleteEvent = action({
  args: {
    id: v.id("event"),
  },
  handler: async (ctx, { id }) => {
    try {
      const events = await video.liveStreams.delete(id);
      ctx.runMutation(internal.event.deleteByID, { id: id });
      return events;
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const updateEventStatus = action({
  args: {
    id: v.id("event"),
    status: v.string(),
  },
  handler: async (ctx, { id, status }) => {
    try {
      const events = await ctx.runQuery(api.event.getById, { id: id });
      if (
        events === "failure" ||
        !events ||
        typeof events === "string" ||
        !("status" in events)
      )
        return "failure";

      if (events.status === status) return "success";
      if (events.status === "active" && status === "inactive") return "failure";
      if (events.status === "inactive" && status === "active") return "failure";

      switch (status) {
        case "active":
          await video.liveStreams.enable(events.streamKey);
          break;
        case "inactive":
          await video.liveStreams.disable(events.streamKey);
          break;
        case "deleted":
          await video.liveStreams.delete(events.streamKey);
          break;
        default:
          return "failure";
      }
      ctx.runMutation(internal.event.patch, {
        id: id,
        status: status,
      });
      return "success";
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const buyTicket: any = action({
  args: {
    id: v.id("event"),
    user: v.id("user"),
  },
  handler: async (ctx, { id, user }) => {
    try {
      const event = await ctx.runQuery(api.event.getById, { id: id });
      console.log(event);
      if (
        event === "failure" ||
        !event ||
        typeof event == "string" ||
        !event.tickets ||
        event.tickets.length === 0
      )
        return "failure";

      let ticketId;
      let price = 0;
      for (const ticket of event.tickets) {
        const result = await ctx.runQuery(api.ticket.getById, {
          id: ticket,
        });
        if (!result || typeof result === "string") continue;
        if (result.status === "sold") continue;
        else {
          ticketId = result._id;
          price = result.fee;
          break;
        }
      }

      if (!ticketId) return "failure";

      const domain = process.env.HOST || "http://localhost:3000";


      const paymentId = await ctx.runMutation(internal.payments.create, { text: ticketId });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Ticket",
              },
              unit_amount: price * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${domain}?paymentId=${paymentId}`,
        cancel_url: `${domain}`,
      });

      await ctx.runMutation(internal.ticket.patch, {
        id: ticketId,
        user: user,
        status: "sold",
      });

      await ctx.runMutation(internal.payments.markPending, {
        paymentId,
        stripeId: session.id,
      });

      return session.url;
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const fulfill = internalAction({
  args: { signature: v.string(), payload: v.string() },
  handler: async (ctx, { signature, payload }) => {

    const webhookSecret = process.env.STRIPE_WEBHOOKS_SECRET as string;
    try {
      // This call verifies the request
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret
      );
      if (event.type === "checkout.session.completed") {
        const stripeId = (event.data.object as { id: string }).id;
        // Send the message and mark the payment as fulfilled
        await ctx.runMutation(internal.payments.fulfill, { stripeId });
      }
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },
});
