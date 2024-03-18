import React from "react";
import {
  Box,
  ListItemButton,
  ListItemIcon,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  setCurrentMedia,
  setIsPlaying,
  selectIsPlaying,
  setMedias,
  setCurrentMediaArtist,
  setCurrentMediaTitle,
} from "@/redux/media-slice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function ChannelMedias({ medias, artist, imageUrl, type }) {
  const dispatch = useDispatch();
  const isPlaying = useSelector(selectIsPlaying);
  const router = useRouter();

  const getAudio = (media, artist = "Unknown") => {
    try {
      dispatch(setMedias([media.fileUrl]));
      dispatch(setIsPlaying(!isPlaying));
      dispatch(setCurrentMedia(media._id));
      dispatch(setCurrentMediaTitle(media.name));
      dispatch(setCurrentMediaArtist(artist));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <List>
      {medias?.map((item) => (
        <ListItemButton
          style={{ background: "#292929" }}
          onClick={() => {
            switch (type) {
              case "video":
                getAudio(item, item.name);
                break;
              case "playlist":
                router.push("/playlist/" + item._id);
                break;
            }
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Avatar alt={artist} src={imageUrl} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={artist ? artist : "N/A"}
            />
            {type === "video" && (
              <ListItemIcon>
                <PlayArrowIcon
                  style={{ background: "#73726f", borderRadius: 12 }}
                />
              </ListItemIcon>
            )}
          </ListItem>
        </ListItemButton>
      ))}
    </List>
  );
}
