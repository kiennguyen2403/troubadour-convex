import { internalAction, internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const post = internalMutation({
    args: {
        name: v.string(),
        fee: v.number(),
    },
    handler: async (ctx, args) => {
        try {
            if (!args.name) return "No name provided for ticket post";
            if (!args.fee) return "No fee provided for ticket post";
    
            return await ctx.db
                .insert("ticket", {
                    name: args.name,
                    fee: args.fee,
                    status: "active",
                });
        } catch (e) {
            console.log(e);
            return "failure";
        }
    }
});

export const get = query({
    handler: async (ctx) => {
        try {
            return await ctx.db
                .query("ticket")
                .collect();
        }
        catch (e) {
            console.log(e);
            return "failure";
        }
    }
});

export const getById = query({
    args: {
        id: v.id("ticket"),
    },
    handler: async (ctx, args) => {
        try {
            if (!args.id) return "No id provided for ticket get by id";
            return await ctx.db
                .query("ticket")
                .filter((q) => q.eq(q.field('_id'), args.id))
                .first();
        } catch (e) {
            console.log(e);
            return "failure";
        }
    }
});

export const getByUser = query({
    args: {
        user: v.id("user"),
    },
    handler: async (ctx, args) => {
        try {
            if (!args.user) return "No user provided for ticket get by user";
            return await ctx.db
                .query("ticket")
                .filter((q) => q.eq(q.field('user'), args.user))
                .collect();
        } catch (e) {
            console.log(e);
            return "failure";
        }
    }
});

export const deleteByID = mutation({
    args: {
        id: v.id("ticket"),
    },
    handler: async (ctx, { id }) => {
        try {
            if (!id) return "No id provided for ticket delete";
            return await ctx.db
                .delete(id);
        } catch (e) {
            console.log(e);
            return "failure";
        }
    }
});

export const patch = internalMutation({
    args: {
        id: v.id("ticket"),
        name: v.optional(v.string()),
        user: v.optional(v.id("user")),
        event: v.optional(v.id("event")),
        status: v.optional(v.string()),
        fee: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        try {
            if (!args.id) return "No id provided for ticket patch";
            return await ctx.db
                .patch(args.id, args);
        } catch (e) {
            console.log(e);
            return "failure";
        }
    }
});

export const update = internalMutation({
    args: {
        id: v.id("ticket"),
        name: v.string(),
        user: v.id("user"),
        fee: v.number(),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            if (!args.id) return "No id provided for ticket update";
            return await ctx.db
                .replace(args.id, args);
        } catch (e) {
            console.log(e);
            return "failure";
        }
    }
});
