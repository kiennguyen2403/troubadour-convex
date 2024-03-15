"use client";
import { React, useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";
import ClippedDrawer from "@/app/components/header";
import VideoButton from "@/app/components/video-button";
// import { api } from "../../api/api";
import CustomVideo from "@/app/components/video";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useSelector } from "react-redux";
import { selectUserID } from "@/redux/auth-slice";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loading from "@/app/components/loading";
import useStoreUserEffect from "@/convex/useStoreUserEffect";
import CommentSection from "@/app/components/comment-section";
import { useUser } from "@clerk/clerk-react";

export default function ({ params }) {
  const { id } = params;
  const router = useRouter();
  const userId = useStoreUserEffect();

  const event = useQuery(api.event.getById, { id });

  const comments = useQuery(api.comment.getByEventID, { id });

  const isUserPurchaseTicket = useQuery(api.event.isUserPurchaseTicket, {
    eventID: id,
    userID: userId ?? "",
  });

  const player = (
    <CustomVideo playbackId={event?.playbackID} title={event?.name || ""} description={event?.description || ""} />
  );

  const commentSection = <CommentSection eventId={id} userId={userId} comments={comments} />;

  const dialog = (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"You have not purchased a ticket for this event."}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This event is only available to ticket holders.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            router.push("/");
          }}
        >
          Back to Home
        </Button>
        <Button
          onClick={() => {
            router.push("/event/" + id);
          }}
        >
          Purchase Ticket
        </Button>
      </DialogActions>
    </Dialog>
  );

  if (!userId || isUserPurchaseTicket === undefined) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", height: "100vh", alignItems: "center" }}
      >
        <Loading />
      </div>
    );
  } else if (!isUserPurchaseTicket) {
    return <ClippedDrawer Component={[player, commentSection, dialog]} />;
  } else {
    return <ClippedDrawer Component={[player, commentSection]} />;
  }
}
