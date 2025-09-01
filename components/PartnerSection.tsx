'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users, Handshake, ArrowRight, Building2, MapPin, Star } from 'lucide-react';

const PartnerSection = () => {
  // Sample partner data - replace with your actual data
  const partners = [
    {
      id: 1,
      name: 'FitPro Bangladesh',
      type: 'Fitness Center',
      location: 'Dhaka',
      rating: 4.8,
      collaborations: 12
    },
    {
      id: 2,
      name: 'Yoga Wellness Studio',
      type: 'Yoga Institute',
      location: 'Chittagong',
      rating: 4.9,
      collaborations: 8
    },
    {
      id: 3,
      name: 'Nutrition Hub BD',
      type: 'Nutrition Center',
      location: 'Sylhet',
      rating: 4.7,
      collaborations: 5
    },
    {
      id: 4,
      name: 'Elite Training Academy',
      type: 'Training Institute',
      location: 'Dhaka',
      rating: 4.6,
      collaborations: 15
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Partnership Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
                <Handshake size={18} />
                Collaboration Opportunities
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white">
                PARTNER WITH US
              </h2>
              
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                Collaborate with us to share skills and create impact nationwide.
              </p>
            </div>

            

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold text-lg flex items-center gap-2 group">
                SUBMIT YOUR INTEREST
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 font-semibold text-lg flex items-center gap-2">
                EXISTING PARTNER DIRECTORY
                <Users size={20} />
              </Button>
            </div>
          </motion.div>

          {/* Right Side - Partner Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <Building2 size={24} className="text-blue-600" />
                Featured Partners
              </h3>
              
              <div className="space-y-4">
                {partners.map((partner) => (
                  <div key={partner.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-600 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 dark:text-white">{partner.name}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-600 dark:text-slate-300">
                        <span className="flex items-center gap-1">
                          <Building2 size={14} />
                          {partner.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {partner.location}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                          <Star size={14} className="text-yellow-400 fill-current" />
                          {partner.rating}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Rating</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-slate-600 dark:text-slate-300">{partner.collaborations}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Projects</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-slate-700 flex items-center gap-2">
                  View All Partners
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-600 text-white rounded-xl p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold">50+</div>
                <div className="text-sm opacity-90">Active Partners</div>
              </div>
              <div className="bg-slate-800 dark:bg-slate-700 text-white rounded-xl p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold">100+</div>
                <div className="text-sm opacity-90">Collaborations</div>
              </div>
            </div>
          </motion.div>
        </div>

       
      </div>
    </section>
  );
};

export default PartnerSection;