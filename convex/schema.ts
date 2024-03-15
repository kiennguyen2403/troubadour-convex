import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  event: defineTable({
    name: v.string(),
    description: v.string(),
    status: v.string(),
    date: v.string(),
    isOffline: v.boolean(),
    genre: v.array(v.string()),
    xCoordinate: v.number(),
    yCoordinate: v.number(),
    tickets: v.array(v.id("ticket")),
    users: v.array(v.id("user")),
    views: v.number(),
    streamKey: v.string(),
    playbackID: v.string(),
  }),
  ticket: defineTable({
    name: v.string(),
    user: v.optional(v.id("user")),
    status: v.string(),
    fee: v.number(),
  }),
  user: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
    role: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  history: defineTable({
    userID: v.id("user"),
    playlists: v.array(v.id("playlist")),
    genres: v.array(v.id("genre")),
    medias: v.array(v.id("media")),
  }),
  comment: defineTable({
    content: v.string(),
    user: v.id("user"),
    mediaID: v.optional(v.id("media")),
    eventID: v.optional(v.id("event")),
    likes: v.number(),
  }),
  genre: defineTable({
    name: v.string(),
  }),
  media: defineTable({
    userId: v.id("user"),
    otherUsers: v.array(v.id("user")),
    genres: v.array(v.id("genre")),
    name: v.string(),
    description: v.optional(v.string()),
    dateTime: v.optional(v.number()), // Note: This may be changed to updateTime later since _creationTime is default in convex schema
    privacy: v.union(v.literal("public"), v.literal("private")),
    fileUrl: v.string(),
    storageId: v.id("_storage"),
    // comments: v.array(v.id("comments")),
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
  playlist: defineTable({
    name: v.string(),
    privacy: v.union(v.literal("public"), v.literal("private")),
    dateTime: v.optional(v.number()), // Note: This may be changed to updatedDate later since _creationTime is default in convex schema
    userId: v.id("user"),
    otherUsers: v.array(v.id("user")),
    genres: v.array(v.id("genre")),
    medias: v.array(v.id("media")),
  }),
});
