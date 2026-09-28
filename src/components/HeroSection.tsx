import React, { useState } from 'react';
import { ArrowRight, Code2, Server, Database, ShieldCheck, Cpu, Check, Layers, Terminal, Sparkles, Play, CheckCircle2, RefreshCw } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface HeroSectionProps {
  onStartProject: () => void;
  onExploreProjects: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartProject, onExploreProjects }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'api' | 'schema' | 'telemetry'>('architecture');
  const [testedEndpoint, setTestedEndpoint] = useState<string | null>(null);
  const [endpointResult, setEndpointResult] = useState<any | null>(null);
  const [isRunningTest, setIsRunningTest] = useState(false);

  const testApi = (endpoint: string, payload: any) => {
    setIsRunningTest(true);
    setTestedEndpoint(endpoint);
    setTimeout(() => {
      setEndpointResult(payload);
      setIsRunningTest(false);
    }, 280);
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32 border-b border-slate-800/80">
      {/* Background Subtle Grid & SaaS Ambient Glow Meshes */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b14_1px,transparent_1px),linear-gradient(to_bottom,#1e293b14_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_75%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[850px] h-[420px] bg-gradient-to-b from-indigo-600/15 via-blue-600/10 to-transparent blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Core Positioning & Brand Message */}
          <div className="lg:col-span-7 space-y-7">
            {/* Subtle Brand Kicker */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800/90 text-xs font-mono backdrop-blur-md shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="font-bold text-white tracking-tight">SOFTWAREDEVELOPER@077</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300">Tailored Software Engineering</span>
            </div>

            {/* Primary Headline with Rich Gradient */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                Custom Software.
                <br />
                <span className="bg-gradient-to-r from-indigo-300 via-indigo-100 to-white bg-clip-text text-transparent">
                  Built for Your Business.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl leading-relaxed">
                We design and develop reliable software solutions tailored to your business requirements.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={onStartProject}
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:from-indigo-500 hover:to-indigo-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 active:scale-[0.98]"
              >
                <span>Start a Project</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreProjects}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900/90 px-6 py-3.5 text-sm font-medium text-slate-200 border border-slate-700/80 hover:bg-slate-800/90 hover:border-slate-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 shadow-sm active:scale-[0.98]"
              >
                <span>Explore Our Projects</span>
              </button>
            </div>

            {/* Factual Trust Statistics - High Polish Glass Cards */}
            <div className="pt-6 border-t border-slate-800/80">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {COMPANY_INFO.trustStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80 transition-all group"
                  >
                    <div className="text-2xl font-black font-mono tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-slate-200 mt-0.5">{stat.label}</div>
                    <div className="text-[11px] text-slate-400 leading-snug mt-1">{stat.caption}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Premium Interactive Engineering Terminal */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-950/90 shadow-2xl backdrop-blur-xl overflow-hidden ring-1 ring-white/5">
              {/* Terminal Window Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/90 bg-slate-900/80">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500/80 border border-rose-600/40" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80 border border-amber-600/40" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80 border border-emerald-600/40" />
                  <span className="ml-2 font-mono text-[11px] text-slate-400 font-medium">
                    SoftwareDeveloper@077 Console
                  </span>
                </div>

                {/* Subsystem Navigation Tabs */}
                <div className="flex items-center bg-slate-950/90 p-0.5 rounded-lg border border-slate-800">
                  {(['architecture', 'api', 'schema', 'telemetry'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-2.5 py-1 text-[11px] font-mono rounded-md transition-all ${
                        activeTab === tab
                          ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {tab === 'architecture' ? 'Flow' : tab === 'api' ? 'API' : tab === 'schema' ? 'Schema' : 'Health'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal Content Area */}
              <div className="p-5 font-mono text-xs min-h-[360px] flex flex-col justify-between">
                {activeTab === 'architecture' && (
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-2">
                      <span>// Custom Architecture Blueprint</span>
                      <span className="text-emerald-400">Spec Status: Verified</span>
                    </div>

                    {/* Step 1 */}
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 hover:border-slate-700 transition-colors">
                      <div className="flex items-center justify-between text-indigo-400 text-xs">
                        <span className="font-bold flex items-center gap-1.5">
                          <Terminal className="h-3.5 w-3.5" /> 01. Client Requirement Input
                        </span>
                        <span className="text-[10px] text-slate-400 font-sans">Scoping Phase</span>
                      </div>
                      <p className="text-slate-300 font-sans text-xs leading-snug">
                        "Custom business solution tailored to workflows, user permissions, and transactional records."
                      </p>
                    </div>

                    {/* Connecting Pipe */}
                    <div className="flex justify-center text-slate-600 -my-1">
                      <div className="h-3 w-px bg-indigo-500/40" />
                    </div>

                    {/* Step 2 */}
                    <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-900/40 space-y-1.5 hover:border-indigo-700/50 transition-colors">
                      <div className="flex items-center justify-between text-indigo-300 text-xs">
                        <span className="font-bold flex items-center gap-1.5">
                          <Server className="h-3.5 w-3.5 text-indigo-400" /> 02. Domain Logic & REST Engine
                        </span>
                        <span className="text-[10px] text-emerald-400">Node.js · TypeScript</span>
                      </div>
                      <div className="text-[11px] text-slate-400 space-y-0.5 font-sans">
                        <div>• Strict transactional data rules & role authorization</div>
                        <div>• Resilient REST endpoints with input sanitization</div>
                      </div>
                    </div>

                    {/* Connecting Pipe */}
                    <div className="flex justify-center text-slate-600 -my-1">
                      <div className="h-3 w-px bg-cyan-500/40" />
                    </div>

                    {/* Step 3 */}
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1 hover:border-slate-700 transition-colors">
                      <div className="flex items-center justify-between text-slate-200 text-xs">
                        <span className="font-bold flex items-center gap-1.5">
                          <Database className="h-3.5 w-3.5 text-cyan-400" /> 03. Relational Persistence
                        </span>
                        <span className="text-[10px] text-cyan-400">PostgreSQL</span>
                      </div>
                      <p className="text-slate-400 text-[11px] font-sans">
                        ACID compliance, indexed queries, foreign keys, and automated backup routines.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'api' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-2">
                      <span>// Interactive API Endpoint Runner</span>
                      <span className="text-xs text-indigo-400">Click to execute</span>
                    </div>

                    <div className="space-y-2">
                      {/* Endpoint 1 */}
                      <button
                        onClick={() =>
                          testApi('/api/v1/invoices/generate', {
                            status: 200,
                            invoice_number: 'INV-2026-099',
                            client: 'Metro Enterprises',
                            subtotal: 4200.0,
                            tax: 420.0,
                            total: 4620.0,
                            currency: 'USD',
                            state: 'GENERATED_PDF_READY',
                            latency_ms: 38,
                          })
                        }
                        className="w-full text-left p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/60 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold text-[11px]">POST</span>
                          <span className="text-slate-200 text-xs font-mono">/api/v1/invoices/generate</span>
                        </div>
                        <Play className="h-3.5 w-3.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                      </button>

                      {/* Endpoint 2 */}
                      <button
                        onClick={() =>
                          testApi('/api/v1/inventory/reorder-alerts', {
                            status: 200,
                            low_stock_count: 3,
                            critical_skus: ['SKU-992-CHIP', 'SKU-441-VALVE'],
                            supplier_po_drafts_created: 2,
                            warehouse_hub: 'Distribution Center A',
                            latency_ms: 22,
                          })
                        }
                        className="w-full text-left p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/60 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-400 font-bold text-[11px]">GET</span>
                          <span className="text-slate-200 text-xs font-mono">/api/v1/inventory/reorder-alerts</span>
                        </div>
                        <Play className="h-3.5 w-3.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                      </button>

                      {/* Endpoint 3 */}
                      <button
                        onClick={() =>
                          testApi('/api/v1/rooms/matrix-status', {
                            status: 200,
                            total_rooms: 100,
                            occupied: 86,
                            cleaning: 4,
                            available: 10,
                            occupancy_rate: '86%',
                            revpar: '$142.50',
                            latency_ms: 19,
                          })
                        }
                        className="w-full text-left p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/60 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 font-bold text-[11px]">GET</span>
                          <span className="text-slate-200 text-xs font-mono">/api/v1/rooms/matrix-status</span>
                        </div>
                        <Play className="h-3.5 w-3.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                      </button>
                    </div>

                    {/* Result Output Area */}
                    <div className="mt-2 p-3 rounded-lg bg-slate-950 border border-slate-800 min-h-[90px]">
                      {isRunningTest ? (
                        <div className="flex items-center gap-2 text-indigo-400 text-xs">
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          <span>Dispatching API request contract...</span>
                        </div>
                      ) : endpointResult ? (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800/80 pb-1">
                            <span className="text-emerald-400 font-bold">200 OK · {testedEndpoint}</span>
                            <span>{endpointResult.latency_ms}ms</span>
                          </div>
                          <pre className="text-[10px] text-indigo-300 overflow-x-auto pt-1 leading-snug">
                            {JSON.stringify(endpointResult, null, 2)}
                          </pre>
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-500 italic">
                          Click any endpoint above to simulate a live server response.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'schema' && (
                  <div className="space-y-2.5 text-[11px] text-slate-300">
                    <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-1.5">
                      <span>// PostgreSQL Relational Schema</span>
                      <span className="text-indigo-400">PostgreSQL 16</span>
                    </div>
                    <pre className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-indigo-300 overflow-x-auto text-[10.5px] leading-relaxed">
{`CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  tier VARCHAR(50) DEFAULT 'Standard',
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE RESTRICT,
  amount NUMERIC(14, 2) NOT NULL,
  audit_hash VARCHAR(64) NOT NULL,
  status VARCHAR(40) DEFAULT 'SETTLED'
);`}
                    </pre>
                  </div>
                )}

                {activeTab === 'telemetry' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-1.5">
                      <span>// Production Reliability Profile</span>
                      <span className="text-emerald-400">All Systems Nominal</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-400 block uppercase">API Response P95</span>
                        <span className="text-lg font-bold text-white font-mono">42 ms</span>
                        <span className="text-[10px] text-emerald-400 block font-sans">Optimized REST routing</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-400 block uppercase">Memory Profiling</span>
                        <span className="text-lg font-bold text-white font-mono">Zero Leaks</span>
                        <span className="text-[10px] text-emerald-400 block font-sans">Garbage collector clean</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-400 block uppercase">Database Queries</span>
                        <span className="text-lg font-bold text-white font-mono">&lt; 15 ms</span>
                        <span className="text-[10px] text-cyan-400 block font-sans">Indexed B-Tree lookups</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-[10px] text-slate-400 block uppercase">Deployment Ready</span>
                        <span className="text-lg font-bold text-white font-mono">Docker CI</span>
                        <span className="text-[10px] text-indigo-400 block font-sans">Automated test gates</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Terminal Bottom Status Footer */}
                <div className="pt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Ready for Production Engineering
                  </span>
                  <span className="text-slate-500 font-sans">SoftwareDeveloper@077</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
