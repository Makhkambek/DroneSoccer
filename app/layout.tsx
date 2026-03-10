import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: '--font-orbitron',
  weight: ['400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: "Drone Soccer - Professional Team & Training",
  description: "Join the future of competitive drone sports. Professional drone soccer team offering training in Class 40, Class 20, and Drone Racing.",
  keywords: ["drone soccer", "drone racing", "drone sports", "fpv drones", "competitive drones"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DroneSoccer",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <head>
        <meta name="theme-color" content="#0066CC" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="font-inter">
        <Providers>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
