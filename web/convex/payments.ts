// convex/payments.ts

import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const create = internalMutation({
    args: { text: v.string() },
    handler: async (ctx, { text }) => {
        return await ctx.db.insert("payments", { ticketID: text });
    },
});

export const markPending = internalMutation({
    args: {
        paymentId: v.id("payments"),
        stripeId: v.string(),
    },
    handler: async (ctx, { paymentId, stripeId }) => {
        await ctx.db.patch(paymentId, { stripeId });
    },
});

// convex/payments.ts (continued)
export const fulfill = internalMutation({
    args: { stripeId: v.string() },
    handler: async ({ db }, { stripeId }) => {
        const { _id: paymentId, ticketID } =
            (await db
                .query("payments")
                .withIndex("stripeId", (q) => q.eq("stripeId", stripeId))
                .unique())!;
        await db.patch(paymentId, { confirmTicketID: ticketID });
    },
});
