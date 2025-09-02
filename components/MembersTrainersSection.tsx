'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Star, ChevronDown, Mail, Users } from 'lucide-react';
import Image from 'next/image';

const MembersTrainersSection = () => {
  const [memberSearch, setMemberSearch] = useState('');
  const [trainerSearch, setTrainerSearch] = useState('');
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [showAllTrainers, setShowAllTrainers] = useState(false);

  const members = [
    { id: 1, name: 'Saydujjaman', role: 'Trainers Association of Bangladesh (TRAINERS)', image: "/Members/Saydujjaman.jpg" },
    { id: 2, name: 'Rubaiyat Jahan Lubna', role: 'Trainers Association of Bangladesh (TRAINERS)', image: "/Members/RubaiyatJahanLubna.png" },
    { id: 3, name: 'Rawnok Jahan', role: 'Trainers Association of Bangladesh (TRAINERS)', image: "/Members/RawnokJahan.jpg" },
  ];

  const trainers = [
    { id: 1, name: 'Laila Naznin', specialty: 'The Academy to Innovate HR', rating: 4.9, image: '/BoardMembers/laila-Naznin.jpg' },
    { id: 2, name: 'Mohammad Morad Hossain', specialty: 'Human Edge', rating: 4.8, image: '/BoardMembers/MOhammad-Morad-Hossain.jpg' },
    { id: 3, name: 'Zia Uddin Ahmad', specialty: 'Marketing Pro', rating: 4.7, image: '/BoardMembers/Zia-Uddin.jpg' },
  ];

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
    m.role.toLowerCase().includes(memberSearch.toLowerCase())
  );

  const filteredTrainers = trainers.filter(t =>
    t.name.toLowerCase().includes(trainerSearch.toLowerCase()) ||
    t.specialty.toLowerCase().includes(trainerSearch.toLowerCase())
  );

  const displayedMembers = showAllMembers ? filteredMembers : filteredMembers.slice(0, 6);
  const displayedTrainers = showAllTrainers ? filteredTrainers : filteredTrainers.slice(0, 6);

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            OUR COMMUNITY
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Connect with our members and find the perfect trainer for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Members Directory */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Users className="text-blue-600" size={22} />
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">MEMBERS DIRECTORY</h3>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search members..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="pl-9 pr-4 h-10 border-slate-300 dark:border-slate-700 focus:border-blue-600"
                />
              </div>
            </div>

           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
  {displayedMembers.map((member) => (
    <Card 
      key={member.id} 
      className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 flex flex-col h-[320px] p-0"
    >
      {/* Fixed Image Height */}
      <div className="relative h-40 bg-slate-200 dark:bg-slate-700 overflow-hidden">
        <Image
          src={member.image || '/placeholder-member.jpg'}
          alt={member.name}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content area */}
      <CardContent className="p-4 flex flex-col text-center flex-1">
        <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-1 truncate">
          {member.name}
        </h3>
        <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-3 line-clamp-2">
          {member.role}
        </p>

        {/* Button aligned at bottom */}
        <div className="mt-auto">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
            <Mail size={14} className="mr-2" />
            Connect
          </Button>
        </div>
      </CardContent>
    </Card>
  ))}
</div>


            {filteredMembers.length > 6 && (
              <div className="text-center mt-6">
                <Button
                  onClick={() => setShowAllMembers(!showAllMembers)}
                  variant="outline"
                  className="flex items-center gap-2 mx-auto border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2"
                >
                  {showAllMembers ? 'Show Less' : 'View All Members'}
                  <ChevronDown className={`h-4 w-4 transition-transform ${showAllMembers ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            )}
          </div>

          {/* Trainers Directory */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Star className="text-amber-500" size={22} />
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">FIND YOUR TRAINERS</h3>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search trainers..."
                  value={trainerSearch}
                  onChange={(e) => setTrainerSearch(e.target.value)}
                  className="pl-9 pr-4 h-10 border-slate-300 dark:border-slate-700 focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
  {displayedTrainers.map((trainer) => (
    <Card 
      key={trainer.id} 
      className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 flex flex-col h-[320px] p-0"
    >
      {/* Fixed Image Height */}
      <div className="relative h-40 bg-slate-200 dark:bg-slate-700 overflow-hidden">
        <Image
          src={trainer.image || '/placeholder-trainer.jpg'}
          alt={trainer.name}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
          <Star size={12} fill="currentColor" />
          {trainer.rating}
        </div>
      </div>

      {/* Content area */}
      <CardContent className="p-4 flex flex-col text-center flex-1">
        <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-1 truncate">{trainer.name}</h3>
        <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-3 line-clamp-2">{trainer.specialty}</p>

        {/* Button stays at bottom */}
        <div className="mt-auto">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  ))}
</div>


            {filteredTrainers.length > 6 && (
              <div className="text-center mt-6">
                <Button
                  onClick={() => setShowAllTrainers(!showAllTrainers)}
                  variant="outline"
                  className="flex items-center gap-2 mx-auto border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2"
                >
                  {showAllTrainers ? 'Show Less' : 'View All Trainers'}
                  <ChevronDown className={`h-4 w-4 transition-transform ${showAllTrainers ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembersTrainersSection;
