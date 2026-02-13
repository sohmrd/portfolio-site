import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { LightboxProvider } from "@/components/ui/lightbox";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sohm Dubey | Creative Technologist",
  description:
    "Portfolio of Sohm Dubey. Georgia Tech senior building at the intersection of industrial design and computer science.",
  openGraph: {
    title: "Sohm Dubey | Creative Technologist",
    description:
      "Building at the intersection of industrial design and computer science.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <LightboxProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </LightboxProvider>
      </body>
    </html>
  );
}
