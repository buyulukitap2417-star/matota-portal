"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  // Şimdilik statik menü öğeleri
  const navItems = [
    { href: '/dashboard', name: 'Yönetim Özeti', icon: 'fa-chart-line' },
    { href: '/dashboard/students', name: 'Öğrenciler', icon: 'fa-user-graduate' },
    { href: '/dashboard/lessons', name: 'Ders Takvimi', icon: 'fa-calendar-days' },
  ];

  return (
    <aside className="w-72 bg-white/20 dark:bg-darkCard/30 backdrop-blur-lg flex flex-col sticky top-0 h-screen z-50 text-slate-600 dark:text-slate-400 shrink-0 border-r border-white/30 dark:border-slate-700/50">
      <div className="p-8 text-center h-32 flex items-center justify-center">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">MATOTA Portal</h2>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map(item => (
          <Link
            key={item.name}
            href={item.href}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition hover:bg-white/30 dark:hover:bg-white/10 ${
              pathname === item.href ? 'sidebar-link-active' : ''
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg w-6 text-center`}></i>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-300/50 dark:border-slate-700/50">
        <button
          onClick={handleLogout}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
        >
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}