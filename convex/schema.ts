import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    event: defineTable({
        name: v.string(),
        description: v.string(),
        status: v.string(),
        genre: v.array(v.id("genre")),
        xCoordinate: v.number(),
        yCoordinate: v.number(),
        tickets: v.array(v.id("ticket")),
        users : v.array(v.id("user")),
        comments: v.array(v.id("comment")),
        streamKey: v.string(),
        eventUrl: v.string(),
    }),
    ticket: defineTable({
        name: v.string(),
        user: v.optional(v.id("user")),
        status: v.string(),
        event: v.id("event"),
        fee: v.number(),
    })
});