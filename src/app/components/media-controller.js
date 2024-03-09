import { React, useState, useEffect, useRef } from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Slider from '@mui/material/Slider';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import PauseIcon from '@mui/icons-material/Pause';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMedia, setIsPlaying } from "@/redux/media-slice";
// import { api } from "../api/api";
import { selectMedias, selectCurrentMedia, selectIsPlaying, selectCurrentMediaArtist, selectCurrentMediaTitle } from "@/redux/media-slice";

export default function MediaControl() {
    const audioRef = useRef(null);
    const dispatch = useDispatch();
    const medias = useSelector(selectMedias);
    const media = useSelector(selectCurrentMedia);
    const isPlaying = useSelector(selectIsPlaying);
    const title = useSelector(selectCurrentMediaTitle);
    const artist = useSelector(selectCurrentMediaArtist);
    const theme = useTheme();
    const [volume, setVolume] = useState(50);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        audioRef.current.volume = newValue / 100;
    }

    const handlePlay = () => {
        if (medias.length === 0) return;
        dispatch(setIsPlaying(false));
        if (audioRef === null) return;
        audioRef.current.play();
    }

    const handlePause = () => {
        if (audioRef === null) return;
        dispatch(setIsPlaying(true));
        audioRef.current.pause();
    }

    const handleStop = () => {
        if (audioRef === null) return;
        dispatch(setIsPlaying(false));
        audioRef.current.pause()
        audioRef.current.currentTime = 0;
    }

    const handleNext = () => {
        if (medias.length === 0) return;
        if (media === medias.length - 1) {
            dispatch(setCurrentMedia(0));
        } else {
            dispatch(setCurrentMedia(media + 1));
        }
        handleStop();
        handlePlay();
    }

    const handlePrevious = () => {
        if (medias.length === 0) return;
        if (media === 0) {
            dispatch(setCurrentMedia(medias.length - 1));
        } else {
            dispatch(setCurrentMedia(media - 1));
        }
        handleStop();
        handlePlay();
    }

    const handleTimeChange = (event, newValue) => {
        if (audioRef === null) return;
        setCurrentTime(newValue);
        audioRef.current.currentTime = newValue;
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    useEffect(() => {
        setCurrentTime(0);

    }, [])

    if (media != null) {
        return (
            <Card sx={{ display: 'flex', position: "fixed", bottom: 0, width: "100%", zIndex: 100000000, height: "auto", opacity: 0.8 }}>
                <Box sx={{ display: 'flex', justifyContent: "center", flex: 1, width: "100%" }}>
                    <CardContent sx={{ marginRight: "auto", width: "15%" }}>
                        <Typography component="div" variant="h5" fontSize={20}>
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div" fontSize={15} left={0}>
                            {artist}
                        </Typography>
                    </CardContent>
                    <Box sx={{ alignItems: "center", width: "40%" }}>

                        <Box sx={{ flex: 1 }}>
                            <IconButton aria-label="previous" onClick={handlePrevious}>
                                {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                            </IconButton>
                            <IconButton aria-label="play/pause" onClick={isPlaying ? handlePlay : handlePause}>
                                {isPlaying ? <PlayArrowIcon sx={{ height: 38, width: 38 }} /> : <PauseIcon sx={{ height: 38, width: 38 }} />}
                            </IconButton>
                            <IconButton aria-label="next" onClick={handleNext}>
                                {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                            </IconButton>
                            <Box sx={{ flex: 1, }}>
                                <audio
                                    ref={audioRef}
                                    src={medias[media]}
                                    onTimeUpdate={handleTimeUpdate}
                                    onLoadedMetadata={handleLoadedMetadata}
                                    onEnded={handleNext}
                                />
                                <Slider size="small"
                                    style={{ width: "100%", color: "whitesmoke" }}
                                    value={currentTime}
                                    onChange={handleTimeChange}
                                    min={0}
                                    max={duration}
                                    step={0.1}
                                    aria-label="Time slider" />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ marginLeft: "auto", width: "10%", marginRight: "2%" }}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "20%",
                        }}>
                            <VolumeUpIcon sx={{ marginRight: "5%" }} />
                            <Slider size="small" aria-label="Volume" defaultValue={volume} style={{ width: "50%", color: "whitesmoke" }} onChange={handleVolumeChange} />
                        </Box>
                    </Box>
                </Box>
                {/* <CardMedia
                component="img"
                sx={{ width: "100%" }}
                image="/static/images/cards/live-from-space.jpg"
                alt="Live from space album cover"
            /> */}
            </Card >
        );
    } else {
        return null;
    }
}