export function LoginForm() {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white/30 dark:bg-darkCard/50 backdrop-blur-xl shadow-2xl p-8">
      <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100 mb-6">
        Portala Giriş
      </h2>
      <form className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            E-posta Adresi
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-brand-orange focus:border-brand-orange bg-white/50 dark:bg-slate-800/50"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Şifre
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-brand-orange focus:border-brand-orange bg-white/50 dark:bg-slate-800/50"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-orange hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-all duration-300"
          >
            Giriş Yap
          </button>
        </div>
      </form>
    </div>
  );
}