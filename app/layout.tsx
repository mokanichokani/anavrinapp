import type { Metadata } from "next";
import "./globals.css";
import AnimatedNavbar from "@/components/Navbar";
import { LenisProvider } from "@/components/LenisProvider";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Anavrin Stays",
  description: "Find Your Perfect Stay with Anavrin Stays",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lenis">
      <body
        className="antialiased helvetica-font lenis"
        style={{
          fontFamily: 'HelveticaNeueRoman, "Helvetica Neue", Helvetica, Arial, sans-serif'
        }}
      >
        <LenisProvider>
          <AnimatedNavbar />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
