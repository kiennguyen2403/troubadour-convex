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

  const getAudio = (mediaURL, title, artist = "Unknown") => {
    try {
      dispatch(setMedias([mediaURL]));
      dispatch(setIsPlaying(!isPlaying));
      dispatch(setCurrentMedia(0));
      dispatch(setCurrentMediaTitle(title));
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
                getAudio(item.fileUrl, item.title);
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
              primary={item.title}
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
