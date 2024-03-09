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
                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
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