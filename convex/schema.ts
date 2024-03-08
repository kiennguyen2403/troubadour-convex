import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { mediaSchema } from "./schemas/mediaSchema";
import { playlistSchema } from "./schemas/playlistSchema";
import { genreSchema } from "./schemas/genreSchema";

export default defineSchema(
  {
    ...mediaSchema,
    ...playlistSchema,
    ...genreSchema,
  },
  {
    strictTableNameTypes: false,
    schemaValidation: false,
  }
);
