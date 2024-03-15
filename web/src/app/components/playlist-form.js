import { selectTitle, setTitle, selectPrivacy, setPrivacy } from "@/redux/playlist-upload-slice";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  RadioGroup,
  Radio,
  TextField,
  FormControlLabel,
  FormLabel,
  DialogActions,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { selectUserID } from "@/redux/auth-slice";

export default function PlaylistForm({ isOptionOpen, setIsOptionOpen }) {
  const [isLoading, setIsLoading] = useState(false);

  const name = useSelector(selectTitle);
  const privacy = useSelector(selectPrivacy);

  const userId = useSelector(selectUserID);

  const dispatch = useDispatch();

  const handleTitleChange = (event) => {
    dispatch(setTitle(event.target.value));
  };

  const handlePrivacyChange = (event) => {
    dispatch(setPrivacy(event.target.value));
  };

  const handleClose = () => {
    setIsOptionOpen(false);
    dispatch(setTitle(""));
    dispatch(setPrivacy(""));
  };

  const savePlaylist = useMutation(api.playlist.post);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const playlistDetails = {
        userId,
        otherUsers: [],
        genres: [],
        name,
        privacy,
        medias: [],
      };

      await savePlaylist(playlistDetails);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setIsOptionOpen(false);
  };

  return (
    <Dialog open={isOptionOpen} style={{ width: "100%", height: "100%" }} fullWidth={true}>
      <DialogTitle>New playlist</DialogTitle>
      <DialogContent>
        <TextField
          label="Playlist Title"
          variant="outlined"
          value={name}
          onChange={handleTitleChange}
          fullWidth
          margin="normal"
        />
        <FormLabel id="privacy">Privacy</FormLabel>
        <RadioGroup row aria-labelledby="privacy">
          <FormControlLabel
            value="public"
            control={<Radio />}
            label="Public"
            onClick={handlePrivacyChange}
          />
          <FormControlLabel
            value="private"
            control={<Radio />}
            label="Private"
            onClick={handlePrivacyChange}
          />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={handleClose} sx={{ mr: 1 }}>
          Exit
        </Button>
        <LoadingButton loading={isLoading} onClick={handleSubmit}>
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
