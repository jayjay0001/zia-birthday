import React from 'react';
import { motion } from 'framer-motion';
import { TEMPLATE_CONFIG } from '../../config/template';
import { MapPin, Calendar, Clock, ExternalLink } from 'lucide-react';

export const DetailsScene = () => {
  const { eventDetails } = TEMPLATE_CONFIG;

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] relative py-10">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        animate={{ y: [0, -10, 0] }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut", y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        className="relative w-full max-w-2xl bg-white/50 backdrop-blur-2xl border-y-2 border-pink-300 py-12 px-6 md:px-16 text-center overflow-hidden rounded-3xl shadow-[0_10px_30px_rgba(255,105,180,0.3)]"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-pink-600 font-bold mb-10 drop-shadow-[0_2px_5px_rgba(255,105,180,0.3)]">
          Event Details
        </h2>

        <div className="flex flex-col gap-8 mb-10">
          <div className="flex flex-col items-center">
            <Calendar className="text-pink-500 w-8 h-8 mb-3" />
            <p className="text-pink-600 font-bold font-sans text-xs tracking-[0.3em] uppercase mb-1">Date</p>
            <p className="text-xl md:text-2xl font-serif text-pink-800 font-bold">{eventDetails.date}</p>
          </div>

          <div className="flex flex-col items-center">
            <Clock className="text-pink-500 w-8 h-8 mb-3" />
            <p className="text-pink-600 font-bold font-sans text-xs tracking-[0.3em] uppercase mb-1">Time</p>
            <p className="text-xl md:text-2xl font-serif text-pink-800 font-bold">{eventDetails.time}</p>
          </div>

          <div className="flex flex-col items-center">
            <MapPin className="text-pink-500 w-8 h-8 mb-3" />
            <p className="text-pink-600 font-bold font-sans text-xs tracking-[0.3em] uppercase mb-1">Location</p>
            <p className="text-xl md:text-2xl font-serif text-pink-800 font-bold mb-1">{eventDetails.venue}</p>
            <p className="text-sm font-sans font-medium text-pink-700">{eventDetails.address}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 border-t-2 border-pink-200 pt-8 mt-4">
          <a 
            href={eventDetails.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-pink-100 border-2 border-pink-300 rounded-full text-pink-600 font-bold font-sans text-sm tracking-wider uppercase hover:bg-pink-200 hover:border-pink-500 transition-all active:scale-95 shadow-sm"
          >
            <MapPin className="w-4 h-4" /> Open Maps
          </a>
          <a 
            href={eventDetails.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-pink-100 border-2 border-pink-300 rounded-full text-pink-600 font-bold font-sans text-sm tracking-wider uppercase hover:bg-pink-200 hover:border-pink-500 transition-all active:scale-95 shadow-sm"
          >
            <Calendar className="w-4 h-4" /> Add to Calendar
          </a>
        </div>
      </motion.div>
    </div>
  );
};
