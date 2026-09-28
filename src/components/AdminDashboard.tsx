import React, { useState, useEffect } from 'react';
import {
  Shield,
  Layers,
  Inbox,
  Briefcase,
  Users,
  Settings,
  Mail,
  Search,
  Filter,
  CheckCircle,
  Clock,
  ChevronRight,
  RefreshCw,
  Eye,
  X,
  FileText,
  Building,
  DollarSign,
  Calendar,
  AlertCircle,
  ArrowLeft,
  Download,
  Check,
  TrendingUp,
  Activity,
  Send,
} from 'lucide-react';
import { ProjectEnquiry, EnquiryStatus, ContactMessage } from '../types';
import { storageService } from '../services/storage';
import { COMPANY_INFO, SERVICES_DATA, PROJECTS_DATA, TEAM_ROLES_DATA } from '../data/companyData';

interface AdminDashboardProps {
  onBackToWebsite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToWebsite }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'projects' | 'services' | 'team' | 'messages' | 'settings'>('overview');
  const [enquiries, setEnquiries] = useState<ProjectEnquiry[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<ProjectEnquiry | null>(null);
  const [internalNoteDraft, setInternalNoteDraft] = useState('');
  const [savedNotesSuccess, setSavedNotesSuccess] = useState(false);
  const [confirmingReset, setConfirmingReset] = useState(false);

  const statusOptions: EnquiryStatus[] = ['New', 'Contacted', 'Planning', 'In Progress', 'Completed', 'Closed'];

  const reloadData = () => {
    setEnquiries(storageService.getEnquiries());
    setMessages(storageService.getMessages());
  };

  useEffect(() => {
    reloadData();
  }, []);

  const handleStatusChange = (id: string, newStatus: EnquiryStatus) => {
    const updated = storageService.updateEnquiryStatus(id, newStatus);
    setEnquiries(updated);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  const handleSaveNotes = (id: string) => {
    const updated = storageService.updateEnquiryStatus(id, selectedEnquiry!.status, internalNoteDraft);
    setEnquiries(updated);
    if (selectedEnquiry) {
      setSelectedEnquiry({ ...selectedEnquiry, notes: internalNoteDraft });
    }
    setSavedNotesSuccess(true);
    setTimeout(() => setSavedNotesSuccess(false), 2000);
  };

  const handleResetDemo = () => {
    const reset = storageService.resetDemoData();
    setEnquiries(reset);
    setSelectedEnquiry(null);
    setConfirmingReset(false);
  };

  const exportCsv = () => {
    const headers = ['Reference Number', 'Company', 'Client Name', 'Email', 'Project Type', 'Budget', 'Timeline', 'Status', 'Date'];
    const rows = enquiries.map((e) => [
      e.referenceNumber,
      `"${e.companyName.replace(/"/g, '""')}"`,
      `"${e.fullName.replace(/"/g, '""')}"`,
      e.email,
      e.projectType,
      e.estimatedBudget,
      e.expectedTimeline,
      e.status,
      new Date(e.createdAt).toLocaleDateString(),
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `softwaredeveloper077_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Stats calculation
  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => e.status === 'New').length;
  const activeProjectsCount = enquiries.filter((e) => e.status === 'In Progress' || e.status === 'Planning').length;
  const completedProjectsCount = enquiries.filter((e) => e.status === 'Completed').length;

  const filteredEnquiries = enquiries.filter((e) => {
    const matchStatus = statusFilter === 'All' || e.status === statusFilter;
    const matchSearch =
      searchQuery === '' ||
      e.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.projectType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Top Admin Notice Bar */}
      <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 sm:px-6 py-2.5 text-xs font-mono text-amber-300 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-amber-400 shrink-0" />
          <span>
            <strong>ADMIN DEMONSTRATION WORKSPACE:</strong> Internal management portal for SoftwareDeveloper@077.
          </span>
        </div>
        <button
          onClick={onBackToWebsite}
          className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded-lg text-amber-200 transition-colors font-sans text-xs font-semibold"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Public Website</span>
        </button>
      </div>

      {/* Main Admin Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 border-r border-slate-800/80 bg-slate-900/60 backdrop-blur-md p-5 space-y-7 shrink-0">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Engineering Console</div>
            <h1 className="font-mono text-sm font-extrabold text-white mt-1">SoftwareDeveloper@077</h1>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">Founder: {COMPANY_INFO.founder.name}</p>
          </div>

          <nav className="space-y-1.5 text-xs font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="h-4 w-4" />
                <span>Executive Overview</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'enquiries'
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="h-4 w-4" />
                <span>Project Enquiries</span>
              </div>
              <span className="font-mono text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-indigo-300">
                {enquiries.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'projects'
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="h-4 w-4" />
                <span>Projects Showcase</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">{PROJECTS_DATA.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'services'
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="h-4 w-4" />
                <span>Services Catalog</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">{SERVICES_DATA.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'team'
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="h-4 w-4" />
                <span>Team Roles</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">~10</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'messages'
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4" />
                <span>Messages</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">{messages.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === 'settings'
                  ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </div>
            </button>
          </nav>

          <div className="pt-5 border-t border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Technical Architect</div>
            <div className="text-white font-semibold">{COMPANY_INFO.founder.name}</div>
            <div className="text-[11px] font-mono text-indigo-400 truncate">{COMPANY_INFO.founder.email}</div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto">
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Executive Dashboard</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Client inquiry pipeline, active solutions, and developer capacity overview.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={exportCsv}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-xs font-mono text-slate-300 hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* 4 Required Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Enquiries */}
                <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Total Enquiries</span>
                    <Inbox className="h-4 w-4 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-white">{totalEnquiries}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Activity className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Logged business requests</span>
                  </div>
                </div>

                {/* New Enquiries */}
                <div className="p-5 rounded-2xl border border-indigo-900/50 bg-indigo-950/20 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-indigo-300 text-xs">
                    <span>New Enquiries</span>
                    <Clock className="h-4 w-4 text-indigo-400" />
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-indigo-300">{newEnquiries}</div>
                  <div className="text-[11px] text-indigo-400 font-sans">Awaiting technical scoping review</div>
                </div>

                {/* Active Projects */}
                <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Active Projects</span>
                    <Briefcase className="h-4 w-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-amber-300">{activeProjectsCount}</div>
                  <div className="text-[11px] text-slate-400 font-sans">In Planning & Active Sprint Dev</div>
                </div>

                {/* Completed Projects */}
                <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Completed Projects</span>
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-emerald-400">{completedProjectsCount}</div>
                  <div className="text-[11px] text-slate-400 font-sans">Delivered & Client-Approved</div>
                </div>
              </div>

              {/* Pipeline Breakdown Bar */}
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Client Pipeline Stage Distribution</span>
                  <span className="text-slate-400 font-mono text-[11px]">{enquiries.length} Inquiries Total</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-1 font-mono text-xs">
                  {statusOptions.map((st) => {
                    const count = enquiries.filter((e) => e.status === st).length;
                    return (
                      <div key={st} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-400 block truncate">{st}</span>
                        <span className="text-lg font-bold text-white block">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Enquiries Preview */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Recent Client Enquiries</h3>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs font-mono text-indigo-400 hover:underline"
                  >
                    View All ({enquiries.length}) →
                  </button>
                </div>

                <div className="divide-y divide-slate-800/80">
                  {enquiries.slice(0, 4).map((enq) => (
                    <div key={enq.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="font-semibold text-white flex items-center gap-2">
                          <span>{enq.companyName}</span>
                          <span className="font-mono text-[10px] text-indigo-400">({enq.referenceNumber})</span>
                        </div>
                        <div className="text-slate-400 mt-1">
                          {enq.fullName} · {enq.projectType} · Budget: <span className="text-emerald-400 font-mono">{enq.estimatedBudget}</span> · Timeline: {enq.expectedTimeline}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono ${
                          enq.status === 'New'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : enq.status === 'In Progress'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : enq.status === 'Completed'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {enq.status}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedEnquiry(enq);
                            setInternalNoteDraft(enq.notes || '');
                            setActiveTab('enquiries');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: ENQUIRIES TABLE */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Project Enquiries Pipeline</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Review incoming business requests, adjust project status, and attach internal engineering scoping notes.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={exportCsv}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-xs font-mono text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={reloadData}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-xs font-mono text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              {/* Search & Status Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by client, company, ref ID..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 shadow-inner"
                  />
                </div>

                {/* Status Segmented Control */}
                <div className="flex flex-wrap gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                  {['All', ...statusOptions].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setStatusFilter(opt)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        statusFilter === opt ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table of Enquiries */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 border-b border-slate-800 font-mono text-slate-400">
                      <tr>
                        <th className="p-4">Ref #</th>
                        <th className="p-4">Client & Company</th>
                        <th className="p-4">Project Type</th>
                        <th className="p-4">Budget</th>
                        <th className="p-4">Timeline</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {filteredEnquiries.map((enq) => (
                        <tr key={enq.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-4 font-mono text-indigo-400 font-semibold">{enq.referenceNumber}</td>
                          <td className="p-4">
                            <div className="font-semibold text-white">{enq.companyName}</div>
                            <div className="text-slate-400 text-[11px] mt-0.5">{enq.fullName} · {enq.email}</div>
                          </td>
                          <td className="p-4 font-mono text-slate-300">{enq.projectType}</td>
                          <td className="p-4 font-mono text-emerald-400">{enq.estimatedBudget}</td>
                          <td className="p-4 text-slate-400">{enq.expectedTimeline}</td>
                          <td className="p-4">
                            <select
                              value={enq.status}
                              onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                              className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1 text-[11px] font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
                            >
                              {statusOptions.map((st) => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => {
                                setSelectedEnquiry(enq);
                                setInternalNoteDraft(enq.notes || '');
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/40 text-xs font-medium transition-colors"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>Details</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredEnquiries.length === 0 && (
                  <div className="p-12 text-center text-xs text-slate-400">
                    No enquiries match the current filters.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: PROJECTS SHOWCASE */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Active Reference Solutions</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Sample software specifications and reference architectures published on the website.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROJECTS_DATA.map((proj) => (
                  <div key={proj.id} className="p-5 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        {proj.typeLabel}
                      </span>
                      <span className="text-emerald-400 font-semibold">{proj.projectStatus}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{proj.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{proj.shortDescription}</p>
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>Frontend: {proj.techStack.frontend.join(', ')}</span>
                      <span>DB: {proj.techStack.database.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Services Catalog (12 Disciplines)</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Custom software disciplines offered to prospective clients.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SERVICES_DATA.map((svc) => (
                  <div key={svc.id} className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2 shadow-sm">
                    <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider">{svc.category}</div>
                    <h4 className="text-sm font-bold text-white">{svc.title}</h4>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{svc.shortDescription}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: TEAM */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Team Structure & Role Allocation</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Compact squad of ~10 developers operating under founder leadership.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-indigo-900/60 bg-slate-900/90 space-y-1 shadow-md">
                <div className="text-[10px] font-mono text-indigo-400 uppercase">Founder & Lead Architect</div>
                <div className="text-lg font-bold text-white">{COMPANY_INFO.founder.name}</div>
                <div className="text-xs font-mono text-slate-300">{COMPANY_INFO.founder.email}</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TEAM_ROLES_DATA.filter((r) => !r.isFounder).map((role) => (
                  <div key={role.id} className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-2 shadow-sm">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{role.role}</span>
                      <span className="font-mono text-indigo-400">{role.count}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{role.focusArea}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">General Contact Inquiries</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Messages submitted via the public contact form.
                </p>
              </div>

              {messages.length === 0 ? (
                <div className="p-12 rounded-2xl border border-slate-800 bg-slate-900/50 text-center text-xs text-slate-400">
                  No contact messages received yet. Submit a message from the contact form to see it appear here.
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((m) => (
                    <div key={m.id} className="p-5 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-2.5 shadow-sm">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">{m.name} ({m.email})</span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {new Date(m.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-indigo-300">{m.subject}</div>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                        {m.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">System Settings & Data Control</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Manage demo records and configuration for SoftwareDeveloper@077.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-4 text-xs shadow-sm">
                <div className="space-y-1">
                  <div className="font-semibold text-white text-sm">Reset Demo Pipeline</div>
                  <p className="text-slate-400 leading-relaxed">
                    Restores the initial sample inquiries (Hotel Management, Wholesale Inventory, Microfinance).
                  </p>
                </div>
                {confirmingReset ? (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-amber-300 font-mono text-xs">Are you sure?</span>
                    <button
                      onClick={handleResetDemo}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-sm"
                    >
                      Yes, Reset
                    </button>
                    <button
                      onClick={() => setConfirmingReset(false)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmingReset(true)}
                    className="px-4 py-2.5 rounded-xl border border-rose-900/60 bg-rose-950/30 text-rose-300 hover:bg-rose-900/50 text-xs font-semibold transition-colors shadow-sm"
                  >
                    Reset Demo Records
                  </button>
                )}
              </div>

              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-2 text-xs text-slate-400 shadow-sm">
                <div className="font-semibold text-white text-sm">Production Backend Ready</div>
                <p className="leading-relaxed">
                  This admin interface is powered by local persistence and structured for direct migration to PostgreSQL/Node.js REST API endpoints once deployed in production.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Drawer / Modal: View Single Enquiry Details */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/80 backdrop-blur-md p-3 sm:p-6 animate-in fade-in">
          <div className="h-full w-full max-w-xl rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-7 flex flex-col justify-between overflow-y-auto space-y-6 shadow-2xl ring-1 ring-white/10">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="font-mono text-xs text-indigo-400 font-bold">
                    {selectedEnquiry.referenceNumber}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{selectedEnquiry.companyName}</h3>
                </div>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Status Selector */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-mono text-slate-400">Lifecycle Status:</span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value as EnquiryStatus)}
                  className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-mono text-white focus:outline-none"
                >
                  {statusOptions.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Contact Name</span>
                  <span className="font-semibold text-white mt-0.5 block">{selectedEnquiry.fullName}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Email</span>
                  <a
                    href={`mailto:${selectedEnquiry.email}?subject=Project%20Scoping%20Update%20-%20${selectedEnquiry.referenceNumber}`}
                    className="font-mono text-indigo-400 hover:underline truncate mt-0.5 block"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Phone</span>
                  <span className="font-mono text-slate-200 mt-0.5 block">{selectedEnquiry.phone || 'Not provided'}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Industry Type</span>
                  <span className="text-slate-200 mt-0.5 block">{selectedEnquiry.businessType}</span>
                </div>
              </div>

              {/* Scope & Budget */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Estimated Budget</span>
                  <span className="text-emerald-400 font-bold text-sm mt-0.5 block">{selectedEnquiry.estimatedBudget}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Expected Timeline</span>
                  <span className="text-indigo-300 font-bold text-sm mt-0.5 block">{selectedEnquiry.expectedTimeline}</span>
                </div>
              </div>

              {/* Project Description */}
              <div className="space-y-1.5 text-xs">
                <div className="font-mono text-slate-400 uppercase tracking-wide">Project Description</div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.projectDescription}
                </div>
              </div>

              {/* Required Features */}
              <div className="space-y-1.5 text-xs">
                <div className="font-mono text-slate-400 uppercase tracking-wide">Requested Features</div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed">
                  {selectedEnquiry.requiredFeatures || 'Standard scoping'}
                </div>
              </div>

              {/* Internal Scoping Notes */}
              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-indigo-400 uppercase">Internal Engineering Notes</span>
                  {savedNotesSuccess && (
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <Check className="h-3 w-3" /> Saved!
                    </span>
                  )}
                  <button
                    onClick={() => handleSaveNotes(selectedEnquiry.id)}
                    className="text-[11px] font-mono text-indigo-400 hover:underline"
                  >
                    Save Notes
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={internalNoteDraft}
                  onChange={(e) => setInternalNoteDraft(e.target.value)}
                  placeholder="Add notes from discovery call, architectural considerations..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <a
                href={`mailto:${selectedEnquiry.email}?subject=Project%20Scoping%20-%20SoftwareDeveloper@077&body=Hi%20${encodeURIComponent(selectedEnquiry.fullName)},%0D%0A%0D%0ARegarding%20your%20project%20enquiry%20(${selectedEnquiry.referenceNumber}):`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Email Client Directly</span>
              </a>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
