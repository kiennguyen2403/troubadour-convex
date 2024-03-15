"use client";
import { Stack } from "@mui/material";
import { SignIn } from "@clerk/clerk-react";
import useStoreUserEffect from "@/convex/useStoreUserEffect";

export default function Page() {
  return (
    <Stack alignItems="center" justifyContent="center" minHeight="100vh">
      <SignIn />
    </Stack>
  );
}
