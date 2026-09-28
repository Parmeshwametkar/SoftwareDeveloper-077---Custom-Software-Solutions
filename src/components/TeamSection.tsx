import React from 'react';
import { Users, Mail, Shield, CheckCircle2, Terminal, Code2, Cpu } from 'lucide-react';
import { TEAM_ROLES_DATA, COMPANY_INFO } from '../data/companyData';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-20 lg:py-28 bg-slate-900/30 border-b border-slate-800/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3.5">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-indigo-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            <span>Compact Expert Engineering Squad</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Our Engineering Team
          </h2>
          <p className="text-base text-slate-300">
            SoftwareDeveloper@077 operates as a focused, high-discipline team of approximately 10 developers and engineers. We combine deep architectural leadership with dedicated domain specialists.
          </p>
        </div>

        {/* Founder Highlight Banner */}
        <div className="mt-12 rounded-2xl border border-indigo-900/60 bg-gradient-to-r from-indigo-950/40 via-slate-900/90 to-slate-900/80 p-6 sm:p-8 shadow-xl ring-1 ring-white/5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>FOUNDER & TECHNICAL LEAD</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {COMPANY_INFO.founder.name}
              </h3>
              <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                Directly orchestrates system architecture, client technical discovery, database design, and code quality across our development team.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
              <div className="flex items-center gap-2.5 text-xs font-mono text-slate-200 bg-slate-950/90 px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm">
                <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.founder.email}`} className="hover:text-white transition-colors truncate">
                  {COMPANY_INFO.founder.email}
                </a>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Squad Size: <span className="text-indigo-300 font-medium">{COMPANY_INFO.teamSizeText}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Roles Grid (No invented names - authentic role titles) */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEAM_ROLES_DATA.filter((role) => !role.isFounder).map((member) => (
            <div
              key={member.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-950/70 p-5 space-y-4 hover:border-indigo-500/40 hover:bg-slate-900/80 transition-all duration-200 shadow-sm group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-indigo-400 font-semibold px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                    {member.count}
                  </span>
                  <Terminal className="h-4 w-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-200 transition-colors">
                    {member.role}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">{member.focusArea}</p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Key Focus:
                  </div>
                  {member.responsibilities.slice(0, 2).map((res, i) => (
                    <div key={i} className="text-xs text-slate-300 flex items-start gap-1.5 leading-snug">
                      <span className="text-indigo-400 mt-0.5">•</span>
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-900">
                <div className="flex flex-wrap gap-1 text-[10px] font-mono text-slate-400">
                  {member.coreSkills.map((skill, sIdx) => (
                    <span key={sIdx} className="bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Philosophy Note */}
        <div className="mt-8 text-center text-xs text-slate-400 font-mono">
          Zero bureaucratic overhead. Every team member designs, tests, or deploys production-grade software solutions.
        </div>
      </div>
    </section>
  );
};
