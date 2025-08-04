import { Red_Hat_Text } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cartContext";

const redHatText = Red_Hat_Text({
  variable: "--font-red-hat-text",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Frontend Mentor | Product List With Cart",
  description: "Frontend Mentor | Product List With Cart",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${redHatText.variable} antialiased font-sans`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
