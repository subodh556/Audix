import type { Metadata } from "next";
import "./globals.css";
import {Figtree} from "next/font/google"

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
        {children}
      </body>
    </html>
  );
}
