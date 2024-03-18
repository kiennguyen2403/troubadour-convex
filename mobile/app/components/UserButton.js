import { useAuth, useUser } from "@clerk/clerk-expo";
import React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Navigator, router } from "expo-router";
import { useConvexAuth } from "convex/react";
import SignOut from "./signOutButton";

function UserButton() {
  const user = useConvexAuth();
  const userDetails = useUser();
  console.log(userDetails);
  return (
    <>
      {userDetails.isSignedIn ? (
        <SignOut image={userDetails.imageUrl}></SignOut>
      ) : (
        <MaterialIcons
          size={28}
          name="account-circle"
          color="white"
          onPress={() => {
            router.navigate("signin");
          }}
        />
      )}
    </>
  );
}

export default UserButton;
