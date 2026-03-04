
import type { Metadata } from "next";
// import { Inter } from "next/font/google"; // এটি সাময়িকভাবে বন্ধ করে দিলাম
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

// const inter = Inter({ subsets: ["latin"] }); // এটিও বন্ধ থাকবে

export const metadata: Metadata = {
  title: "Nagarik Seba- One Stop Solution",
  description: "Get all your Nagarik Seba at one place. Fast, reliable, and secure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      {/* inter.className সরিয়ে শুধু সাধারণ body রাখা হলো */}
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}