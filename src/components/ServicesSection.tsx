import React, { useState } from 'react';
import { ArrowRight, Search, X, Check, Code2, Globe, Briefcase, Building2, Landmark, Users, Package, Receipt, Cpu, Server, Database, Wrench } from 'lucide-react';
import { SERVICES_DATA } from '../data/companyData';
import { ServiceItem } from '../types';
import { DynamicIcon } from './IconHelper';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServicesSectionProps {
  onSelectServiceToInquire: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToInquire }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'core' | 'enterprise' | 'industry' | 'backend'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Services (12)' },
    { id: 'core', label: 'Core Engineering' },
    { id: 'enterprise', label: 'Enterprise Systems' },
    { id: 'industry', label: 'Industry Management' },
    { id: 'backend', label: 'Backend & Data' },
  ];

  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesQuery =
      searchQuery === '' ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleInquireFromModal = (service: ServiceItem) => {
    setActiveModalService(null);
    onSelectServiceToInquire(service.title);
  };

  return (
    <section id="services" className="py-20 lg:py-28 border-b border-slate-800/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-800/80">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-indigo-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              <span>Full-Spectrum Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Software Services Tailored to Your Needs
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              We engineer custom software systems from scratch or modernize existing platforms, tailored precisely to your operational workflows and business rules.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by capability, e.g. Billing, CRM..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-10 pr-9 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Segmented Controls */}
        <div className="mt-8 flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800/80 w-fit backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid (12 Services) */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 hover:border-indigo-500/40 hover:bg-slate-900/90 transition-all duration-200 shadow-sm hover:shadow-xl hover:shadow-indigo-950/20"
            >
              <div className="space-y-4">
                {/* Header Icon & Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-600/10 border border-indigo-500/30 text-indigo-400 group-hover:from-indigo-500/30 group-hover:border-indigo-400 transition-all shadow-inner">
                    <DynamicIcon name={service.icon} className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/80 text-slate-300">
                    {service.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors leading-snug">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs text-slate-300 leading-relaxed min-h-[48px]">
                  {service.shortDescription}
                </p>

                {/* Highlights (quiet text) */}
                <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
                  {service.keyCapabilities.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="text-[11px] text-slate-400 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalService(service)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors focus-visible:outline-none"
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => onSelectServiceToInquire(service.title)}
                  className="text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
                >
                  Start Project →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if search finds nothing */}
        {filteredServices.length === 0 && (
          <div className="mt-12 text-center py-16 rounded-2xl border border-dashed border-slate-800 bg-slate-900/40">
            <p className="text-sm text-slate-300">No services match your search query "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs font-medium text-indigo-400 hover:underline"
            >
              Reset filters & search
            </button>
          </div>
        )}
      </div>

      {/* Modal for detailed service view */}
      <ServiceDetailModal
        service={activeModalService}
        onClose={() => setActiveModalService(null)}
        onInquireForService={handleInquireFromModal}
      />
    </section>
  );
};
