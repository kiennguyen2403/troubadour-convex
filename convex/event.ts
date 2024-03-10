import { query, action, mutation, internalAction } from "./_generated/server";
import { v } from "convex/values";

export const post = mutation({
    args: {
        name: v.string(),
        description: v.string(),
        status: v.string(),
        xCoordinate: v.number(),
        yCoordinate: v.number(),
        tickets: v.array(v.id("ticket")),
        users: v.array(v.id("user")),
        comments: v.array(v.id("comment")),
        eventUrl: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            return await ctx.db
                .insert("event", args);
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
                .query("event")
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
        id: v.id("event"),
    },
    handler: async (ctx, args) => {
        try {
            return await ctx.db
                .query("event")
                .filter((q) => q.eq(q.field('_id'), args.id))
                .first();
        } catch (e) {
            console.log(e);
            return "failure";
        }
    }
});


export const getByGenres = query({
    args: {
        genres: v.array(v.id("genre")),
    },
    handler: async (ctx, { genres }) => {
        try {
            let events: any[] = [];

            for (const genre of genres) {
                let result = await ctx.db
                    .query("event")
                    .filter((q) => q.eq(q.field('genre'), genre))
                    .collect();
                events = events.concat(result);
            }

            return events;
        } catch (e) {
            console.log(e);
            return "failure";

        }
    }
});

export const deleteByID = mutation({
    args: {
        id: v.id("event"),
    },
    handler: async (ctx, { id }) => {
        try {
            return await ctx.db
                .delete(id);
        } catch (e) {
            console.log(e);
            return "failure";
        }

    }
});

export const update = mutation({
    args: {
        id: v.id("event"),
        name: v.string() || v.null(),
        description: v.string() || v.null(),
        status: v.string() || v.null(),
        xCoordinate: v.number() || v.null(),
        yCoordinate: v.number() || v.null(),
        tickets: v.array(v.id("ticket")) || v.null(),
        users: v.array(v.id("user")) || v.null(),
        comments: v.array(v.id("comment")) || v.null(),
        eventUrl: v.string() || v.null(),
    },
    handler: async (ctx, args) => {
        try {
            return await ctx.db.replace(args.id, args);
        } catch (e) {
            console.log(e);
            return "failure";
        }
    }
});



