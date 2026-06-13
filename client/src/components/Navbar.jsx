import React from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl"
    >
      <div className="glass-panel rounded-2xl px-6 h-14 flex items-center justify-between border border-neutral-200/50">
        <Logo
          className="w-6 h-6 text-primary-600"
          textClassName="text-sm font-bold tracking-tight"
        />

        <div className="hidden md:flex items-center gap-6">
          {["Features", "Analytics", "Enterprise"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[12px] font-semibold text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="text-[12px] font-bold text-neutral-600 px-3 hover:text-neutral-900">
            Login
          </button>
          <button className="bg-neutral-900 text-white px-4 py-1.5 rounded-full text-[12px] font-bold hover:bg-neutral-800 transition-all active:scale-95">
            Get Started
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
