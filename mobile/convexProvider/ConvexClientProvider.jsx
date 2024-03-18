import { ConvexReactClient } from "convex/react";
import { dark } from "@clerk/themes";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import useStoreUserEffect from "../clerk/useStoreUserEffect";

import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const convex = new ConvexReactClient(
  "https://honorable-dolphin-640.convex.cloud",
  {
    unsavedChangesWarning: false,
  }
);

function ConvexClientProvider({ children }) {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#90caf9",
        },
        elements: {
          userButtonPopoverCard: {
            boxShadow: "0px 0px 10px 0px #000000",
          },
        },
      }}
      publishableKey="pk_test_dHJ1c3RlZC1tYXJtb3NldC04My5jbGVyay5hY2NvdW50cy5kZXYk"
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default ConvexClientProvider;
