import React, { useState } from 'react';
import { ArrowRight, Eye, Monitor, Layers, Info, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { PROJECTS_DATA } from '../data/companyData';
import { ProjectSample } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsSectionProps {
  onRequestProjectSolution: (projectTitle: string, projectType: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onRequestProjectSolution }) => {
  const [filter, setFilter] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectSample | null>(null);

  const filters = ['All', 'Hospitality', 'Finance & Billing', 'Operations & CRM', 'Healthcare'];

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'Hospitality') return p.projectType === 'Hotel Management';
    if (filter === 'Finance & Billing') return p.projectType === 'Banking/Finance' || p.projectType === 'Billing';
    if (filter === 'Operations & CRM') return p.projectType === 'Inventory' || p.projectType === 'CRM';
    if (filter === 'Healthcare') return p.projectType === 'Hospital Management';
    return true;
  });

  const handleRequestSimilar = (project: ProjectSample) => {
    setActiveProject(null);
    onRequestProjectSolution(project.title, project.projectType);
  };

  return (
    <section id="projects" className="py-20 lg:py-28 border-b border-slate-800/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-indigo-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              <span>Reference Architecture Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Software Solutions We Engineer
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Explore sample software specifications and operational systems demonstrating how we engineer reliable, custom web applications tailored to your business requirements.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800/80 backdrop-blur-md">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  filter === f
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Factual Notice of Sample Status */}
        <div className="mt-6 rounded-xl bg-slate-900/70 border border-slate-800/80 px-4 py-3.5 flex items-center gap-3 text-xs text-slate-300">
          <Info className="h-4 w-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-white">Sample Specifications & Reference Solutions:</strong> The architectures below demonstrate the functional scope, modules, and database structures SoftwareDeveloper@077 engineers for businesses. Every production system is custom-built to the client's exact requirements.
          </span>
        </div>

        {/* Project Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-900/60 overflow-hidden hover:border-indigo-500/40 hover:bg-slate-900/95 transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-indigo-950/20"
            >
              {/* Card Simulated Header */}
              <div className="p-5 border-b border-slate-800/90 bg-slate-950/80 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-amber-300 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/25">
                      {project.typeLabel}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-300 font-medium">{project.projectType}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    {project.projectStatus.split(' ')[0]}
                  </span>
                </div>

                {/* Simulated UI Window Preview with Live Telemetry */}
                <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3.5 space-y-2.5 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-2">
                    <span className="text-indigo-400 font-semibold truncate flex items-center gap-1.5">
                      <Monitor className="h-3.5 w-3.5" />
                      <span>{project.uiMockup.headline}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-sans">Module View</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    {project.previewStats.slice(0, 2).map((s, idx) => (
                      <div key={idx} className="bg-slate-950 p-2 rounded-lg border border-slate-800/80">
                        <span className="text-slate-500 block truncate">{s.label}</span>
                        <span className="text-slate-200 font-bold block text-[11px] mt-0.5">{s.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[10px] text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800/60 truncate flex items-center gap-1.5 font-sans">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="truncate">{project.uiMockup.recentActivity[0]}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4 flex-1">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-200 transition-colors tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-2">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Key Features Bullets */}
                <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Core Capabilities:
                  </div>
                  {project.keyFeatures.slice(0, 3).map((f, i) => (
                    <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                  {project.keyFeatures.length > 3 && (
                    <div className="text-[11px] text-slate-500 pl-5">
                      +{project.keyFeatures.length - 3} more modules in spec
                    </div>
                  )}
                </div>

                {/* Tech Stack Chips */}
                <div className="pt-2 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-slate-400">
                    {project.techStack.frontend.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {t}
                      </span>
                    ))}
                    {project.techStack.database.map((t, idx) => (
                      <span key={idx} className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-cyan-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3 bg-slate-950/60">
                <button
                  onClick={() => setActiveProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors focus-visible:outline-none"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>View Details</span>
                </button>

                <button
                  onClick={() => onRequestProjectSolution(project.title, project.projectType)}
                  className="inline-flex items-center gap-1 text-xs font-mono font-medium text-slate-300 hover:text-white transition-colors bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-800"
                >
                  <span>Build This</span>
                  <ArrowRight className="h-3 w-3 text-indigo-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onRequestSimilar={handleRequestSimilar}
      />
    </section>
  );
};
