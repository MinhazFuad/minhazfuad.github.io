import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AnimatedBackground } from "@/components/AnimatedBackground"; // Restored
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Md Abdul Ahad Minhaz | Portfolio",
  description: "ML Researcher & Full Stack Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans min-h-screen relative overflow-x-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          
          {/* === RESTORED BACKGROUND (Tech Grid + Floating Shapes) === */}
          <AnimatedBackground />
          
          {children}
        </ThemeProvider>
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      </body>
    </html>
  );
}