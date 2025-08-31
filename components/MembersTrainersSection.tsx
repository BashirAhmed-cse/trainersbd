'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Star, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const MembersTrainersSection = () => {
  const [memberSearch, setMemberSearch] = useState('');
  const [trainerSearch, setTrainerSearch] = useState('');
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [showAllTrainers, setShowAllTrainers] = useState(false);

  // Sample data - replace with your actual data
  const members = [
    { id: 1, name: 'John Doe', role: 'Fitness Trainer', location: 'Dhaka', image: '/placeholder-member1.jpg' },
    { id: 2, name: 'Jane Smith', role: 'Yoga Instructor', location: 'Chittagong', image: '/placeholder-member2.jpg' },
    { id: 3, name: 'Mike Johnson', role: 'Strength Coach', location: 'Dhaka', image: '/placeholder-member3.jpg' },
    { id: 4, name: 'Sarah Williams', role: 'Nutritionist', location: 'Sylhet', image: '/placeholder-member4.jpg' },
    { id: 5, name: 'David Brown', role: 'CrossFit Trainer', location: 'Dhaka', image: '/placeholder-member1.jpg' },
    { id: 6, name: 'Emily Davis', role: 'Pilates Instructor', location: 'Khulna', image: '/placeholder-member2.jpg' },
    { id: 7, name: 'Chris Wilson', role: 'Personal Trainer', location: 'Dhaka', image: '/placeholder-member3.jpg' },
    { id: 8, name: 'Amanda Taylor', role: 'Dance Instructor', location: 'Rajshahi', image: '/placeholder-member4.jpg' },
  ];

  const trainers = [
    { id: 1, name: 'Alex Rahman', specialty: 'Weight Loss', rating: 4.9, clients: 120, location: 'Dhaka', image: '/placeholder-trainer1.jpg' },
    { id: 2, name: 'Maria Khan', specialty: 'Yoga Therapy', rating: 4.8, clients: 95, location: 'Chittagong', image: '/placeholder-trainer2.jpg' },
    { id: 3, name: 'Samir Ahmed', specialty: 'Bodybuilding', rating: 4.7, clients: 150, location: 'Dhaka', image: '/placeholder-trainer3.jpg' },
    { id: 4, name: 'Tasnim Islam', specialty: 'Posture Correction', rating: 4.9, clients: 80, location: 'Dhaka', image: '/placeholder-trainer4.jpg' },
    { id: 5, name: 'Rahim Ali', specialty: 'Senior Fitness', rating: 4.6, clients: 65, location: 'Sylhet', image: '/placeholder-trainer1.jpg' },
    { id: 6, name: 'Fatima Begum', specialty: 'Prenatal Yoga', rating: 4.8, clients: 110, location: 'Dhaka', image: '/placeholder-trainer2.jpg' },
  ];

  // Filter members based on search
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
    member.role.toLowerCase().includes(memberSearch.toLowerCase()) ||
    member.location.toLowerCase().includes(memberSearch.toLowerCase())
  );

  // Filter trainers based on search
  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(trainerSearch.toLowerCase()) ||
    trainer.specialty.toLowerCase().includes(trainerSearch.toLowerCase()) ||
    trainer.location.toLowerCase().includes(trainerSearch.toLowerCase())
  );

  const displayedMembers = showAllMembers ? filteredMembers : filteredMembers.slice(0, 6);
  const displayedTrainers = showAllTrainers ? filteredTrainers : filteredTrainers.slice(0, 6);

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            CONNECT WITH OUR COMMUNITY
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Discover our members and find the perfect trainer for your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Members Directory */}
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">MEMBERS DIRECTORY</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search members by name, specialty, or location..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="pl-10 pr-4 py-6 border-slate-300 dark:border-slate-700 focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {displayedMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative h-40 bg-slate-200 dark:bg-slate-700 overflow-hidden">
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
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">{member.role}</p>
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
                      <MapPin size={12} />
                      {member.location}
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
                  className="flex items-center gap-2 mx-auto border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  {showAllMembers ? 'Show Less' : 'Show More Members'}
                  <ChevronDown className={`h-4 w-4 transition-transform ${showAllMembers ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            )}
          </div>

          {/* Right Side - Find Your Trainers */}
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">FIND YOUR TRAINERS</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search trainers by name, specialty, or location..."
                  value={trainerSearch}
                  onChange={(e) => setTrainerSearch(e.target.value)}
                  className="pl-10 pr-4 py-6 border-slate-300 dark:border-slate-700 focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {displayedTrainers.map((trainer) => (
                <Card key={trainer.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative h-40 bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <Image
                      src={trainer.image || '/placeholder-trainer.jpg'}
                      alt={trainer.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Star size={12} fill="currentColor" />
                      {trainer.rating}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-800 dark:text-white">{trainer.name}</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">{trainer.specialty}</p>
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <MapPin size={12} />
                        {trainer.location}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400">
                        {trainer.clients}+ clients
                      </div>
                    </div>
                    <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-sm py-2">
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTrainers.length > 6 && (
              <div className="text-center mt-6">
                <Button
                  onClick={() => setShowAllTrainers(!showAllTrainers)}
                  variant="outline"
                  className="flex items-center gap-2 mx-auto border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  {showAllTrainers ? 'Show Less' : 'Show More Trainers'}
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