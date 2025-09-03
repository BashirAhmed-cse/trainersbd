// app/admin-dashboard/components/Header.tsx
'use client';

import { Menu, Bell, User, Search, Home } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center">
        <button 
          className="lg:hidden mr-4"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6 text-gray-500" />
        </button>
        
        <div className="relative max-w-xs w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Home Button with Link */}
        <Link 
          href="/"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300"
          title="Go to Homepage"
        >
          <Home className="h-5 w-5" />
          <span className="hidden sm:inline text-sm">Home</span>
        </Link>
        
        <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <Bell className="h-5 w-5 text-gray-500" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
            A
          </div>
          <div className="ml-2 hidden md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}