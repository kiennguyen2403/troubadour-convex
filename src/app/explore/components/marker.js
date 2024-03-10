import React from 'react';
import { styled } from '@mui/system';

const Wave = styled('div')({
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(to right, rgba(76, 175, 80, 0.7), rgba(33, 150, 243, 0.7))', // Use rgba for opacity
    animation: '$waveAnimation 1s infinite linear',
    '@keyframes waveAnimation': {
        '0%': {
            transform: 'scale(1, 1)',
        },
        '50%': {
            transform: 'scale(1.2, 1.2)',
        },
        '100%': {
            transform: 'scale(1, 1)',
        },
    },
});

export default function Marker() { 
    return (
        <Wave />
    );
}

