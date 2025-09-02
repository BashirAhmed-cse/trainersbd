'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Clock, Users, Star } from 'lucide-react';
import Image from 'next/image';

const CoursesSection = () => {
  // Sample data - replace with your actual data
  const courses = [
    {
      id: 1,
      title: 'Certified Personal Trainer',
      instructor: 'Dr. Sarah Johnson',
      duration: '12 weeks',
      students: 1200,
      rating: 4.8,
      image: '/placeholder-course1.jpg',
      price: '$299'
    },
    {
      id: 2,
      title: 'Yoga Instructor Certification',
      instructor: 'Master Raj Patel',
      duration: '8 weeks',
      students: 850,
      rating: 4.9,
      image: '/placeholder-course2.jpg',
      price: '$249'
    },
    {
      id: 3,
      title: 'Nutrition & Diet Planning',
      instructor: 'Prof. Emily Chen',
      duration: '10 weeks',
      students: 950,
      rating: 4.7,
      image: '/placeholder-course3.jpg',
      price: '$279'
    },
    {
      id: 4,
      title: 'Advanced Fitness Training',
      instructor: 'Coach Mike Williams',
      duration: '14 weeks',
      students: 1100,
      rating: 4.6,
      image: '/placeholder-course4.jpg',
      price: '$349'
    },
    {
      id: 5,
      title: 'Sports Rehabilitation',
      instructor: 'Dr. Lisa Anderson',
      duration: '16 weeks',
      students: 700,
      rating: 4.9,
      image: '/placeholder-course5.jpg',
      price: '$399'
    },
    {
      id: 6,
      title: 'Group Fitness Instruction',
      instructor: 'Trainer Maria Garcia',
      duration: '6 weeks',
      students: 1300,
      rating: 4.5,
      image: '/placeholder-course6.jpg',
      price: '$199'
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4 uppercase">
             Courses & Certificate Programs
          </h2>
          
        </div>
        {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Courses & Certificate Programs
            </h2>
            
          </div>
          
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold flex items-center gap-2 group">
            WATCH MORE
            <Play size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div> */}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300 border-slate-200 dark:border-slate-700">
                <div className="relative h-48 bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <Image
                    src={course.image || '/placeholder-course.jpg'}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
                    {course.price}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white rounded-full p-3">
                      <Play size={20} fill="currentColor" />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                    By {course.instructor}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm">
                      <Clock size={14} />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm">
                      <Users size={14} />
                      {course.students.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {course.rating}
                      </span>
                    </div>
                    
                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm">
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile View More Button (hidden on larger screens) */}
        <div className="text-center mt-8">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold flex items-center gap-2 mx-auto group">
            WATCH MORE
            <Play size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;