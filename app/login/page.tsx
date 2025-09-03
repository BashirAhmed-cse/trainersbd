'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';


const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  remember: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const LoginPage = () => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = useMemo(() => theme === 'system' ? systemTheme : theme, [theme, systemTheme]);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = useCallback(async (values: FormValues) => {
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return (
    <div className={`min-h-screen flex ${currentTheme === 'dark' ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
      
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20" aria-hidden="true">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Left Side - Login Form */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full  flex flex-col justify-center px-6 py-12 lg:px-12 relative z-10"
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <motion.h2 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`mt-6 text-center text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${currentTheme === 'dark' ? 'from-blue-400 to-blue-600' : 'from-blue-600 to-blue-800'} mb-2`}
          >
            Welcome Back
          </motion.h2>

          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-center text-lg ${currentTheme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}
          >
            Sign in to access your account
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-8 sm:mx-auto sm:w-full sm:max-w-md backdrop-blur-sm bg-white/30 dark:bg-slate-800/30 p-8 rounded-2xl shadow-xl border ${currentTheme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}
        >
          {error && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`mb-6 p-4 rounded-lg ${currentTheme === 'dark' ? 'bg-red-900/50 text-red-200' : 'bg-red-100 text-red-700'} flex items-center`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </motion.div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
            {/* Email */}
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
              <label className={`block text-sm font-medium mb-2 ${currentTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} />
                </div>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className={`pl-10 ${currentTheme === 'dark' ? 'bg-slate-700/50 border-slate-600 focus:ring-blue-500' : 'bg-white/70 border-slate-300 focus:ring-blue-500'} focus:ring-2`}
                  {...form.register('email')}
                />
              </div>
              {form.formState.errors.email && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {form.formState.errors.email.message}
                </p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
              <div className="flex items-center justify-between mb-2">
                <label className={`block text-sm font-medium ${currentTheme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className={`text-sm font-medium ${currentTheme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} />
                </div>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`pl-10 ${currentTheme === 'dark' ? 'bg-slate-700/50 border-slate-600 focus:ring-blue-500' : 'bg-white/70 border-slate-300 focus:ring-blue-500'} focus:ring-2`}
                  {...form.register('password')}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {form.formState.errors.password.message}
                </p>
              )}
            </motion.div>

            {/* Remember Me */}
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="flex items-center">
              <Checkbox id="remember" {...form.register('remember')} />
              <label htmlFor="remember" className={`ml-2 text-sm ${currentTheme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                Remember me
              </label>
            </motion.div>

            {/* Submit */}
            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }}>
              <Button
                type="submit"
                className="w-full py-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <span className="flex items-center justify-center text-white">
                    Sign In <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${currentTheme === 'dark' ? 'border-slate-700' : 'border-slate-300'}`} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${currentTheme === 'dark' ? 'bg-slate-800/30 text-slate-400' : 'bg-white/30 text-slate-500'}`}>
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Button */}
            <div className="mt-6 flex items-center">
              <Button
                variant="outline"
                className="py-4 rounded-xl border-slate-300 dark:border-slate-600 w-full"
                onClick={() => alert("Google Sign-In coming soon!")}
                disabled={isLoading}
              >
                <FcGoogle className="h-5 w-5 mr-2" />
                Google
              </Button>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className={`mt-8 text-center text-sm ${currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}
          >
            Don't have an account?{' '}
            <Link href="/membership-application" className={`font-semibold ${currentTheme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>
              Sign up
            </Link>
          </motion.div>
          
          <div className="flex justify-center gap-5 mt-5">
            <Link href="/admin-dashboard" passHref>
              <Button className="w-full justify-center bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-3 mb-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                Admin
              </Button>
            </Link>
            {/* <Link href="/user" passHref>
              <Button className="w-full justify-center bg-purple-500 hover:bg-purple-700 text-white font-semibold py-3 mb-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                Member
              </Button>
            </Link> */}
          </div>
          
        </motion.div>
      </motion.div>


    

      {/* Optional Fullscreen Loader */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Loader2 className="h-10 w-10 text-white animate-spin" />
        </div>
      )}
    </div>
  );
};

export default LoginPage;