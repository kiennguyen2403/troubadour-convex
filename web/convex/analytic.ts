import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

interface AnalyticValue {
  value: number;
  dateTime: number;
}

interface AnalyticData {
  views: AnalyticValue[];
  likes: AnalyticValue[];
}

interface AnalyticVariables {
  views: number;
  likes: number;
}

export const getByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    try {
      return await ctx.db
        .query("analytic")
        .filter((q) => q.eq(q.field("userId"), userId))
        .first();
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const postOrUpdate = mutation({
  args: {},
  handler: async (ctx, args) => {
    try {
      // get all users
      const users = await ctx.db.query("user").collect();

      if (!users) {
        throw new Error("Can't fetch users");
      }

      for (const user of users) {
        // calculate total views and like
        const userId = user._id;

        const medias = await ctx.db
          .query("media")
          .filter((q) => q.eq(q.field("userId"), userId))
          .collect();

        const { views, likes } = calculateTotalViewsAndLikes(medias);

        let data: AnalyticData = {
          views: [],
          likes: [],
        };

        // get the existing user's analytics
        const analytic = await ctx.db
          .query("analytic")
          .filter((q) => q.eq(q.field("userId"), userId))
          .first();

        const dateTime: number = new Date().getTime();

        if (!analytic) {
          data.views.push({ value: views, dateTime });
          data.likes.push({ value: likes, dateTime });
          await ctx.db.insert("analytic", {
            userId: userId as Id<"user">,
            data,
          });
        } else {
          data = analytic.data;
          data.views.push({ value: views, dateTime });
          data.likes.push({ value: likes, dateTime });
          await ctx.db.patch(analytic._id, {
            userId: userId as Id<"user">,
            data,
          });
        }
      }
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

function calculateTotalViewsAndLikes(medias: AnalyticVariables[]): {
  views: number;
  likes: number;
} {
  const { views, likes } = medias.reduce(
    (acc, cur) => {
      return {
        views: acc.views + cur.views,
        likes: acc.likes + cur.likes,
      };
    },
    { views: 0, likes: 0 }
  );

  return { views, likes };
}
