// app/admin-dashboard/components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Users,
  BookOpen,
  BarChart3,
  Settings,
  X,
  LogOut,
  Crown,
  GraduationCap,
  Library,
  Calendar,
  Bell
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

// Main navigation categories
const mainNavigation = [
  { name: 'Dashboard', href: '/admin-dashboard', icon: Home },
];

const userManagement = [
  { name: 'All Members', href: '/admin-dashboard/members', icon: Users },
  { name: 'Founders Board', href: '/admin-dashboard/founders', icon: Crown },
  { name: 'Trainers', href: '/admin-dashboard/trainers', icon: GraduationCap },
];

const contentManagement = [
  { name: 'Courses', href: '/admin-dashboard/courses', icon: BookOpen },
  { name: 'Resource Library', href: '/admin-dashboard/resources', icon: Library },
  { name: 'Event Directory', href: '/admin-dashboard/events', icon: Calendar },
  { name: 'Notice Board', href: '/admin-dashboard/notices', icon: Bell },
];

const settings = [
  { name: 'Settings', href: '/admin-dashboard/settings', icon: Settings },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState({
    users: true,
    content: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const NavItem = ({ item, isActive }: { item: any, isActive: boolean }) => (
    <Link
      href={item.href}
      className={`
        flex items-center px-4 py-3 rounded-lg transition-colors ml-4
        ${isActive
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
        }
      `}
      onClick={() => setSidebarOpen(false)}
    >
      <item.icon className="h-5 w-5 mr-3" />
      {item.name}
    </Link>
  );

  const SectionHeader = ({ title, expanded, onToggle, icon: Icon }: { 
    title: string; 
    expanded: boolean; 
    onToggle: () => void;
    icon: any;
  }) => (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full px-4 py-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <div className="flex items-center">
        <Icon className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
        <span className="font-medium text-gray-900 dark:text-white">{title}</span>
      </div>
      <svg
        className={`h-4 w-4 transform transition-transform ${expanded ? 'rotate-0' : '-rotate-90'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900 bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">Admin Panel</span>
          <button 
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-6 px-4">
            {/* Main Navigation */}
            <div className="space-y-1">
              {mainNavigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center px-4 py-3 rounded-lg transition-colors
                      ${isActive
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }
                    `}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* User Management Section */}
            <div className="space-y-1">
              <SectionHeader
                title="User Management"
                expanded={expandedSections.users}
                onToggle={() => toggleSection('users')}
                icon={Users}
              />
              {expandedSections.users && (
                <div className="space-y-1 mt-1">
                  {userManagement.map((item) => {
                    const isActive = pathname === item.href;
                    return <NavItem key={item.name} item={item} isActive={isActive} />;
                  })}
                </div>
              )}
            </div>

            {/* Content Management Section */}
            <div className="space-y-1">
              <SectionHeader
                title="Content Management"
                expanded={expandedSections.content}
                onToggle={() => toggleSection('content')}
                icon={BookOpen}
              />
              {expandedSections.content && (
                <div className="space-y-1 mt-1">
                  {contentManagement.map((item) => {
                    const isActive = pathname === item.href;
                    return <NavItem key={item.name} item={item} isActive={isActive} />;
                  })}
                </div>
              )}
            </div>

            {/* Settings */}
            <div className="space-y-1">
              {settings.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center px-4 py-3 rounded-lg transition-colors
                      ${isActive
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }
                    `}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}