import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multi Speak | Build by pravakar",
  description:
    "Multi Speak: AI-Powered Translation Services for Global Communication,  Build by pravakar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <script src="./node_modules/preline/dist/preline.js"></script> */}

      <body className={inter.className}>{children}</body>
    </html>
  );
}
