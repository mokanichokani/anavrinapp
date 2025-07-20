import type { Metadata } from "next";
import "./globals.css";
import AnimatedNavbar from "@/components/Navbar";

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
    <html lang="en">
      <body
        className="antialiased helvetica-font"
        style={{
          fontFamily: 'HelveticaNeueRoman, "Helvetica Neue", Helvetica, Arial, sans-serif'
        }}
      >
        <AnimatedNavbar />
        {children}
      </body>
    </html>
  );
}
