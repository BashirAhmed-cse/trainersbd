// app/admin-dashboard/page.tsx
'use client';

import RecentActivity from "./components/RecentActivity";
import StatsCards from "./components/StatsCards";



export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <StatsCards />
      
      {/* Recent Activity */}
      <div className="mt-8">
        <RecentActivity />
      </div>
    </div>
  );
}