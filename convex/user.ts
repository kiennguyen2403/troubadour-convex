import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const GetAll = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("user").collect();
    return users;
  },
});

export const GetByID = query({
  args: { id: v.id("user") },
  handler: async (ctx, { id }) => {
    try {
      const users = await ctx.db
        .query("user")
        .filter((q) => q.eq(q.field("_id"), id))
        .first();
      return users;
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const deleteByID = mutation({
  args: { id: v.id("user") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const update = query({
  args: {
    image: v.string(),
    dob: v.string(),
    email: v.string(),
    username: v.string(),
    password: v.string(),
    role: v.string(),
  },
  handler: async (ctx) => {},
});

export const store = mutation({
  args: { role: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Check if we've already stored this identity before.
    const user = await ctx.db
      .query("user")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name });
      }
      return user._id;
    }
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("user", {
      name: identity.name!,
      tokenIdentifier: identity.tokenIdentifier,
      role: args.role,
    });
  },
});
