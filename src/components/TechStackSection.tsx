import React, { useState } from 'react';
import { Layers, Terminal, Database, Cloud, Code2, CheckCircle2, Info, Sparkles } from 'lucide-react';
import { TECH_STACK_DATA } from '../data/companyData';

export const TechStackSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Cloud / DevOps'];

  const displayedStacks = TECH_STACK_DATA.filter((cat) => {
    if (activeCategory === 'All') return true;
    return cat.category === activeCategory;
  });

  return (
    <section id="tech-stack" className="py-20 lg:py-28 bg-slate-900/30 border-b border-slate-800/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3.5">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-indigo-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            <span>Modern Engineering Toolkit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Technology Stack We Work With
          </h2>
          <p className="text-base text-slate-300">
            Our engineering team selects proven languages, frameworks, databases, and deployment platforms based on the exact scale, performance, and security profile your business application requires.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-8 flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800/80 w-fit backdrop-blur-md">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeCategory === c
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Stack Groups */}
        <div className="mt-10 space-y-10">
          {displayedStacks.map((group) => (
            <div key={group.category} className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-lg font-bold text-white tracking-tight">{group.category}</h3>
                  <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                    {group.items.length} tools
                  </span>
                </div>
                <p className="text-xs text-slate-400">{group.description}</p>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-800/80 bg-slate-950/70 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all duration-200 flex flex-col justify-between space-y-3 group shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-white group-hover:text-indigo-200 transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-300 bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800">
                          {item.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 pt-3 border-t border-slate-900">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>Ready for production builds</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Factual Transparency Notice */}
        <div className="mt-12 rounded-xl bg-slate-950 border border-slate-800 p-4 flex items-start gap-3 text-xs text-slate-300">
          <Info className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-white">Engineering Scope Transparency:</strong> These technologies represent modern frameworks and infrastructure tools SoftwareDeveloper@077's developers can implement and maintain for your project, rather than claims about prior client software.
          </div>
        </div>
      </div>
    </section>
  );
};
