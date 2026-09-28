import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Sparkles, HelpCircle, FileCheck, Layers } from 'lucide-react';
import { PROJECT_TYPES_LIST } from '../data/companyData';
import { ProjectType, ProjectEnquiry } from '../types';
import { storageService } from '../services/storage';

interface ProjectEnquirySectionProps {
  initialProjectType?: ProjectType;
  initialNotes?: string;
  onViewInAdmin?: () => void;
}

export const ProjectEnquirySection: React.FC<ProjectEnquirySectionProps> = ({
  initialProjectType,
  initialNotes,
  onViewInAdmin,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    projectType: (initialProjectType || 'Custom Software') as ProjectType,
    businessType: '',
    projectDescription: initialNotes ? `Requirements regarding: ${initialNotes}\n` : '',
    requiredFeatures: '',
    preferredTechnology: '',
    estimatedBudget: '$10,000 - $25,000',
    expectedTimeline: '2 - 3 Months',
    additionalRequirements: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<ProjectEnquiry | null>(null);

  useEffect(() => {
    if (initialProjectType) {
      setFormData((prev) => ({ ...prev, projectType: initialProjectType }));
    }
    if (initialNotes) {
      setFormData((prev) => ({
        ...prev,
        projectDescription: prev.projectDescription ? `${prev.projectDescription}\nNote: ${initialNotes}` : `Note: ${initialNotes}`,
      }));
    }
  }, [initialProjectType, initialNotes]);

  const quickPresets = [
    { label: 'Hotel Management', type: 'Hotel Management' as ProjectType, desc: 'Room booking matrix, guest billing folio, and housekeeping status.' },
    { label: 'Banking & Ledger', type: 'Banking/Finance' as ProjectType, desc: 'Double-entry accounting, customer KYC records, and maker-checker audit.' },
    { label: 'Warehouse Inventory', type: 'Inventory' as ProjectType, desc: 'Real-time stock deduction, SKU barcode lookup, and supplier POs.' },
    { label: 'Billing & Invoice', type: 'Billing' as ProjectType, desc: 'Tax calculation, automated invoice PDF generation, and payment ledgers.' },
    { label: 'Custom CRM', type: 'CRM' as ProjectType, desc: 'Lead pipeline, follow-up scheduling, and client interaction records.' },
  ];

  const applyPreset = (preset: typeof quickPresets[0]) => {
    setFormData((prev) => ({
      ...prev,
      projectType: preset.type,
      projectDescription: preset.desc,
      businessType: preset.label,
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format';
    }
    if (!formData.companyName.trim()) newErrors.companyName = 'Company / organization name is required';
    if (!formData.projectDescription.trim() || formData.projectDescription.length < 15) {
      newErrors.projectDescription = 'Please describe your requirements (at least 15 characters)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (actionType: 'consultation' | 'submit') => {
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const saved = storageService.saveEnquiry({
        fullName: formData.fullName,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        businessType: formData.businessType || 'General Business',
        projectDescription: formData.projectDescription,
        requiredFeatures: formData.requiredFeatures || 'To be determined during technical scoping',
        preferredTechnology: formData.preferredTechnology || 'Recommended by SoftwareDeveloper@077',
        estimatedBudget: formData.estimatedBudget,
        expectedTimeline: formData.expectedTimeline,
        additionalRequirements: formData.additionalRequirements,
        notes: actionType === 'consultation' ? 'Client requested technical consultation call' : 'Client submitted full specification',
      });

      setSubmittedEnquiry(saved);
      setIsSubmitting(false);
    }, 450);
  };

  const handleResetForm = () => {
    setSubmittedEnquiry(null);
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      projectType: 'Custom Software',
      businessType: '',
      projectDescription: '',
      requiredFeatures: '',
      preferredTechnology: '',
      estimatedBudget: '$10,000 - $25,000',
      expectedTimeline: '2 - 3 Months',
      additionalRequirements: '',
    });
    setErrors({});
  };

  return (
    <section id="request-project" className="py-20 lg:py-28 relative border-b border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3.5">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-indigo-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            <span>Project Scoping & Discovery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Request a Project Specification
          </h2>
          <p className="text-base text-slate-300">
            Tell us about your business processes, required features, and operational requirements. Founder Parmeshwar Metkar and our lead developers will review your requirements and provide an architectural proposal.
          </p>
        </div>

        {submittedEnquiry ? (
          /* Submission Success State */
          <div className="mt-12 rounded-3xl border border-emerald-900/60 bg-slate-900/90 p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto shadow-2xl ring-1 ring-emerald-500/20">
            <div className="h-16 w-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Requirement Successfully Logged</h3>
              <p className="text-sm text-slate-300">
                Thank you, <strong className="text-white">{submittedEnquiry.fullName}</strong>. Your project inquiry has been registered in the SoftwareDeveloper@077 pipeline.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left font-mono text-xs space-y-2.5 shadow-inner">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Tracking Reference:</span>
                <span className="text-indigo-400 font-bold">{submittedEnquiry.referenceNumber}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Project Type:</span>
                <span className="text-slate-200">{submittedEnquiry.projectType}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Company:</span>
                <span className="text-slate-200">{submittedEnquiry.companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Review Status:</span>
                <span className="text-emerald-400 font-bold">New (Scoping Review)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              {onViewInAdmin && (
                <button
                  onClick={onViewInAdmin}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-semibold text-white hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30"
                >
                  <span>View in Admin Dashboard</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                onClick={handleResetForm}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-700 bg-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                Submit Another Project
              </button>
            </div>
          </div>
        ) : (
          /* Form Body */
          <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 shadow-2xl ring-1 ring-white/5">
            {/* Quick Presets for Demo / Easy Selection */}
            <div className="mb-8 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-indigo-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Quick Requirement Presets</span>
                </span>
                <span className="text-[11px] text-slate-400">Click to autofill sample requirement</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickPresets.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800 text-xs text-slate-300 transition-all font-mono"
                  >
                    + {p.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              {/* Part 1: Contact & Organization */}
              <div>
                <h3 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-4 pb-2 border-b border-slate-800 flex items-center justify-between">
                  <span>01. Client & Organization Details</span>
                  <span className="text-[10px] text-slate-400">Direct contact info</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. David Miller"
                      className={`w-full rounded-xl border bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 ${
                        errors.fullName ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-rose-400">{errors.fullName}</p>}
                  </div>

                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Company Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Apex Health Systems"
                      className={`w-full rounded-xl border bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 ${
                        errors.companyName ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                      }`}
                    />
                    {errors.companyName && <p className="text-[11px] text-rose-400">{errors.companyName}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="david@company.com"
                      className={`w-full rounded-xl border bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 ${
                        errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-400">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                  </div>
                </div>
              </div>

              {/* Part 2: Project Classification */}
              <div>
                <h3 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
                  02. Project Scope & Category
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Project Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Project Type</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value as ProjectType })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-mono"
                    >
                      {PROJECT_TYPES_LIST.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Business Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Business / Industry Type</label>
                    <input
                      type="text"
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      placeholder="e.g. Boutique Hospitality, Healthcare, Retail"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                  </div>

                  {/* Preferred Technology */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Preferred Technology (Optional)</label>
                    <input
                      type="text"
                      value={formData.preferredTechnology}
                      onChange={(e) => setFormData({ ...formData, preferredTechnology: e.target.value })}
                      placeholder="e.g. React, Node.js, PostgreSQL"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                  </div>
                </div>
              </div>

              {/* Part 3: Requirement Details */}
              <div>
                <h3 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
                  03. Functional Requirements
                </h3>
                <div className="space-y-4">
                  {/* Project Description */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Project Description & Business Pain Points <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.projectDescription}
                      onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                      placeholder="Describe what you want the software to do, your current operational pain points, and target user roles..."
                      className={`w-full rounded-xl border bg-slate-950 p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 ${
                        errors.projectDescription ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                      }`}
                    />
                    {errors.projectDescription && <p className="text-[11px] text-rose-400">{errors.projectDescription}</p>}
                  </div>

                  {/* Required Features */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Required Key Features</label>
                    <textarea
                      rows={2}
                      value={formData.requiredFeatures}
                      onChange={(e) => setFormData({ ...formData, requiredFeatures: e.target.value })}
                      placeholder="e.g. Role-based user login, invoice generation, multi-warehouse stock deduction, automated email notices..."
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                  </div>

                  {/* Additional Requirements */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Additional Constraints / Environment</label>
                    <input
                      type="text"
                      value={formData.additionalRequirements}
                      onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                      placeholder="e.g. Must run smoothly on iPad tablets, require barcode scanner integration, CSV data import"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />
                  </div>
                </div>
              </div>

              {/* Part 4: Budget & Timeline */}
              <div>
                <h3 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-4 pb-2 border-b border-slate-800">
                  04. Budget & Delivery Expectations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Estimated Budget */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Estimated Budget Range</label>
                    <select
                      value={formData.estimatedBudget}
                      onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-mono"
                    >
                      <option value="Under $5,000">Under $5,000 (MVP / Targeted Module)</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000 (Targeted System)</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000 (Full-Featured Custom App)</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000 (Multi-Module Enterprise System)</option>
                      <option value="$50,000+">$50,000+ (High-Scale Platform)</option>
                    </select>
                  </div>

                  {/* Expected Timeline */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">Expected Timeline</label>
                    <select
                      value={formData.expectedTimeline}
                      onChange={(e) => setFormData({ ...formData, expectedTimeline: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-mono"
                    >
                      <option value="1 - 2 Months">1 - 2 Months (Rapid Sprint)</option>
                      <option value="2 - 3 Months">2 - 3 Months (Standard Build)</option>
                      <option value="3 - 4 Months">3 - 4 Months (Comprehensive Solution)</option>
                      <option value="4 - 6 Months">4 - 6 Months (Multi-Phase Deployment)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3.5">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSubmit('consultation')}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-700 bg-slate-900 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all disabled:opacity-50"
                >
                  Request a Consultation
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSubmit('submit')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-indigo-400 transition-all disabled:opacity-50 active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <span>Registering Requirement...</span>
                  ) : (
                    <>
                      <span>Submit Project Requirement</span>
                      <Send className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
