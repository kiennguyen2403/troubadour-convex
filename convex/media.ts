import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const post = mutation({
  args: {
    user: v.id("user"),
    otherUsers: v.array(v.id("user")),
    genres: v.array(v.id("genre")),
    name: v.string(),
    dateTime: v.number(),
    privacy: v.union(v.literal("public"), v.literal("private")),
    fileUrl: v.string(),
    storageId: v.id("_storage"),
    comments: v.array(v.id("comments")),
    views: v.number(),
    likes: v.number(),
  },
  handler: async (ctx, args) => {
    try {
      return await ctx.db.insert("media", args);
    } catch (e) {
      console.log(e);
      return "Failed to insert media";
    }
  },
});

export const get = query({
  handler: async (ctx) => {
    try {
      return await ctx.db.query("media").collect();
    } catch (e) {
      console.log(e);
      return "Failed to get medias";
    }
  },
});

export const getById = query({
  args: { id: v.id("media") },
  handler: async (ctx, { id }) => {
    try {
      return await ctx.db.get(id);
    } catch (e) {
      console.log(e);
      return "Failed to get media by id";
    }
  },
});

export const getByName = query({
  args: {
    name: v.string(),
    paginationOpts: v.optional(paginationOptsValidator),
  },
  handler: async (ctx, args) => {
    try {
      return args.paginationOpts
        ? await ctx.db
            .query("media")
            .filter((q) => q.eq(q.field("name"), args.name))
            .paginate(args.paginationOpts)
        : await ctx.db
            .query("media")
            .filter((q) => q.eq(q.field("name"), args.name))
            .collect();
    } catch (e) {
      console.log(e);
      return "Failed to get media by name";
    }
  },
});

export const getByGenre = query({
  args: {
    genre: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Check if the genre exists
      const genre = await ctx.db
        .query("genre")
        .filter((q) => q.eq(q.field("name"), args.genre))
        .unique();
      if (!genre) {
        throw new Error("Genre not found!");
      }

      // Get all the media
      const medias = await ctx.db.query("media").collect();

      // Filter the medias
      return medias.filter(({ genres }) => genres.includes(genre._id));
    } catch (e) {
      console.log(e);
      return "Failed to get media by genre";
    }
  },
});

export const getByUserId = query({
  args: { userId: v.id("user"), paginationOpts: v.optional(paginationOptsValidator) },
  handler: async (ctx, { userId, paginationOpts }) => {
    try {
      return paginationOpts
        ? await ctx.db
            .query("media")
            .filter((q) => q.eq(q.field("user"), userId))
            .paginate(paginationOpts)
        : await ctx.db
            .query("media")
            .filter((q) => q.eq(q.field("user"), userId))
            .collect();
    } catch (e) {
      console.log(e);
      return "Failed to get media by user";
    }
  },
});

export const deleteById = mutation({
  args: {
    id: v.id("media"),
  },
  handler: async (ctx, { id }) => {
    try {
      return await ctx.db.delete(id);
    } catch (e) {
      console.log(e);
      return "Failed to delete media by user";
    }
  },
});

export const update = mutation({
  args: {
    id: v.id("media"),
    otherUsers: v.optional(v.array(v.id("user"))),
    genres: v.optional(v.array(v.id("genre"))),
    name: v.optional(v.string()),
    dateTime: v.optional(v.number()),
    privacy: v.optional(v.union(v.literal("public"), v.literal("private"))),
    comments: v.optional(v.array(v.id("comments"))),
    views: v.optional(v.number()),
    likes: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    try {
      return await ctx.db.patch(args.id, args);
    } catch (e) {
      console.log(e);
      return "Failed to update media";
    }
  },
});

/**
 * TODO:
 * Get by time
 * Get by artists featuring
 */

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx, args) => {
    try {
      // TODO: authentication for upload
      //   const identity = await ctx.auth.getUserIdentity();
      //   if (identity === null) {
      //     throw new Error("Unauthenticated call to mutation");
      //   }
      return await ctx.storage.generateUploadUrl();
    } catch (e) {
      console.log(e);
      return "Failed to generare upload URL";
    }
  },
});

export const getMediaUrl = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    try {
      return await ctx.storage.getUrl(storageId);
    } catch (e) {
      console.log(e);
      return "Failed to get media URL";
    }
  },
});

export const deleteMediaFile = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, { storageId }) => {
    try {
      return await ctx.storage.delete(storageId);
    } catch (e) {
      console.log(e);
      return "Failed to delete media file";
    }
  },
});
