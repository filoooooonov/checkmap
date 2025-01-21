import type { Metadata } from "next";

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
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
