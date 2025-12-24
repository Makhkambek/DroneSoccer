import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="font-inter">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
