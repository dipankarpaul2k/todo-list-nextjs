import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo List App | Next JS",
  description: "A simple todo list app built with Next JS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-200`}>
        <div className="min-h-screen flex flex-col container mx-auto ">
          <Navbar />
          <main className="flex-1 p-4 ">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
