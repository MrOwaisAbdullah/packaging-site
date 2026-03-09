"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { Phone, Menu, X, Package, ChevronDown } from "lucide-react";
import MobileNav from "./MobileNav";

import { Category } from "@/lib/types";

interface HeaderProps {
  categories: Category[];
}

export default function Header({ categories }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Scroll animation hooks
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const navItems = [
    { label: 'Products', href: '/products', hasDropdown: true },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[60] transition-all duration-500 pointer-events-none"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className={`container transition-all duration-500 ${isScrolled ? 'pt-4 max-w-6xl' : 'pt-0 max-w-full'}`}>
          <motion.div
              className={`relative flex items-center justify-between pointer-events-auto transition-all duration-500 ${
                isScrolled
                ? "h-16 sm:h-20 px-4 sm:px-6 lg:px-8 rounded-full border bg-white/80 backdrop-blur-xl border-border-subtle shadow-[0_8px_30px_rgb(0,0,0,0.06)] scale-[0.98] sm:scale-100"
                : "h-20 sm:h-24 px-4 sm:px-6 lg:px-8 rounded-none border-transparent bg-transparent shadow-none drop-shadow-none"
              }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group relative z-10 shrink-0">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-brand-primary to-brand-medium shadow-lg shadow-brand-primary/20 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white absolute transform group-hover:-translate-y-10 transition-transform duration-500 ease-in-out" />
                <span className="text-white font-bold text-xl sm:text-2xl leading-none absolute transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">N</span>
              </div>
              <span className="font-heading font-bold text-xl sm:text-2xl text-brand-primary tracking-tight hidden sm:block">
                NextLevel
                <span className="text-brand-accent">.</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center absolute inset-0 pointer-events-none">
              <div className={`flex space-x-1 p-1 rounded-full pointer-events-auto transition-all duration-500 ${isScrolled ? 'bg-bg-subtle/50 backdrop-blur-md border border-border-subtle/50' : 'bg-transparent border-transparent'}`}>
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    onMouseEnter={() => setActiveItem(item.label)}
                    onMouseLeave={() => setActiveItem(null)}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className="relative px-5 py-2.5 text-sm font-semibold rounded-full transition-colors z-10 flex items-center gap-1.5"
                    >
                      <span className={`relative z-10 transition-colors duration-300 ${activeItem === item.label ? 'text-white' : 'text-brand-primary'}`}>
                        {item.label}
                      </span>
                      {item.hasDropdown && (
                        <ChevronDown className={`w-4 h-4 relative z-10 transition-transform duration-300 ${activeItem === item.label ? 'text-white rotate-180' : 'text-brand-primary'}`} />
                      )}
                      {activeItem === item.label && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-brand-primary rounded-full -z-0 shadow-lg shadow-brand-primary/10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>

                    {/* Dropdown Menu */}
                    {item.hasDropdown && (
                      <AnimatePresence>
                        {activeItem === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[280px] pointer-events-auto z-50"
                          >
                            <div className="bg-white border border-border-subtle rounded-2xl shadow-2xl p-3 overflow-hidden shadow-brand-primary/10">
                              <div className="grid grid-cols-1 gap-1">
                                <Link
                                  href="/products"
                                  onClick={() => setActiveItem(null)}
                                  className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-brand-primary/5 transition-all duration-300"
                                >
                                  <span className="text-sm font-bold text-brand-primary">All Products</span>
                                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
                                </Link>
                                <div className="h-px bg-border-subtle mx-2 my-1" />
                                {(categories || []).map((cat) => (
                                  <Link
                                    key={cat._id}
                                    href={`/products/${cat.slug}`}
                                    onClick={() => setActiveItem(null)}
                                    className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-brand-primary/5 transition-all duration-300"
                                  >
                                    <span className="text-sm font-medium text-text-secondary group-hover:text-brand-primary group-hover:font-semibold transition-colors">{cat.name}</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {/* Right Actions & Mobile Toggle */}
            <div className="flex items-center gap-3 sm:gap-4 relative z-10 shrink-0 pointer-events-auto">
              {/* Phone CTA Button - Desktop only for space */}
              <a
                href="tel:+971500000000"
                className="hidden lg:flex group relative items-center justify-center gap-2 px-6 py-2.5 bg-brand-accent text-white hover:text-white rounded-full font-bold text-sm shadow-lg shadow-brand-accent/20 hover:shadow-xl hover:shadow-brand-accent/30 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer z-0" />
                <Phone className="w-4 h-4 relative z-10 text-white" />
                <span className="relative z-10 text-white">Call Us</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-bg-subtle/80 hover:bg-bg-subtle border border-border-subtle rounded-full text-brand-primary transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Navigation Dropdown */}
      <MobileNav 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        categories={categories}
      />
    </>
  );
}
