"use client";
import React from "react";
import { Inter } from "next/font/google";
import ConvexClientProvider from "../convex/ConvexClientProvider";
import ThemeProviderWrapper from "../theme/theme-provider-wrapper";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ReduxProviderWrapper from "../redux/reduxProvider";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Troubadour</title>
      </head>
      <body
        className={inter.className}
        style={{
          background: "linear-gradient(to right, #434343 0%, black 100%)",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <ThemeProviderWrapper options={{ key: "mui-theme" }}>
          <AppRouterCacheProvider>
            <ReduxProviderWrapper>
              <ConvexClientProvider>{children}</ConvexClientProvider>
            </ReduxProviderWrapper>
          </AppRouterCacheProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
