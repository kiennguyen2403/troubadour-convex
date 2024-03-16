import { Stack } from "expo-router/stack";
import ConvexClientProvider from "../convexProvider/ConvexClientProvider";
import { View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "./theme/theme";
import { router } from "expo-router";
import useStoreUserEffect from "../clerk/useStoreUserEffect";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux/store";
import UserButton from "./components/UserButton";
export default function AppLayout() {
  return (
    <ReduxProvider store={store}>
      <ConvexClientProvider>
        <PaperProvider theme={theme}>
          <Stack
            screenOptions={{
              statusBarTranslucent: true,
              statusBarAnimation: "fade",
              headerTitle: "Troubadour",
              headerStyle: {
                backgroundColor: "black",
                opacity: 0.6,
              },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen name="signin" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen
              name="(tabs)"
              options={{
                headerTitle: "Troubadour",
                headerRight: () => (
                  <View
                    style={{
                      marginLeft: "auto",
                      width: 70,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <MaterialIcons
                        size={28}
                        name="video-call"
                        color="white"
                        onPress={() => {
                          router.navigate("/stream");
                        }}
                      />
                      {/* <{user ? (
                        <></>
                      ) : (
                        <MaterialIcons
                          size={28}
                          name="account-circle"
                          color="white"
                          onPress={() => {
                            router.push("signin");
                          }}
                        />
                      )}> */}
                      <UserButton></UserButton>
                    </View>
                  </View>
                ),
              }}
            />
          </Stack>
        </PaperProvider>
      </ConvexClientProvider>
    </ReduxProvider>
  );
}
