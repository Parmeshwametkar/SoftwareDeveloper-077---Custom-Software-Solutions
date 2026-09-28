import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Milestone, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { DEVELOPMENT_PROCESS_STEPS } from '../data/companyData';

export const DevelopmentProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>('01');

  return (
    <section id="process" className="py-20 lg:py-28 border-b border-slate-800/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3.5">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-indigo-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            <span>Structured Execution Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Our 6-Step Development Process
          </h2>
          <p className="text-base text-slate-300">
            A disciplined, transparent execution cycle designed to turn your business requirements into reliable, maintainable software without surprises or missed milestones.
          </p>
        </div>

        {/* 6-Step Visual Timeline */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {DEVELOPMENT_PROCESS_STEPS.map((stepItem, idx) => (
            <div
              key={stepItem.step}
              onClick={() => setActiveStep(stepItem.step)}
              className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-200 cursor-pointer ${
                activeStep === stepItem.step
                  ? 'border-indigo-500/60 bg-slate-900/95 shadow-xl shadow-indigo-950/30 ring-1 ring-indigo-500/30'
                  : 'border-slate-800/80 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              <div className="space-y-4">
                {/* Step Number & Header */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-black text-indigo-400/90 tracking-tighter">
                    {stepItem.step}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800">
                    Stage {idx + 1} of 6
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {stepItem.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs text-slate-300 leading-relaxed min-h-[48px]">
                  {stepItem.shortDesc}
                </p>

                {/* Concrete Activities */}
                <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Engineering Activities:
                  </div>
                  {stepItem.activities.map((act, aIdx) => (
                    <div key={aIdx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <span className="leading-snug">{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverable Tag */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Deliverable Checkpoint:
                </div>
                <div className="mt-1.5 text-xs font-mono font-semibold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="truncate">{stepItem.deliverable}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lifecycle Bottom Summary Bar */}
        <div className="mt-12 rounded-2xl bg-slate-900/80 border border-slate-800/90 p-6 flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Milestone className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Full Transparency at Every Milestone</div>
              <p className="text-xs text-slate-400 mt-0.5">
                Staging environments, weekly sprint reviews, and direct developer communication from Day 1 to Production.
              </p>
            </div>
          </div>
          <div className="text-xs font-mono text-indigo-300 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800/80 whitespace-nowrap shadow-inner">
            Requirement → Planning → UI/UX → Dev → QA/Deploy → Support
          </div>
        </div>
      </div>
    </section>
  );
};
