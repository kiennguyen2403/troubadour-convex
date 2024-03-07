import axios from "axios";
import { query, action, mutation, internalAction, internalMutation, internalQuery } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { v } from "convex/values";

export const post = internalMutation({
    args: {
        name: v.string(),
        description: v.string(),
        status: v.string(),
        genre: v.array(v.id("genre")),
        xCoordinate: v.number(),
        yCoordinate: v.number(),
        ticketsNumber: v.number(),
        tickets: v.array(v.id("ticket")),
        users: v.array(v.id("user")),
        comments: v.array(v.id("comment")),
        streamKey: v.string(),
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
            if (!args.id) return "No id provided for event get by id";
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
            if (!genres?.length) return "No genres provided for event get by genres";
            return await ctx.db
                .query("event")
                .filter((q) => q.eq(q.field('genre'), genres))
                .collect();
        } catch (e) {
            console.log(e);
            return "failure";

        }
    }
});

export const deleteByID = internalMutation({
    args: {
        id: v.id("event"),
    },
    handler: async (ctx, { id }) => {
        try {
            if (!id) return "No id provided for event delete";
            return await ctx.db
                .delete(id);
        } catch (e) {
            console.log(e);
            return "failure";
        }

    }
});

export const update = internalMutation({
    args: {
        id: v.id("event"),
        name: v.string(),
        description: v.string(),
        status: v.string(),
        genre: v.array(v.id("genre")),
        xCoordinate: v.number(),
        yCoordinate: v.number(),
        tickets: v.array(v.id("ticket")),
        users: v.array(v.id("user")),
        comments: v.array(v.id("comment")),
        streamKey: v.string(),
        eventUrl: v.string(),
    },

    handler: async (ctx, args) => {
        try {
            if (!args.id) return "No id provided for event update";
            return await ctx.db.replace(args.id, args);
        } catch (e) {
            console.log(e);
            return "failure";
        }
    }
});

export const patch = internalMutation({
    args: {
        id: v.id("event"),
        name: v.optional(v.string()),
        description: v.optional(v.string()),
        status: v.optional(v.string()),
        genre: v.optional(v.array(v.id("genre"))),
        xCoordinate: v.optional(v.number()),
        yCoordinate: v.optional(v.number()),
        tickets: v.optional(v.array(v.id("ticket"))),
        users: v.optional(v.array(v.id("user"))),
        comments: v.optional(v.array(v.id("comment"))),
        eventUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        try {
            if (!args.id) return "No id provided for event update";
            return await ctx.db.patch(args.id, args);
        } catch (e) {
            console.log(e);
            return "failure";
        }
    }
});

export const createMuxEvent = action({
    args: {
        name: v.string(),
        description: v.string(),
        status: v.string(),
        genre: v.array(v.id("genre")),
        xCoordinate: v.number(),
        yCoordinate: v.number(),
        ticketsNumber: v.number(),
        users: v.array(v.id("user")),
        comments: v.array(v.id("comment")),
        eventUrl: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            const streamKey = await axios
                .post('https://api.mux.com/video/v1/live-streams', {
                    playback_policy: 'public',
                    new_asset_settings: {
                        playback_policy: 'public',
                    },
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

            let tickets: Id<'ticket'>[] = [];
            for (let i = 0; i < args.ticketsNumber; i++) {
                const ticket = await ctx.runMutation(internal.ticket.post, {
                    name: `Ticket ${i + 1}`,
                    event: streamKey.data.stream_key.id,
                    fee: 0,
                });
                if (typeof ticket !== 'string')
                    tickets.push(ticket);
            }

            ctx.runMutation(internal.event.post, {
                name: args.name,
                description: args.description,
                status: args.status,
                genre: args.genre,
                xCoordinate: args.xCoordinate,
                yCoordinate: args.yCoordinate,
                ticketsNumber: args.ticketsNumber,
                tickets: tickets,
                users: args.users,
                comments: args.comments,
                streamKey: streamKey.data.stream_key,
                eventUrl: args.eventUrl,
            });

            return streamKey;

        } catch (e) {
            console.log(e);
            return "failure";
        }
    },
});

export const getMuxEvent = internalAction({
    args: {
        id: v.string(),
    },
    handler: async (ctx, { id }) => {
        try {
            const events = await axios
                .get(`https://api.mux.com/video/v1/live-streams/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            return events;
        } catch (e) {
            console.log(e);
            return "failure";
        }
    },
});

export const getMuxEvents = internalAction({
    args: {
    },
    handler: async (ctx, args) => {
        try {
            const events = await axios
                .get('https://api.mux.com/video/v1/live-streams',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
            return events;
        } catch (e) {
            console.log(e);
            return "failure";
        }
    },
});

export const deleteMuxEvent = action({
    args: {
        id: v.id("event"),
    },
    handler: async (ctx, { id }) => {
        try {
            const events = await axios
                .delete(`https://api.mux.com/video/v1/live-streams/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            ctx.runMutation(internal.event.deleteByID, { id: id });
            return events;
        } catch (e) {
            console.log(e);
            return "failure";
        }
    },
});

export const updateMuxEventStatus = internalAction({
    args: {
        id: v.id("event"),
        status: v.string(),
    },
    handler: async (ctx, { id, status }) => {
        try {
            const events = await ctx.runQuery(api.event.getById, { id: id });
            if (events === "failure" || !events || typeof events === 'string' || !('status' in events)) return "failure";

            if (events.status === status) return "success";
            await axios
                .put(`https://api.mux.com/video/v1/live-streams/${events}`, {
                    status: status,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            ctx.runMutation(internal.event.patch,
                {
                    id: id,
                    status: status
                });
            return "success";
        } catch (e) {
            console.log(e);
            return "failure";
        }
    },
});

export const buyTicket: any = action({
    args: {
        id: v.id("event"),
        user: v.id("user"),
    },
    handler: async (ctx, { id, user }) => {
        try {
            const event = await ctx.runQuery(api.event.getById, { id: id });
            if (event === "failure") return "failure";
            const ticket: any = await ctx.runQuery(api.ticket.getByEvent, { event: id });
            if (ticket === "failure") return "failure";
            return await ctx.runMutation(internal.ticket.patch, {
                id: ticket[0]._id,
                user: user,
                status: "sold",
            });
        } catch (e) {
            console.log(e);
            return "failure";
        }
    },
});

