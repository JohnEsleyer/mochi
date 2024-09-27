import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import "./globalicon.css";
import { Fredoka } from 'next/font/google';


const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '700', '700'], // Add weights you want to use
});

export const metadata: Metadata = {
  icons:{
    icon: '/favicon.ico'
  },
  title: "Mochi: Japanese AI Analyzer",
  description: "Analyze and chat Japanese Texts with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     
      <body className={fredoka.className}>{children}</body>
    </html>
  );
}
