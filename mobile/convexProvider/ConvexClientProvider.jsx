import { ConvexReactClient } from "convex/react";
import { dark } from "@clerk/themes";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

const convex = new ConvexReactClient(
  "https://industrious-minnow-226.convex.cloud",
  {
    unsavedChangesWarning: false,
  }
);

function ConvexClientProvider({ children }) {
  return (
    <ClerkProvider
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
      publishableKey="pk_test_Z29yZ2VvdXMtcmVwdGlsZS05MS5jbGVyay5hY2NvdW50cy5kZXYk"
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default ConvexClientProvider;
