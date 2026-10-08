"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Terminal, 
  FileCode2, 
  BookOpen, 
  User, 
  Code2, 
  Layers, 
  ExternalLink 
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: Terminal },
  { name: "Projects", href: "/projects", icon: FileCode2 },
  { name: "DSA Tracker", href: "/dsa", icon: Code2 },
  { name: "CodeCrafters", href: "/codecrafters", icon: Layers },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "About", href: "/about", icon: User },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/40 bg-background/80 backdrop-blur-xl shadow-sm"
          : "bg-background/40 backdrop-blur-md"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500/20 via-primary/10 to-indigo-500/20 border border-primary/20 flex items-center justify-center font-mono font-bold text-base text-primary group-hover:border-primary/50 group-hover:scale-105 transition-all duration-200">
            H
          </div>
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight text-sm text-foreground flex items-center gap-1.5">
              Hemant
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Available for opportunities" />
            </span>
            <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline-block">
              final year cs
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-secondary/30 border border-border/40 rounded-full px-3 py-1.5 backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200",
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-secondary border border-border/80 rounded-full shadow-xs"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Actions / Right */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/bhandehemant2004-debug"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors hidden sm:flex items-center justify-center"
            aria-label="GitHub profile"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors hidden sm:flex items-center justify-center"
            aria-label="LinkedIn profile"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg md:hidden text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border/60 bg-background/95 backdrop-blur-xl px-4 py-4 space-y-1"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-secondary text-foreground font-semibold border border-border/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="pt-3 mt-2 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground px-2">
              <span>Connect</span>
              <div className="flex gap-3">
                <a
                  href="https://github.com/bhandehemant2004-debug"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground flex items-center gap-1"
                >
                  GitHub <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground flex items-center gap-1"
                >
                  LinkedIn <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
