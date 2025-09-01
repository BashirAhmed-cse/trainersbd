'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Video, BookOpen, Download, ArrowRight, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const ResourceLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Sample data - replace with your actual data
  const resources = [
    {
      id: 1,
      title: 'Complete Fitness Training Guide',
      type: 'ebook',
      category: 'fitness',
      downloads: 1250,
      pages: 89,
      format: 'PDF',
      size: '4.2MB',
      image: '/placeholder-resource1.jpg'
    },
    {
      id: 2,
      title: 'Advanced Yoga Techniques Masterclass',
      type: 'video',
      category: 'yoga',
      duration: '2h 15m',
      format: 'MP4',
      size: '1.8GB',
      image: '/placeholder-resource2.jpg'
    },
    {
      id: 3,
      title: 'Nutrition & Diet Planning Handbook',
      type: 'ebook',
      category: 'nutrition',
      downloads: 890,
      pages: 64,
      format: 'PDF',
      size: '3.1MB',
      image: '/placeholder-resource3.jpg'
    },
    {
      id: 4,
      title: 'Strength Training Fundamentals',
      type: 'video',
      category: 'fitness',
      duration: '1h 45m',
      format: 'MP4',
      size: '1.2GB',
      image: '/placeholder-resource4.jpg'
    },
    {
      id: 5,
      title: 'Meditation for Beginners',
      type: 'ebook',
      category: 'wellness',
      downloads: 1100,
      pages: 42,
      format: 'PDF',
      size: '2.5MB',
      image: '/placeholder-resource5.jpg'
    },
    {
      id: 6,
      title: 'Sports Nutrition Advanced Course',
      type: 'course',
      category: 'nutrition',
      modules: 8,
      duration: '6 weeks',
      format: 'Online',
      image: '/placeholder-resource6.jpg'
    },
    {
      id: 7,
      title: 'Functional Movement Patterns',
      type: 'video',
      category: 'fitness',
      duration: '2h 30m',
      format: 'MP4',
      size: '2.1GB',
      image: '/placeholder-resource7.jpg'
    },
    {
      id: 8,
      title: 'Mindfulness Practice Guide',
      type: 'ebook',
      category: 'wellness',
      downloads: 950,
      pages: 56,
      format: 'PDF',
      size: '3.8MB',
      image: '/placeholder-resource8.jpg'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'fitness', label: 'Fitness' },
    { id: 'yoga', label: 'Yoga' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'wellness', label: 'Wellness' }
  ];

  const resourceTypes = [
    { id: 'ebook', label: 'E-Books', icon: <FileText size={18} /> },
    { id: 'video', label: 'Videos', icon: <Video size={18} /> },
    { id: 'course', label: 'Courses', icon: <BookOpen size={18} /> }
  ];

  // Filter resources based on search and category
  const filteredResources = resources.filter(resource =>
    (activeCategory === 'all' || resource.category === activeCategory) &&
    (resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     resource.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ebook': return <FileText className="text-blue-600" size={20} />;
      case 'video': return <Video className="text-red-500" size={20} />;
      case 'course': return <BookOpen className="text-green-500" size={20} />;
      default: return <FileText className="text-blue-600" size={20} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ebook': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'video': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'course': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            RESOURCE LIBRARY
          </h2>
         
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-6 border-slate-300 dark:border-slate-700 focus:border-blue-600"
              />
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-300 dark:border-slate-700">
              <Filter size={18} className="text-slate-500" />
              <span className="text-sm text-slate-600 dark:text-slate-300">Filter:</span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Resource Type Filters */}
          <div className="flex flex-wrap gap-4">
            {resourceTypes.map((type) => (
              <div
                key={type.id}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                {type.icon}
                <span className="text-sm text-slate-700 dark:text-slate-300">{type.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredResources.map((resource) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden group hover:shadow-xl transition-shadow duration-300 border-slate-200 dark:border-slate-700">
                <div className="relative h-48 bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                      {resource.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <Button className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white">
                      {resource.type === 'course' ? 'Enroll Now' : 'Download'}
                      <Download size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    {getTypeIcon(resource.type)}
                    <h3 className="font-semibold text-lg text-slate-800 dark:text-white line-clamp-2">
                      {resource.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {'pages' in resource && (
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <FileText size={14} />
                        {resource.pages} pages • {resource.format}
                      </div>
                    )}
                    {'duration' in resource && (
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Video size={14} />
                        {resource.duration} • {resource.format}
                      </div>
                    )}
                    {'modules' in resource && (
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <BookOpen size={14} />
                        {resource.modules} modules • {resource.duration}
                      </div>
                    )}
                    {'downloads' in resource && (
                      <div className="text-sm text-slate-500 dark:text-slate-500">
                        {resource.downloads.toLocaleString()} downloads
                      </div>
                    )}
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    {resource.type === 'course' ? 'View Course' : 'Download Resource'}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold">
            VIEW ALL RESOURCES
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResourceLibrary;