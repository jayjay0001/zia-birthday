import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const rsvpSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  adults: z.string(),
  children: z.string(),
  message: z.string().optional(),
});

type RSVPFormValues = z.infer<typeof rsvpSchema>;

export const RSVPScene = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const { register, handleSubmit, formState: { errors } } = useForm<RSVPFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { adults: '1', children: '0' }
  });

  const onSubmit = (data: RSVPFormValues) => {
    setStatus('submitting');
    console.log("RSVP Data:", data);
    // Simulate network request
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] relative py-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-xl bg-white/70 backdrop-blur-xl border-2 border-pink-300 rounded-3xl p-8 md:p-12 shadow-[0_10px_30px_rgba(255,105,180,0.3)] relative overflow-hidden"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-pink-600 font-bold mb-2 text-center drop-shadow-[0_2px_5px_rgba(255,105,180,0.3)] relative z-10">
          RSVP
        </h2>
        <p className="text-pink-800 font-bold font-sans text-sm tracking-wider text-center mb-8 relative z-10">
          Kindly reply by August 1st
        </p>

        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10 relative z-10"
          >
            <MailOpen className="w-16 h-16 text-pink-500 mx-auto mb-6" />
            <h3 className="text-2xl font-serif text-pink-600 font-bold mb-2">Message Sent</h3>
            <p className="text-pink-800 font-sans font-medium">Thank you! The kingdom has received your reply.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 relative z-10">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-pink-600 font-bold uppercase tracking-widest pl-2">Guest Name</label>
              <input 
                {...register('name')}
                placeholder="Lord or Lady..." 
                className={`w-full bg-white/60 border-2 ${errors.name ? 'border-red-500' : 'border-pink-200'} rounded-xl px-4 py-3 text-pink-900 placeholder:text-pink-300 focus:outline-none focus:border-pink-500 transition-colors`} 
              />
              {errors.name && <span className="text-red-400 text-xs pl-2">{errors.name.message}</span>}
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-xs text-pink-600 font-bold uppercase tracking-widest pl-2">Adults</label>
                <select {...register('adults')} className="w-full bg-white/60 border-2 border-pink-200 rounded-xl px-4 py-3 text-pink-900 focus:outline-none focus:border-pink-500 transition-colors appearance-none cursor-pointer">
                  {[0,1,2,3,4].map(n => <option key={`a-${n}`} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-xs text-pink-600 font-bold uppercase tracking-widest pl-2">Children</label>
                <select {...register('children')} className="w-full bg-white/60 border-2 border-pink-200 rounded-xl px-4 py-3 text-pink-900 focus:outline-none focus:border-pink-500 transition-colors appearance-none cursor-pointer">
                  {[0,1,2,3,4].map(n => <option key={`c-${n}`} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-pink-600 font-bold uppercase tracking-widest pl-2">Message for the Princess</label>
              <textarea 
                {...register('message')}
                placeholder="Leave a little note..." 
                rows={3} 
                className="w-full bg-white/60 border-2 border-pink-200 rounded-xl px-4 py-3 text-pink-900 placeholder:text-pink-300 focus:outline-none focus:border-pink-500 transition-colors resize-none"
              />
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 bg-pink-500 text-white font-serif font-bold text-lg tracking-widest rounded-full shadow-[0_0_20px_rgba(255,105,180,0.4)] hover:shadow-[0_0_30px_rgba(255,105,180,0.6)] hover:bg-pink-400 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending...' : 'Joyfully Accept'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
