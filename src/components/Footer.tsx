import React from 'react';
import { Terminal, Mail, User, ArrowUp, Shield } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToSection, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'Tech Stack', id: 'tech-stack' },
    { label: 'Process', id: 'process' },
    { label: 'Team', id: 'team' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs relative overflow-hidden">
      {/* Subtle bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Brand & Motto Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-600/10 border border-indigo-500/30 text-indigo-400 shadow-inner">
                <Terminal className="h-4 w-4" />
              </div>
              <div className="font-mono text-sm font-extrabold tracking-tight">
                <span>SOFTWAREDEVELOPER</span>
                <span className="text-indigo-400">@077</span>
              </div>
            </div>

            <p className="text-slate-200 text-sm max-w-sm leading-relaxed font-medium">
              "Building practical software solutions for modern businesses."
            </p>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {COMPANY_INFO.mission}
            </p>

            <div className="pt-2 text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Compact squad of ~10 engineers · Custom development studio</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs uppercase tracking-wider text-slate-200 font-semibold">
              Navigation
            </div>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigateToSection(link.id)}
                    className="hover:text-white transition-colors text-slate-400"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Founder & Direct Inquiry */}
          <div className="md:col-span-4 space-y-3.5">
            <div className="font-mono text-xs uppercase tracking-wider text-slate-200 font-semibold">
              Leadership & Direct Inquiries
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-indigo-400" />
                <span>Founder: <strong className="text-white">{COMPANY_INFO.founder.name}</strong></span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Mail className="h-3.5 w-3.5 text-indigo-400" />
                <a
                  href={`mailto:${COMPANY_INFO.founder.email}`}
                  className="text-indigo-400 hover:text-indigo-300 hover:underline"
                >
                  {COMPANY_INFO.founder.email}
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-900 flex items-center gap-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-amber-300 transition-colors bg-slate-900 hover:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-800"
              >
                <Shield className="h-3.5 w-3.5 text-amber-400" />
                <span>Admin Demonstration Workspace</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono text-slate-400">Production SaaS Architecture</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
