import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./globalicon.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons:{
    icon: '/favicon.ico'
  },
  title: "Mochi: Japanese AI Analyzer",
  description: "Analyze Japanese Texts with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     
      <body className={inter.className}>{children}</body>
    </html>
  );
}
