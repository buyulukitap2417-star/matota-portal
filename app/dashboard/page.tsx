import { supabase } from "@/lib/supabaseClient";

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
  // Verileri Supabase'den çek
  const { count: studentCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student');
  
  // Diğer veriler için de benzer sorgular (şimdilik 0)
  const pendingQuestionsCount = 0;
  const newSubmissionsCount = 0;

  return (
    <div>
      <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
        Yönetim Özeti
      </h1>
      <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Panele hoş geldiniz. İşte sistemin anlık durumu.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <StatCard title="Kayıtlı Öğrenci" value={studentCount ?? 0} icon="fa-user-graduate" iconContainerClass="bg-gradient-to-br from-orange-400 to-orange-600" bgIconClass="text-orange-500" />
        <StatCard title="Cevap Bekleyen Soru" value={pendingQuestionsCount} icon="fa-clipboard-question" iconContainerClass="bg-gradient-to-br from-red-400 to-red-600" bgIconClass="text-red-500" />
        <StatCard title="Yeni Ödev Teslimi" value={newSubmissionsCount} icon="fa-book" iconContainerClass="bg-gradient-to-br from-blue-400 to-blue-600" bgIconClass="text-blue-500" />
      </div>
    </div>
  );
}