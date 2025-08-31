'use client';

import { Linkedin, Twitter, Facebook, Instagram, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const Footer = () => {
  const { theme } = useTheme();
  const currentTheme = theme === 'system' ? 'dark' : theme;

  const socialMedia = [
    { name: "LinkedIn", icon: <Linkedin size={18} />, href: "#" },
    { name: "Twitter", icon: <Twitter size={18} />, href: "#" },
    { name: "Facebook", icon: <Facebook size={18} />, href: "#" },
    { name: "Instagram", icon: <Instagram size={18} />, href: "#" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className={`relative overflow-hidden ${currentTheme === 'dark' ? 'bg-slate-900' : 'bg-slate-800'} text-slate-300`}>
      {/* Decorative elements */}
     

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
 
        {/* Bottom Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} TRAINERS. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialMedia.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-slate-700 text-slate-300 hover:text-white hover:bg-blue-600 transition-all shadow-sm hover:shadow-lg"
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl transition-all z-50"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
};

export default Footer;