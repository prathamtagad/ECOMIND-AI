import Link from 'next/link';
import {
  TreePine, Brain, Map, BarChart3, Sprout, Calculator,
  ArrowRight, Leaf, Shield, Activity, ChevronRight
} from 'lucide-react';

const features = [
  { icon: Brain, title: 'AI Health Analysis', desc: 'Upload tree images and get instant AI-powered health assessments with actionable recommendations.', color: 'from-cyan-500 to-blue-500' },
  { icon: Map, title: 'Interactive Tree Map', desc: 'Visualize every tree in the city with health status, pollution zones, and spatial intelligence.', color: 'from-emerald-500 to-green-600' },
  { icon: BarChart3, title: 'Pollution Analytics', desc: 'Track AQI, PM2.5, CO₂ levels across zones with real-time charts and hotspot detection.', color: 'from-amber-500 to-orange-500' },
  { icon: Sprout, title: 'Smart Plantation', desc: 'Get data-driven species recommendations for any zone based on soil, climate, and pollution.', color: 'from-lime-500 to-emerald-500' },
  { icon: Calculator, title: 'Carbon Calculator', desc: 'Quantify environmental impact — CO₂ absorbed, O₂ produced, cars offset, energy saved.', color: 'from-teal-500 to-cyan-500' },
  { icon: Shield, title: 'Admin Dashboard', desc: 'Monitor citywide tree health, manage alerts, and plan interventions from a single panel.', color: 'from-purple-500 to-indigo-500' },
];

const stats = [
  { value: '2,847', label: 'Trees Monitored', icon: TreePine },
  { value: '1.24T', label: 'CO₂ Captured/Year', icon: Leaf },
  { value: '8', label: 'Zones Tracked', icon: Map },
  { value: '94%', label: 'AI Accuracy', icon: Activity },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-primary-800/15">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg text-white">EcoMind<span className="text-primary-400"> AI</span></span>
          </Link>
          <Link href="/dashboard" className="px-5 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary-600/20">
            Open Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-600/8 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-600/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-600/10 border border-primary-600/20 mb-8 animate-slide-up stagger-1">
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
            <span className="text-xs font-medium text-primary-400">Powered by AI · Built for Cities</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-6 animate-slide-up stagger-2">
            Every Tree is a{' '}
            <span className="bg-gradient-to-r from-primary-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Living Digital Asset
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up stagger-3">
            EcoMind AI transforms urban forestry with AI-powered health detection,
            real-time pollution mapping, and data-driven plantation intelligence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up stagger-4">
            <Link href="/dashboard" className="group px-8 py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-primary-600/25 flex items-center gap-2">
              Explore Dashboard
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/ai-analysis" className="px-8 py-3.5 bg-surface-300/50 hover:bg-surface-300 text-white font-semibold rounded-xl border border-primary-800/20 hover:border-primary-600/30 transition-all flex items-center gap-2">
              <Brain size={18} />
              Try AI Analysis
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-8 border-y border-primary-800/15 bg-surface-100/50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="text-center animate-slide-up" style={{ animationDelay: `${0.2 + i * 0.1}s`, opacity: 0 }}>
                <Icon size={20} className="text-primary-400 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 font-medium mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Platform Capabilities</h2>
            <p className="text-gray-400 max-w-xl mx-auto">A complete urban tree intelligence suite built for modern cities.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="glass-card glass-card-hover p-6 transition-all duration-300 animate-slide-up" style={{ animationDelay: `${0.3 + i * 0.1}s`, opacity: 0 }}>
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-4`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center glass-card p-10 sm:p-14 glow-green">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to transform your city&apos;s green infrastructure?</h2>
          <p className="text-gray-400 mb-8">Start monitoring trees, tracking pollution, and making data-driven environmental decisions.</p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:shadow-primary-600/25">
            Get Started <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-primary-800/15">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf size={16} className="text-primary-500" />
            <span className="text-sm text-gray-500">EcoMind AI · ECOMIND AI</span>
          </div>
          <p className="text-xs text-gray-600">Built for Green-Tech Hackathon 2026 · SGSITS</p>
        </div>
      </footer>
    </div>
  );
}
