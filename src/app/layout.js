"use client";
import React from "react";
import { Inter } from "next/font/google";
import { ConvexReactClient } from "convex/react";
import ConvexClientProvider from "./ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
