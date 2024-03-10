import { React, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function TopResultButton({ image, title, subtitle, eventHandler }) {
    const [isPlayIconVisible, setIsPlayIconVisible] = useState(false);
    return (
        <Card sx={{ width: "30rem", height: "20rem", borderRadius: "12px", marginTop: "3%", marginBottom: "3%", }}
            onClick={eventHandler}
            onMouseOver={() => { setIsPlayIconVisible(true); }}
            onMouseOut={() => { setIsPlayIconVisible(false); }}
        >
            <CardActionArea sx={{ width: "30rem", height: "20rem", alignItem: "flex-start" }} >
                <CardContent sx={{ marginBottom: "50%" }}>
                    <Avatar src={image} sx={{ width: "5rem", height: "5rem" }} />
                    {isPlayIconVisible ?
                        <IconButton style={{ position: "absolute", background: "#73726f", marginTop: "32%", marginLeft: "33%" }}>
                            <PlayArrowIcon />
                        </IconButton>
                        : null}
                    <Typography gutterBottom variant="h6" component="div" textAlign="start" style={{ marginTop: "5%", marginLeft: "2.5%" }}>
                        {title}
                    </Typography>
                    <Typography gutterBottom variant="caption" component="div" textAlign="start" style={{ marginTop: "5%", marginLeft: "2.5%" }}>
                        {subtitle}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card >
    );
}