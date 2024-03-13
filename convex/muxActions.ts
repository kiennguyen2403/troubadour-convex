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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "no key");

export const createMuxEvent = action({
  args: {
    name: v.string(),
    description: v.string(),
    status: v.string(),
    genre: v.array(v.id("genre")),
    xCoordinate: v.number(),
    yCoordinate: v.number(),
    ticketsNumber: v.number(),
    users: v.array(v.id("user")),
    comments: v.array(v.id("comment")),
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

  
      let tickets: Id<"ticket">[] = [];
      for (let i = 0; i < args.ticketsNumber; i++) {
        const ticket = await ctx.runMutation(internal.ticket.post, {
          name: `Ticket ${i + 1}`,
          fee: args.price,
        });
        if (typeof ticket !== "string") tickets.push(ticket);
      }

      if (!args.date) args.date = new Date().toISOString();

      const result: any = await ctx.runMutation(internal.event.post, {
        name: args.name,
        description: args.description,
        status: args.status,
        genre: args.genre,
        xCoordinate: args.xCoordinate,
        yCoordinate: args.yCoordinate,
        ticketsNumber: args.ticketsNumber,
        tickets: tickets,
        users: args.users,
        comments: args.comments,
        streamKey: streamKey.stream_key,
        date: args.date,
        isOffline: args.isOffline,
        eventUrl:
          process.env.NEXT_PUBLIC_BASE_URL + "/event/" + streamKey.id,
      });

      return streamKey.id;
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const getMuxEvent = internalAction({
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

export const getMuxEvents = internalAction({
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

export const deleteMuxEvent = action({
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

export const updateMuxEventStatus = action({
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
    cardNumber: v.string(),
    cvc: v.string(),
    exp_month: v.number(),
    exp_year: v.number(),
    cardHolder: v.string(),
  },
  handler: async (ctx, { id, user, cardNumber, cvc, exp_month, exp_year, cardHolder }) => {
    try {
      const event = await ctx.runQuery(api.event.getById, { id: id });
      if (
        event === "failure" ||
        !event ||
        typeof event == "string" ||
        !event.tickets ||
        event.tickets.length === 0
      )
        return "failure";

      let ticketId;
      for (const ticket of event.tickets) {
        const result = await ctx.runQuery(api.ticket.getById, {
          id: ticket,
        });
        if (!result || typeof result === "string") continue;
        if (result.status === "sold") continue;
        else {
          ticketId = result._id;
          break;
        }
      }

      if (!ticketId) return "failure";

      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: cardNumber,
          cvc: cvc,
          exp_month: exp_month, // Replace with the expiration month of the card
          exp_year: exp_year // Replace with the expiration year of the card
        },
        billing_details: {
          name: cardHolder
        }
      });

      await stripe.paymentIntents.create({
        amount: 1000,
        currency: "usd",
        payment_method: paymentMethod.id,
        payment_method_types: ["card"],
      });

      return await ctx.runMutation(internal.ticket.patch, {
        id: ticketId,
        user: user,
        status: "sold",
      });
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});
