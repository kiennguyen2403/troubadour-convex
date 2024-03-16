import * as React from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { TouchableOpacity, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp();

    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [pendingVerification, setPendingVerification] = React.useState(false);
    const [code, setCode] = React.useState("");

    // start the sign up process.
    const onSignUpPress = async () => {
        if (!isLoaded) {
            return;
        }

        try {
            await signUp.create({
                firstName,
                lastName,
                emailAddress,
                password,
            });

            // send the email.
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            // change the UI to our pending section.
            setPendingVerification(true);
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    // This verifies the user using email code that is delivered.
    const onPressVerify = async () => {
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            await setActive({ session: completeSignUp.createdSessionId });
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <View style={{
            margin: "auto",
            width: "100%",
            height: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black"
        }}>
            {!pendingVerification && (
                <View style={{
                    margin: "auto",
                    width: "100%",
                    height: "100%",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "black"
                }}>
                    <Text variant="titleLarge">
                        Sign Up
                    </Text>
                    <View style={{
                        width: "100%",
                        padding: 10
                    }}>
                        <TextInput
                            mode="outlined"
                            autoCapitalize="none"
                            value={firstName}
                            placeholder="First Name..."
                            onChangeText={(firstName) => setFirstName(firstName)}
                        />
                    </View>
                    <View style={{
                        width: "100%",
                        padding: 10
                    }}>
                        <TextInput
                            mode="outlined"
                            autoCapitalize="none"
                            value={lastName}
                            placeholder="Last Name..."
                            onChangeText={(lastName) => setLastName(lastName)}
                        />
                    </View>
                    <View style={{
                        width: "100%",
                        padding: 10
                    }}>
                        <TextInput
                            mode="outlined"
                            autoCapitalize="none"
                            value={emailAddress}
                            placeholder="Email..."
                            onChangeText={(email) => setEmailAddress(email)}
                        />
                    </View>

                    <View style={{
                        width: "100%",
                        padding: 10
                    }}>
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
                        type="outlined">
                        Sign Up
                    </Button>

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 20
                    }}>
                        <Text style={{
                            color: "white",
                        }}>
                            Already have an account?
                        </Text>
                        <Button
                            onPress={() => {
                                router.push('signin');
                            }}
                            type="text">
                            Sign In
                        </Button>
                    </View>


                </View>
            )}
            {pendingVerification && (
                <View>
                    <View>
                        <TextInput
                            value={code}
                            placeholder="Code..."
                            onChangeText={(code) => setCode(code)}
                        />
                    </View>
                    <TouchableOpacity onPress={onPressVerify}>
                        <Text>Verify Email</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}