'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';

const EventDirectory = () => {
  // Sample data - replace with your actual data
  const events = [
    { id: 1, title: 'Fitness Workshop', date: 'Oct 15, 2023', location: 'Dhaka' },
    { id: 2, title: 'Yoga Retreat', date: 'Nov 5, 2023', location: 'Cox\'s Bazar' },
    { id: 3, title: 'Nutrition Seminar', date: 'Dec 10, 2023', location: 'Online' },
    { id: 4, title: 'Annual Meetup', date: 'Jan 20, 2024', location: 'Dhaka' },
  ];

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-2">{event.title}</h3>
              <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 mb-4">
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {event.date}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={16} />
                  {event.location}
                </span>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Register Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventDirectory;