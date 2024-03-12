import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const post = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      return await ctx.db.insert("genre", args);
    } catch (e) {
      console.log(e);
      return "Failed to insert genre";
    }
  },
});

export const get = query({
  handler: async (ctx) => {
    try {
      return await ctx.db.query("genre").collect();
    } catch (e) {
      console.log(e);
      return "Failed to get genres";
    }
  },
});

export const getByName = query({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      return await ctx.db
        .query("genre")
        .filter((q) => q.eq(q.field("name"), args.name))
        .collect();
    } catch (e) {
      console.log(e);
      return "Failed to get genre by name";
    }
  },
});

export const update = mutation({
  args: {
    id: v.id("genre"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      return await ctx.db.patch(args.id, args);
    } catch (e) {
      console.log(e);
      return "Failed to update genre";
    }
  },
});

export const deleteById = mutation({
  args: {
    id: v.id("genre"),
  },
  handler: async (ctx, { id }) => {
    try {
      return await ctx.db.delete(id);
    } catch (e) {
      console.log(e);
      return "Failed to delete genre";
    }
  },
});
