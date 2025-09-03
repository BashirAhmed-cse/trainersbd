"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { RotateCw, Home, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { theme } = useTheme();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    });
  }, [error]);

  function setImgSrc(arg0: string): void {
    throw new Error("Function not implemented.");
  }

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
        className="mb-8"
      >
        <Image
          src={theme === 'dark' ? "/images/error.png" : "/images/error.png"}
          alt="Error occurred"
          width={350}
          height={350}
          priority
          className="object-contain"
          onError={() => setImgSrc("/images/error-default.png")}
        />
      </motion.div>

      <div className="space-y-6 max-w-2xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-3"
        >
          <AlertTriangle className={`h-8 w-8 ${
            theme === 'dark' ? 'text-red-400' : 'text-red-500'
          }`} />
          <h1 className={`text-3xl md:text-4xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Unexpected Error Occurred
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`text-left max-w-lg mx-auto p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800 text-red-300' : 'bg-gray-100 text-red-600'
          }`}
        >
          <p className="font-mono text-sm break-words">
            {error.message || "An unknown error occurred"}
          </p>
          {error.digest && (
            <p className="mt-2 text-xs opacity-70">
              Error ID: {error.digest}
            </p>
          )}
        </motion.div>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          We apologize for the inconvenience. Please try again or return home.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4 pt-6"
        >
          <Button
            size="lg"
            className="px-8 py-6 text-lg font-medium gap-2"
            onClick={reset}
          >
            <RotateCw className="h-5 w-5" />
            Try Again
          </Button>
          
          <Link href="/" passHref>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg font-medium gap-2"
            >
              <Home className="h-5 w-5" />
              Return Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}