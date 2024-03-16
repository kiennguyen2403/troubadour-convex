import { useAuth } from "@clerk/clerk-expo";
import React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Navigator, router } from "expo-router";

function UserButton() {
  const user = useAuth();
  console.log(user);
  return (
    <>
      {user.isSignedIn ? (
        <></>
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
