"use client";

import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, User, ChevronDown, Play, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from './ModeToggle';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', id: 'home', href: '/#home'},
    { name: 'Founders & BOD', id: 'founders-bod', href: '/#founders-bod' },
    { name: 'Members Directory', id: 'members-directory', href: '/#members-directory' },
    { name: 'Find Your Trainers', id: 'find-trainer', href: '/#members-directory' },
    { name: 'Resource Library', id: 'resource-library', href: '/#resource-library' }
  ];

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
      window.history.pushState(null, null, `#${id}`);
    }
  };

  if (!mounted) return null;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm py-1' : 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm py-2'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center cursor-pointer"
          >
            <Link href="/" passHref>
              <Image
                src={theme === "dark" ? "/logo_dark.png" : "/logo.png"}
                alt="Logo"
                width={isScrolled ? 150 : 170}
                height={isScrolled ? 50 : 70}
                className={`transition-all duration-300 ${isScrolled ? 'h-8' : 'h-10'}`}
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link href={item.href} passHref>
                  <Button 
                    variant="ghost" 
                    className="text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white font-medium text-sm px-4 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-all"
                  >
                    {item.name}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Side Buttons */}
          <motion.div 
            className="hidden lg:flex items-center space-x-3 ml-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {/* Theme Toggle */}
            <ModeToggle/>

            {/* Login Button */}
            <Link href="/login" passHref>
              <Button 
                variant="ghost" 
                className="text-slate-700 hover:text-white dark:text-slate-300 hover:bg-blue-600 dark:hover:bg-blue-700 font-medium px-4 rounded-lg flex items-center space-x-2 group"
              >
                <User className="h-4 w-4 text-blue-600 dark:text-blue-400 group-hover:text-white dark:group-hover:text-blue-200 transition-colors" />
                <span>Login</span>
              </Button>
            </Link>
            
            {/* Join Us Button */}
            <Link href="/membership-application" passHref>
              <Button 
                className="relative overflow-hidden group bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <span className="relative z-10">Join Us</span>
                <span className="absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <ModeToggle />

            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-700 dark:text-slate-300 hover:bg-blue-50/50 dark:hover:bg-slate-800 rounded-full"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800"
        >
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item, index) => (
              <motion.div 
                key={item.name} 
                className="border-b border-slate-100 dark:border-slate-800 last:border-0"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link href={item.href} passHref>
                  <Button 
                    variant="ghost"
                    className="w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-blue-50/50 dark:hover:bg-slate-800 py-3 text-base font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Button>
                </Link>
              </motion.div>
            ))}
            <motion.div 
              className="pt-4 space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/login" passHref>
                <Button 
                  variant="outline" 
                  className="w-full justify-center space-x-2 py-3 border-slate-300 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-800 mb-2"
                >
                  <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>Login</span>
                </Button>
              </Link>
              {/* <Link href="/membership-application" passHref>
                <Button 
                  className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  Join us
                </Button>
              </Link> */}
            </motion.div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;