'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Map, TreePine, Brain, CloudRain,
  Sprout, Calculator, ShieldCheck, Leaf, Menu, X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/map', label: 'Tree Map', icon: Map },
  { href: '/ai-analysis', label: 'AI Analysis', icon: Brain },
  { href: '/pollution', label: 'Pollution', icon: CloudRain },
  { href: '/plantation', label: 'Plantation', icon: Sprout },
  { href: '/carbon', label: 'Carbon Impact', icon: Calculator },
  { href: '/admin', label: 'Admin Panel', icon: ShieldCheck },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-surface-200 border border-primary-800/30"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-[260px] bg-surface-100/95 backdrop-blur-xl
        border-r border-primary-800/20 z-40 flex flex-col
        transition-transform duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 px-6 py-5 border-b border-primary-800/15">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center glow-green">
            <Leaf size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">GreenPulse</h1>
            <p className="text-[10px] text-primary-400 font-medium tracking-widest uppercase">AI Platform</p>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200 group
                  ${isActive
                    ? 'bg-primary-600/20 text-primary-400 border border-primary-600/25'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-surface-300/50 border border-transparent'
                  }
                `}
              >
                <Icon size={18} className={isActive ? 'text-primary-400' : 'text-gray-500 group-hover:text-gray-300'} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-4 py-4 border-t border-primary-800/15">
          <div className="glass-card p-3 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <TreePine size={14} className="text-primary-400" />
              <span className="text-xs font-semibold text-primary-400">ECOMIND AI</span>
            </div>
            <p className="text-[10px] text-gray-500">Urban Tree Intelligence Platform</p>
          </div>
        </div>
      </aside>
    </>
  );
}
