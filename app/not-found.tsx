'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { RotateCw, Home } from "lucide-react";
import { useState } from "react";

export default function NotFound() {
  const { theme } = useTheme();
  const [isHover, setIsHover] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    theme === 'dark' ? "/images/notfound.png" : "/images/notfound.png"
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen flex flex-col justify-center items-center text-center p-6 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
        className="w-full max-w-md md:max-w-lg lg:max-w-xl relative aspect-square mb-8"
      >
        <Image
          src={imgSrc}
          alt="404 Not Found"
          fill
          priority
          className="object-contain"
          onError={() => setImgSrc("/images/notfound-default.png")}
        />
      </motion.div>

      <div className="space-y-6 max-w-2xl">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-4xl md:text-5xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          Oops! Page Not Found
        </motion.h1>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4 pt-6"
        >
          <Link href="/" passHref>
            <Button
              size="lg"
              className="px-8 py-6 text-lg font-medium gap-2"
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <motion.div
                animate={{ rotate: isHover ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Home className="h-5 w-5" />
              </motion.div>
              Return Home
            </Button>
          </Link>

          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-lg font-medium gap-2"
            onClick={() => window.location.reload()}
          >
            <RotateCw className="h-5 w-5" />
            Try Again
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}