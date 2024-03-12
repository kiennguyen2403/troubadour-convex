import { React, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function ArtistButton({ image, title, eventHandler }) {
    const [isPlayIconVisible, setIsPlayIconVisible] = useState(false);
    return (
        <Card sx={{ width: "12rem", height: "15rem", borderRadius: "12px", marginTop: "3%", marginBottom: "3%", }}
            onClick={eventHandler}
            onMouseOver={() => { setIsPlayIconVisible(true); }}
            onMouseOut={() => { setIsPlayIconVisible(false); }}
        >
            <CardActionArea sx={{ width: "12rem", height: "15rem", }} >
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "30%" }}>
                    <Avatar src={image} sx={{ width: "5rem", height: "5rem", }} />
                    {isPlayIconVisible ?
                        <IconButton style={{ position: "absolute", background: "#73726f", marginTop: "80%", marginLeft: "60%" }}>
                            <PlayArrowIcon />
                        </IconButton>
                        : null}
                    <Typography gutterBottom variant="h6" component="div" textAlign="center" style={{ marginTop: "5%", marginLeft: "2.5%" }}>
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card >
    );
}