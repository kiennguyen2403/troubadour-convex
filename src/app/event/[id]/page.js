"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAction, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import { Box, Typography, Button, Stack } from "@mui/material";
import ClippedDrawer from "@/app/components/header";

export default function Event({ params }) {
    const router = useRouter();
    const { id } = params;
    const event = useQuery(api.event.getById, { id });

    const noEvent =
        <Box>
            <Stack spacing={2}
                direction="column"
                sx={{
                    marginTop: "20%"
                }}>
                <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    textAlign={"center"}
                    style={{ float: "left" }}
                >
                    Event not found or deleted
                </Typography>


                <Box textAlign="center" width="100%" gutterBottom marginTop="5%" marginBottom="5%">
                    <Button variant="outlined" color="primary" onClick={() => router.push("/")}>Back to homes</Button>
                </Box>
            </Stack>
        </Box >


    const Event =
        <Box>
            <Typography variant="h1">{event?.name}</Typography>
            <Typography variant="body1">{event?.description}</Typography>
            <Button variant="contained" color="primary"
                onClick={() => {
                    try {
                        useAction(api.muxActions.buyTicket, { id });
                    } catch (error) {
                        console.error(error);
                    }
                }}>Purchase ticket</Button>
        </Box>

    return (
        <ClippedDrawer
            Component={event ? [Event] : [noEvent]} />
    );
}
