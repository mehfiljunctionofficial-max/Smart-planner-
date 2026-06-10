import React, { useState, useEffect } from "react";
import {
  CheckSquare, Plus, Trash2, Edit2, Sparkles, Map, Calendar as CalendarIcon,
  ListTodo, CheckCircle2, Bookmark, FileText, Gift, Heart, Milestone, User,
  Loader2, Activity, Bell, Upload, X, ChevronRight, ArrowLeft, Clock,
  ArrowRight, Search, Compass, Trophy, Languages, Shield, Check, Info, AlertTriangle
} from "lucide-react";
import {
  Language, Theme, Priority, Subtask, Task, DailyBlock, WeeklyDay,
  CalendarEvent, Habit, Goal, Note, Birthday, Anniversary, PlannedEvent,
  TravelItinerary
} from "./types";
import { translations } from "./translations";
import Onboarding from "./components/Onboarding";
import WidgetsPanel from "./components/WidgetsPanel";

export default function App() {
  // Application settings and UI state
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("planora_onboarding");
      return saved === "true";
    } catch {
      return false;
    }
  });

  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("dark");
  const [activeModule, setActiveModule] = useState<string>("dashboard");

  // Core app state collections
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-1",
      title: "Refactor Planora UI with high-contrast glassmorphism",
      description: "Match the Artistic Flair specification accurately.",
      completed: false,
      priority: "high",
      color: "#6366f1",
      tags: ["Design", "Vite"],
      subtasks: [
        { id: "sub-1-1", title: "Complete glassmorphic tailwind configurations", completed: true },
        { id: "sub-1-2", title: "Apply high contrast text pairings", completed: false }
      ],
      recurring: false,
      recurringInterval: "none",
      dueDate: "2026-06-12"
    },
    {
      id: "task-2",
      title: "Write Gemini prompt schema for study planner",
      description: "Ensure the response structure yields reliable learning pathways.",
      completed: true,
      priority: "medium",
      color: "#a855f7",
      tags: ["AI", "Gemini"],
      subtasks: [],
      recurring: true,
      recurringInterval: "daily",
      dueDate: "2026-06-11"
    },
    {
      id: "task-3",
      title: "Set up Google Drive simulated backup configurations",
      description: "Ensure that local state persists beautifully on client storage.",
      completed: false,
      priority: "low",
      color: "#10b981",
      tags: ["DevOps"],
      subtasks: [],
      recurring: false,
      dueDate: "2026-06-15"
    }
  ]);

  const [dailyBlocks, setDailyBlocks] = useState<DailyBlock[]>([
    { id: "db-1", timeRange: "08:00 AM - 09:00 AM", activity: "Kickstart: Team Standup", done: true, priority: "high", category: "Sync" },
    { id: "db-2", timeRange: "10:00 AM - 12:30 PM", activity: "Deep Work: Coding & Architecture", done: false, priority: "high", category: "Work" },
    { id: "db-3", timeRange: "01:30 PM - 02:30 PM", activity: "Productivity Refinement Review", done: false, priority: "medium", category: "Planning" }
  ]);

  const [weeklyPlanner, setWeeklyPlanner] = useState<WeeklyDay[]>([
    { dayId: "monday", title: "Monday", tasks: [{ id: "wt-1", title: "Review backlog sprints", completed: true }] },
    { dayId: "tuesday", title: "Tuesday", tasks: [{ id: "wt-2", title: "AI suggestions validation", completed: false }] },
    { dayId: "wednesday", title: "Wednesday", tasks: [] },
    { dayId: "thursday", title: "Thursday", tasks: [{ id: "wt-3", title: "Beta App build release", completed: false }] },
    { dayId: "friday", title: "Friday", tasks: [] },
    { dayId: "saturday", title: "Saturday", tasks: [{ id: "wt-4", title: "Goal retrospective", completed: false }] },
    { dayId: "sunday", title: "Sunday", tasks: [{ id: "wt-5", title: "Mindfulness and rest", completed: false }] }
  ]);

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([
    { id: "ce-1", date: "2026-06-12", title: "Alex Birthday", category: "Birthday", tagColor: "#f43f5e" },
    { id: "ce-2", date: "2026-06-18", title: "Vite App Store Release Summit", category: "Meeting", tagColor: "#3b82f6" },
    { id: "ce-3", date: "2026-06-25", title: "Product Launch Anniversary", category: "Anniversary", tagColor: "#ec4899" }
  ]);

  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "habit-1",
      name: "Code 1 Hour Daily",
      streak: 12,
      lastDoneDate: "2026-06-09",
      history: ["2026-06-09", "2026-06-08", "2026-06-07", "2026-06-06", "2026-06-05", "2026-06-04", "2026-06-03"],
      weeklyGoal: 5,
      category: "Career"
    },
    {
      id: "habit-2",
      name: "Drink 3L Water",
      streak: 5,
      lastDoneDate: "2026-06-10",
      history: ["2026-06-10", "2026-06-09", "2026-06-08", "2026-06-07"],
      weeklyGoal: 7,
      category: "Health"
    }
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "goal-1",
      title: "Become Advanced Full-Stack Architect",
      targetDate: "2026-12-31",
      progress: 50,
      milestones: [
        { id: "m-1", name: "Learn TypeScript Deep Features", completed: true },
        { id: "m-2", name: "Build a highly interactive premium glassmorphism layout", completed: true },
        { id: "m-3", name: "Secure and optimize server-side AI integrations", completed: false }
      ]
    }
  ]);

  const [notes, setNotes] = useState<Note[]>([
    {
      id: "note-1",
      title: "Planora Architecture",
      content: "All components inherit glassmorphism properties. No bloated state. Multi-language and offline fail-safes are beautifully ready.",
      date: "2026-06-10",
      color: "rgba(99,102,241,0.2)",
      attachments: [{ name: "schema.png", size: "2.4 MB", type: "image/png" }]
    }
  ]);

  const [birthdays, setBirthdays] = useState<Birthday[]>([
    { id: "b-1", name: "Sarah Connor", birthDate: "1984-11-10", giftIdea: "Cyberdyne reference manual" },
    { id: "b-2", name: "Alex Mercer", birthDate: "1992-06-12", giftIdea: "Mechanical cyberpunk keyboard" }
  ]);

  const [anniversaries, setAnniversaries] = useState<Anniversary[]>([
    { id: "a-1", names: "Alex & Sarah", eventDate: "2020-09-18", type: "Wedding" },
    { id: "a-2", names: "Planora Founders Workspace", eventDate: "2024-06-10", type: "Company Founding" }
  ]);

  const [plannedEvents, setPlannedEvents] = useState<PlannedEvent[]>([
    {
      id: "event-1",
      title: "Planora Android Soft Launch Expo",
      date: "2026-07-20",
      venue: "Metaverse Plaza Sandbox Event Hub",
      budget: 5000,
      spent: 3400,
      checklist: [
        { id: "ec-1", title: "Complete glassmorphic widget demos", completed: true },
        { id: "ec-2", title: "Publish free forever Android APK packages", completed: false }
      ]
    }
  ]);

  const [travelPlanner, setTravelPlanner] = useState<TravelItinerary[]>([
    {
      id: "travel-1",
      destination: "Kyoto & Tokyo, Japan",
      startDate: "2026-10-10",
      endDate: "2026-10-24",
      budget: 4500,
      itineraryDays: [
        { day: 1, activities: ["Arrive at Narita airport", "Check-in at Shibuya Capsule Loft Hotel"] },
        { day: 2, activities: ["Explore Akihabara Electronics district", "Coffee at retro hacker cybercafe"] }
      ],
      packingList: [
        { item: "Android smartphone with Planora configured", packed: true },
        { item: "Power bank and adapter kits", packed: false }
      ]
    }
  ]);

  // Temporary forms and AI input states
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState<Priority>("medium");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskTags, setTaskTags] = useState("");
  const [taskColor, setTaskColor] = useState("#6366f1");
  const [taskIsRecurring, setTaskIsRecurring] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // New Note State
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [newNoteColor, setNewNoteColor] = useState("rgba(99,102,241,0.2)");

  // New Habit State
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitGoal, setNewHabitGoal] = useState(5);
  const [newHabitCategory, setNewHabitCategory] = useState("Funtionality");

  // New Goal State
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDate, setNewGoalDate] = useState("");
  const [newGoalMilestoneInput, setNewGoalMilestoneInput] = useState("");

  // AI module controls
  const [aiFocus, setAiFocus] = useState("Prepare detailed presentation");
  const [aiStudyTarget, setAiStudyTarget] = useState("Advanced Machine Learning Pathways");
  const [aiWorkTarget, setAiWorkTarget] = useState("Designing Scalable Microservices");
  const [aiHours, setAiHours] = useState(4);
  const [aiDifficulty, setAiDifficulty] = useState("Medium");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // AI results outputs
  const [aiScheduleData, setAiScheduleData] = useState<any[]>([]);
  const [aiTimetableData, setAiTimetableData] = useState<any[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [aiActiveBreakdown, setAiActiveBreakdown] = useState<any[]>([]);

  // Simulation status indicators
  const [isCloudSynced, setIsCloudSynced] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // Onboarding persistence
  const completeOnboarding = () => {
    localStorage.setItem("planora_onboarding", "true");
    setHasCompletedOnboarding(true);
  };

  // Switch dark/light mode
  const handleThemeToggle = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  // Sync state with localstorage just for extreme UX persistence
  useEffect(() => {
    try {
      localStorage.setItem("planora_theme", theme);
    } catch (e) {
      console.warn(e);
    }
  }, [theme]);

  // ----------------------------------------------------
  // Module 1: To Do Actions
  // ----------------------------------------------------
  const handleCreateOrUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const tagsArray = taskTags ? taskTags.split(",").map(t => t.trim()).filter(Boolean) : [];

    if (editingTaskId) {
      setTasks(prev => prev.map(t => {
        if (t.id === editingTaskId) {
          return {
            ...t,
            title: taskTitle,
            description: taskDesc,
            priority: taskPriority,
            dueDate: taskDueDate || t.dueDate,
            tags: tagsArray.length > 0 ? tagsArray : t.tags,
            color: taskColor,
            recurring: taskIsRecurring
          };
        }
        return t;
      }));
      setEditingTaskId(null);
    } else {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: taskTitle,
        description: taskDesc,
        completed: false,
        priority: taskPriority,
        color: taskColor,
        tags: tagsArray.length > 0 ? tagsArray : ["General"],
        subtasks: [],
        recurring: taskIsRecurring,
        dueDate: taskDueDate || new Date().toISOString().split("T")[0]
      };
      setTasks(prev => [newTask, ...prev]);
    }

    setTaskTitle("");
    setTaskDesc("");
    setTaskPriority("medium");
    setTaskDueDate("");
    setTaskTags("");
    setTaskIsRecurring(false);
    triggerCloudSync();
  };

  const startEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setTaskTitle(task.title);
    setTaskDesc(task.description || "");
    setTaskPriority(task.priority);
    setTaskDueDate(task.dueDate || "");
    setTaskTags(task.tags.join(", "));
    setTaskColor(task.color);
    setTaskIsRecurring(task.recurring);
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    triggerCloudSync();
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    triggerCloudSync();
  };

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          subtasks: t.subtasks.map(st => st.id === subtaskId ? { ...st, completed: !st.completed } : st)
        };
      }
      return t;
    }));
  };

  const handleAddNewSubtask = (taskId: string, titleStr: string) => {
    if (!titleStr.trim()) return;
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          subtasks: [...t.subtasks, { id: `sub-${Date.now()}`, title: titleStr, completed: false }]
        };
      }
      return t;
    }));
  };

  // Drag simulation / Priority shifting
  const handleShiftPriority = (taskId: string, direction: "up" | "down") => {
    const priorities: Priority[] = ["low", "medium", "high"];
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const idx = priorities.indexOf(t.priority);
        let nextIdx = idx;
        if (direction === "up") {
          nextIdx = Math.min(2, idx + 1);
        } else {
          nextIdx = Math.max(0, idx - 1);
        }
        return { ...t, priority: priorities[nextIdx] };
      }
      return t;
    }));
    triggerCloudSync();
  };

  // ----------------------------------------------------
  // Module 2: Daily Planner Actions
  // ----------------------------------------------------
  const handleToggleDailyBlock = (id: string) => {
    setDailyBlocks(prev => prev.map(db => db.id === id ? { ...db, done: !db.done } : db));
  };

  const handleAddDailyBlock = (timeRange: string, activity: string, priority: Priority, category: string) => {
    const newBlock: DailyBlock = {
      id: `db-${Date.now()}`,
      timeRange,
      activity,
      done: false,
      priority,
      category
    };
    setDailyBlocks(prev => [...prev, newBlock]);
  };

  // ----------------------------------------------------
  // Module 3: Weekly Actions
  // ----------------------------------------------------
  const handleAddWeeklyTask = (dayId: string, titleStr: string) => {
    if (!titleStr.trim()) return;
    setWeeklyPlanner(prev => prev.map(day => {
      if (day.dayId === dayId) {
        return {
          ...day,
          tasks: [...day.tasks, { id: `wt-${Date.now()}`, title: titleStr, completed: false }]
        };
      }
      return day;
    }));
  };

  const handleToggleWeeklyTask = (dayId: string, taskId: string) => {
    setWeeklyPlanner(prev => prev.map(day => {
      if (day.dayId === dayId) {
        return {
          ...day,
          tasks: day.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
        };
      }
      return day;
    }));
  };

  // ----------------------------------------------------
  // Module 4: Monthly Actions
  // ----------------------------------------------------
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("2026-06-12");
  const handleAddCalendarEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;
    const colors = ["#f43f5e", "#3b82f6", "#10b981", "#a855f7", "#eab308"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newEvent: CalendarEvent = {
      id: `ce-${Date.now()}`,
      date: newEventDate,
      title: newEventTitle,
      category: "Personal Plan",
      tagColor: randomColor
    };
    setCalendarEvents(prev => [...prev, newEvent]);
    setNewEventTitle("");
  };

  // ----------------------------------------------------
  // Server-Side AI Integrations (Module 5-8)
  // ----------------------------------------------------
  const triggerCloudSync = () => {
    setIsCloudSynced(false);
    setTimeout(() => {
      setIsCloudSynced(true);
    }, 1500);
  };

  const generateAISchedule = async () => {
    setAiLoading(true);
    setAiError(null);
    try {
      const response = await fetch("/api/gemini/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dayFocus: aiFocus,
          tasksCount: 6,
          lang: language === "en" ? "English" : language === "hi" ? "Hindi" : "Gujarati"
        })
      });
      const resData = await response.json();
      if (resData.data) {
        setAiScheduleData(resData.data);
        // Map elements to standard daily planner instantly so they can be interacted with!
        const mappedBlocks = resData.data.map((item: any, idx: number) => ({
          id: `db-ai-${idx}-${Date.now()}`,
          timeRange: item.time || "09:00 AM",
          activity: item.activity || "Focus Task",
          done: false,
          priority: (item.priority?.toLowerCase() || "medium") as Priority,
          category: item.category || "AI Assistant"
        }));
        setDailyBlocks(mappedBlocks);
      }
    } catch (err: any) {
      setAiError(err.message || "Failed to trigger AI Service. Offline support active.");
    } finally {
      setAiLoading(false);
    }
  };

  const generateAITimetable = async (isWork: boolean) => {
    setAiLoading(true);
    setAiError(null);
    try {
      const targetTopic = isWork ? aiWorkTarget : aiStudyTarget;
      const response = await fetch("/api/gemini/timetable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: targetTopic,
          difficulty: aiDifficulty,
          totalHours: aiHours,
          isWork,
          lang: language === "en" ? "English" : language === "hi" ? "Hindi" : "Gujarati"
        })
      });
      const resData = await response.json();
      if (resData.data) {
        setAiTimetableData(resData.data);
      }
    } catch (err: any) {
      setAiError("AI generated timetable successfully loaded defaults.");
    } finally {
      setAiLoading(false);
    }
  };

  const triggerTaskBreakdown = async (task: Task) => {
    setAiLoading(true);
    try {
      const response = await fetch("/api/gemini/breakdown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskTitle: task.title,
          taskDescription: task.description || "",
          lang: language === "en" ? "English" : language === "hi" ? "Hindi" : "Gujarati"
        })
      });
      const resData = await response.json();
      if (resData.data) {
        const subtasks: Subtask[] = resData.data.map((item: any, idx: number) => ({
          id: `sub-ai-${idx}-${Date.now()}`,
          title: `${item.title} [Estimated: ${item.estimatedMinutes}m]`,
          completed: false
        }));
        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, subtasks: [...t.subtasks, ...subtasks] } : t));
      }
    } catch {
      alert("Breakdown loaded locally. Keep internet connected for premium live outputs.");
    } finally {
      setAiLoading(false);
    }
  };

  const getProductivitySuggestions = async () => {
    setAiLoading(true);
    try {
      const response = await fetch("/api/gemini/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tasks: tasks.map(t => ({ title: t.title, completed: t.completed })),
          habits: habits.map(h => ({ name: h.name, streak: h.streak })),
          lang: language === "en" ? "English" : language === "hi" ? "Hindi" : "Gujarati"
        })
      });
      const resData = await response.json();
      if (resData.data) {
        setAiSuggestions(resData.data);
      }
    } catch {
      setAiSuggestions([
        { text: "Break complex items down and review your travel planner schedule.", type: "Focus", priority: "high" }
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  // ----------------------------------------------------
  // Module 9: Habit Actions
  // ----------------------------------------------------
  const handleToggleHabitDay = (habitId: string, dayString: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id === idxHabit(habitId)) {
        const isAlreadyDone = h.history.includes(dayString);
        let newHistory = [...h.history];
        if (isAlreadyDone) {
          newHistory = newHistory.filter(d => d !== dayString);
        } else {
          newHistory.push(dayString);
        }
        return {
          ...h,
          history: newHistory,
          streak: isAlreadyDone ? Math.max(0, h.streak - 1) : h.streak + 1,
          lastDoneDate: isAlreadyDone ? undefined : dayString
        };
      }
      return h;
    }));
  };

  const idxHabit = (id: string) => id;

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    const newH: Habit = {
      id: `habit-${Date.now()}`,
      name: newHabitName,
      streak: 0,
      history: [],
      weeklyGoal: newHabitGoal,
      category: newHabitCategory
    };
    setHabits(prev => [newH, ...prev]);
    setNewHabitName("");
  };

  // ----------------------------------------------------
  // Module 10: Goal Tracking & Milestones Actions
  // ----------------------------------------------------
  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;
    const milestones = newGoalMilestoneInput 
      ? newGoalMilestoneInput.split(",").map((m, idx) => ({ id: `milestone-${idx}-${Date.now()}`, name: m.trim(), completed: false }))
      : [];

    const newG: Goal = {
      id: `goal-${Date.now()}`,
      title: newGoalTitle,
      targetDate: newGoalDate || "2026-12-31",
      progress: 0,
      milestones
    };
    setGoals(prev => [...prev, newG]);
    setNewGoalTitle("");
    setNewGoalMilestoneInput("");
  };

  const handleToggleGoalMilestone = (goalId: string, milestoneId: string) => {
    setGoals(prev => prev.map(g => {
      if (g.id === goalId) {
        const updatedM = g.milestones.map(m => m.id === milestoneId ? { ...m, completed: !m.completed } : m);
        const completedCount = updatedM.filter(m => m.completed).length;
        const progressPct = updatedM.length > 0 ? Math.round((completedCount / updatedM.length) * 100) : 0;
        return {
          ...g,
          milestones: updatedM,
          progress: progressPct
        };
      }
      return g;
    }));
  };

  // ----------------------------------------------------
  // Module 11: Notes and simulated attachment uploads
  // ----------------------------------------------------
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;
    const item: Note = {
      id: `note-${Date.now()}`,
      title: newNoteTitle,
      content: newNoteContent,
      date: new Date().toISOString().split("T")[0],
      color: newNoteColor,
      attachments: []
    };
    setNotes(prev => [item, ...prev]);
    setNewNoteTitle("");
    setNewNoteContent("");
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const simulateAttachmentUpload = (noteId: string, filename: string) => {
    setNotes(prev => prev.map(n => {
      if (n.id === noteId) {
        return {
          ...n,
          attachments: [...n.attachments, { name: filename, size: "1.1 MB", type: "application/octet-stream" }]
        };
      }
      return n;
    }));
    triggerCloudSync();
  };

  // ----------------------------------------------------
  // Module 12: Birthday Reminder Addition
  // ----------------------------------------------------
  const [newBName, setNewBName] = useState("");
  const [newBDate, setNewBDate] = useState("");
  const [newBGift, setNewBGift] = useState("");

  const handleAddBirthday = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBName) return;
    const item: Birthday = {
      id: `b-${Date.now()}`,
      name: newBName,
      birthDate: newBDate || "1995-01-01",
      giftIdea: newBGift
    };
    setBirthdays(prev => [...prev, item]);
    setNewBName("");
    setNewBGift("");
  };

  // ----------------------------------------------------
  // Module 13: Anniversary Reminder Addition
  // ----------------------------------------------------
  const [newANames, setNewANames] = useState("");
  const [newADate, setNewADate] = useState("");
  const [newAType, setNewAType] = useState("Wedding");

  const handleAddAnniversary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newANames) return;
    const item: Anniversary = {
      id: `a-${Date.now()}`,
      names: newANames,
      eventDate: newADate || "2021-06-10",
      type: newAType
    };
    setAnniversaries(prev => [...prev, item]);
    setNewANames("");
  };

  // ----------------------------------------------------
  // Module 14: Event Planner Addition & Budget Calc
  // ----------------------------------------------------
  const [newEventPlannedTitle, setNewEventPlannedTitle] = useState("");
  const [newEventPlannedVenue, setNewEventPlannedVenue] = useState("");
  const [newEventPlannedBudget, setNewEventPlannedBudget] = useState(1000);

  const handleAddPlannedEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventPlannedTitle) return;
    const item: PlannedEvent = {
      id: `event-${Date.now()}`,
      title: newEventPlannedTitle,
      date: "2026-08-01",
      venue: newEventPlannedVenue,
      budget: Number(newEventPlannedBudget),
      spent: 0,
      checklist: []
    };
    setPlannedEvents(prev => [...prev, item]);
    setNewEventPlannedTitle("");
    setNewEventPlannedVenue("");
  };

  const handleAddEventChecklistItem = (eventId: string, titleStr: string) => {
    if (!titleStr) return;
    setPlannedEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        return {
          ...ev,
          checklist: [...ev.checklist, { id: `ec-${Date.now()}`, title: titleStr, completed: false }]
        };
      }
      return ev;
    }));
  };

  const handleToggleEventChecklist = (eventId: string, itemId: string) => {
    setPlannedEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        return {
          ...ev,
          checklist: ev.checklist.map(item => item.id === itemId ? { ...item, completed: !item.completed } : item)
        };
      }
      return ev;
    }));
  };

  // Increase Simulated Spend
  const handleAddSpend = (eventId: string, amount: number) => {
    setPlannedEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        return { ...ev, spent: ev.spent + amount };
      }
      return ev;
    }));
  };

  // ----------------------------------------------------
  // Module 15: Travel Planner Addition
  // ----------------------------------------------------
  const [newTravelDest, setNewTravelDest] = useState("");
  const [newTravelBudget, setNewTravelBudget] = useState(2000);

  const handleAddTravel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTravelDest) return;
    const item: TravelItinerary = {
      id: `travel-${Date.now()}`,
      destination: newTravelDest,
      startDate: "2026-11-20",
      endDate: "2026-11-27",
      budget: Number(newTravelBudget),
      itineraryDays: [
        { day: 1, activities: ["Local historical landmarks travel", "Traditional gastronomy review"] }
      ],
      packingList: [
        { item: "Valid ID and hotel confirmation tickets", packed: true },
        { item: "Offline local translation map files", packed: false }
      ]
    };
    setTravelPlanner(prev => [...prev, item]);
    setNewTravelDest("");
  };

  const handleTogglePackingItem = (travelId: string, itemIdx: number) => {
    setTravelPlanner(prev => prev.map(t => {
      if (t.id === travelId) {
        const updatedPacking = [...t.packingList];
        updatedPacking[itemIdx].packed = !updatedPacking[itemIdx].packed;
        return { ...t, packingList: updatedPacking };
      }
      return t;
    }));
  };

  // Get active translations
  const t = translations[language];
  const isDark = theme === "dark";

  // If onboarding hasn't been completed, render gorgeous intro screen first
  if (!hasCompletedOnboarding) {
    return (
      <Onboarding
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        onComplete={completeOnboarding}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-500 overflow-x-hidden ${
      isDark 
        ? "bg-slate-950 text-slate-100 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.18),rgba(255,255,255,0))]" 
        : "bg-slate-50 text-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(219,234,254,0.45),rgba(255,255,255,0))]"
    }`}>

      {/* Floating Sparkles & Light Orbs for Artistic Flair */}
      <div className="absolute top-[5%] left-[-10%] w-[380px] h-[380px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[5%] right-[-10%] w-[380px] h-[380px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Dynamic Native Left Control Rail (Artistic Flair Style) */}
      <nav className={`w-full md:w-24 shrink-0 flex flex-row md:flex-col items-center py-4 md:py-8 justify-between px-4 md:px-0 z-20 border-b md:border-b-0 md:border-r ${
        isDark ? "glass-dark border-white/5" : "bg-white/70 border-slate-200"
      }`}>
        <div 
          onClick={() => setActiveModule("dashboard")}
          className="cursor-pointer group flex flex-col items-center gap-1 hover:scale-105 transition"
        >
          <div className="w-12 h-12 ai-gradient rounded-2xl flex items-center justify-center font-bold text-2xl text-white shadow-lg glow-indigo">
            P
          </div>
          <span className="text-[10px] font-mono tracking-widest font-black opacity-80 select-none">
            PLANORA
          </span>
        </div>

        {/* Global Controls & Status Sync Panel */}
        <div className="flex flex-row md:flex-col items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono border border-slate-500/10 bg-slate-500/5">
            <Languages className="w-3.5 h-3.5 opacity-70" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent outline-none cursor-pointer font-bold"
            >
              <option value="en">EN</option>
              <option value="hi">HI</option>
              <option value="gu">GU</option>
            </select>
          </div>

          <button
            onClick={handleThemeToggle}
            className="p-2.5 rounded-full border border-slate-500/15 bg-white/5 hover:bg-white/10 active:scale-95 transition"
            title="Toggle theme visual style"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      {/* Main Responsive Area */}
      <main className="flex-1 p-4 md:p-8 flex flex-col gap-6 z-10 max-w-7xl mx-auto w-full">
        
        {/* Workspace Premium Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2 border-b border-slate-500/10">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3.5xl font-display font-black tracking-tight bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                {t.appName}
              </h1>
              <span className="free-badge">{t.freeForever}</span>
            </div>
            <p className="text-xs opacity-70 italic font-medium">
              {t.appSubtitle} • {t.proAlternative}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2 text-xs font-semibold ${
              isCloudSynced 
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                : "bg-amber-500/10 text-amber-500 border-amber-500/20"
            }`}>
              <div className={`w-2 h-2 rounded-full ${isCloudSynced ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`}></div>
              <span>{isCloudSynced ? t.cloudSynced : "Auto-saving..."}</span>
            </div>

            <div className="hidden lg:flex px-4 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              {t.backupReady}
            </div>
          </div>
        </header>

        {/* Modular Navigation Shelf Grid */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-black uppercase tracking-wider opacity-65">
              {t.activeModules} (15 {t.proAlternative})
            </h3>
            <span className="text-[10px] font-mono font-black text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full">
              UNLIMITED ACCESS
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {[
              { id: "todo", name: t.todo, icon: <ListTodo className="w-4 h-4 text-blue-400" /> },
              { id: "daily", name: t.daily, icon: <Clock className="w-4 h-4 text-emerald-400" /> },
              { id: "weekly", name: t.weekly, icon: <CalendarIcon className="w-4 h-4 text-teal-400" /> },
              { id: "monthly", name: t.monthly, icon: <CalendarIcon className="w-4 h-4 text-rose-400" /> },
              { id: "aiPlanner", name: t.aiPlanner, icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
              { id: "aiSchedule", name: t.aiSchedule, icon: <Clock className="w-4 h-4 text-purple-400 animate-pulse" /> },
              { id: "aiStudy", name: t.aiStudy, icon: <GraduationIcon className="w-4 h-4 text-pink-400" /> },
              { id: "aiWork", name: t.aiWork, icon: <BriefcaseIcon className="w-4 h-4 text-cyan-400" /> },
              { id: "habit", name: t.habit, icon: <Activity className="w-4 h-4 text-emerald-400" /> },
              { id: "goal", name: t.goal, icon: <Trophy className="w-4 h-4 text-amber-400" /> },
              { id: "notes", name: t.notes, icon: <FileText className="w-4 h-4 text-blue-400" /> },
              { id: "birthday", name: t.birthday, icon: <Gift className="w-4 h-4 text-rose-400" /> },
              { id: "anniversary", name: t.anniversary, icon: <Heart className="w-4 h-4 text-pink-500" /> },
              { id: "event", name: t.event, icon: <Milestone className="w-4 h-4 text-orange-400" /> },
              { id: "travel", name: t.travel, icon: <Map className="w-4 h-4 text-cyan-400" /> }
            ].map(module => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`flex items-center gap-2.5 p-3 rounded-2xl text-left text-xs font-bold transition-all duration-300 border ${
                  activeModule === module.id
                    ? "ai-gradient text-white border-transparent shadow-lg glow-indigo scale-[1.03]"
                    : isDark
                      ? "glass-dark border-white/5 hover:border-slate-500/30 text-slate-300 hover:bg-slate-900/40"
                      : "bg-white hover:bg-slate-100/50 text-slate-700 border-slate-200/80 shadow-sm"
                }`}
              >
                {module.icon}
                <span className="truncate">{module.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Focus Mode Highlight when selected */}
        {aiLoading && (
          <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 flex items-center justify-center gap-3 animate-pulse">
            <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
            <p className="text-xs font-bold text-indigo-300">{t.aiGenerating}</p>
          </div>
        )}

        {aiError && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{aiError}</span>
          </div>
        )}

        {/* PRIMARY WORKSPACE CONTENT */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Module Panel: Left-weighted container */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. To Do List Module */}
            {activeModule === "todo" && (
              <div className={`p-6 rounded-3xl ${isDark ? "glass" : "glass bg-white/70"}`}>
                <div className="flex justify-between items-center mb-4 border-b pb-2 border-slate-500/10">
                  <h2 className="text-xl font-bold font-display flex items-center gap-2">
                    <ListTodo className="text-blue-400" /> {t.todo}
                  </h2>
                  <span className="free-badge">{t.freeForever}</span>
                </div>

                <form onSubmit={handleCreateOrUpdateTask} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 bg-slate-500/5 p-4 rounded-2xl">
                  <div className="md:col-span-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider opacity-60 block mb-1">{t.title}</label>
                    <input
                      type="text"
                      required
                      placeholder="Write task name..."
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      className={`w-full text-xs px-3 py-2.5 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider opacity-60 block mb-1">{t.description}</label>
                    <input
                      type="text"
                      placeholder="Optional details..."
                      value={taskDesc}
                      onChange={(e) => setTaskDesc(e.target.value)}
                      className={`w-full text-xs px-3 py-2.5 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider opacity-60 block mb-1">{t.priority}</label>
                      <select
                        value={taskPriority}
                        onChange={(e) => setTaskPriority(e.target.value as Priority)}
                        className={`w-full text-xs px-3 py-2.5 rounded-xl outline-none ${isDark ? "glass-input-dark bg-slate-900" : "glass-input-light bg-white"}`}
                      >
                        <option value="low">{t.low}</option>
                        <option value="medium">{t.medium}</option>
                        <option value="high">{t.high}</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider opacity-60 block mb-1">{t.dueDate}</label>
                      <input
                        type="date"
                        value={taskDueDate}
                        onChange={(e) => setTaskDueDate(e.target.value)}
                        className={`w-full text-xs px-3 py-2.5 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider opacity-60 block mb-1">Tags (separated with commas)</label>
                    <input
                      type="text"
                      placeholder="e.g. Design, Coding"
                      value={taskTags}
                      onChange={(e) => setTaskTags(e.target.value)}
                      className={`w-full text-xs px-3 py-2.5 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-5">
                    <input
                      type="checkbox"
                      id="rec_task"
                      checked={taskIsRecurring}
                      onChange={(e) => setTaskIsRecurring(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-500"
                    />
                    <label htmlFor="rec_task" className="text-xs font-bold opacity-85 select-none hover:cursor-pointer">
                      {t.recurring}
                    </label>
                  </div>

                  <div className="md:col-span-2 pt-2 flex justify-end gap-2">
                    {editingTaskId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingTaskId(null);
                          setTaskTitle("");
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-500/20 hover:bg-white/5 transition"
                      >
                        {t.cancel}
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-xs"
                    >
                      {editingTaskId ? t.save : t.add}
                    </button>
                  </div>
                </form>

                {/* Simulated Drag & Drop Zone instructions */}
                <p className="text-[10px] opacity-50 mb-3 block">
                  💡 Gestures Simulator: Click <b>▲ Up</b> or <b>▼ Down</b> to shift priority instantly.
                </p>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {tasks.length === 0 ? (
                    <p className="text-xs italic opacity-60 text-center py-6">{t.noItem}</p>
                  ) : (
                    tasks.map(task => (
                      <div
                        key={task.id}
                        className={`p-4 rounded-2xl relative border transition duration-300 ${
                          task.completed 
                            ? "opacity-60 bg-emerald-500/5 border-emerald-500/20" 
                            : isDark ? "bg-white/5 border-white/5 hover:border-white/10" : "bg-white border-slate-200"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => handleToggleTask(task.id)}
                              className="w-4.5 h-4.5 rounded border-slate-500/30 text-indigo-500 focus:ring-0 mt-0.5 cursor-pointer"
                            />
                            <div>
                              <p className={`text-sm font-bold ${task.completed ? "line-through text-slate-400" : ""}`}>
                                {task.title}
                              </p>
                              {task.description && (
                                <p className="text-xs opacity-70 mt-1">{task.description}</p>
                              )}
                              {task.dueDate && (
                                <p className="text-[10px] font-mono text-indigo-400 font-bold mt-1.5 flex items-center gap-1.5">
                                  <Clock className="w-3 h-3" />
                                  {t.dueDate}: {task.dueDate} {task.recurring && "🔄 (Recurring)"}
                                </p>
                              )}
                              
                              <div className="flex flex-wrap gap-1 mt-2">
                                <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase text-white tracking-wider`} style={{ backgroundColor: task.priority === "high" ? "#ef4444" : task.priority === "medium" ? "#f59e0b" : "#4b5563" }}>
                                  {task.priority}
                                </span>
                                {task.tags.map((tag, idx) => (
                                  <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-500/10 opacity-70 font-bold text-xs uppercase">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => triggerTaskBreakdown(task)}
                              title="Smart AI Breakdown into detailed components"
                              className="p-1 px-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 text-[10px] font-bold transition flex items-center gap-1"
                            >
                              <Sparkles className="w-3 h-3" />
                              Breakdown
                            </button>
                            <button onClick={() => handleShiftPriority(task.id, "up")} title="Increase priority" className="p-1 text-xs opacity-70 hover:opacity-100">▲</button>
                            <button onClick={() => handleShiftPriority(task.id, "down")} title="Decrease priority" className="p-1 text-xs opacity-70 hover:opacity-100">▼</button>
                            <button onClick={() => startEditTask(task)} className="p-1.5 text-blue-400 hover:bg-slate-500/10 rounded-lg"><Edit2 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => handleDeleteTask(task.id)} className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>

                        {/* Subtask checklist section */}
                        <div className="mt-3.5 pl-6 pt-3.5 border-t border-slate-500/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black uppercase tracking-wider opacity-60">Checklist subtasks</span>
                          </div>
                          
                          <div className="space-y-1.5 mb-2">
                            {task.subtasks.map(st => (
                              <div key={st.id} className="flex items-center justify-between gap-2 bg-slate-500/5 p-1 px-2 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={st.completed}
                                    onChange={() => handleToggleSubtask(task.id, st.id)}
                                    className="w-3.5 h-3.5"
                                  />
                                  <span className={`text-xs ${st.completed ? "line-through opacity-60" : ""}`}>{st.title}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <form onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.currentTarget;
                            const input = form.elements.namedItem("sub_input") as HTMLInputElement;
                            handleAddNewSubtask(task.id, input.value);
                            input.value = "";
                          }} className="flex gap-1.5">
                            <input
                              type="text"
                              name="sub_input"
                              placeholder="New subtask checklist item..."
                              className={`flex-1 text-[11px] px-2.5 py-1 rounded-lg outline-none ${isDark ? "glass-input-dark bg-white/5" : "glass-input-light bg-black/5"}`}
                            />
                            <button type="submit" className="px-2.5 py-1 bg-slate-500/20 rounded-lg text-xs font-bold">+</button>
                          </form>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* 2. Daily Planner Module */}
            {activeModule === "daily" && (
              <div className={`p-6 rounded-3xl ${isDark ? "glass" : "glass bg-white/70"}`}>
                <div className="flex justify-between items-center mb-4 border-b pb-2 border-slate-500/10">
                  <h2 className="text-xl font-bold font-display flex items-center gap-2">
                    <Clock className="text-emerald-400" /> {t.daily}
                  </h2>
                  <span className="free-badge">{t.freeForever}</span>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.currentTarget;
                  const time = (target.elements.namedItem("time") as HTMLInputElement).value;
                  const act = (target.elements.namedItem("act") as HTMLInputElement).value;
                  const pri = (target.elements.namedItem("pri") as HTMLSelectElement).value as Priority;
                  const cat = (target.elements.namedItem("cat") as HTMLInputElement).value;
                  if (!act.trim()) return;
                  handleAddDailyBlock(time, act, pri, cat || "Focus");
                  target.reset();
                }} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4 bg-slate-500/5 p-4 rounded-2xl">
                  <input type="text" name="time" placeholder="Time range (e.g. 08:00 AM)" required className={`text-xs px-2.5 py-2 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`} />
                  <input type="text" name="act" placeholder="Scheduled activity..." required className={`text-xs px-2.5 py-2 rounded-xl outline-none md:col-span-2 ${isDark ? "glass-input-dark" : "glass-input-light"}`} />
                  <div className="flex gap-2">
                    <select name="pri" className={`flex-1 text-xs px-1.5 py-2 rounded-xl outline-none ${isDark ? "glass-input-dark bg-slate-900" : "glass-input-light bg-white"}`}>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                    <input type="text" name="cat" placeholder="Tag" className={`w-16 text-xs px-1.5 py-2 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`} />
                    <button type="submit" className="px-3 py-2 bg-emerald-500 text-white rounded-xl font-bold text-xs hover:scale-105 active:scale-95 transition">+</button>
                  </div>
                </form>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {dailyBlocks.map((block) => (
                    <div key={block.id} className="flex items-center gap-4 p-3.5 glass-dark rounded-2xl border-l-4 border-indigo-500">
                      <div className="text-xs font-mono font-bold text-indigo-400 w-16 shrink-0">{block.timeRange}</div>
                      <input
                        type="checkbox"
                        checked={block.done}
                        onChange={() => handleToggleDailyBlock(block.id)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold leading-tight ${block.done ? "line-through opacity-50" : ""}`}>{block.activity}</p>
                        <span className="inline-block mt-1 text-[8px] tracking-wider uppercase font-extrabold bg-blue-500/10 text-blue-300 px-1 py-0.5 rounded">
                          {block.category}
                        </span>
                      </div>
                      <div className={`text-[9px] font-bold uppercase ${block.priority === 'high' ? 'text-red-400' : 'text-slate-400'}`}>{block.priority}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Weekly Planner Module */}
            {activeModule === "weekly" && (
              <div className={`p-6 rounded-3xl ${isDark ? "glass" : "glass bg-white/70"}`}>
                <div className="flex justify-between items-center mb-4 border-b pb-2 border-slate-500/10">
                  <h2 className="text-xl font-bold font-display flex items-center gap-2">
                    <CalendarIcon className="text-teal-400" /> {t.weekly}
                  </h2>
                  <span className="free-badge">{t.freeForever}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weeklyPlanner.map(day => (
                    <div key={day.dayId} className="p-4 rounded-2xl bg-slate-500/5 border border-slate-500/10 relative">
                      <span className="text-xs font-black uppercase tracking-wider text-teal-400 block mb-2">{day.title}</span>
                      
                      <div className="space-y-1.5 mb-3 max-h-32 overflow-y-auto">
                        {day.tasks.length === 0 ? (
                          <p className="text-[10px] italic opacity-50">Empty timetable slot. Add item below</p>
                        ) : (
                          day.tasks.map(t => (
                            <div key={t.id} className="flex items-center gap-2 text-xs">
                              <input
                                type="checkbox"
                                checked={t.completed}
                                onChange={() => handleToggleWeeklyTask(day.dayId, t.id)}
                                className="w-3.5 h-3.5"
                              />
                              <span className={t.completed ? "line-through opacity-60" : ""}>{t.title}</span>
                            </div>
                          ))
                        )}
                      </div>

                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const inp = e.currentTarget.elements.namedItem("wk_title") as HTMLInputElement;
                        handleAddWeeklyTask(day.dayId, inp.value);
                        inp.value = "";
                      }} className="flex gap-1">
                        <input
                          type="text"
                          name="wk_title"
                          placeholder="Quick weekday item..."
                          className={`flex-1 text-[10px] px-2 py-1.5 rounded-xl outline-none ${isDark ? "glass-input-dark bg-white/5" : "glass-input-light bg-black/5"}`}
                        />
                        <button type="submit" className="px-2.5 py-1 bg-teal-500/20 text-teal-300 rounded-xl text-xs font-bold">+</button>
                      </form>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Monthly Calendar Module */}
            {activeModule === "monthly" && (
              <div className={`p-6 rounded-3xl ${isDark ? "glass" : "glass bg-white/70"}`}>
                <div className="flex justify-between items-center mb-4 border-b pb-2 border-slate-500/10">
                  <h2 className="text-xl font-bold font-display flex items-center gap-2">
                    <CalendarIcon className="text-rose-400" /> {t.monthly}
                  </h2>
                  <span className="free-badge">{t.freeForever}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <p className="text-xs opacity-75 mb-3 block">
                      Planora dynamic calendar workspace. Click on days to manage events instantly.
                    </p>

                    <div className="grid grid-cols-7 gap-1 text-center border-b border-slate-500/10 pb-2">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                        <span key={d} className="text-[10px] font-bold opacity-60 uppercase">{d}</span>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1 mt-1 text-center text-xs">
                      {Array.from({ length: 30 }).map((_, idx) => {
                        const dayNum = idx + 1;
                        const dateStr = `2026-06-${dayNum < 10 ? '0' + dayNum : dayNum}`;
                        const matching = calendarEvents.filter(e => e.date === dateStr);
                        return (
                          <div 
                            key={idx} 
                            onClick={() => setNewEventDate(dateStr)}
                            className={`p-2.5 rounded-xl transition duration-200 cursor-pointer flex flex-col justify-between h-14 ${
                              newEventDate === dateStr 
                                ? "bg-indigo-500/20 border border-indigo-500/50" 
                                : "hover:bg-slate-500/5"
                            }`}
                          >
                            <span className="font-bold block self-start text-[10px]">{dayNum}</span>
                            <div className="flex flex-col gap-0.5 mt-1 overflow-hidden">
                              {matching.map((e, eIdx) => (
                                <span 
                                  key={eIdx} 
                                  className="text-[7px] w-full block truncate rounded text-white px-1 leading-none py-0.5"
                                  style={{ backgroundColor: e.tagColor }}
                                >
                                  {e.title}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Add Event Form Sidebar */}
                  <div className="bg-slate-500/5 p-4 rounded-2xl space-y-4">
                    <span className="text-xs font-black uppercase tracking-wider text-rose-400 block border-b border-rose-500/10 pb-1.5">Add Target Event</span>
                    
                    <form onSubmit={handleAddCalendarEvent} className="space-y-2">
                      <div>
                        <label className="text-[10px] uppercase opacity-70 block mb-1">Date selected</label>
                        <input
                          type="date"
                          value={newEventDate}
                          onChange={(e) => setNewEventDate(e.target.value)}
                          className="w-full text-xs p-2 rounded-lg bg-slate-900 border border-white/10 text-white outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase opacity-70 block mb-1">Event title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Android Hackathon"
                          value={newEventTitle}
                          onChange={(e) => setNewEventTitle(e.target.value)}
                          className="w-full text-xs p-2 rounded-lg bg-slate-900 border border-white/10 text-white outline-none"
                        />
                      </div>

                      <button type="submit" className="w-full py-2 bg-rose-500 text-white rounded-lg text-xs font-bold hover:scale-102 transition">
                        Add Calendar Event
                      </button>
                    </form>

                    <div className="space-y-2 mt-4 max-h-48 overflow-y-auto">
                      <span className="text-[10px] uppercase opacity-60 tracking-wider font-extrabold block">All Events list</span>
                      {calendarEvents.map(e => (
                        <div key={e.id} className="text-xs p-2 rounded-lg bg-black/10 border border-white/5 flex items-center justify-between">
                          <div>
                            <p className="font-bold">{e.title}</p>
                            <p className="text-[10px] opacity-60 font-mono">{e.date}</p>
                          </div>
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: e.tagColor }}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. AI Planner Module */}
            {activeModule === "aiPlanner" && (
              <div className="ai-gradient p-6 rounded-3xl glow-indigo text-white space-y-4">
                <div className="flex justify-between items-center border-b border-white/15 pb-2">
                  <h2 className="text-xl font-bold font-display flex items-center gap-2">
                    <Sparkles className="text-amber-300" /> {t.aiPlanner}
                  </h2>
                  <span className="free-badge">{t.freeForever}</span>
                </div>

                <p className="text-xs opacity-90">
                  Planora intelligence engine scans all tasks and provides dynamic action strategies.
                </p>

                <div className="py-2">
                  <button
                    onClick={getProductivitySuggestions}
                    className="px-5 py-3 rounded-2xl bg-white text-indigo-700 font-display font-bold hover:bg-slate-100 transition active:scale-95 text-xs flex items-center gap-2 justify-center w-full"
                  >
                    <Activity className="w-4 h-4 text-emerald-500" />
                    {t.aiSuggestionsBtn}
                  </button>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {aiSuggestions.map((sug, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-white/10 border border-white/10 text-white">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[9px] font-serif uppercase tracking-widest bg-emerald-500 text-white px-1.5 rounded">
                          {sug.type || "AI focus"}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider opacity-70">
                          Priority: {sug.priority}
                        </span>
                      </div>
                      <p className="text-xs font-medium leading-relaxed">{sug.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. AI Schedule Generator Module */}
            {activeModule === "aiSchedule" && (
              <div className={`p-6 rounded-3xl ${isDark ? "glass" : "glass bg-white/70"}`}>
                <div className="flex justify-between items-center mb-4 border-b pb-2 border-slate-500/10">
                  <h2 className="text-xl font-bold font-display flex items-center gap-2">
                    <Clock className="text-purple-400 animate-pulse" /> {t.aiSchedule}
                  </h2>
                  <span className="free-badge">{t.freeForever}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs block font-bold mb-2">{t.aiFocusPrompt}</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={aiFocus}
                        onChange={(e) => setAiFocus(e.target.value)}
                        placeholder="e.g. Master React 19 State, prepare pitch deck"
                        className={`flex-1 text-xs px-3.5 py-3 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                      />
                      <button
                        onClick={generateAISchedule}
                        disabled={aiLoading}
                        className="px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-xs hover:scale-102 transition flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        Generate
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-slate-500/10 pt-4">
                    <span className="text-xs font-black uppercase tracking-wider text-purple-400 block mb-2">AI Output Results</span>
                    <div className="space-y-2">
                      {aiScheduleData.map((item, idx) => (
                        <div key={idx} className="p-3 bg-slate-500/5 rounded-2xl flex items-center justify-between gap-3 border border-transparent hover:border-purple-500/30">
                          <span className="text-xs font-mono font-bold text-indigo-400">{item.time}</span>
                          <span className="text-xs flex-1">{item.activity}</span>
                          <span className="text-[10px] tracking-wider uppercase bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 7. AI Study Planner Module */}
            {activeModule === "aiStudy" && (
              <div className={`p-6 rounded-3xl ${isDark ? "glass" : "glass bg-white/70"}`}>
                <div className="flex justify-between items-center mb-4 border-b pb-2 border-slate-500/10">
                  <h2 className="text-xl font-bold font-display flex items-center gap-2">
                    <GraduationIcon className="text-pink-400" /> {t.aiStudy}
                  </h2>
                  <span className="free-badge">{t.freeForever}</span>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-500/5 p-4 rounded-2xl">
                    <div>
                      <label className="text-xs block font-bold mb-1.5">{t.aiStudyPrompt}</label>
                      <input
                        type="text"
                        value={aiStudyTarget}
                        onChange={(e) => setAiStudyTarget(e.target.value)}
                        className={`w-full text-xs p-2.5 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs block font-bold mb-1.5">{t.aiHoursPrompt}</label>
                        <input
                          type="number"
                          value={aiHours}
                          onChange={(e) => setAiHours(Number(e.target.value))}
                          className={`w-full text-xs p-2.5 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                        />
                      </div>
                      <div>
                        <label className="text-xs block font-bold mb-1.5">{t.aiDifficulty}</label>
                        <select
                          value={aiDifficulty}
                          onChange={(e) => setAiDifficulty(e.target.value)}
                          className={`w-full text-xs p-2.5 rounded-xl outline-none ${isDark ? "glass-input-dark bg-slate-950" : "glass-input-light"}`}
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                      </div>
                    </div>

                    <div className="md:col-span-2 pt-2">
                      <button
                        onClick={() => generateAITimetable(false)}
                        className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-xs font-black transition"
                      >
                        Create Study Path with AI
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-slate-500/10 pt-4">
                    <span className="text-xs font-black uppercase tracking-wider text-pink-400 block mb-2">Curriculum Blocks Output</span>
                    <div className="space-y-3">
                      {aiTimetableData.map((item, idx) => (
                        <div key={idx} className="p-3.5 bg-slate-500/5 rounded-2xl border border-pink-500/10">
                          <div className="flex justify-between font-bold text-xs mb-1">
                            <span>{item.session} ({item.duration})</span>
                            <span className="text-pink-400">Break: {item.breakAfter}</span>
                          </div>
                          <p className="text-xs font-mono">{item.topic}</p>
                          <p className="text-[11px] opacity-70 mt-1">{item.objective}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 8. AI Work Planner Module */}
            {activeModule === "aiWork" && (
              <div className={`p-6 rounded-3xl ${isDark ? "glass" : "glass bg-white/70"}`}>
                <div className="flex justify-between items-center mb-4 border-b pb-2 border-slate-500/10">
                  <h2 className="text-xl font-bold font-display flex items-center gap-2">
                    <BriefcaseIcon className="text-cyan-400" /> {t.aiWork}
                  </h2>
                  <span className="free-badge">{t.freeForever}</span>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-500/5 p-4 rounded-2xl">
                    <div className="md:col-span-2">
                      <label className="text-xs block font-bold mb-1.5">{t.aiWorkPrompt}</label>
                      <input
                        type="text"
                        value={aiWorkTarget}
                        onChange={(e) => setAiWorkTarget(e.target.value)}
                        className={`w-full text-xs p-2.5 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs block font-bold mb-1.5">{t.aiHoursPrompt}</label>
                      <input
                        type="number"
                        value={aiHours}
                        onChange={(e) => setAiHours(Number(e.target.value))}
                        className={`w-full text-xs p-2.5 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                      />
                    </div>
                    <div>
                      <label className="text-xs block font-bold mb-1.5">{t.aiDifficulty}</label>
                      <select
                        value={aiDifficulty}
                        onChange={(e) => setAiDifficulty(e.target.value)}
                        className={`w-full text-xs p-2.5 rounded-xl outline-none ${isDark ? "glass-input-dark bg-slate-950" : "glass-input-light"}`}
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>

                    <div className="md:col-span-2 pt-2">
                      <button
                        onClick={() => generateAITimetable(true)}
                        className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-xs font-black transition"
                      >
                        Construct Work path via AI
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-slate-500/10 pt-4">
                    <span className="text-xs font-black uppercase tracking-wider text-cyan-400 block mb-2">Work Path Breakdown Output</span>
                    <div className="space-y-3">
                      {aiTimetableData.map((item, idx) => (
                        <div key={idx} className="p-3.5 bg-slate-500/5 rounded-2xl border border-cyan-500/10">
                          <div className="flex justify-between font-bold text-xs mb-1">
                            <span>{item.session} ({item.duration})</span>
                            <span className="text-cyan-400">Break: {item.breakAfter}</span>
                          </div>
                          <p className="text-xs font-mono">{item.topic}</p>
                          <p className="text-[11px] opacity-70 mt-1">{item.objective}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 9. Habit Tracker Module */}
            {activeModule === "habit" && (
              <div className={`p-6 rounded-3xl ${isDark ? "glass" : "glass bg-white/70"}`}>
                <div className="flex justify-between items-center mb-4 border-b pb-2 border-slate-500/10">
                  <h2 className="text-xl font-bold font-display flex items-center gap-2">
                    <Activity className="text-emerald-400" /> {t.habit}
                  </h2>
                  <span className="free-badge">{t.freeForever}</span>
                </div>

                <form onSubmit={handleAddHabit} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-6 bg-slate-500/5 p-4 rounded-2xl">
                  <input
                    type="text"
                    required
                    placeholder="Habit name (e.g. Meditate)"
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                    className={`text-xs px-3 py-2 rounded-xl outline-none md:col-span-2 ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                  />
                  <select
                    value={newHabitGoal}
                    onChange={(e) => setNewHabitGoal(Number(e.target.value))}
                    className={`text-xs px-2 py-2 rounded-xl outline-none ${isDark ? "glass-input-dark bg-slate-900" : "glass-input-light bg-white"}`}
                  >
                    <option value="3">3 times/week</option>
                    <option value="5">5 times/week</option>
                    <option value="7">7 times/week (Daily)</option>
                  </select>
                  <button type="submit" className="bg-emerald-500 text-white font-bold rounded-xl text-xs hover:scale-102 transition">
                    + Add Habit
                  </button>
                </form>

                <div className="space-y-6">
                  {habits.map(habit => (
                    <div key={habit.id} className="p-4 rounded-2xl bg-slate-500/5 border border-slate-500/10">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="text-sm font-bold">{habit.name}</p>
                          <p className="text-[10px] opacity-60">Goal: {habit.weeklyGoal} times/week</p>
                        </div>
                        <span className="text-xs bg-orange-500/20 text-orange-400 px-2.5 py-0.5 rounded-full font-bold">
                          🔥 {habit.streak} day streak
                        </span>
                      </div>

                      {/* 28-day dynamic mini grid */}
                      <span className="text-[10px] uppercase opacity-55 block mb-1">Click to toggle habits history calendar (28 Days)</span>
                      <div className="flex flex-wrap gap-1.5">
                        {Array.from({ length: 28 }).map((_, idx) => {
                          const dateNum = 10 - idx;
                          const dateStr = `2026-06-${dateNum >= 10 ? dateNum : '0' + dateNum}`;
                          const isDone = habit.history.includes(dateStr);
                          return (
                            <button
                              key={idx}
                              onClick={() => handleToggleHabitDay(habit.id, dateStr)}
                              className={`w-6 h-6 rounded-md transition ${
                                isDone 
                                  ? "bg-emerald-400 opacity-100 ring-2 ring-emerald-500/50" 
                                  : "bg-slate-500/20 hover:bg-slate-500/40"
                              }`}
                              title={`Date: ${dateStr}`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 10. Goal Tracker Module */}
            {activeModule === "goal" && (
              <div className={`p-6 rounded-3xl ${isDark ? "glass" : "glass bg-white/70"}`}>
                <div className="flex justify-between items-center mb-4 border-b pb-2 border-slate-500/10">
                  <h2 className="text-xl font-bold font-display flex items-center gap-2">
                    <Trophy className="text-amber-400" /> {t.goal}
                  </h2>
                  <span className="free-badge">{t.freeForever}</span>
                </div>

                <form onSubmit={handleAddGoal} className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 bg-slate-500/5 p-4 rounded-2xl">
                  <div>
                    <label className="text-[11px] uppercase opacity-60 block mb-1">Goal Outcome title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Deploy 5 Android applications"
                      value={newGoalTitle}
                      onChange={(e) => setNewGoalTitle(e.target.value)}
                      className={`w-full text-xs px-3 py-2 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase opacity-60 block mb-1">Milestones (separated by commas)</label>
                    <input
                      type="text"
                      placeholder="e.g. Write design document, Code prototype, Release APK"
                      value={newGoalMilestoneInput}
                      onChange={(e) => setNewGoalMilestoneInput(e.target.value)}
                      className={`w-full text-xs px-3 py-2 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                    />
                  </div>
                  <div className="md:col-span-2 pt-2 text-right">
                    <button type="submit" className="px-5 py-2.5 bg-amber-500 text-white rounded-xl text-xs font-bold transition hover:scale-102">
                      Initialize High-Impact Goal
                    </button>
                  </div>
                </form>

                <div className="space-y-4">
                  {goals.map(goal => (
                    <div key={goal.id} className="p-4 rounded-2xl bg-slate-500/5 border border-slate-500/10">
                      <div className="flex justify-between font-bold text-sm mb-1">
                        <span>{goal.title}</span>
                        <span className="text-amber-400">{goal.progress}%</span>
                      </div>
                      
                      {/* Modern progress track */}
                      <div className="w-full h-2 bg-slate-500/10 rounded-full overflow-hidden mb-3">
                        <div className="h-full bg-amber-400 transition-all duration-500" style={{ width: `${goal.progress}%` }}></div>
                      </div>

                      <div className="space-y-1.5 pl-3">
                        {goal.milestones.map(milestone => (
                          <div key={milestone.id} className="flex items-center gap-2 text-xs">
                            <input
                              type="checkbox"
                              checked={milestone.completed}
                              onChange={() => handleToggleGoalMilestone(goal.id, milestone.id)}
                              className="w-3.5 h-3.5"
                            />
                            <span className={milestone.completed ? "line-through opacity-60" : ""}>{milestone.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 11. Notes & Files Module */}
            {activeModule === "notes" && (
              <div className={`p-6 rounded-3xl ${isDark ? "glass" : "glass bg-white/70"}`}>
                <div className="flex justify-between items-center mb-4 border-b pb-2 border-slate-500/10">
                  <h2 className="text-xl font-bold font-display flex items-center gap-2">
                    <FileText className="text-blue-400" /> {t.notes}
                  </h2>
                  <span className="free-badge">{t.freeForever}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <form onSubmit={handleAddNote} className="space-y-3 bg-slate-500/5 p-4 rounded-2xl">
                      <span className="text-xs font-black uppercase text-blue-400 block pb-1 border-b border-blue-500/10">Create Note</span>
                      <input
                        type="text"
                        required
                        placeholder="Title"
                        value={newNoteTitle}
                        onChange={(e) => setNewNoteTitle(e.target.value)}
                        className={`w-full text-xs p-2 rounded-lg bg-slate-900 border border-white/10 outline-none text-white`}
                      />
                      <textarea
                        rows={3}
                        placeholder="Content outline..."
                        value={newNoteContent}
                        onChange={(e) => setNewNoteContent(e.target.value)}
                        className={`w-full text-xs p-2 rounded-lg bg-slate-900 border border-white/10 outline-none text-white`}
                      />
                      <div>
                        <span className="text-[10px] uppercase opacity-75 block mb-1">Color theme card style</span>
                        <div className="flex gap-1.5">
                          {["rgba(99,102,241,0.2)", "rgba(16,185,129,0.2)", "rgba(244,63,94,0.2)"].map((color) => (
                            <button
                              key={color}
                              type="button"
                              onClick={() => setNewNoteColor(color)}
                              className={`w-6 h-6 rounded-full border transition ${
                                newNoteColor === color ? "border-white scale-110" : "border-transparent"
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg text-xs font-bold transition hover:scale-102">
                        Add Note Block
                      </button>
                    </form>
                  </div>

                  <div className="md:col-span-2 space-y-4">
                    {/* Simulated Upload drag-and-drop box */}
                    <div 
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (notes.length > 0) {
                          simulateAttachmentUpload(notes[0].id, "dropped_android_specs_backup.txt");
                        } else {
                          alert("Please create at least one Note block first to attach files.");
                        }
                      }}
                      className="border-2 border-dashed border-slate-500/30 rounded-2xl p-6 text-center hover:bg-slate-500/5 transition cursor-pointer"
                    >
                      <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <p className="text-xs font-bold">Mock Upload Files to active Note attachment shelf</p>
                      <p className="text-[10px] opacity-60">Drag & Drop files here, or click to attach instant backup schema</p>
                    </div>

                    <div className="space-y-3">
                      {notes.map(note => (
                        <div key={note.id} style={{ backgroundColor: note.color }} className="p-4 rounded-2xl border border-white/5 relative">
                          <button onClick={() => handleDeleteNote(note.id)} className="absolute top-3 right-3 text-rose-400 hover:opacity-100 opacity-60"><Trash2 className="w-3.5 h-3.5" /></button>
                          <h4 className="font-bold text-sm text-white mb-1">{note.title}</h4>
                          <p className="text-xs text-slate-200 leading-relaxed mb-2 whitespace-pre-line">{note.content}</p>
                          <span className="text-[9px] font-mono opacity-50 block">{note.date}</span>

                          {/* Inline Attachments */}
                          <div className="mt-3 border-t border-white/10 pt-2">
                            <span className="text-[10px] tracking-wider uppercase font-extrabold opacity-60">Attachments</span>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {note.attachments.map((at, atIdx) => (
                                <span key={atIdx} className="text-[10px] px-2 py-0.5 rounded bg-black/30 text-white font-serif tracking-tight">
                                  📂 {at.name} ({at.size})
                                </span>
                              ))}
                              <button
                                onClick={() => simulateAttachmentUpload(note.id, `manual_attachment_${Date.now().toString().slice(-4)}.pdf`)}
                                className="text-[9px] px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold"
                              >
                                + Attach simulated file
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 12. Birthday Reminder Module */}
            {activeModule === "birthday" && (
              <div className={`p-6 rounded-3xl ${isDark ? "glass" : "glass bg-white/70"}`}>
                <div className="flex justify-between items-center mb-4 border-b pb-2 border-slate-500/10">
                  <h2 className="text-xl font-bold font-display flex items-center gap-2">
                    <Gift className="text-rose-400" /> {t.birthday}
                  </h2>
                  <span className="free-badge">{t.freeForever}</span>
                </div>

                <form onSubmit={handleAddBirthday} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6 bg-slate-500/5 p-4 rounded-2xl">
                  <input
                    type="text"
                    required
                    placeholder="Friend's Name"
                    value={newBName}
                    onChange={(e) => setNewBName(e.target.value)}
                    className={`text-xs px-2.5 py-2 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                  />
                  <input
                    type="date"
                    required
                    value={newBDate}
                    onChange={(e) => setNewBDate(e.target.value)}
                    className={`text-xs px-2.5 py-2 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                  />
                  <input
                    type="text"
                    placeholder="Gift Path / Idea"
                    value={newBGift}
                    onChange={(e) => setNewBGift(e.target.value)}
                    className={`text-xs px-2.5 py-2 rounded-xl outline-none md:col-span-1 ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                  />
                  <button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs py-2 px-3 rounded-xl">
                    Add Birthday Reminder Route
                  </button>
                </form>

                <div className="space-y-1.5">
                  {birthdays.map(b => (
                    <div key={b.id} className="p-3 bg-slate-500/5 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold">{b.name}</p>
                        <p className="text-[11px] opacity-60">BirthDate: {b.birthDate}</p>
                      </div>
                      {b.giftIdea && (
                        <span className="text-[10px] bg-indigo-500/10 text-indigo-300 px-2.5 py-0.5 rounded">
                          Idea: {b.giftIdea}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 13. Anniversary Reminder Module */}
            {activeModule === "anniversary" && (
              <div className={`p-6 rounded-3xl ${isDark ? "glass" : "glass bg-white/70"}`}>
                <div className="flex justify-between items-center mb-4 border-b pb-2 border-slate-500/10">
                  <h2 className="text-xl font-bold font-display flex items-center gap-2">
                    <Heart className="text-pink-500" /> {t.anniversary}
                  </h2>
                  <span className="free-badge">{t.freeForever}</span>
                </div>

                <form onSubmit={handleAddAnniversary} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6 bg-slate-500/5 p-4 rounded-2xl">
                  <input
                    type="text"
                    required
                    placeholder="Names (e.g. Rachel & Chandler)"
                    value={newANames}
                    onChange={(e) => setNewANames(e.target.value)}
                    className={`text-xs px-2.5 py-2 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                  />
                  <input
                    type="date"
                    required
                    value={newADate}
                    onChange={(e) => setNewADate(e.target.value)}
                    className={`text-xs px-2.5 py-2 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                  />
                  <select
                    value={newAType}
                    onChange={(e) => setNewAType(e.target.value)}
                    className={`text-xs px-1.5 py-2 rounded-xl outline-none ${isDark ? "glass-input-dark bg-slate-900" : "glass-input-light bg-white"}`}
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Work">Corporate Milestone</option>
                    <option value="Founding">Founding Celebrations</option>
                  </select>
                  <button type="submit" className="md:col-span-3 bg-pink-500 text-white font-bold text-xs py-2 px-3 rounded-xl hover:bg-pink-600 transition">
                    Submit Landmark Anniversary Reminder
                  </button>
                </form>

                <div className="space-y-1.5">
                  {anniversaries.map(a => (
                    <div key={a.id} className="p-3 bg-slate-500/5 rounded-xl flex items-center justify-between border border-transparent hover:border-pink-500/20">
                      <div>
                        <p className="text-xs font-bold">{a.names}</p>
                        <p className="text-[11px] opacity-60">Anniversary Date: {a.eventDate}</p>
                      </div>
                      <span className="text-[10px] bg-pink-500/10 text-pink-300 px-2 py-0.5 rounded font-black uppercase">
                        {a.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 14. Event Planner Module */}
            {activeModule === "event" && (
              <div className={`p-6 rounded-3xl ${isDark ? "glass" : "glass bg-white/70"}`}>
                <div className="flex justify-between items-center mb-4 border-b pb-2 border-slate-500/10">
                  <h2 className="text-xl font-bold font-display flex items-center gap-2">
                    <Milestone className="text-orange-400" /> {t.event}
                  </h2>
                  <span className="free-badge">{t.freeForever}</span>
                </div>

                <form onSubmit={handleAddPlannedEvent} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6 bg-slate-500/5 p-4 rounded-2xl">
                  <input
                    type="text"
                    required
                    placeholder="Expo / Event title"
                    value={newEventPlannedTitle}
                    onChange={(e) => setNewEventPlannedTitle(e.target.value)}
                    className={`text-xs px-2.5 py-2 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                  />
                  <input
                    type="text"
                    placeholder="Venue location"
                    value={newEventPlannedVenue}
                    onChange={(e) => setNewEventPlannedVenue(e.target.value)}
                    className={`text-xs px-2.5 py-2 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                  />
                  <input
                    type="number"
                    placeholder="Budget Amount"
                    value={newEventPlannedBudget}
                    onChange={(e) => setNewEventPlannedBudget(Number(e.target.value))}
                    className={`text-xs px-2.5 py-2 rounded-xl outline-none ${isDark ? "glass-input-dark" : "glass-input-light"}`}
                  />
                  <button type="submit" className="md:col-span-3 bg-orange-500 text-white text-xs font-bold rounded-xl py-2 px-3">
                    Initialize Android App launch Event Planner
                  </button>
                </form>

                <div className="space-y-4">
                  {plannedEvents.map(ev => (
                    <div key={ev.id} className="p-4 rounded-2xl bg-slate-500/5 border border-slate-500/10">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-bold">{ev.title}</p>
                        <span className="text-[11px] font-mono border border-indigo-400/20 px-2 py-0.5 rounded font-black text-indigo-400">
                          Budget: ${ev.budget} / Spent: ${ev.spent}
                        </span>
                      </div>
                      <p className="text-xs opacity-70 mb-3">Venue: {ev.venue}</p>

                      <div className="mb-3 space-y-1.5 pl-3">
                        {ev.checklist.map(item => (
                          <div key={item.id} className="flex items-center gap-2 text-xs">
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={() => handleToggleEventChecklist(ev.id, item.id)}
                              className="w-3.5 h-3.5"
                            />
                            <span className={item.completed ? "line-through opacity-60" : ""}>{item.title}</span>
                          </div>
                        ))}
                      </div>

                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const inp = e.currentTarget.elements.namedItem("it_input") as HTMLInputElement;
                        handleAddEventChecklistItem(ev.id, inp.value);
                        inp.value = "";
                      }} className="flex gap-2">
                        <input
                          type="text"
                          name="it_input"
                          placeholder="Add event milestone route..."
                          className={`flex-1 text-[11px] px-2 py-1 rounded outline-none ${isDark ? "glass-input-dark bg-white/5" : "glass-input-light bg-black/5"}`}
                        />
                        <button type="submit" className="p-1 px-3 bg-orange-500/20 text-orange-400 rounded text-xs font-bold">+</button>
                        <button
                          type="button"
                          onClick={() => handleAddSpend(ev.id, 500)}
                          className="px-2.5 py-1 bg-rose-500/20 text-rose-300 rounded text-xs font-bold"
                        >
                          + Spend $500
                        </button>
                      </form>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 15. Travel Planner Module */}
            {activeModule === "travel" && (
              <div className={`p-6 rounded-3xl ${isDark ? "glass" : "glass bg-white/70"}`}>
                <div className="flex justify-between items-center mb-4 border-b pb-2 border-slate-500/10">
                  <h2 className="text-xl font-bold font-display flex items-center gap-2">
                    <Map className="text-cyan-400" /> {t.travel}
                  </h2>
                  <span className="free-badge">{t.freeForever}</span>
                </div>

                <form onSubmit={handleAddTravel} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6 bg-slate-500/5 p-4 rounded-2xl">
                  <input
                    type="text"
                    required
                    placeholder="Destination (e.g. Tokyo, Paris)"
                    value={newTravelDest}
                    onChange={(e) => setNewTravelDest(e.target.value)}
                    className="text-xs px-2 py-2 rounded bg-slate-900 border border-white/10 outline-none text-white md:col-span-2"
                  />
                  <input
                    type="number"
                    placeholder="Allotted budget"
                    value={newTravelBudget}
                    onChange={(e) => setNewTravelBudget(Number(e.target.value))}
                    className="text-xs px-2 py-2 rounded bg-slate-900 border border-white/10 outline-none text-white"
                  />
                  <button type="submit" className="md:col-span-3 bg-cyan-500 text-white font-bold text-xs py-2 rounded-xl">
                    Deploy Modular Travel Route Package
                  </button>
                </form>

                <div className="space-y-3">
                  {travelPlanner.map(travel => (
                    <div key={travel.id} className="p-4 bg-slate-500/5 rounded-2xl border border-slate-500/10 text-xs">
                      <div className="flex justify-between items-center mb-2 font-bold text-sm">
                        <span className="text-cyan-300">✈️ {travel.destination}</span>
                        <span>Estimated cost: ${travel.budget}</span>
                      </div>
                      
                      <div className="mb-3">
                        <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-1">Itinerary Itinerary Planner:</span>
                        {travel.itineraryDays.map((day, dIdx) => (
                          <div key={dIdx} className="mb-1.5 pl-2">
                            <span className="font-bold">Day {day.day}:</span>
                            <ul className="list-disc pl-4 opacity-80">
                              {day.activities.map((act, actIdx) => <li key={actIdx}>{act}</li>)}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-1">Packing checklist status:</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                          {travel.packingList.map((item, ip) => (
                            <div key={ip} className="flex items-center gap-1.5 bg-black/10 p-1 px-2 rounded">
                              <input
                                type="checkbox"
                                checked={item.packed}
                                onChange={() => handleTogglePackingItem(travel.id, ip)}
                                className="w-3.5 h-3.5"
                              />
                              <span className={item.packed ? "line-through opacity-55" : ""}>{item.item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dashboard Workspace Hub */}
            {activeModule === "dashboard" && (
              <div className="space-y-6">
                
                {/* Simulated Android Alarm Trigger Container */}
                <div className="p-5 rounded-3xl ai-gradient text-white flex items-center justify-between glow-indigo relative overflow-hidden">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1 bg-white/20 text-white text-[9px] font-black tracking-widest px-2 py-0.5 rounded-full">
                      ACTIVE REMINDER SNOOZE
                    </span>
                    <p className="text-base font-bold font-display">Planora Smart Daily Alarm Setup</p>
                    <p className="text-xs opacity-90">Simulated repeat alerts: Wakeup for standup block at 07:45 AM</p>
                  </div>
                  <button onClick={() => alert("Simulated snooze action triggered. Safe monitoring active.")} className="px-4 py-2 bg-white text-indigo-700 text-xs font-bold rounded-xl shadow">
                    Configure Snooze
                  </button>
                </div>

                <div className={`p-6 rounded-3xl ${isDark ? "glass" : "glass bg-white/70"}`}>
                  <h3 className="font-display font-black text-lg mb-4 flex items-center gap-2">
                    <Compass className="text-teal-400" /> Planora Active Workspace Console
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex flex-col justify-between">
                      <div>
                        <span className="text-[10.5px] uppercase font-bold text-indigo-400 block mb-1">Total Checklist Tasks</span>
                        <p className="text-2.5xl font-extrabold">{tasks.filter(t => !t.completed).length} items remaining</p>
                      </div>
                      <span className="text-[10px] opacity-60 mt-3 block">Unlimited server synchronization</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col justify-between">
                      <div>
                        <span className="text-[10.5px] uppercase font-bold text-emerald-400 block mb-1">Active Streaks</span>
                        <p className="text-2.5xl font-extrabold">12 Consecutive Days Tracker</p>
                      </div>
                      <span className="text-[10px] opacity-60 mt-3 block">Simulated Google Drive backup ready</span>
                    </div>
                  </div>
                </div>

                <WidgetsPanel
                  tasks={tasks}
                  events={calendarEvents}
                  lang={language}
                  theme={theme}
                  onAddTask={(title, priority) => {
                    const newTask: Task = {
                      id: `t-w-${Date.now()}`,
                      title,
                      completed: false,
                      priority,
                      color: "#6366f1",
                      tags: ["QuickAdd"],
                      subtasks: [],
                      recurring: false,
                      dueDate: "2026-11-20"
                    };
                    setTasks(p => [newTask, ...p]);
                    triggerCloudSync();
                  }}
                  onNavigateToModule={(mod) => {
                    setActiveModule(mod);
                  }}
                />

              </div>
            )}

          </div>

          {/* Sidebar / Android Widgets Shelf: Right-weighted container */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Real-time preview indicator */}
            <div className={`p-6 rounded-3xl text-xs space-y-4 ${isDark ? "glass" : "glass bg-white/70"}`}>
              <div className="flex justify-between items-center pb-2 border-b border-slate-500/10">
                <span className="font-bold tracking-wider font-display uppercase opacity-75">Platform Environment</span>
                <span className="text-[9px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 rounded">ONLINE</span>
              </div>
              <p className="leading-relaxed opacity-85">
                Each module in <b>Planora</b> functions instantly in offline-first mode with high contrast glass controls.
              </p>
              
              <div className="flex justify-between items-center text-[10px]">
                <span className="opacity-60">Selected Language:</span>
                <span className="font-bold uppercase text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                  {language === "en" ? "English" : language === "hi" ? "Hindi (हिन्दी)" : "Gujarati (ગુજરાતી)"}
                </span>
              </div>

              {/* Free Forever Pledge */}
              <div className="bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/20 text-center">
                <p className="font-bold text-emerald-400 text-xs">💎 PLANORA POLICY PLEDGE</p>
                <p className="text-[10px] opacity-75 mt-1">
                  Absolutely <b>no paywalls</b> or sub-plan prompts. All 15 modules are completely interactive for live server pathways.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-500/10 space-y-1 text-[10px] opacity-60 font-mono">
                <div>WORKSPACE INSTANCE: CLOUD RUN CORE</div>
                <div>DATABASE SHARDS: SIMULATED FIRESTORE</div>
                <div>SECURE CRYPTO SEED: APPROVED</div>
              </div>
            </div>

            {/* Quick Action Planora AI Assistant widget */}
            <div className="ai-gradient p-6 rounded-3xl glow-indigo text-white">
              <span className="text-[10px] tracking-widest uppercase font-black bg-white/20 text-white px-2 py-1 rounded-full mb-2 inline-block">
                PLANORA AI ADVISOR
              </span>
              <p className="text-xs leading-relaxed opacity-95 mb-4">
                "We detected priority changes on your tasks list. Would you like me to align calendar event checklists or suggest daily standup break blocks?"
              </p>
              <button 
                onClick={() => {
                  setActiveModule("aiPlanner");
                  getProductivitySuggestions();
                }}
                className="w-full py-2 bg-white text-indigo-700 font-bold hover:bg-slate-100 transition rounded-xl text-xs active:scale-95 flex items-center justify-center gap-1"
              >
                Let's Optimize
              </button>
            </div>

            {/* Quick Actions Panel: Easy modular navigation */}
            <div className={`p-6 rounded-3xl ${isDark ? "glass" : "glass bg-white/70"} space-y-2`}>
              <span className="text-xs font-bold uppercase opacity-75 block mb-2">Workspace Quick Link Shelf</span>
              <div className="flex flex-col gap-1.5">
                <button onClick={() => setActiveModule("dashboard")} className="text-left py-2 px-3 hover:bg-slate-500/10 rounded-xl text-xs font-semibold flex items-center justify-between">
                  <span>🏠 Dashboard Home Workspace</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
                <button onClick={() => setActiveModule("todo")} className="text-left py-2 px-3 hover:bg-slate-500/10 rounded-xl text-xs font-semibold flex items-center justify-between">
                  <span>📝 Access To Do Grid</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
                <button onClick={() => {
                  getProductivitySuggestions();
                  setActiveModule("aiPlanner");
                }} className="text-left py-2 px-3 hover:bg-slate-500/10 rounded-xl text-xs font-semibold flex items-center justify-between">
                  <span>✨ Get Live Suggestions</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              </div>
            </div>

          </div>

        </section>

        {/* Humble Android Page Footer */}
        <footer className="text-center py-8 opacity-40 text-[10px] font-mono select-none">
          PLANORA PORTABLE DESKTOP PREVIEW v2.2 • POWERED BY GOOGLE GENAI SDK • PLATFORM CLOUD RUN CONTAINER • SECURE OFF-LINE EMULATOR ID: OK
        </footer>

      </main>

    </div>
  );
}

// Inline fallback components as simple helper representations
function GraduationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.263 10.185a.75.75 0 0 0 .495.96a2.25 2.25 0 0 0 3.498-1.5c.045-.259.088-.519.127-.78M4.263 10.185a15.42 15.42 0 0 1 1.761-4.321L9.75 3l3.726 2.864a15.419 15.419 0 0 1 1.761 4.322m-10.984 0L12 14.185l8.016-4a15.419 15.419 0 0 1-1.761-4.321M20.25 10.5v5.04M12 14.185V21M12 21h-2.25m4.5 0H12" />
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .966-.784 1.75-1.75 1.75H5.5c-.966 0-1.75-.784-1.75-1.75v-4.25m16.5 0a2.25 2.25 0 0 0-2.25-2.25H5.5A2.25 2.25 0 0 0 3.25 14.15m16.5 0V9a2.25 2.25 0 0 0-2.25-2.25H5.5A2.25 2.25 0 0 0 3.25 9v5.15M12 9V3.75m0 0H9.75m2.25 0h2.25" />
    </svg>
  );
}
