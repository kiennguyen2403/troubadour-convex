import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation'

export default function PlaylistButton({ image, title, description, eventHandler }) {
    const navigation = useNavigate();

    const getVideo = async () => {
        try {
            const result = await axios.get('http://localhost:3001/video');
            if (result.data) {
                navigation('/video/' + result.data.playbackId)
            }
        } catch (err) {
            console.log(err);
            navigation('/video/1');
        }

    }


    return (
        <Card sx={{ maxWidth: 345, borderRadius: 5 }} onClick={() => {
            getVideo();
        }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}