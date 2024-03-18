import React from "react";
import { Button, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const SignOut = ({ image }) => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => signOut()}>
        <Image src={image} style={styles.image}></Image>
        {/* <Text style={styles.text}>Sign Out</Text> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 20,
    marginLeft: 5,
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
    resizeMode: "cover",
    borderRadius: 50,
  },
});

export default SignOut;
