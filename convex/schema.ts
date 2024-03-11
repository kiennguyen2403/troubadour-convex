import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  event: defineTable({
    name: v.string(),
    description: v.string(),
    status: v.string(),
    date: v.string(),
    isOffline: v.boolean(),
    genre: v.array(v.id("genre")),
    xCoordinate: v.number(),
    yCoordinate: v.number(),
    tickets: v.array(v.id("ticket")),
    users: v.array(v.id("user")),
    comments: v.array(v.id("comment")),
    streamKey: v.string(),
    eventUrl: v.string(),
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
    currentMedia: v.id("media"),
  }),
  comment: defineTable({
    content: v.string(),
    user: v.id("user"),
    mediaID: v.id("media"),
    eventID: v.id("event"),
    likes: v.number(),
  }),
});
