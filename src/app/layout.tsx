import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "./AuthProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portal Cambaí",
  description: "Portal de informações comerciais",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="h-full">
      <body className={`h-full bg-gray-900 text-gray-100 ${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
