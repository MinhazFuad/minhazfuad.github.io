import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Showcase of my work",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans min-h-screen relative overflow-x-hidden bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          
          {/* BACKGROUND BLOBS - Optimized for Mobile */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Purple Blob - Top Left */}
            <div className="absolute -top-10 -left-10 md:top-0 md:left-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] md:blur-[128px] opacity-40 dark:opacity-20 animate-blob"></div>
            
            {/* Pink Blob - Top Right */}
            <div className="absolute top-20 -right-10 md:top-0 md:right-1/4 w-64 h-64 md:w-96 md:h-96 bg-pink-400 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] md:blur-[128px] opacity-40 dark:opacity-20 animate-blob animation-delay-2000"></div>
            
            {/* Blue Blob - Bottom Center */}
            <div className="absolute -bottom-10 left-10 md:-bottom-32 md:left-1/3 w-64 h-64 md:w-96 md:h-96 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] md:blur-[128px] opacity-40 dark:opacity-20 animate-blob animation-delay-4000"></div>
          </div>
          
          {children}
        </ThemeProvider>
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      </body>
    </html>
  );
}