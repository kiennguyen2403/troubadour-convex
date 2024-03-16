import React from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { TouchableOpacity, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View
      style={{
        margin: "auto",
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Text variant="titleLarge">Sign In</Text>

      <View
        style={{
          width: "100%",
          padding: 10,
        }}
      >
        <TextInput
          mode="outlined"
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          right={<TextInput.Affix text="@example.com" />}
          style={{
            width: "100%",
          }}
        />
      </View>

      <View
        style={{
          width: "100%",
          padding: 10,
        }}
      >
        <TextInput
          mode="outlined"
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          right={<TextInput.Icon icon="eye" />}
        />
      </View>

      <Button
        style={{
          marginTop: 30,
          backgroundColor: "blue",
          width: "40%",
        }}
        icon="login"
        onPress={onSignInPress}
        type="outlined"
      >
        Sign In
      </Button>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          Don't have an account?
        </Text>
        <Button
          onPress={() => {
            router.push("signup");
          }}
          type="text"
        >
          Sign Up
        </Button>
      </View>
    </View>
  );
}
