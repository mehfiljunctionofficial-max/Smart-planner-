export type Language = "en" | "hi" | "gu";

export type Theme = "dark" | "light";

export type Priority = "low" | "medium" | "high";

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  color: string; // hex code or tailwind color class
  tags: string[];
  subtasks: Subtask[];
  recurring: boolean;
  recurringInterval?: "daily" | "weekly" | "monthly" | "none";
  dueDate?: string;
}

export interface DailyBlock {
  id: string;
  timeRange: string;
  activity: string;
  done: boolean;
  priority: Priority;
  category: string;
}

export interface WeeklyDay {
  dayId: string; // e.g. "monday"
  title: string;
  tasks: { id: string; title: string; completed: boolean }[];
}

export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  category: string;
  tagColor: string;
}

export interface Habit {
  id: string;
  name: string;
  streak: number;
  lastDoneDate?: string; // YYYY-MM-DD
  history: string[]; // list of done YYYY-MM-DD dates
  weeklyGoal: number; // e.g. 5 times/week
  category: string;
}

export interface Goal {
  id: string;
  title: string;
  targetDate: string;
  progress: number; // 0 to 100
  milestones: { id: string; name: string; completed: boolean }[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  color: string;
  attachments: { name: string; size: string; type: string }[];
}

export interface Birthday {
  id: string;
  name: string;
  birthDate: string; // YYYY-MM-DD
  giftIdea?: string;
}

export interface Anniversary {
  id: string;
  names: string;
  eventDate: string; // YYYY-MM-DD
  type: string; // e.g., Wedding, Work, etc.
}

export interface PlannedEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  budget: number;
  spent: number;
  checklist: Subtask[];
}

export interface TravelItinerary {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  itineraryDays: { day: number; activities: string[] }[];
  packingList: { item: string; packed: boolean }[];
}

export interface WidgetData {
  tasksWidgetCount: number;
  countdownWidgetTarget: string; // Event Date YYYY-MM-DD
  countdownWidgetName: string;
}
