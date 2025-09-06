'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';

const EventDirectory = () => {
  // 🔹 Upcoming events
  const upcomingEvents = [
    {
      id: 101,
      title: 'Trainer Summit 2024',
      date: 'Oct 15, 2024',
      location: 'Dhaka',
    },
    {
      id: 102,
      title: 'Digital Learning Expo',
      date: 'Nov 20, 2024',
      location: 'Online',
    },
  ];

  // 🔹 Past events
  const pastEvents = [
    {
      id: 1,
      title: 'Career Acceleration Program',
      caption:
        'TRAINERS partnered with Skill.jobs to mentor 300+ aspiring professionals and guide their career growth.',
      images: ['/event/event-1.jpeg', '/event/event-1-1.jpeg', '/event/event-1-2.jpeg'],
    },
    {
      id: 2,
      title: 'Movie-Based Training of Trainers (T.O.T) Program',
      caption:
        'Inspiring trainers through cinematic storytelling, interactive activities, and live quiz-based training.',
      images: ['/event/event-2.jpeg', '/event/event-2-1.jpeg', '/event/event-2-2.jpeg'],
    },
    {
      id: 3,
      title: 'AI for Trainers',
      caption: 'Empowering trainers with AI tools for the future.',
      images: ['/event/event-3.jpeg', '/event/event-3-1.jpeg', '/event/event-3-2.jpeg'],
    },
  ];

  const [showAllPast, setShowAllPast] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentEventIndex, setCurrentEventIndex] = useState<number>(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleImageClick = (imageUrl: string, eventIndex: number, imageIndex: number) => {
    setSelectedImage(imageUrl);
    setCurrentEventIndex(eventIndex);
    setCurrentImageIndex(imageIndex);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const event = pastEvents[currentEventIndex];
    if (!event) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentImageIndex + 1) % event.images.length;
    } else {
      newIndex = (currentImageIndex - 1 + event.images.length) % event.images.length;
    }
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(event.images[newIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') {
        closeImageModal();
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex, currentEventIndex]);

  return (
    <div className="space-y-12 px-4 sm:px-6 lg:px-8">
      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 md:p-4"
          onClick={closeImageModal}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Mobile optimized */}
            <button
              className="absolute top-2 right-2 md:-top-10 md:right-0 text-white bg-black/50 rounded-full p-1 hover:bg-black/70 transition-colors z-10"
              onClick={closeImageModal}
              aria-label="Close image preview"
            >
              <X size={32} className="md:size-8" />
            </button>

            {/* Navigation Arrows */}
            {pastEvents[currentEventIndex]?.images.length > 1 && (
              <>
                <button
                  className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={32} className="md:size-8" />
                </button>
                <button
                  className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight size={32} className="md:size-8" />
                </button>
              </>
            )}

            {/* Image Counter */}
            {pastEvents[currentEventIndex]?.images.length > 1 && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 rounded-full px-3 py-1 text-sm">
                {currentImageIndex + 1} / {pastEvents[currentEventIndex].images.length}
              </div>
            )}

            {/* Image */}
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Event preview"
                className="max-w-full max-h-[80vh] md:max-h-[90vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= Upcoming Events ================= */}
      <section aria-labelledby="upcoming-events-heading">
        <h2
          id="upcoming-events-heading"
          className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100"
        >
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <Card
              key={event.id}
              className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-0">
                <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100 mb-2">
                  {event.title}
                </h3>
                <div className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300 mb-4">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-500" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={16} className="text-blue-500" />
                    {event.location}
                  </span>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200">
                  Register Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= Past Events ================= */}
      <section aria-labelledby="past-events-heading">
        <div className="flex items-center justify-between mb-6">
          <h2
            id="past-events-heading"
            className="text-2xl font-bold text-slate-800 dark:text-slate-100"
          >
            Past Events
          </h2>
          <Button
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-medium transition-colors duration-200"
          >
            Our Past Events
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
          {(showAllPast ? pastEvents : pastEvents.slice(0, 2)).map((event, eventIndex) => (
            <Card
              key={event.id}
              className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-0">
                <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100 mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  {event.caption}
                </p>

                {/* Event Images */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {event.images.map((img, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="cursor-pointer rounded-lg overflow-hidden"
                      onClick={() => handleImageClick(img, eventIndex, imageIndex)}
                    >
                      <img
                        src={img}
                        alt={`${event.title} image ${imageIndex + 1}`}
                        className="w-full h-full  object-cover transition-transform duration-200 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                <Button className="bg-blue-800 hover:bg-blue-900 text-white font-medium transition-colors duration-200">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        {!showAllPast && pastEvents.length > 2 && (
          <div className="flex justify-center pt-6">
            <Button
              onClick={() => setShowAllPast(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200"
            >
              Show More Past Events
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default EventDirectory;