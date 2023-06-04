import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers/Providers";
import Header from "@/components/header/Header";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_HOST_URL as string),
  alternates: {
    canonical: "/",
  },
  title: "Money rewards between users in organization",
  description:
    "We offer our service of money transfer from the account to the account of any employee for the award. Quick and convenient international money transfers without commission. You can send an award to a distinguished employee right now",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
