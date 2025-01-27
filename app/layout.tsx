import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import SessionWrapper from "@/components/SessionWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QueryProvider from "@/components/QueryProvider";

const font = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Checkmap",
    template: "%s · Checkmap",
  },
  description: "Create interactive checkpoint crawl maps",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          />
        </head>
        <body className={`${font.className} antialiased`}>
          <QueryProvider>{children}</QueryProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
