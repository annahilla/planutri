import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import StoreProvider from "../components/providers/StoreProvider";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../components/providers/AuthProvider";
import TanstackProvider from "@/components/providers/TanstackProvider";

const poppins = Poppins({
  weight: ["100", "300", "400"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Planutri | Plan your meals and fill your pantry",
  description: "Plan your meals and fill your larder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <StoreProvider>
          <TanstackProvider>
            <AuthProvider>{children}</AuthProvider>
          </TanstackProvider>
        </StoreProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
