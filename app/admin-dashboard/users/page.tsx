// app/admin-dashboard/users/page.tsx
'use client';

import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical } from 'lucide-react';


export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
        <button className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* <DataTable
          columns={[
            { header: 'Name', accessor: 'name' },
            { header: 'Email', accessor: 'email' },
            { header: 'Role', accessor: 'role' },
            { header: 'Status', accessor: 'status' },
            { header: 'Actions', accessor: 'actions' },
          ]}
          data={[
            {
              name: 'John Doe',
              email: 'john.doe@example.com',
              role: 'Student',
              status: 'Active',
              actions: <MoreVertical className="h-4 w-4 cursor-pointer" />
            },
       
        /> */}
      </div>
    </div>
  );
}