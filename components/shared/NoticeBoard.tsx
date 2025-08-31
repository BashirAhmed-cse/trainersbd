'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const NoticeBoard = () => {
  // Sample data - replace with your actual data
  const notices = [
    { id: 1, title: 'New Membership Benefits', date: 'Sep 28, 2023', content: 'We are excited to announce new benefits for our premium members...' },
    { id: 2, title: 'Upcoming Training Schedule', date: 'Sep 25, 2023', content: 'The new training schedule for October is now available...' },
    { id: 3, title: 'Community Guidelines Update', date: 'Sep 20, 2023', content: 'Please review the updated community guidelines...' },
    { id: 4, title: 'Annual General Meeting', date: 'Sep 15, 2023', content: 'Join us for our annual general meeting on October 10th...' },
  ];

  return (
    <div className="grid gap-4">
      {notices.map((notice) => (
        <Card key={notice.id} className="p-6 hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-2">{notice.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-3">{notice.content}</p>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Calendar size={16} />
                  {notice.date}
                </div>
              </div>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white whitespace-nowrap">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NoticeBoard;