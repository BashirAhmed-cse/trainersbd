'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Calendar, Bell } from 'lucide-react';
import MembersDirectory from './shared/MembersDirectory';
import EventDirectory from './shared/EventDirectory';
import NoticeBoard from './shared/NoticeBoard';


const MultiTabSection = () => {
  const [activeTab, setActiveTab] = useState('members');

  const tabs = [
    { id: 'members', label: 'MEMBERS DIRECTORY', icon: <Users size={18} /> },
    { id: 'events', label: 'EVENT DIRECTORY', icon: <Calendar size={18} /> },
    { id: 'notices', label: 'NOTICE BOARD', icon: <Bell size={18} /> },
  ];

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            FOUNDERS BOARD & BOD
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Connect with our community of professional trainers and stay updated with the latest events and notices.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'members' && (
              <motion.div
                key="members"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MembersDirectory />
              </motion.div>
            )}

            {activeTab === 'events' && (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <EventDirectory />
              </motion.div>
            )}

            {activeTab === 'notices' && (
              <motion.div
                key="notices"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <NoticeBoard />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default MultiTabSection;