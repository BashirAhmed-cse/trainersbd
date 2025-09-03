// app/admin-dashboard/components/StatsCards.tsx
'use client';

import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: 'Total Users',
    value: '2,842',
    change: '+12%',
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    title: 'Total Courses',
    value: '156',
    change: '+5%',
    icon: BookOpen,
    color: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    title: 'Revenue',
    value: '$24,256',
    change: '+8%',
    icon: DollarSign,
    color: 'text-amber-500',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30'
  },
  {
    title: 'Engagement Rate',
    value: '76.2%',
    change: '+3%',
    icon: TrendingUp,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">{stat.change} from last month</p>
            </div>
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}