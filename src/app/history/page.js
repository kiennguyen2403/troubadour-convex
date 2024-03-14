"use client";
import { React, useState, useEffect } from "react";
import axios from "axios";
import ClippedDrawer from "@/app/components/header";
import { Grid, Typography, Card, CardContent } from "@mui/material";
import { Box } from "@mui/material";
import VideoButton from "@/app/components/video-button";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

export default function History(props) {
  const tickets = useQuery(api.ticket.get, {});
  const playlists = [];

  const Recently = (
    <Box>
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        style={{ float: "left" }}
      >
        Recently Watched
      </Typography>
      <Grid container spacing={2}>
        {tickets?.length > 0 ? (
          tickets.map((item) => (
            <Grid item xs={4}>
              <Card >
                <CardContent>
                  <LocalActivityIcon />
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item._creationTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.fee}$
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography
            textAlign="center"
            width="100%"
            gutterBottom
            marginTop="5%"
            marginBottom="5%"
          >
            No recently watched videos
          </Typography>
        )}
      </Grid>
    </Box>
  );

  const Playlist = (
    <Box sx={{ marginTop: "5%" }}>
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        style={{ float: "left" }}
      >
        Playlists
      </Typography>
      <Grid container spacing={2}>
        {playlists?.length > 0 ? (
          playlists.map((item) => (
            <Grid item xs={4}>
              <VideoButton
                image={item.image}
                title={item.title}
                description={item.description}
                eventHandler={getMedias}
              />
            </Grid>
          ))
        ) : (
          <Typography
            textAlign="center"
            width="100%"
            gutterBottom
            marginTop="5%"
            marginBottom="5%"
          >
            No playlists found
          </Typography>
        )}
      </Grid>
    </Box>
  );

  return <ClippedDrawer Component={[Recently, Playlist]} />;
}
