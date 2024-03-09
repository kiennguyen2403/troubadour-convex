import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function GenreButton({ image, title, eventHandler, color = "red" }) {
    return (
        <Card sx={{ width: "10rem", height: "10rem", borderRadius: "12px", background: color }} onClick={eventHandler} color={color}>
            <CardActionArea sx={{ width: "10rem", height: "10rem" }} >
                <CardContent sx={{}}>
                    <Typography gutterBottom variant="h6" component="div" textAlign="start">
                        {title}
                    </Typography>

                </CardContent>
            </CardActionArea>
        </Card >
    );
}