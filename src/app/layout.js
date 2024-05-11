import { Inter } from "next/font/google";
import "./globals.css";
import GlobalState from "@/context";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "تهاني السعيدي",
  description: "متجر تهاني السعيدي",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <GlobalState>
          <Navbar />
          <main className="flex flex-col min-h-screen mt-28">{children}</main>
        </GlobalState>
      </body>
    </html>
  );
}
