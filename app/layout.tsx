import type { Metadata } from "next";
import "./globals.css";
import {Figtree} from "next/font/google"
import Sidebar from "@/components/Sidebar";

const inter = Figtree({subsets: ['latin']})



export const metadata: Metadata = {
  title: "Audix",
  description: "Listen to music!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar>
          {children}
        </Sidebar>
      </body>
    </html>
  );
}
