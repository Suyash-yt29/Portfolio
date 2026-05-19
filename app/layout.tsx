import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Import our new premium components
import SmoothScroll from "../components/animations/SmoothScroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mayank Vispute | Software Engineer",
  description: "Innovative Computer Engineering undergraduate specializing in full-stack development and AI-driven systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      {/* CRITICAL FIX: Changed overflow-x-hidden to overflow-x-clip. 
        This prevents side-scrolling but ALLOWS our sticky project gallery to work! 
      */}
      <body className={`${inter.className} min-h-screen bg-black text-white antialiased overflow-x-clip selection:bg-purple-500 selection:text-white`}>
        <SmoothScroll>
          
          {/* CRITICAL FIX: Removed overflow-hidden from this main tag entirely */}
          <main className="relative flex flex-col w-full">
            {children}
          </main>
          
        </SmoothScroll>
      </body>
    </html>
  );
}