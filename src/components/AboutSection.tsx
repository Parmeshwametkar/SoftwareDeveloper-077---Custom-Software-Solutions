import React from 'react';
import { Mail, CheckCircle2, User, Layers, ArrowRight, ShieldCheck, Code2, Cpu, Database, GitBranch } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface AboutSectionProps {
  onRequestConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onRequestConsultation }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-slate-900/40 border-b border-slate-800/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3.5">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-indigo-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            <span>Company Profile</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            About SoftwareDeveloper@077
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {COMPANY_INFO.overview}
          </p>
        </div>

        {/* 2-Column: Founder Card & Core Engineering Disciplines */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Founder Card (Strictly Factual) */}
          <div className="lg:col-span-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-6 sm:p-7 space-y-6 shadow-xl ring-1 ring-white/5">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500/25 to-blue-600/10 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shadow-inner shrink-0">
                <User className="h-8 w-8 text-indigo-400" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                  Founder & Technical Lead
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">{COMPANY_INFO.founder.name}</h3>
                <p className="text-xs text-slate-400 font-mono">SoftwareDeveloper@077</p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed">
              <p>
                Leading SoftwareDeveloper@077 with a hands-on architectural approach. Directly involved in understanding client project requirements, designing software structures, and ensuring quality execution across our developer squad.
              </p>
              
              <div className="pt-2 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-300 truncate">
                  <Mail className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                  <a
                    href={`mailto:${COMPANY_INFO.founder.email}`}
                    className="hover:underline hover:text-white transition-colors truncate"
                  >
                    {COMPANY_INFO.founder.email}
                  </a>
                </div>
                <a
                  href={`mailto:${COMPANY_INFO.founder.email}`}
                  className="text-[10px] font-mono uppercase font-bold text-indigo-400 hover:text-indigo-300 shrink-0 ml-2"
                >
                  Email →
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
                Direct Engineering Collaboration
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Work directly with software engineers, avoiding intermediate sales layers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Full intellectual property & source code ownership delivered to client.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Agile sprint demos and staging environments throughout development.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Complete Lifecycle Disciplines */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Complete End-to-End Engineering Disciplines
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  We handle every stage of your custom software system with disciplined engineering rigor.
                </p>
              </div>
              <div className="text-xs font-mono text-indigo-400">8 Integrated Phases</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COMPANY_INFO.engineeringScope.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800/90 bg-slate-950/70 p-4 space-y-2 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 text-white font-semibold text-sm group-hover:text-indigo-300 transition-colors">
                      <span className="font-mono text-xs text-indigo-400 font-bold">0{idx + 1}.</span>
                      <span>{item.title}</span>
                    </div>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 opacity-80 group-hover:opacity-100" />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Callout Bar */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-300 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Ready to review your software project requirements with our engineering team?</span>
              </div>
              <button
                onClick={onRequestConsultation}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors shrink-0"
              >
                <span>Request a consultation</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
