import type { Metadata } from "next";
import "./globals.css";
import { AuthProviders } from "@/lib/auth-provider";
import { geistSans, geistMono } from "@/lib/fonts";

// Fonts are provided via alias to either google or offline variants

export const metadata: Metadata = {
  title: "Twitter Monitoring Platform",
  description: "Personal Twitter Monitoring Platform - A clean, focused dashboard for monitoring specific Twitter accounts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProviders>
          {children}
        </AuthProviders>
      </body>
    </html>
  );
}
