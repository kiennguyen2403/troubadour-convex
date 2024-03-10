"use client";
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker, Circle, InfoWindow } from '@react-google-maps/api';
import { Box, Typography } from '@mui/material';
const containerStyle = {
    width: '100%',
    height: '85vh'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const circleOptions = {
    strokeColor: '#FF0000', // Replace with your desired stroke color
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000', // Replace with your desired fill color
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 100, // Replace with your desired radius in meters
};

function Map() {
    const [infoWindowOpen, setInfoWindowOpen] = useState(false);
    const [map, setMap] = useState(null)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    })



    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const handleMarkerClick = () => {
        console.log('clicked');
        setInfoWindowOpen(!infoWindowOpen);
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker
                position={center}
                onClick={handleMarkerClick}
            />
            <Circle
                center={center}
                options={circleOptions}
                onClick={handleMarkerClick} />
            {infoWindowOpen && (
                <InfoWindow
                    position={center}
                    onCloseClick={() => setInfoWindowOpen(false)}
                >
                    <Box>
                        <Typography variant="h6" component="h6">
                            Hello, World!
                        </Typography>
                    </Box>
                </InfoWindow>
            )}
        </GoogleMap>
    ) : <></>
}

export default React.memo(Map)