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
        className="relative w-full max-w-2xl bg-white/5 backdrop-blur-2xl border-y border-princess-gold/30 py-12 px-6 md:px-16 text-center overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-princess-gold mb-10 drop-shadow-[0_0_10px_rgba(243,198,35,0.3)]">
          Event Details
        </h2>

        <div className="flex flex-col gap-8 mb-10">
          <div className="flex flex-col items-center">
            <Calendar className="text-princess-gold w-8 h-8 mb-3 opacity-80" />
            <p className="text-white/60 font-sans text-xs tracking-[0.3em] uppercase mb-1">Date</p>
            <p className="text-xl md:text-2xl font-serif text-white">{eventDetails.date}</p>
          </div>

          <div className="flex flex-col items-center">
            <Clock className="text-princess-gold w-8 h-8 mb-3 opacity-80" />
            <p className="text-white/60 font-sans text-xs tracking-[0.3em] uppercase mb-1">Time</p>
            <p className="text-xl md:text-2xl font-serif text-white">{eventDetails.time}</p>
          </div>

          <div className="flex flex-col items-center">
            <MapPin className="text-princess-gold w-8 h-8 mb-3 opacity-80" />
            <p className="text-white/60 font-sans text-xs tracking-[0.3em] uppercase mb-1">Location</p>
            <p className="text-xl md:text-2xl font-serif text-white mb-1">{eventDetails.venue}</p>
            <p className="text-sm font-sans text-white/70">{eventDetails.address}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 border-t border-white/10 pt-8 mt-4">
          <a 
            href={eventDetails.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/20 rounded-full text-white font-sans text-sm tracking-wider uppercase hover:bg-white/10 hover:border-princess-gold/50 transition-all active:scale-95"
          >
            <MapPin className="w-4 h-4" /> Open Maps
          </a>
          <a 
            href={eventDetails.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/20 rounded-full text-white font-sans text-sm tracking-wider uppercase hover:bg-white/10 hover:border-princess-gold/50 transition-all active:scale-95"
          >
            <Calendar className="w-4 h-4" /> Add to Calendar
          </a>
        </div>
      </motion.div>
    </div>
  );
};
