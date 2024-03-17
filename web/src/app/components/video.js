import { Card, CardMedia } from '@mui/material';
import MuxPlayer from '@mux/mux-player-react';
import { CardContent, Typography } from '@mui/material';
export default function CustomVideo({ type = "ll-live", playbackId, title, description }) {
    return (
        <Card>
            <CardMedia>
                <MuxPlayer
                    streamType="live" // use "ll-live" for low-latency streams
                    playbackId={playbackId}
                    metadata={{
                        video_id: "video-id-54321",
                        video_title: title,
                        viewer_user_id: description,
                    }}
                    style={{height: '60vh'}}
                />
            </CardMedia>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{ textAlign: "start" }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ textAlign: "start" }}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    )
}