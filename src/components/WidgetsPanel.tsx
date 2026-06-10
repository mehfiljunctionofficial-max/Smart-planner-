import React, { useState } from "react";
import { Plus, Bell, Clock, Check, Calendar as CalendarIcon, Sparkles } from "lucide-react";
import { Task, Language, Theme, CalendarEvent } from "../types";
import { translations } from "../translations";

interface WidgetsPanelProps {
  tasks: Task[];
  events: CalendarEvent[];
  lang: Language;
  theme: Theme;
  onAddTask: (title: string, priority: "low" | "medium" | "high") => void;
  onNavigateToModule: (moduleId: string) => void;
}

export default function WidgetsPanel({
  tasks,
  events,
  lang,
  theme,
  onAddTask,
  onNavigateToModule
}: WidgetsPanelProps) {
  const t = translations[lang];
  const [quickTitle, setQuickTitle] = useState("");
  const [quickPriority, setQuickPriority] = useState<"low" | "medium" | "high">("medium");

  // Filter tasks for widget representation
  const activeTasks = tasks.filter(t => !t.completed).slice(0, 3);

  // Countdown target calculation (e.g., end of month or custom date)
  const targetDateStr = "2026-12-31";
  const targetDate = new Date(targetDateStr);
  const now = new Date();
  const diffTime = Math.max(0, targetDate.getTime() - now.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    onAddTask(quickTitle, quickPriority);
    setQuickTitle("");
  };

  const isDark = theme === "dark";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className={`font-display text-lg font-bold tracking-tight ${isDark ? "text-slate-100" : "text-slate-800"}`}>
          {t.widgetsTitle}
        </h3>
        <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 pulse-sync">
          {t.freeForever}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* WIDGET 1: Modern Tasks Widget */}
        <div 
          onClick={() => onNavigateToModule("todo")}
          className={`group relative overflow-hidden rounded-3xl p-4 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
            isDark ? "glass-widget-dark" : "glass-widget-light"
          }`}
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all"></div>
          <div className="flex items-center justify-between mb-3 border-b pb-2 border-slate-500/10">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                <Check className="w-4 h-4" />
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {t.tasksWidget}
              </span>
            </div>
            <span className="text-[10px] font-mono opacity-60">SIMULATION</span>
          </div>

          <div className="space-y-2">
            {activeTasks.length === 0 ? (
              <p className={`text-xs italic ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                {t.noItem}
              </p>
            ) : (
              activeTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-white/5">
                  <span className={`text-xs truncate ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                    {task.title}
                  </span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold ${
                    task.priority === "high" ? "bg-rose-500/20 text-rose-400" :
                    task.priority === "medium" ? "bg-amber-500/20 text-amber-400" :
                    "bg-slate-500/20 text-slate-400"
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* WIDGET 2: Circular Countdown Widget */}
        <div 
          onClick={() => onNavigateToModule("goal")}
          className={`group relative overflow-hidden rounded-3xl p-4 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
            isDark ? "glass-widget-dark" : "glass-widget-light"
          }`}
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all"></div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                <Clock className="w-4 h-4" />
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {t.countdownWidget}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 py-1">
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full border-2 border-purple-500/30 bg-purple-500/5">
              <span className="font-mono text-lg font-bold text-purple-400">{diffDays}</span>
            </div>
            <div>
              <p className={`text-xs font-bold ${isDark ? "text-slate-100" : "text-slate-800"}`}>
                2026 Year-End Target
              </p>
              <p className="text-[10px] opacity-60">
                {targetDateStr} ({t.freeForever})
              </p>
            </div>
          </div>
        </div>

        {/* WIDGET 3: Calendar Mini Month Grid */}
        <div 
          onClick={() => onNavigateToModule("monthly")}
          className={`group relative overflow-hidden rounded-3xl p-4 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
            isDark ? "glass-widget-dark" : "glass-widget-light"
          }`}
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all"></div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {t.calendarWidget}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] opacity-80">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={i} className="font-bold opacity-50">{d}</span>
            ))}
            {Array.from({ length: 28 }).map((_, i) => {
              const dayNum = i + 1;
              const hasEvent = events.some(e => e.date.endsWith(`-${dayNum < 10 ? '0' + dayNum : dayNum}`));
              return (
                <span 
                  key={i} 
                  className={`py-0.5 rounded-md ${
                    hasEvent ? "bg-emerald-500/30 text-emerald-300 font-bold" : ""
                  }`}
                >
                  {dayNum}
                </span>
              );
            })}
          </div>
        </div>

        {/* WIDGET 4: Quick Add Floating Action Panel */}
        <div className={`relative overflow-hidden rounded-3xl p-4 ${isDark ? "glass-widget-dark" : "glass-widget-light"}`}>
          <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-full blur-xl"></div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                <Plus className="w-4 h-4" />
              </div>
              <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {t.quickAddWidget}
              </span>
            </div>
          </div>

          <form onSubmit={handleQuickAdd} className="space-y-2">
            <div className="flex gap-1.5">
              <input
                type="text"
                placeholder="Instantly add task..."
                value={quickTitle}
                onChange={(e) => setQuickTitle(e.target.value)}
                className={`flex-1 text-xs px-2.5 py-1.5 rounded-xl outline-none transition ${
                  isDark ? "glass-input-dark bg-white/5" : "glass-input-light bg-black/5"
                }`}
              />
              <button 
                type="submit"
                className="px-2 py-1.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:scale-105 active:scale-95 transition text-xs font-bold flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2 justify-end">
              {(["low", "medium", "high"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setQuickPriority(p)}
                  className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase border transition ${
                    quickPriority === p 
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/40" 
                      : "opacity-40 border-transparent hover:opacity-100"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
