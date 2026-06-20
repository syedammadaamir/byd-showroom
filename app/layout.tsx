import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BYD Pakistan | Build Your Dreams",
  description: "Official BYD Electric Vehicles Pakistan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
