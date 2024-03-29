"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarMonth, Image, LockClock, Room } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { useAction, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import ClippedDrawer from "@/app/components/header";
import { useSelector } from "react-redux";
import { selectUserID } from "@/redux/auth-slice";
import useStoreUserEffect from "@/convex/useStoreUserEffect";
import { LoadingButton } from '@mui/lab';



export default function Event({ params }) {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = params;
  // const userId = useSelector(selectUserID);
  const userId = useStoreUserEffect();
  console.log("userId:" + userId);
  const isUserPurchase = useQuery(api.event.isUserPurchaseTicket, {
    eventID: id ?? "",
    userID: userId ?? "jd7287bzyqv5smd4365qdfv6e56n1ahd",
  });

  console.log("isUserPurchase:" + isUserPurchase);
  const buyTicket = useAction(api.eventActions.buyTicket);
  const event = useQuery(api.event.getById, { id });

  const noEvent = (
    <Box>
      <Stack
        spacing={2}
        direction="column"
        sx={{
          marginTop: "20%",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          textAlign={"center"}
          style={{ float: "left" }}
        >
          Event not found or deleted
        </Typography>

        <Box
          textAlign="center"
          width="100%"
          gutterBottom
          marginTop="5%"
          marginBottom="5%"
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => router.push("/")}
          >
            Back to homes
          </Button>
        </Box>
      </Stack>
    </Box>
  );

  const Event = (
    <Box>
      <Stack spacing={5}>
        <Stack spacing={2}>
          <Image
            style={{
              borderRadius: "10px",
            }}
          />
          <Typography variant="h3">{event?.name}</Typography>

        </Stack>
        <Divider />
        <Stack spacing={50} direction="row">
          <Stack spacing={2}>
            <Stack spacing={2}>
              <Typography variant="h5">Date and time</Typography>
              <Stack spacing={1} direction="row">
                <CalendarMonth />
                <Typography variant="body1"> {event?.date}</Typography>
              </Stack>

              <Stack spacing={1} direction="row">
                <LockClock />
                <Typography variant="body1">
                  {event?.duration || "N/A"}{" "}
                </Typography>
              </Stack>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="h5">Location</Typography>
              <Stack spacing={1} direction="row">
                <Room />
                <Typography variant="body1"> {event?.location}</Typography>
              </Stack>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="h5">About this event</Typography>
              <Typography variant="body2">
                {event?.description}
              </Typography>
              <Stack spacing={1} direction="row">
                {event?.genre.map((item) => {
                  return <Chip label={"#" + item} />;
                })}
              </Stack>
            </Stack>
          </Stack>
          <Box
            sx={{
              width: "30%",
            }}
          >
            <Card sx={{
              marginLeft: "auto",
              position: "sticky",
            }}>
              <CardContent>
                <Typography variant="h5">Tickets</Typography>
                <Typography variant="body1">{"$ " + event?.fee ?? "10"}</Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "2%",
                }}
              >
                {!isUserPurchase ? (
                  <LoadingButton
                    loading={isLoading}
                    sx={{
                      width: "100%",
                    }}
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                      try {
                        setIsLoading(true);
                        const paymentUrl = await buyTicket({ id: id, user: userId });
                        console.log(paymentUrl);
                        setIsLoading(false);
                        window.location.href = paymentUrl;
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                  >
                    Purchase ticket
                  </LoadingButton>
                ) : (
                  <Button
                    sx={{
                      width: "100%",
                    }}
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                      router.push("/video/" + event._id);
                    }}
                  >
                    View event
                  </Button>
                )}
              </CardActions>
            </Card>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );

  return <ClippedDrawer Component={event ? [Event] : [noEvent]} />;
}
