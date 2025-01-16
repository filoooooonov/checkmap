import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header";

const font = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Checkmap",
  description: "Create interactive checkpoint crawl maps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
        />
      </head>
      <body className={`${font.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
