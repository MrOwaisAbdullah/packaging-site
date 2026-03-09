"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Category } from "@/lib/types";
import { Phone, Package, ChevronDown, ChevronRight } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

export default function MobileNav({ isOpen, onClose, categories }: MobileNavProps) {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-surface-overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div className="fixed inset-y-0 left-0 z-[55] w-full max-w-sm bg-bg-elevated shadow-xl">
        <div className="flex flex-col h-full pt-20">
          
          {/* Logo inside Drawer */}
          <div className="px-6 pb-6 pt-2 border-b border-border-subtle">
            <Link href="/" onClick={onClose} className="flex items-center gap-3 group">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-brand-primary to-brand-medium shadow-lg shadow-brand-primary/20 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white absolute transform group-hover:-translate-y-10 transition-transform duration-500 ease-in-out" />
                <span className="text-white font-bold text-xl sm:text-2xl leading-none absolute transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">N</span>
              </div>
              <span className="font-heading font-bold text-xl sm:text-2xl text-brand-primary tracking-tight">
                NextLevel<span className="text-brand-accent">.</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
            {/* Products with Sub-menu */}
            <div className="space-y-1">
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center justify-between w-full py-3 px-4 text-base font-semibold text-brand-primary hover:bg-bg-subtle rounded-xl transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-brand-accent" />
                  Products
                </span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isProductsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isProductsOpen ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="pl-12 pr-4 space-y-1 border-l-2 border-border-subtle ml-6">
                  <Link
                    href="/products"
                    onClick={onClose}
                    className="block py-2.5 px-4 text-sm font-bold text-brand-primary hover:text-brand-accent transition-colors"
                  >
                    View All Catalog
                  </Link>
                  {categories?.map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/products/${cat.slug}`}
                      onClick={onClose}
                      className="block py-2.5 px-4 text-sm font-medium text-text-secondary hover:text-brand-primary transition-colors flex items-center justify-between group"
                    >
                      {cat.name}
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/blog"
              onClick={onClose}
              className="block py-3 px-4 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-subtle rounded-lg transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              onClick={onClose}
              className="block py-3 px-4 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-subtle rounded-lg transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="block py-3 px-4 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-subtle rounded-lg transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Contact CTA */}
          <div className="px-4 py-6 mt-auto pb-8 border-t border-border-subtle">
            <a
              href="tel:+971500000000"
              className="group relative flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-brand-accent text-white hover:text-white rounded-full font-bold shadow-lg shadow-brand-accent/20 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer z-0" />
              <Phone className="w-5 h-5 relative z-10 text-white" />
              <span className="relative z-10 text-white text-lg">Call Us</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
