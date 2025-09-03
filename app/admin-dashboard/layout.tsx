// app/admin-dashboard/layout.tsx
'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);



  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        
        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}