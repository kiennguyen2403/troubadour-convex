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

export const post = internalMutation({
  args: {
    name: v.string(),
    description: v.string(),
    status: v.string(),
    genre: v.array(v.id("genre")),
    isOffline: v.boolean(),
    xCoordinate: v.number(),
    yCoordinate: v.number(),
    ticketsNumber: v.number(),
    date: v.string(),
    tickets: v.array(v.id("ticket")),
    users: v.array(v.id("user")),
    comments: v.array(v.id("comment")),
    streamKey: v.string(),
    eventUrl: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      return await ctx.db.insert("event", {
        name: args.name,
        description: args.description,
        status: args.status,
        genre: args.genre,
        isOffline: args.isOffline,
        xCoordinate: args.xCoordinate,
        yCoordinate: args.yCoordinate,
        tickets: args.tickets,
        users: args.users,
        comments: args.comments,
        date: args.date,
        views: 0,
        streamKey: args.streamKey,
        eventUrl: args.eventUrl,
      });
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const get = query({
  handler: async (ctx) => {
    try {
      return await ctx.db.query("event").collect();
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const getById = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      if (!args.id) return "No id provided for event get by id";
      return await ctx.db
        .query("event")
        .filter((q) => q.eq(q.field("_id"), args.id))
        .first();
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const getByGenres = query({
  args: {
    genres: v.array(v.id("genre")),
  },
  handler: async (ctx, { genres }) => {
    try {
      if (!genres?.length) return "No genres provided for event get by genres";
      return await ctx.db
        .query("event")
        .filter((q) => q.eq(q.field("genre"), genres))
        .collect();
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const getByName = query({
  args: {
    name: v.string(),
  },
  handler: async (ctx, { name }) => {
    try {
      if (!name) return "No name provided for event get by name";
      return await ctx.db
        .query("event")
        .filter((q) => q.eq(q.field("name"), name))
        .collect();
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const getOfflineEvents = query({
  args: {

  },
  handler: async (ctx, ) => {
    try {
      return await ctx.db
      .query("event")
      .filter((q) => q.eq(q.field("isOffline"), true))
      .collect();
    } catch (e) {
      console.log(e);
      return "failure";
    }
  }
});


export const deleteByID = internalMutation({
  args: {
    id: v.id("event"),
  },
  handler: async (ctx, { id }) => {
    try {
      if (!id) return "No id provided for event delete";
      return await ctx.db.delete(id);
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const update = internalMutation({
  args: {
    id: v.id("event"),
    name: v.string(),
    description: v.string(),
    isOffline: v.boolean(),
    status: v.string(),
    genre: v.array(v.id("genre")),
    xCoordinate: v.number(),
    yCoordinate: v.number(),
    views: v.number(),
    tickets: v.array(v.id("ticket")),
    users: v.array(v.id("user")),
    comments: v.array(v.id("comment")),
    date: v.string(),
    streamKey: v.string(),
    eventUrl: v.string(),
  },

  handler: async (ctx, args) => {
    try {
      if (!args.id) return "No id provided for event update";
      return await ctx.db.replace(args.id, args);
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const patch = internalMutation({
  args: {
    id: v.id("event"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(v.string()),
    genre: v.optional(v.array(v.id("genre"))),
    xCoordinate: v.optional(v.number()),
    yCoordinate: v.optional(v.number()),
    tickets: v.optional(v.array(v.id("ticket"))),
    users: v.optional(v.array(v.id("user"))),
    comments: v.optional(v.array(v.id("comment"))),
    eventUrl: v.optional(v.string()),
    date: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      if (!args.id) return "No id provided for event update";
      return await ctx.db.patch(args.id, args);
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const isUserPurchaseTicket = query({
  args: {
    eventID: v.string(),
    userID: v.string(),
  },
  handler: async (ctx, { eventID, userID }) => {
    try {
      if (!eventID || !userID)
        return false;
      const event = await ctx.db
        .query("event")
        .filter((q) => q.eq(q.field("_id"), eventID))
        .first();

      if (!event) return false;

      for (const ticketID of event.tickets) {
        const ticket: any = await ctx.db
          .query("ticket")
          .filter((q) => q.eq(q.field("_id"), ticketID))
          .first();
        if (ticket.user === userID) return true;
      }

      return false;
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});
