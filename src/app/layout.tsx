import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import TanstackProvider from "@/components/providers/TanstackProvider";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchIngredients } from "@/services/ingredientService";
import { fetchUnits } from "@/services/unitService";
import { getUser } from "@/services/authService";

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
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["ingredients"],
    queryFn: fetchIngredients,
  });

  await queryClient.prefetchQuery({
    queryKey: ["units"],
    queryFn: fetchUnits,
  });

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <TanstackProvider>
          <HydrationBoundary state={dehydratedState}>
            {children}
          </HydrationBoundary>
        </TanstackProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
