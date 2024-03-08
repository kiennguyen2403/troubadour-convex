import { defineTable } from "convex/server";
import { v } from "convex/values";

export const genreSchema = {
  genre: defineTable({
    name: v.string(),
  }),
};
