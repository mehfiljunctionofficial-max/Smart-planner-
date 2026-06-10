import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Languages, CheckCircle2 } from "lucide-react";
import { Language, Theme } from "../types";
import { translations } from "../translations";

interface OnboardingProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeToggle: () => void;
  onComplete: () => void;
}

export default function Onboarding({
  language,
  onLanguageChange,
  theme,
  onThemeToggle,
  onComplete
}: OnboardingProps) {
  const t = translations[language];
  const isDark = theme === "dark";

  const moduleHiglights = [
    t.todo, t.daily, t.weekly, t.monthly,
    t.aiPlanner, t.aiSchedule, t.aiStudy, t.aiWork,
    t.habit, t.goal, t.notes, t.birthday,
    t.anniversary, t.event, t.travel
  ];

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-all duration-500 overflow-y-auto ${
      isDark 
        ? "bg-[#090d16] text-slate-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))]" 
        : "bg-slate-50 text-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(219,234,254,0.6),rgba(255,255,255,0))]"
    }`}>
      
      {/* Upper absolute headers */}
      <div className="w-full max-w-4xl flex items-center justify-between pb-8 pt-4">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-display font-extrabold text-lg">
            P
          </div>
          <span className="font-display font-black text-xl tracking-wide bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Planora
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Selection Header */}
          <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs border border-slate-500/20 bg-white/5 backdrop-blur-md">
            <Languages className="w-3.5 h-3.5 opacity-70" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="bg-transparent outline-none cursor-pointer font-medium"
            >
              <option value="en" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>English</option>
              <option value="hi" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>हिन्दी (Hindi)</option>
              <option value="gu" className={isDark ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>ગુજરાતી (Gujarati)</option>
            </select>
          </div>

          {/* Theme switcher */}
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-full border border-slate-500/20 bg-white/5 hover:bg-white/10 transition"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      {/* Main Glass Onboarding Card */}
      <div className={`w-full max-w-2xl overflow-hidden rounded-3xl p-8 md:p-10 transition-all duration-300 relative ${
        isDark ? "glass-premium-dark" : "glass-premium-light"
      }`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>

        <div className="relative text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            {t.freeForever}
          </span>

          <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-tight">
            {t.onboardingTitle}
          </h1>

          <p className={`text-sm md:text-base leading-relaxed max-w-lg mx-auto ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {t.onboardingSub}
          </p>

          {/* Core Highlights Grid */}
          <div className="py-4 border-t border-b border-slate-500/10">
            <div className="flex items-center justify-center gap-1.5 mb-3 text-xs opacity-60 font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              15 {t.proAlternative}
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 max-h-36 overflow-y-auto p-1">
              {moduleHiglights.map((modName, index) => (
                <span
                  key={index}
                  className={`text-[10px] px-2.5 py-1 rounded-full font-semibold transition border ${
                    isDark
                      ? "bg-white/5 border-white/5 text-slate-300 hover:border-slate-500/30"
                      : "bg-black/5 border-black/5 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {modName}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-500/5 px-4 py-3 rounded-2xl border border-emerald-500/20 text-left">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-emerald-400">100% Free - Unlimited Content</p>
                <p className="text-[10px] opacity-60">{t.noAds}</p>
              </div>
            </div>
            <span className="text-[9px] font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase">
              No Purchases Required
            </span>
          </div>

          {/* Action button */}
          <button
            onClick={onComplete}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-display font-bold hover:shadow-lg hover:shadow-indigo-500/20 active:scale-98 transition flex items-center justify-center gap-2"
          >
            {t.getStarted}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-xl text-center py-6 opacity-40 text-[10px] font-mono select-none">
        PLANORA WORKPLACE CORE AGENT v2.1 • LATENCY &lt; 20ms • SYNCING DISK ID PRE-OK
      </div>
    </div>
  );
}
