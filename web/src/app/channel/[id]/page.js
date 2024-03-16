"use client";
import ClippedDrawer from "@/app/components/header";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useSelector } from "react-redux";
import { selectUserID } from "@/redux/auth-slice";

import ChannelInformation from "./components/ChannelInformation";
import ChannelTab from "./components/ChannelTab";

export default function Channel({}) {
  const user = useUser().user;
  const userId = useSelector(selectUserID);
  const medias = useQuery(api.media.getByUserId, { userId: userId ?? "" });
  const playlists = useQuery(api.playlist.getByUserId, { userId: userId ?? "" });
  const { fullName, imageUrl } = user ?? {};

  return (
    <ClippedDrawer
      Component={[
        <ChannelInformation
          fullName={fullName}
          imageUrl={imageUrl}
          medias={medias}
          playlists={playlists}
        />,
        <ChannelTab
          medias={medias}
          playlists={playlists}
          fullName={fullName}
          imageUrl={imageUrl}
        />,
      ]}
    />
  );
}
