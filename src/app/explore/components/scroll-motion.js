import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';

const ScrollContainer = styled('div')({
    height: '400px',
    overflowY: 'scroll',
});

const ScrollMotion = ({ children }) => {
    const [scrollTop, setScrollTop] = useState(0);

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        setScrollTop(scrollTop);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <ScrollContainer>
            {children}
        </ScrollContainer>
    );
};

export default ScrollMotion;
