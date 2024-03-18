import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const post = mutation({
  args: {
    userId: v.id("user"),
    otherUsers: v.array(v.id("user")),
    genres: v.array(v.id("genre")),
    medias: v.array(v.id("media")),
    name: v.string(),
    dateTime: v.optional(v.number()),
    privacy: v.union(v.literal("public"), v.literal("private")),
  },
  handler: async (ctx, args) => {
    try {
      return await ctx.db.insert("playlist", args);
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const getById = query({
  args: { id: v.string() },
  handler: async (ctx, { id }) => {
    try {
      const playlist = await ctx.db
        .query("playlist")
        .filter((q) => q.eq(q.field("_id"), id))
        .first();

      if (!playlist) {
        return null;
      }

      const fullMedias = [];

      for (const mediaId of playlist.medias) {
        const media = await ctx.db.get(mediaId);
        fullMedias.push(media);
      }

      return {
        ...playlist,
        medias: fullMedias,
      };
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const get = query({
  handler: async (ctx) => {
    try {
      return await ctx.db.query("playlist").collect();
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
      const medias = await ctx.db.query("playlist").collect();

      // Filter the medias
      return medias.filter(({ genres }) => genres.includes(genre._id));
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
      const playlists = await ctx.db.query("playlist").collect();

      return playlists.filter(
        ({ userId, otherUsers }) => otherUsers.includes(artistId) || userId === artistId
      );
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const getByUserId = query({
  args: { userId: v.string(), paginationOpts: v.optional(paginationOptsValidator) },
  handler: async (ctx, { userId, paginationOpts }) => {
    try {
      return paginationOpts
        ? await ctx.db
            .query("playlist")
            .filter((q) => q.eq(q.field("userId"), userId))
            .paginate(paginationOpts)
        : await ctx.db
            .query("playlist")
            .filter((q) => q.eq(q.field("userId"), userId))
            .collect();
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const update = mutation({
  args: {
    id: v.id("playlist"),
    otherUsers: v.optional(v.array(v.id("user"))),
    genres: v.optional(v.array(v.id("genre"))),
    name: v.optional(v.string()),
    dateTime: v.optional(v.number()),
    privacy: v.optional(v.union(v.literal("public"), v.literal("private"))),
    media: v.optional(v.array(v.id("media"))),
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

export const deleteById = mutation({
  args: {
    id: v.id("playlist"),
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
