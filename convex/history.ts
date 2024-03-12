import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const post = mutation({
  args: {
    userID: v.id("user"),
    playlists: v.array(v.id("playlist")),
    genres: v.array(v.id("genre")),
    medias: v.array(v.id("media")),
    currentMedia: v.id("media"),
  },
  handler: async (ctx, args) => {
    try {
      return await ctx.db.insert("history", args);
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const history = await ctx.db.query("history").collect();
    return history;
  },
});

export const getByUserID = query({
  args: { userID: v.id("user") },
  handler: async (ctx, args) => {
    const history = await ctx.db
      .query("history")
      .filter((q) => q.eq(q.field("userID"), args.userID))
      .first();
    return history;
  },
});

export const deleteByID = mutation({
  args: { historyID: v.id("history") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.historyID);
  },
});

export const patch = mutation({
  args: {
    id: v.id("history"),
    playlists: v.array(v.id("playlist")),
    genres: v.array(v.id("genre")),
    medias: v.array(v.id("media")),
    currentMedia: v.id("media"),
  },
  handler: async (ctx, args) => {
    try {
      if (!args) {
        throw "Id was not provided";
      }
      await ctx.db.patch(args.id, args);
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});
