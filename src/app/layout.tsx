import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import TanstackProvider from "@/components/providers/TanstackProvider";
import { getUser } from "@/services/userService";
import { UserProvider } from "@/context/UserContext";

const poppins = Poppins({
  weight: ["100", "300", "400"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Planutri | Plan your meals and fill your pantry",
  description: "Plan your meals and fill your larder",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <TanstackProvider>
          <UserProvider fetchedUser={user}>{children}</UserProvider>
        </TanstackProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
