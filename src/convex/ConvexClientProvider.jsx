import React, { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { dark } from "@clerk/themes";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

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
