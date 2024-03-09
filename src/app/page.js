"use client";
import React from "react";
import { SignInButton, UserButton, auth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import useStoreUserEffect from "../useStoreUserEffect";
import { SignIn } from "@clerk/clerk-react";

export default function Home() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const userId = useStoreUserEffect();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <div>
          <SignInButton></SignInButton>
        </div>
      )}
    </div>
  );
}

