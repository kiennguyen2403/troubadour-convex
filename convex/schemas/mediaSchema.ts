import { defineTable } from "convex/server";
import { v } from "convex/values";

export const mediaSchema = {
  media: defineTable({
    user: v.id("user"),
    otherUsers: v.array(v.id("user")),
    genres: v.array(v.id("genre")),
    name: v.string(),
    dateTime: v.number(), // Note: This may be changed to updateTime later since _creationTime is default in convex schema
    privacy: v.union(v.literal("public"), v.literal("private")),
    fileUrl: v.string(),
    comments: v.array(v.id("comments")),
    views: v.number(),
    likes: v.number(), // Note: In the future, likes should be a table with two PK: media and user.
    characteristics: v.optional(
      v.object({
        tempo: v.number(),
        pitch: v.number(),
        // Others, for later vector searches for media
      })
    ),
  }),
};
