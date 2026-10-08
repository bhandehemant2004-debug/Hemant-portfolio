import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Hemant — Software Engineer & Backend Enthusiast",
    template: "%s | Hemant",
  },
  description:
    "Personal portfolio of Hemant, final year undergraduate CS student specializing in distributed systems, backend infrastructure, Go, Java, and DSA.",
  keywords: [
    "Hemant",
    "Software Engineer",
    "Backend Developer",
    "Distributed Systems",
    "Go",
    "Golang",
    "Java",
    "CodeCrafters",
    "LeetCode",
    "Next.js Portfolio",
  ],
  authors: [{ name: "Hemant", url: "https://github.com/bhandehemant2004-debug" }],
  creator: "Hemant",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hemant.dev",
    title: "Hemant — Software Engineer Portfolio",
    description:
      "Final year undergraduate CS student specializing in distributed systems, backend infrastructure, and DSA.",
    siteName: "Hemant's Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hemant — Software Engineer",
    description: "Final year CS student passionate about distributed systems and backend infrastructure.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen bg-background text-foreground antialiased flex flex-col selection:bg-emerald-500/20 selection:text-emerald-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Subtle background glow effect */}
          <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-indigo-500/10 via-emerald-500/10 to-transparent blur-[120px] rounded-full opacity-60" />
            <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-violet-500/5 via-sky-500/5 to-transparent blur-[140px] rounded-full opacity-40" />
          </div>

          <Navbar />
          <main className="flex-1 w-full flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
