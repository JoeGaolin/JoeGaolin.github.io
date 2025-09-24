import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Whispers Cottage",
  description: "心语小屋",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  );
}
