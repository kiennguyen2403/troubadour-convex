import { React, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea, IconButton, List, ListItem, ListItemText } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function PlanButton({ title, price, features, eventHandler }) {
    return (
        <Card sx={{ width: "19rem", height: "19rem", borderRadius: "12px", marginTop: "3%", marginBottom: "3%", }}
            onClick={eventHandler}
            onMouseOver={() => { }}
            onMouseOut={() => { }}
        >
            <CardActionArea sx={{ width: "19rem", height: "19rem", }} >
                <CardContent sx={{ display: "flex", flexDirection: "column", marginBottom: "30%" }}>
                    <Typography gutterBottom variant="h4" component="div" textAlign="start" style={{ marginTop: "5%", marginLeft: "2.5%" }}>
                        {title}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div" textAlign="start" style={{ marginTop: "5%", marginLeft: "2.5%" }}>
                        {price}
                    </Typography>
                    <List>
                        {
                            features.map((item) =>
                                <ListItem>
                                    <ListItemText primary={item} />
                                </ListItem>
                            )
                        }
                    </List>
                </CardContent>
            </CardActionArea>
        </Card >
    );
}