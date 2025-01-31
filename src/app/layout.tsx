import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const poppins = Poppins({
  weight: ["100", "300", "400"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Plantry | Plan your meals and fill your pantry",
  description: "Plan your meals and fill your pantry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
