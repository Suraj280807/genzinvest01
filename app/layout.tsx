
import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import ChatBot from "@/components/ChatBot";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { GamificationProvider } from "@/context/GamificationContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "GenZ Mutual Fund Adviser",
  description: "The ultimate platform for GenZ investors. Live news, insights, and more.",
};

import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${orbitron.variable} antialiased bg-background text-foreground transition-colors duration-300`} suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            <GamificationProvider>
              {children}
              <Footer />
              <ChatBot />
            </GamificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
