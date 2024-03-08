import { defineTable } from "convex/server";
import { v } from "convex/values";

export const playlistSchema = {
  playlist: defineTable({
    name: v.string(),
    privacy: v.union(v.literal("public"), v.literal("private")),
    dateTime: v.number(), // Note: This may be changed to updatedDate later since _creationTime is default in convex schema
    userId: v.id("user"),
    otherUsers: v.array(v.id("user")),
    genres: v.array(v.id("genre")),
    medias: v.array(v.id("media")),
  }),
};
