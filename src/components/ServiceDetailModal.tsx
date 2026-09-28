import React from 'react';
import { X, CheckCircle2, ArrowRight, Layers, FileCheck } from 'lucide-react';
import { ServiceItem } from '../types';
import { DynamicIcon } from './IconHelper';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onInquireForService: (service: ServiceItem) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onInquireForService,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl rounded-xl border border-slate-700 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 pr-8">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
            <DynamicIcon name={service.icon} className="h-6 w-6" />
          </div>
          <div>
            <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider">Service Specification</div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">{service.title}</h3>
          </div>
        </div>

        {/* Detailed Overview */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wide text-slate-400">Overview</h4>
          <p className="text-sm text-slate-300 leading-relaxed">{service.fullDescription}</p>
        </div>

        {/* Key Capabilities */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wide text-slate-400">Key Capabilities</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.keyCapabilities.map((cap, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-200 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wide text-slate-400">Expected Deliverables</h4>
          <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
            {service.deliverables.map((deliv, i) => (
              <span key={i} className="bg-slate-800 px-3 py-1.5 rounded-md border border-slate-700">
                {deliv}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => onInquireForService(service)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-sm"
          >
            <span>Inquire for This Service</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
