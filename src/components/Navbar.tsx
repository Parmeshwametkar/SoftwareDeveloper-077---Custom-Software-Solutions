import React, { useState, useEffect } from 'react';
import { Terminal, Shield, ArrowUpRight, Menu, X, Sparkles, Code2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface NavbarProps {
  currentView: 'public' | 'admin';
  onViewChange: (view: 'public' | 'admin') => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, onNavigateToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'Tech Stack', id: 'tech-stack' },
    { label: 'Process', id: 'process' },
    { label: 'Team', id: 'team' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'public') {
      onViewChange('public');
      setTimeout(() => onNavigateToSection(id), 120);
    } else {
      onNavigateToSection(id);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/30'
          : 'bg-slate-950/60 backdrop-blur-md border-b border-slate-900/60'
      }`}
    >
      {/* Top micro announcement bar */}
      <div className="hidden md:flex items-center justify-between px-4 sm:px-6 lg:px-8 py-1.5 bg-slate-900/40 border-b border-slate-800/40 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 font-medium">Bespoke Software Engineering Studio</span>
          <span className="text-slate-600">·</span>
          <span>Compact Expert Team (~10 Developers)</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400">Founder: <strong className="text-slate-200">{COMPANY_INFO.founder.name}</strong></span>
          <span className="text-slate-600">·</span>
          <a
            href={`mailto:${COMPANY_INFO.founder.email}`}
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {COMPANY_INFO.founder.email}
          </a>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="group flex items-center gap-3 text-left transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-600/10 border border-indigo-500/40 text-indigo-400 shadow-inner group-hover:border-indigo-400 group-hover:from-indigo-500/30 transition-all">
            <Terminal className="h-5 w-5 group-hover:scale-105 transition-transform" />
            <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-indigo-500 shadow-sm shadow-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-1 font-mono text-sm font-extrabold tracking-tight text-white group-hover:text-slate-100">
              <span>SOFTWAREDEVELOPER</span>
              <span className="text-indigo-400 group-hover:text-indigo-300">@077</span>
            </div>
            <span className="block text-[10px] tracking-wider uppercase text-slate-400 font-medium">
              Custom Software Solutions
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-900/60 rounded-full border border-slate-800/80 text-xs font-medium text-slate-300 backdrop-blur-md">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="px-3.5 py-1.5 rounded-full transition-all hover:text-white hover:bg-slate-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Admin Demo Portal Toggle */}
          <button
            onClick={() => onViewChange(currentView === 'admin' ? 'public' : 'admin')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
              currentView === 'admin'
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-sm shadow-amber-500/20'
                : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
            title="Open Interactive Admin Dashboard Demo"
          >
            <Shield className="h-3.5 w-3.5 text-amber-400" />
            <span>{currentView === 'admin' ? 'Exit Admin View' : 'Demo Admin'}</span>
          </button>

          {/* Primary Request CTA */}
          <button
            onClick={() => handleLinkClick('request-project')}
            className="relative group overflow-hidden flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/25 hover:from-indigo-500 hover:to-indigo-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 active:scale-[0.98]"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => onViewChange(currentView === 'admin' ? 'public' : 'admin')}
            className={`p-2 rounded-lg border text-xs ${
              currentView === 'admin'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
            aria-label="Admin Demo"
          >
            <Shield className="h-4 w-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white focus-visible:outline-none border border-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-5 pt-4 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs font-mono text-slate-400">
            <span>Direct Founder Contact</span>
            <a href={`mailto:${COMPANY_INFO.founder.email}`} className="text-indigo-400 hover:underline">
              {COMPANY_INFO.founder.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="rounded-lg px-3 py-2.5 text-left font-medium text-slate-300 hover:bg-slate-900 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
            <button
              onClick={() => handleLinkClick('request-project')}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onViewChange(currentView === 'admin' ? 'public' : 'admin');
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 border border-slate-800 py-2.5 text-xs font-mono text-slate-300 hover:bg-slate-800"
            >
              <Shield className="h-4 w-4 text-amber-400" />
              <span>{currentView === 'admin' ? 'Back to Public Website' : 'Open Admin Portal Demo'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
