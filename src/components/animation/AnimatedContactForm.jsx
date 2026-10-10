'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Loader2, Send, TriangleAlert } from 'lucide-react';

import { profile } from '@/data/portfolio';

// Optional: add NEXT_PUBLIC_WEB3FORMS_KEY to .env.local (free key from web3forms.com)
// to receive messages straight in your inbox. Without it, the form opens the visitor's email app.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function AnimatedContactForm() {
  const [formData, setFormData] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | success | opened | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    if (!WEB3FORMS_KEY) {
      const body = `${formData.message}\n\n— ${formData.name} (${formData.email})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(body)}`;
      setStatus('opened');
      return;
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...formData }),
      });
      const data = await res.json();
      if (!data.success) throw new Error('Request failed');
      setFormData(EMPTY);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-lg bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5 p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-md"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">Name</label>
            <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
            <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required className={inputClass} />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-slate-300 mb-2">Subject</label>
          <input id="subject" type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is this about?" required className={inputClass} />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-slate-300 mb-2">Message</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell me about your project or opportunity..." required rows={5} className={`${inputClass} resize-none`} />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold hover:brightness-110 disabled:opacity-60 transition cursor-pointer"
        >
          {status === 'sending' ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
          ) : (
            <><Send className="w-4 h-4" /> Send Message</>
          )}
        </button>

        <AnimatePresence>
          {status === 'success' && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 p-3 rounded-lg bg-green-600/15 border border-green-500/40 text-green-300 text-sm">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> Message sent! I&apos;ll get back to you soon.
            </motion.p>
          )}
          {status === 'opened' && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 p-3 rounded-lg bg-blue-600/15 border border-blue-500/40 text-blue-200 text-sm">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> Your email app should open with the message ready to send. If not, write to {profile.email}.
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 p-3 rounded-lg bg-red-600/15 border border-red-500/40 text-red-300 text-sm">
              <TriangleAlert className="w-4 h-4 shrink-0" /> Something went wrong. Please email me directly at {profile.email}.
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}