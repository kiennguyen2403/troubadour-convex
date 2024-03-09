"use client";
import React from "react";
import { Inter } from "next/font/google";
import { ConvexReactClient } from "convex/react";
import ConvexClientProvider from "./ConvexClientProvider";
import ThemeProviderWrapper from "../theme/theme-provider-wrapper";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ReduxProviderWrapper from "../redux/reduxProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
