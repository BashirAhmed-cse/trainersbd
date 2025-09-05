'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, Mail, Award } from 'lucide-react';
import Image from 'next/image';

const MembersDirectory = () => {
  const [showAllMembers, setShowAllMembers] = useState(false);

  const members = [
    { 
      id: 1, 
      name: "K M Hasan Ripon", 
      role: "President & Founding Member", 
      image: "/BoardMembers/KM-Hasan.jpg",
      achievements: "20+ years in training industry"
    },
    { 
      id: 2, 
      name: "Yousuf Efti", 
      role: "Founder & Executive Vice President", 
      image: "/BoardMembers/Yousuf-Efti.jpg",
      achievements: "Leadership development expert"
    },
    { 
      id: 3, 
      name: "Mohammad Morad Hossain", 
      role: "Vice President & Founding Member", 
      image: "/BoardMembers/MOhammad-Morad-Hossain.jpg",
      achievements: "Corporate training specialist"
    },
    { 
      id: 4, 
      name: "Zia Uddin Ahmad", 
      role: "General Secretary & Founding Member", 
      image: "/BoardMembers/Zia-Uddin.jpg",
      achievements: "Education policy advisor"
    },
    { 
      id: 5, 
      name: "Del H Khan", 
      role: "Treasurer & Founding Member", 
      image: "/BoardMembers/Del-H-Khan.jpg",
      achievements: "Financial management expert"
    },
    { 
      id: 6, 
      name: "Laila Naznin", 
      role: "Director Collaboration and Outreach & Founding Member", 
      image: "/BoardMembers/laila-Naznin.jpg",
      achievements: "Partnership development"
    },
    { 
      id: 7, 
      name: "Zia Uddin Mahmud", 
      role: "Director Strategy and Innovation & Founding Member", 
      image: "/BoardMembers/Zia-Uddin-Mahmud.jpg",
      achievements: "Strategic planning specialist"
    },
  ];

  const displayedMembers = showAllMembers ? members : members.slice(0, 4);

  return (
    <div className="grid gap-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
          Our Visionary Leaders
        </h2>
        <p className='text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto'>Meet the Founders and Board of Directors Driving Trainers Towards Excellence</p>
        
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedMembers.map((member) => (
          <Card key={member.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-700 p-0">
            {/* Image Container - Clean without badges */}
            <div className="relative h-60 w-full overflow-hidden">
              <Image
                src={member.image || '/placeholder-member.jpg'}
                alt={member.name}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-member.jpg';
                }}
              />
            </div>
            
            {/* Card Content */}
            <CardContent className="p-2">
              <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-2 text-center">
                {member.name}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-3 text-center">
                {member.role}
              </p> 
              {/* Contact Button */}
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
                Connect
                <Mail size={14} className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {members.length > 4 && (
        <div className="text-center mt-8">
          <Button
            onClick={() => setShowAllMembers(!showAllMembers)}
            variant="outline"
            className="flex items-center gap-2 mx-auto border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3"
          >
            {showAllMembers ? 'Show Less' : 'View All Members'}
            <ChevronDown className={`h-4 w-4 transition-transform ${showAllMembers ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MembersDirectory;