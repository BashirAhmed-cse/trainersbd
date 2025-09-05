'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Clock, Users, Star, Search, X } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const CoursesSection = () => {
  // Sample data - replace with your actual data
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Certified Personal Trainer',
      instructor: 'Dr. Sarah Johnson',
      duration: '12 weeks',
      students: 1200,
      rating: 4.8,
      image: '/placeholder-course1.jpg',
      price: '$299',
      category: 'Fitness'
    },
    {
      id: 2,
      title: 'Yoga Instructor Certification',
      instructor: 'Master Raj Patel',
      duration: '8 weeks',
      students: 850,
      rating: 4.9,
      image: '/placeholder-course2.jpg',
      price: '$249',
      category: 'Yoga'
    },
    {
      id: 3,
      title: 'Nutrition & Diet Planning',
      instructor: 'Prof. Emily Chen',
      duration: '10 weeks',
      students: 950,
      rating: 4.7,
      image: '/placeholder-course3.jpg',
      price: '$279',
      category: 'Nutrition'
    },
    {
      id: 4,
      title: 'Advanced Fitness Training',
      instructor: 'Coach Mike Williams',
      duration: '14 weeks',
      students: 1100,
      rating: 4.6,
      image: '/placeholder-course4.jpg',
      price: '$349',
      category: 'Fitness'
    },
    {
      id: 5,
      title: 'Sports Rehabilitation',
      instructor: 'Dr. Lisa Anderson',
      duration: '16 weeks',
      students: 700,
      rating: 4.9,
      image: '/placeholder-course5.jpg',
      price: '$399',
      category: 'Rehabilitation'
    },
    {
      id: 6,
      title: 'Group Fitness Instruction',
      instructor: 'Trainer Maria Garcia',
      duration: '6 weeks',
      students: 1300,
      rating: 4.5,
      image: '/placeholder-course6.jpg',
      price: '$199',
      category: 'Fitness'
    }
  ]);

  // State for search, categories, and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredCourses, setFilteredCourses] = useState(courses);

  // Extract unique categories from courses
  useEffect(() => {
    const uniqueCategories = ['All', ...new Set(courses.map(course => course.category))];
    setCategories(uniqueCategories);
  }, [courses]);

  // Filter courses based on search and category
  useEffect(() => {
    let results = courses;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      results = results.filter(course => course.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(course => 
        course.title.toLowerCase().includes(query) || 
        course.instructor.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredCourses(results);
  }, [searchQuery, selectedCategory, courses]);

  // Function to simulate adding a new course (in a real app, this would come from an admin action)
 

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Upcoming Courses & Trainings
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Get Certified and Master New Skills with Our Expert Trainers
          </p>
        </div>

        {/* Search Box */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search courses by title, instructor, or category..."
              className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-800 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Categories Filter */}
        {/* <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`rounded-full px-4 py-2 ${
                selectedCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div> */}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
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
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-slate-800 dark:text-white line-clamp-2 flex-1">
                      {course.title}
                    </h3>
                    <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded ml-2">
                      {course.category}
                    </span>
                  </div>
                  
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

        {/* Show message if no courses match filters */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              No courses match your search criteria. Try adjusting your filters.
            </p>
          </div>
        )}

        {/* Mobile View More Button (hidden on larger screens) */}
        <div className="text-center mt-8">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold flex items-center gap-2 mx-auto group">
            VIEW MORE COURSES
            <Play size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Demo button to simulate adding a new course (remove in production) */}
        
      </div>
    </section>
  );
};

export default CoursesSection;