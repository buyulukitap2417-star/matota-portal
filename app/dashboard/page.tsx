"use client";

import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient.js';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">
          Ana Panele Hoş Geldiniz!
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          Giriş işlemi başarıyla tamamlandı.
        </p>
        <button
          onClick={handleLogout}
          className="mt-8 w-full max-w-xs flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-300"
        >
          Çıkış Yap
        </button>
      </div>
    </main>
  );
}