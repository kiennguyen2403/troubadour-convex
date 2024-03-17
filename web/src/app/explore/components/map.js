"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, Circle, InfoWindow } from "@react-google-maps/api";
import { Box, Typography, Stack, Chip, Button } from "@mui/material";
import { useAction, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import VisibilityIcon from "@mui/icons-material/Visibility";

const darkMapStyles = [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36,
      },
      {
        color: "#000000",
      },
      {
        lightness: 40,
      },
    ],
  },
  // Add more styles as needed
];

const containerStyle = {
  width: "100%",
  height: "85vh",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const circleOptions = {
  strokeColor: "#FF0000", // Replace with your desired stroke color
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#FF0000", // Replace with your desired fill color
  fillOpacity: 0.7,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 100, // Replace with your desired radius in meters
};

function Map() {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const router = useRouter();
  const [center, setCenter] = useState(null);
  const [_event, setEvent] = useState();
  const [map, setMap] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const events = useQuery(api.event.getOfflineEvents, {});

  useEffect(() => {
    if (navigator.geolocation) {
      if (events && events.length > 0) {
        setCenter({
          lat: events[0].xCoordinate,
          lng: events[0].yCoordinate,
        });
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      }
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  }, [events]);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={center ? 18 : 1}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        styles: darkMapStyles,
        disableDefaultUI: true,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
      }}
    >
      {events?.map((event) => {
        return (
          <>
            <Marker
              key={event.id}
              position={{
                lat: event.xCoordinate,
                lng: event.yCoordinate,
              }}
              onClick={(e) => {
                setInfoWindowOpen(!infoWindowOpen);
                setEvent(event);
              }}
            />
            <Circle
              center={{
                lat: event.xCoordinate,
                lng: event.yCoordinate,
              }}
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                clickable: false,
                draggable: false,
                editable: false,
                visible: true,
                radius: 2 * event.views ?? 100,
              }}
            />
          </>
        );
      })}

      {infoWindowOpen && (
        <InfoWindow
          position={{
            lat: _event?.xCoordinate,
            lng: _event?.yCoordinate,
          }}
          onCloseClick={() => setInfoWindowOpen(false)}
        >
          <Box>
            <Stack
              direction="column"
              spacing={2}
              sx={{
                padding: "1rem",
              }}
            >
              <Typography variant="h6" component="div" color={"#000"}>
                {_event?.name}
              </Typography>
              <Box>
                <Chip
                  label={_event?.status}
                  color={_event?.status == "start" ? "success" : "warning"}
                  variant="outlined"
                  size="small"
                />
              </Box>
              <Typography variant="body2" component="div" color={"#000"}>
                {_event?.description}
              </Typography>
              <Stack direction="row" spacing={2}>
                <VisibilityIcon color="primary" />
                <Typography variant="body2" component="div" color={"#000"}>
                  {_event?.views} views
                </Typography>
              </Stack>
              <Button
                onClick={() => {
                  router.push("/event/" + _event?._id);
                }}
              >
                Go to event
              </Button>
            </Stack>
          </Box>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
