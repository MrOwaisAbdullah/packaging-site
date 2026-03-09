"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Package, Shield, Truck, Film, Box, PenTool } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-4 pb-32 lg:pt-8 lg:pb-40">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-bg-base" />
        {/* Subtle mesh gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] transform -translate-x-1/3 translate-y-1/3" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="container relative z-10 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (Text & CTAs) */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
          >
            {/* Badge */}
            <motion.div variants={item} className="mb-6 flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/5 text-brand-primary text-sm font-bold border border-brand-primary/10 shadow-sm uppercase tracking-wider pr-4">
                <span className="relative flex h-2.5 w-2.5 ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-accent"></span>
                </span>
                UAE's Premier Packaging Supplier
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={item}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-primary mb-8 leading-[1.1]"
            >
              Elevate Your Brand with <span className="text-gradient">Premium Packaging</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={item}
              className="text-xl text-text-secondary mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Direct access to high-quality corrugated boxes, stretch films, and custom supplies across Dubai, Sharjah, and Ajman.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-16">
              <Link
                href="/products"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary text-white hover:text-white rounded-xl font-bold text-lg shadow-xl shadow-brand-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
                <span>Browse Catalog</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-primary hover:text-brand-primary border-2 border-border-medium rounded-xl font-bold text-lg shadow-sm hover:bg-bg-subtle hover:border-brand-primary/30 transition-all duration-300 w-full sm:w-auto"
              >
                Get Instant Quote
              </Link>
            </motion.div>

            {/* Trust Value Props */}
            <motion.div 
              variants={container}
              className="inline-flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6"
            >
              {[
                { icon: Truck, title: "Same Day Delivery" },
                { icon: Shield, title: "ISO Certified Quality" },
                { icon: Package, title: "Wholesale MOQ" }
              ].map((feature, i) => (
                <motion.div 
                  key={i} 
                  variants={item}
                  className="flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-border-subtle/50 px-4 py-2.5 rounded-full shadow-sm"
                >
                  <div className="text-brand-accent">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-sm text-brand-primary">{feature.title}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column (Visual Bento Grid) */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="hidden lg:grid grid-cols-2 grid-rows-2 gap-4 h-[600px] relative"
          >
            {/* Main Feature - Premium Packaging */}
            <motion.div variants={item} className="col-span-1 row-span-2 relative group overflow-hidden rounded-3xl bg-brand-primary border border-border-subtle shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-500">
               {/* Image Background */}
               <div className="absolute inset-0 z-0 overflow-hidden">
                 <Image 
                   src="/images/hero-boxes.png" 
                   alt="Premium Packaging Solutions" 
                   fill 
                   className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                   priority
                 />
                 {/* Dark overlay for text readability */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/90 via-[#0A2540]/30 to-transparent mix-blend-multiply" />
               </div>

               <div className="p-8 h-full flex flex-col justify-between relative z-10">
                 <div className="bg-white/10 backdrop-blur-md border border-white/20 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md mb-6 group-hover:scale-110 transition-transform duration-500">
                   <Box className="w-7 h-7 text-white" />
                 </div>
                 <div className="mt-8">
                   <h3 className="text-2xl font-bold text-white mb-2 shadow-sm">Premium Packaging</h3>
                   <p className="text-white/80 font-medium">Heavy-duty protection mapping your industrial needs.</p>
                 </div>
               </div>
            </motion.div>

            {/* Special Feature 1 - Stretch Films */}
            <motion.div variants={item} className="col-span-1 row-span-1 relative group overflow-hidden rounded-3xl bg-brand-primary border border-brand-primary shadow-xl hover:shadow-2xl transition-all duration-500">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
               <div className="p-8 h-full flex items-center justify-between relative z-10">
                 <div>
                   <h3 className="text-xl font-bold text-white mb-2">Stretch Films</h3>
                   <p className="text-white/70 font-medium text-sm">Industrial grade wraps.</p>
                 </div>
                 <div className="bg-white/10 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-brand-accent transition-all duration-500 shrink-0">
                   <Film className="w-7 h-7 text-white" />
                 </div>
               </div>
            </motion.div>

            {/* Special Feature 2 - Custom Solutions */}
            <motion.div variants={item} className="col-span-1 row-span-1 relative group overflow-hidden rounded-3xl bg-white border border-border-subtle shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-500">
               <div className="absolute inset-0 bg-gradient-to-tl from-emerald-50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
               <div className="p-8 h-full flex flex-col justify-between relative z-10">
                 <div className="flex items-center justify-between w-full">
                    <span className="inline-flex px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                      Sustainable
                    </span>
                    <PenTool className="w-6 h-6 text-emerald-500 group-hover:-rotate-12 transition-transform duration-500" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-brand-primary mb-1">Kraft Paper</h3>
                   <p className="text-text-secondary font-medium text-sm flex items-center gap-1 group-hover:text-brand-primary transition-colors">
                     Eco-friendly wrapping <ArrowRight className="w-4 h-4" />
                   </p>
                 </div>
               </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
