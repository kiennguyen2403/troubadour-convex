import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useAction, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

import { Box, Typography, Button } from "@mui/material";

export default function Event() {
    const router = useRouter();
    const { id } = router.query;
    const event = useQuery(api.event.get, { id });

    return (
        <Box>
            <Typography variant="h1">{event.name}</Typography>
            <Typography variant="body1">{event.description}</Typography>
            <Button variant="contained" color="primary"
                onClick={() => {
                    useAction(api.muxAction.buyTicket, { id });
                }}>RSVP</Button>
        </Box>
    );
}
