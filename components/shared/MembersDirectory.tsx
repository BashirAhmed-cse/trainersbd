'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

const MembersDirectory = () => {
  const [showAllMembers, setShowAllMembers] = useState(false);

  // Sample data - replace with your actual data
  const members = [
    { id: 1, name: 'John Doe', role: 'Fitness Trainer', image: '/placeholder-member1.jpg' },
    { id: 2, name: 'Jane Smith', role: 'Yoga Instructor', image: '/placeholder-member2.jpg' },
    { id: 3, name: 'Mike Johnson', role: 'Strength Coach', image: '/placeholder-member3.jpg' },
    { id: 4, name: 'Sarah Williams', role: 'Nutritionist', image: '/placeholder-member4.jpg' },
    { id: 5, name: 'David Brown', role: 'CrossFit Trainer', image: '/placeholder-member1.jpg' },
    { id: 6, name: 'Emily Davis', role: 'Pilates Instructor', image: '/placeholder-member2.jpg' },
    { id: 7, name: 'Chris Wilson', role: 'Personal Trainer', image: '/placeholder-member3.jpg' },
    { id: 8, name: 'Amanda Taylor', role: 'Dance Instructor', image: '/placeholder-member4.jpg' },
  ];

  const displayedMembers = showAllMembers ? members : members.slice(0, 4);

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="relative h-60 bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <Image
                src={member.image || '/placeholder-member.jpg'}
                alt={member.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <h3 className="text-white font-semibold">{member.name}</h3>
                  <p className="text-blue-200 text-sm">{member.role}</p>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-slate-800 dark:text-white">{member.name}</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">{member.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {members.length > 4 && (
        <div className="text-center mt-8">
          <Button
            onClick={() => setShowAllMembers(!showAllMembers)}
            variant="outline"
            className="flex items-center gap-2 mx-auto border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            {showAllMembers ? 'Show Less' : 'Show More'}
            <ChevronDown className={`h-4 w-4 transition-transform ${showAllMembers ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MembersDirectory;