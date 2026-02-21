import type { Metadata } from "next";
import { Geist, Geist_Mono, Lusitana } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lusitana = Lusitana({
  variable: "--font-lusitana",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "In-N-Out Nutrition",
  description: "In-N-Out Nutrition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lusitana.variable} antialiased bg-zinc-950 text-zinc-100`}
      >
        <div className="min-h-screen flex flex-col">
          <main className="py-8 flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
