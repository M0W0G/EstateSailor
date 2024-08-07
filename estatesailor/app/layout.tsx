"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar";
import {AuthProvider} from "@/context/authContext";


const inter = Inter({ subsets: ["latin"] });

interface User {
  id: string;
  email: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="background-container">
          <div className="overlay"></div>
          <div className="content">
            <AuthProvider>
              <Navbar />
              <main>{children}</main>
            </AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}