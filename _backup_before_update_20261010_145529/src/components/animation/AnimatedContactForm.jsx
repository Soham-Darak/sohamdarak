'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function AnimatedContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const formRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      if (successRef.current) {
        gsap.fromTo(
          successRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out',
          }
        );

        setTimeout(() => {
          gsap.to(successRef.current, { opacity: 0, duration: 0.5, delay: 2 });
          setStatus('idle');
        }, 2500);
      }
    }, 1000);
  };

  const inputClass =
    'w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all';

  return (
    <div ref={formRef} className="max-w-2xl mx-auto opacity-0">
      <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is this about?"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message..."
            required
            rows={5}
            className={`${inputClass} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full py-3 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-300 hover:scale-105"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {status === 'success' && (
        <div
          ref={successRef}
          className="mt-6 p-4 rounded-lg bg-green-600/20 border border-green-500/50 text-green-400 text-center opacity-0"
        >
          ✓ Message sent successfully! I'll get back to you soon.
        </div>
      )}
    </div>
  );
}
