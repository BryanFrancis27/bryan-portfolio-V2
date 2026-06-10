import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BryanOS - Artificial Intelligence Operating System",
  description:
    "Artificial Intelligence Operating System portfolio for Bryan Encarnacion, Software Engineer, Full Stack Developer, and Product Builder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
