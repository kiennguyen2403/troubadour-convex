import * as React from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { TouchableOpacity, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
      router.navigate("signin");
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
      {!pendingVerification && (
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
          <Text variant="titleLarge">Sign Up</Text>
          <View
            style={{
              width: "100%",
              padding: 10,
            }}
          >
            <TextInput
              mode="outlined"
              autoCapitalize="none"
              value={firstName}
              placeholder="First Name..."
              onChangeText={(firstName) => setFirstName(firstName)}
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
              autoCapitalize="none"
              value={lastName}
              placeholder="Last Name..."
              onChangeText={(lastName) => setLastName(lastName)}
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
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
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
            />
          </View>

          <Button
            style={{
              marginTop: 30,
              backgroundColor: "blue",
              width: "40%",
            }}
            icon="login"
            onPress={onSignUpPress}
            type="outlined"
          >
            Sign Up
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
              Already have an account?
            </Text>
            <Button
              onPress={() => {
                router.push("signin");
              }}
              type="text"
            >
              Sign In
            </Button>
          </View>
        </View>
      )}
      {pendingVerification && (
        <View
          style={{
            width: "100%",
            padding: 10,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity
            onPress={onPressVerify}
            style={{ alignItems: "center" }}
          >
            <Text>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
