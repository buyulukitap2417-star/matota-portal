import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
  iconContainerClass: string;
  bgIconClass: string;
}

function StatCard({ title, value, icon, iconContainerClass, bgIconClass }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white/30 dark:bg-darkCard/50 backdrop-blur-xl shadow-2xl p-6 relative overflow-hidden border border-white/20">
      <div className={`absolute -right-6 -top-6 text-8xl opacity-5 ${bgIconClass}`}>
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <div className="relative z-10 flex flex-col h-full justify-between gap-4">
        <div className={`w-12 h-12 rounded-xl text-white flex items-center justify-center text-xl shadow-lg ${iconContainerClass}`}>
          <i className={`fa-solid ${icon}`}></i>
        </div>
        <div>
          <h3 className="text-3xl font-black text-slate-800 dark:text-white drop-shadow-sm tracking-tighter">{value}</h3>
          <p className="text-[10px] font-bold uppercase text-slate-500 tracking-[0.2em] mt-1">{title}</p>
        </div>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: { user } } = await supabase.auth.getUser();

  let stats = { studentCount: 0, questionCount: 0, submissionCount: 0 };

  if (user) {
    // Verileri Supabase'den paralel olarak çek
    const [studentRes, questionRes, submissionRes] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student').eq('teacher_id', user.id),
      supabase.from('questions').select('*', { count: 'exact', head: true }).eq('teacher_id', user.id).eq('status', 'active'),
      // Not: Bu sorgu, ödev tablonuzda 'is_checked' gibi bir sütun olduğunu varsayar.
      supabase.from('homework_submissions').select('*, homeworks!inner(teacher_id)', { count: 'exact', head: true }).eq('homeworks.teacher_id', user.id).eq('is_checked', false)
    ]);

    stats = {
      studentCount: studentRes.count ?? 0,
      questionCount: questionRes.count ?? 0,
      submissionCount: submissionRes.count ?? 0,
    };
  }

  const welcomeName = user?.user_metadata?.full_name?.split(' ')[0] || 'Eğitmen';

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Merhaba, {welcomeName} <span className="inline-block origin-[70%_70%] animate-wave">👋</span>
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Platformun anlık analizleri emrinize amade.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <StatCard title="Kayıtlı Öğrenci" value={stats.studentCount} icon="fa-user-graduate" iconContainerClass="bg-gradient-to-br from-orange-400 to-orange-600" bgIconClass="text-orange-500" />
        <StatCard title="Cevap Bekleyen Soru" value={stats.questionCount} icon="fa-clipboard-question" iconContainerClass="bg-gradient-to-br from-red-400 to-red-600" bgIconClass="text-red-500" />
        <StatCard title="Yeni Ödev Teslimi" value={stats.submissionCount} icon="fa-book" iconContainerClass="bg-gradient-to-br from-blue-400 to-blue-600" bgIconClass="text-blue-500" />
      </div>
    </div>
  );
}