import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, User, ArrowUpRight, ShieldCheck, Terminal, MessageSquare, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { storageService } from '../services/storage';

interface ContactSectionProps {
  onGoToProjectEnquiry: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onGoToProjectEnquiry }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please provide your name, email, and message.');
      return;
    }

    storageService.saveMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'General Inquiry',
      message: formData.message,
    });

    setSubmitted(true);
    setError('');
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-900/40 border-b border-slate-800/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Company & Founder Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-indigo-400 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                <span>Direct Leadership Contact</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                Connect with SoftwareDeveloper@077
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Whether you need a high-level feasibility review or have an immediate software specification ready for development, reach out directly to our leadership.
              </p>
            </div>

            {/* Verified Contact Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 sm:p-7 space-y-6 shadow-xl ring-1 ring-white/5">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Engineering Studio
                </div>
                <div className="text-lg font-mono font-bold text-white mt-0.5">
                  {COMPANY_INFO.name}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-1">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Founder & Technical Lead
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-200">
                  <User className="h-4 w-4 text-indigo-400" />
                  <span>{COMPANY_INFO.founder.name}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Direct Founder Email
                </div>
                <a
                  href={`mailto:${COMPANY_INFO.founder.email}`}
                  className="inline-flex items-center gap-2.5 text-sm font-mono text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">{COMPANY_INFO.founder.email}</span>
                </a>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:${COMPANY_INFO.founder.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-3 text-xs font-semibold text-white hover:from-indigo-500 hover:to-indigo-400 transition-all shadow-md shadow-indigo-600/30"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send Direct Email</span>
                </a>

                <button
                  onClick={onGoToProjectEnquiry}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <span>Project Enquiry Form</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="text-xs font-mono text-slate-400 flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-indigo-400 shrink-0" />
              <span>Direct engineer response. No sales spam or intermediaries.</span>
            </div>
          </div>

          {/* Right Column: General Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 sm:p-8 shadow-xl ring-1 ring-white/5">
              <h3 className="text-base font-bold text-white mb-1">Send a Direct Message</h3>
              <p className="text-xs text-slate-400 mb-6">
                Have a question or looking to discuss technical collaboration? Leave a note here.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 text-center space-y-3.5">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Message Logged Successfully</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Your note has been recorded and routed directly to Founder Parmeshwar Metkar. We will follow up via email shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-3 text-xs font-medium text-indigo-400 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-900/50 text-xs text-rose-300">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Your Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Your Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Inquiring about custom inventory software"
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Message</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 p-3.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-semibold text-white hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30 active:scale-[0.98]"
                  >
                    <span>Send Message</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
