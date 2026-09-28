import React, { useState } from 'react';
import { X, Check, ArrowRight, Layers, Database, Server, Monitor, ShieldCheck, Terminal, Cpu, Info, CheckCircle2, Play, RefreshCw } from 'lucide-react';
import { ProjectSample } from '../types';

interface ProjectDetailModalProps {
  project: ProjectSample | null;
  onClose: () => void;
  onRequestSimilar: (project: ProjectSample) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onRequestSimilar,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulation' | 'tech' | 'process'>('overview');
  const [simulatedFilter, setSimulatedFilter] = useState('All');
  const [isSimulating, setIsSimulating] = useState(false);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden ring-1 ring-white/10"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold">
              {project.typeLabel}
            </span>
            <span className="text-xs font-mono text-slate-500">·</span>
            <span className="text-xs font-mono text-slate-300">{project.projectType}</span>
            <span className="text-xs font-mono text-slate-500">·</span>
            <span className="text-xs font-mono text-emerald-400">{project.projectStatus}</span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Subheader with Project Title */}
        <div className="px-6 py-5 border-b border-slate-800/80 bg-slate-900/90 shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">{project.title}</h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">{project.shortDescription}</p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <button
                onClick={() => onRequestSimilar(project)}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all"
              >
                <span>Build This Solution</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-5 flex items-center gap-2 border-b border-slate-800 -mb-5 pb-0 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Overview & Solution
            </button>
            <button
              onClick={() => setActiveTab('simulation')}
              className={`pb-3 px-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'simulation'
                  ? 'border-indigo-500 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Interactive Mockup
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`pb-3 px-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'tech'
                  ? 'border-indigo-500 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Architecture & Stack
            </button>
            <button
              onClick={() => setActiveTab('process')}
              className={`pb-3 px-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'process'
                  ? 'border-indigo-500 text-white font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Engineering Delivery
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-300">
          {/* Important Sample Notice */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 flex items-start gap-3 text-xs">
            <Info className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-semibold text-slate-200">Specification & Reference Blueprint:</span>
              <p className="text-slate-400 leading-relaxed">
                This project represents a sample solution demonstrating the architectural design, feature scope, and data flow SoftwareDeveloper@077 can develop for your organization.
              </p>
            </div>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Problem vs Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-rose-950/40 bg-rose-950/10 p-5 space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold">
                    The Business Problem
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{project.businessProblem}</p>
                </div>

                <div className="rounded-xl border border-indigo-950/50 bg-indigo-950/15 p-5 space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-semibold">
                    The Engineered Solution
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{project.solution}</p>
                </div>
              </div>

              {/* Full Overview */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wide text-slate-400">Detailed Scope</h4>
                <p className="text-sm text-slate-300 leading-relaxed">{project.fullOverview}</p>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wide text-slate-400">Key Functional Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-200 bg-slate-950/80 p-3 rounded-xl border border-slate-800"
                    >
                      <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'simulation' && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 sm:p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div className="font-mono text-xs text-indigo-400 flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    <span className="font-bold">{project.uiMockup.headline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsSimulating(true);
                        setTimeout(() => setIsSimulating(false), 300);
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 hover:text-white"
                    >
                      <RefreshCw className={`h-3 w-3 ${isSimulating ? 'animate-spin text-indigo-400' : ''}`} />
                      <span>Simulate Tick</span>
                    </button>
                  </div>
                </div>

                {/* Simulated Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.uiMockup.metrics.map((metric, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                      <span className="text-[11px] text-slate-400 block">{metric.label}</span>
                      <span className="text-xl font-bold font-mono text-white block">{metric.value}</span>
                      <span className="text-[10px] text-indigo-300 block">{metric.change}</span>
                    </div>
                  ))}
                </div>

                {/* Subsystem Modules */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono text-slate-400">Integrated Functional Modules:</span>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    {project.uiMockup.keyModules.map((mod, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium">
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Simulated Feed */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400">Live Simulated Event Feed:</span>
                  <div className="space-y-2">
                    {project.uiMockup.recentActivity.map((act, i) => (
                      <div key={i} className="text-xs font-mono text-slate-300 bg-slate-900/80 px-3.5 py-2.5 rounded-lg border border-slate-800/80 flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="space-y-5">
              <h4 className="text-xs font-mono uppercase tracking-wide text-slate-400">Full Architectural Stack</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs font-mono">
                    <Monitor className="h-4 w-4 text-indigo-400" /> Frontend Layer
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.techStack.frontend.map((t, i) => (
                      <span key={i} className="text-xs font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-700/80 text-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs font-mono">
                    <Server className="h-4 w-4 text-cyan-400" /> Backend Engine
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.techStack.backend.map((t, i) => (
                      <span key={i} className="text-xs font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-700/80 text-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs font-mono">
                    <Database className="h-4 w-4 text-emerald-400" /> Database & Storage
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.techStack.database.map((t, i) => (
                      <span key={i} className="text-xs font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-700/80 text-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs font-mono">
                    <Cpu className="h-4 w-4 text-amber-400" /> Deployment & DevOps
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {(project.techStack.devops || ['Docker', 'Cloud Hosting']).map((t, i) => (
                      <span key={i} className="text-xs font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-700/80 text-slate-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wide text-slate-400">
                Turnkey Engineering Milestones for This Solution
              </h4>
              <div className="space-y-3">
                {project.developmentProcess.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <span className="font-mono text-indigo-400 font-bold shrink-0 text-sm">0{idx + 1}.</span>
                    <span className="text-slate-300 leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/90 shrink-0 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            Back to Showcase
          </button>

          <button
            onClick={() => onRequestSimilar(project)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-2.5 text-xs font-semibold text-white hover:from-indigo-500 hover:to-indigo-400 transition-all shadow-md shadow-indigo-600/30"
          >
            <span>Request Custom Build for This Solution</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
