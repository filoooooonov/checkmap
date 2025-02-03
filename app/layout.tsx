import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Red_Hat_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import QueryProvider from "@/components/QueryProvider";
import { Header } from "@/components/header";
import { IEvent } from "@/models/event";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Checkmap",
    template: "%s · Checkmap",
  },
  description: "Create interactive checkpoint crawl maps",
};

export default function RootLayout({
  children,
  eventData,
}: Readonly<{
  children: React.ReactNode;
  eventData: IEvent;
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
        <body className={`${inter.className} antialiased bg-background`}>
          <QueryProvider>
            <Header eventData={eventData} />
            {children}
          </QueryProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
