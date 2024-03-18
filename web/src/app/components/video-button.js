import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation'

export default function VideoButton({ image, title, description, eventHandler }) {

    return (
        <Card sx={{ maxWidth: 345, borderRadius: 5, marginTop: "3%", marginBottom: "3%" }} onClick={() => { eventHandler() }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://cdn.uc.assets.prezly.com/60ba1f8a-f70d-4af1-8b0f-4b20891e1c66/-/resize/1108x/-/quality/best/-/format/auto/"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" style={{ textAlign: "start" }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ textAlign: "start" }}>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}