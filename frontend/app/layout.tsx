import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MD Converter | Convert PDF, Word, PPT to Markdown",
  description: "Convert PDF, Word (DOCX), and PowerPoint (PPTX) files into clean Markdown instantly without signing up.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="max-w-[1000px] mx-auto p-6 mt-10">
          {children}
        </main>
      </body>
    </html>
  );
}
