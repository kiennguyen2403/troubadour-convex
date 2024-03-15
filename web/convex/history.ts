import { query, mutation } from "./_generated/server";
import { GenericId, v } from "convex/values";

export const post = mutation({
  args: {
    userID: v.id("user"),
    playlists: v.array(v.id("playlist")),
    genres: v.array(v.id("genre")),
    medias: v.array(v.id("media")),
  },
  handler: async (ctx, args) => {
    try {
      return await ctx.db.insert("history", args);
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const history = await ctx.db.query("history").collect();
    return history;
  },
});

type Playlist = {
  _id: GenericId<"playlist">;
  _creationTime: number;
  name: string;
  genres: GenericId<"genre">[];
  medias: GenericId<"media">[];
  userId: GenericId<"user">;
  otherUsers: GenericId<"user">[];
  dateTime?: number;
  privacy: "public" | "private";
};

type Media = {
  userId: string;
  otherUsers: string[];
  genres: string[];
  name: string;
  dateTime?: number;
  privacy: "public" | "private";
  fileUrl: string;
  storageId: string;
  // comments: string[];
  views: number;
  likes: number;
  characteristics?: {
    tempo?: number;
    pitch?: number;
    // Add other characteristics here
  };
};

export const getByUserID = query({
  args: { userID: v.id("user") },
  handler: async (ctx, args) => {
    try {
      if (!args) {
        throw "userID was not provided";
      }
      var recentPlaylist: (Playlist | null)[] = [];
      var recentMedias: (Media | null)[] = [];
      const history = await ctx.db
        .query("history")
        .filter((q) => q.eq(q.field("userID"), args.userID))
        .first();
      if (!history) {
        return { recentPlaylist: [], recentMedias: [] };
      }
      await Promise.all(
        history?.playlists.map(async (playlist) => {
          const res = await ctx.db
            .query("playlist")
            .filter((q) => q.eq(q.field("_id"), playlist))
            .first()
            .then((res) => {
              console.log("pushed playlist");
              recentPlaylist.push(res);
              console.log(recentPlaylist);
            });
        })
      );
      await Promise.all(
        history?.medias.map(async (media) => {
          const mediaRes = await ctx.db
            .query("media")
            .filter((q) => q.eq(q.field("_id"), media))
            .first()
            .then((mediaRes) => {
              recentMedias.push(mediaRes);
            });
        })
      );
      return { recentPlaylist: recentPlaylist, recentMedias: recentMedias };
    } catch (e) {
      return { recentPlaylist: [], recentMedias: [] };
    }
  },
});

export const deleteByID = mutation({
  args: { historyID: v.id("history") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.historyID);
  },
});

export const patch = mutation({
  args: {
    id: v.id("history"),
    playlists: v.array(v.id("playlist")),
    genres: v.array(v.id("genre")),
    medias: v.array(v.id("media")),
  },
  handler: async (ctx, args) => {
    try {
      if (!args) {
        throw "Id was not provided";
      }
      await ctx.db.patch(args.id, args);
    } catch (e) {
      console.log(e);
      return "failure";
    }
  },
});

// this function receives new playlist or media then update the array
export const updatePlaylistHistory = mutation({
  args: {
    userID: v.id("user"),
    playlist: v.id("playlist"),
  },
  handler: async (ctx, args) => {
    try {
      if (!args) {
        throw "Arguments were not provided";
      }
      var history = await ctx.db
        .query("history")
        .filter((q) => q.eq(q.field("userID"), args.userID))
        .first();
      if (!history && args.userID) {
        var newHistory = await ctx.db
          .insert("history", {
            userID: args.userID,
            playlists: [],
            genres: [],
            medias: [],
          })
          .then(async (newHistory) => {
            await ctx.db.patch(newHistory, { playlists: [args.playlist] });
          });
      }
      if (args.playlist && history) {
        const orderedPlaylist = sortPlaylistHistory(
          history?.playlists,
          args.playlist
        );
        await ctx.db.patch(history._id, { playlists: orderedPlaylist });
      }
    } catch (e) {
      return "failure";
    }
  },
});
export const updateMediaHistory = mutation({
  args: {
    userID: v.id("user"),
    playlist: v.id("playlist"),
    media: v.id("media"),
  },
  handler: async (ctx, args) => {
    try {
      if (!args) {
        throw "Arguments were not provided";
      }
      var history = await ctx.db
        .query("history")
        .filter((q) => q.eq(q.field("userID"), args.userID))
        .first();
      if (!history && args.userID) {
        var newHistory = await ctx.db
          .insert("history", {
            userID: args.userID,
            playlists: [],
            genres: [],
            medias: [],
          })
          .then(async (newHistory) => {
            await ctx.db.patch(newHistory, { playlists: [args.playlist] });
          });
      }
      if (args.media && history) {
        const orderedPlaylist = sortMediaHistory(history?.medias, args.media);
        await ctx.db.patch(history._id, { medias: orderedPlaylist });
      }
    } catch (e) {
      return "failure";
    }
  },
});

function sortPlaylistHistory(
  arr: GenericId<"playlist">[],
  target: GenericId<"playlist">
): GenericId<"playlist">[] {
  const index = arr.indexOf(target);
  if (index !== -1) {
    arr.splice(index, 1);
    arr.unshift(target);
  } else {
    arr.unshift(target);
  }
  return arr;
}

function sortMediaHistory(
  arr: GenericId<"media">[],
  target: GenericId<"media">
): GenericId<"media">[] {
  const index = arr.indexOf(target);
  if (index !== -1) {
    arr.splice(index, 1);
    arr.unshift(target);
  } else {
    arr.unshift(target);
  }
  return arr;
}
