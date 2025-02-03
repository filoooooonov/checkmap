import { Header } from "@/components/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Create interactive checkpoint crawl maps",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-background`}>
        <Header />
        <div id="root-layout">{children}</div>
      </body>
    </html>
  );
}
