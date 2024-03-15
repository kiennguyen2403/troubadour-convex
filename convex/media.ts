import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const post = mutation({
  args: {
    userId: v.id("user"),
    otherUsers: v.array(v.id("user")),
    genres: v.array(v.id("genre")),
    name: v.string(),
    description: v.optional(v.string()),
    dateTime: v.optional(v.number()),
    privacy: v.union(v.literal("public"), v.literal("private")),
    fileUrl: v.string(),
    storageId: v.id("_storage"),
    // comments: v.array(v.id("comments")),
    views: v.number(),
    likes: v.number(),
  },
  handler: async (ctx, args) => {
    try {
      return await ctx.db.insert("media", args);
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const get = query({
  handler: async (ctx) => {
    try {
      return await ctx.db.query("media").collect();
    } catch (e) {
      console.log(e);
      return "failure";
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
      return "failure";
    }
  },
});

// TODO: Apply vector search here
export const getByName = query({
  args: {
    name: v.string(),
    paginationOpts: v.optional(paginationOptsValidator),
  },
  handler: async (ctx, { name, paginationOpts }) => {
    try {
      return paginationOpts
        ? await ctx.db
            .query("media")
            .withSearchIndex("search_name", (q) => q.search("name", name))
            .paginate(paginationOpts)
        : await ctx.db
            .query("media")
            .withSearchIndex("search_name", (q) => q.search("name", name))
            .collect();
    } catch (e) {
      console.log(e);
      return "failure";
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
      return "failure";
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
            .filter((q) => q.eq(q.field("userId"), userId))
            .paginate(paginationOpts)
        : await ctx.db
            .query("media")
            .filter((q) => q.eq(q.field("userId"), userId))
            .collect();
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const getByArtists = query({
  args: { artistId: v.id("user") },
  handler: async (ctx, { artistId }) => {
    try {
      const medias = await ctx.db.query("media").collect();

      return medias.filter(
        ({ userId, otherUsers }) => otherUsers.includes(artistId) || userId === artistId
      );
    } catch (e) {
      console.log(e);
      return "failure";
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
      return "failure";
    }
  },
});

export const update = mutation({
  args: {
    id: v.id("media"),
    otherUsers: v.optional(v.array(v.id("user"))),
    genres: v.optional(v.array(v.id("genre"))),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    dateTime: v.optional(v.number()),
    privacy: v.optional(v.union(v.literal("public"), v.literal("private"))),
    // comments: v.optional(v.array(v.id("comments"))),
    views: v.optional(v.number()),
    likes: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    try {
      return await ctx.db.patch(args.id, args);
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

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
      return "failure";
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
      return "failure";
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
      return "failure";
    }
  },
});
