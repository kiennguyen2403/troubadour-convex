import React from "react";
import { Button, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const SignOut = ({ image }) => {
  const { isLoaded, signOut } = useAuth();
  console.log(image);
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => signOut()}>
        {/* <Image source={image} style={styles.image} /> */}
        <Text style={styles.text}>Sign Out</Text>
      </TouchableOpacity>
      {/* <MaterialIcons
        size={28}
        name="account-circle"
        color="white"
        image={image}
        onPress={() => {
          signOut();
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "blue", // Example color, you can change this
    paddingVertical: 10, // Adjust the vertical padding to make the button smaller
    paddingHorizontal: 5, // Adjust the horizontal padding to make the button smaller
    borderRadius: 20,
    marginLeft: 5, // Adjust the borderRadius to make the button rounded
  },
  text: {
    color: "#fff",
    fontSize: 7, // Adjust the font size to fit the smaller button
    fontWeight: "bold",
    marginLeft: 1, // Adjust as needed for spacing between image and text
  },
  image: {
    width: 20, // Adjust as needed
    height: 20, // Adjust as needed
    resizeMode: "contain",
  },
});

export default SignOut;
