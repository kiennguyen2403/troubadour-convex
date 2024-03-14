import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const post = mutation({
  args: {
    content: v.string(),
    eventID: v.optional(v.id("event")),
    likes: v.float64(),
    mediaID: v.optional(v.id("media")),
    user: v.id("user"),
  },
  handler: async (ctx, args) => {
    try {
      return await ctx.db.insert("comment", args);
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const comments = await ctx.db.query("comment").collect();
    return comments;
  },
});

export const getByID = query({
  args: { id: v.id("comment") },
  handler: async (ctx, { id }) => {
    try {
      const comments = await ctx.db
        .query("comment")
        .filter((q) => q.eq(q.field("_id"), id))
        .first();
      return comments;
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const getByEventID = query({
  args: { id: v.id("event") },
  handler: async (ctx, { id }) => {
    try {
      const comments = await ctx.db
        .query("comment")
        .filter((q) => q.eq(q.field("eventID"), id))
        .collect();
      return comments;
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const getSortByLike = query({
  args: {},
  handler: async (ctx) => {
    try {
      const comments = await ctx.db.query("comment").collect();
      const sortedComments = comments.sort((a, b) => b.likes - a.likes);
      return sortedComments;
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const getSortByDate = query({
  args: {},
  handler: async (ctx) => {
    try {
      const comments = await ctx.db.query("comment").order("desc").collect();
      //sort newest to oldest comments
      return comments;
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const deleteByID = mutation({
  args: { id: v.id("comment") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("comment"),
    content: v.string(),
    likes: v.number(),
  },
  handler: async (ctx, args) => {
    try {
      return await ctx.db.patch(args.id, {
        content: args.content,
        likes: args.likes,
      });
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});
