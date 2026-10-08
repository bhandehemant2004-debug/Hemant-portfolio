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
    default: "Hemant Bhande — Software Developer & IT Undergraduate (2027)",
    template: "%s | Hemant Bhande",
  },
  description:
    "Portfolio of Hemant Bhande, B.Tech in Information Technology (Graduating 2027) at SGGS IE&T Nanded. Experienced in backend development, distributed systems, concurrency, and full-stack web applications.",
  keywords: [
    "Hemant Bhande",
    "Hemant",
    "Software Developer",
    "Backend Developer",
    "Information Technology",
    "SGGS IE&T Nanded",
    "Spring Boot",
    "Go",
    "Java",
    "Distributed Systems",
    "LeetCode",
    "Redis",
  ],
  authors: [{ name: "Hemant Bhande", url: "https://github.com/bhandehemant2004-debug" }],
  creator: "Hemant Bhande",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hemant.dev",
    title: "Hemant Bhande — Developer Portfolio",
    description:
      "B.Tech Information Technology undergraduate (Graduating 2027) at SGGS IE&T Nanded. Focused on backend engineering, distributed systems, and DSA.",
    siteName: "Hemant Bhande Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hemant Bhande — Developer Portfolio",
    description: "B.Tech IT student (Graduating 2027) at SGGS IE&T Nanded passionate about backend systems.",
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
