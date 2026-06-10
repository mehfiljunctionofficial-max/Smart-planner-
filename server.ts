import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to lazy-get the Gemini API client
let aiInstance: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    throw new Error("GEMINI_API_KEY is missing or contains placeholder. Please set a valid API Key in the Secrets panel.");
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// 1. AI Daily Schedule Generator Endpoint
app.post("/api/gemini/schedule", async (req, res) => {
  try {
    const { dayFocus, tasksCount = 5, lang = "English" } = req.body;
    
    // Fallback data in case of missing API key or translation errors
    const fallback = [
      { time: "08:00 AM", activity: "Kickstart: Review daily goals and prioritized tasks", priority: "High", category: "Planning" },
      { time: "09:30 AM", activity: "Deep Work: Core high-impact deliverables", priority: "High", category: "Work" },
      { time: "11:30 AM", activity: "Admin and Email Catchup", priority: "Medium", category: "Inbox" },
      { time: "01:00 PM", activity: "Rest & Nutritious Lunch Break", priority: "Low", category: "Health" },
      { time: "02:00 PM", activity: "Collaboration & Strategy Sync", priority: "Medium", category: "Meetings" },
      { time: "04:00 PM", activity: "Refelction & Micro-learning block", priority: "Low", category: "Study" }
    ];

    try {
      const ai = getAI();
      const prompt = `Generate a daily productivity schedule in ${lang} targeting: "${dayFocus}". Create a list of ${tasksCount} time-blocked activities.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            description: "A chronological list of schedule blocks",
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING, description: "Time range (e.g. 09:00 AM - 10:30 AM)" },
                activity: { type: Type.STRING, description: "Detailed summary of the activity" },
                priority: { type: Type.STRING, description: "High, Medium, or Low" },
                category: { type: Type.STRING, description: "Brief category label (e.g. Work, Study, Rest, Health)" }
              },
              required: ["time", "activity", "priority", "category"]
            }
          }
        }
      });

      const parsed = JSON.parse(response.text || "[]");
      return res.json({ success: true, count: parsed.length, data: parsed });
    } catch (apiErr: any) {
      console.warn("Gemini API Error (Schedule):", apiErr.message);
      // Return beautiful fallback with info notice
      return res.json({
        success: false,
        warning: "Running in offline preview layout (API Key not set or loaded).",
        data: fallback
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 2. AI Study/Work Timetable Generator Endpoint
app.post("/api/gemini/timetable", async (req, res) => {
  try {
    const { topic, difficulty = "Medium", totalHours = 4, lang = "English", isWork = false } = req.body;

    const fallback = [
      { session: `${isWork ? 'Work' : 'Study'} Block 1`, topic: `Initial Research into ${topic}`, duration: "50 mins", objective: "Core concepts outline and data collection", breakAfter: "10 mins break" },
      { session: `${isWork ? 'Work' : 'Study'} Block 2`, topic: `Intense deep dive & exercises`, duration: "50 mins", objective: "Implementation/Problem solving", breakAfter: "10 mins break" },
      { session: `${isWork ? 'Work' : 'Study'} Block 3`, topic: "Review & Active Recall", duration: "30 mins", objective: "Summarization & flashcards review", breakAfter: "Done" }
    ];

    try {
      const ai = getAI();
      const planType = isWork ? "Work" : "Study/Learning";
      const prompt = `Create a step-by-step modular ${planType} timetable in ${lang} to master: "${topic}". Total hours allotted: ${totalHours} hours. Difficulty level: ${difficulty}. Split into detailed focus blocks.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            description: "A timetable list of study/work blocks",
            items: {
              type: Type.OBJECT,
              properties: {
                session: { type: Type.STRING, description: "Session name (e.g., Session 1: Baseline)" },
                topic: { type: Type.STRING, description: "Specific topic or skill targeted" },
                duration: { type: Type.STRING, description: "Session length in minutes" },
                objective: { type: Type.STRING, description: "Clear, action-oriented milestone goal" },
                breakAfter: { type: Type.STRING, description: "Recommended break description (e.g., 5 min stretch)" }
              },
              required: ["session", "topic", "duration", "objective", "breakAfter"]
            }
          }
        }
      });

      const parsed = JSON.parse(response.text || "[]");
      return res.json({ success: true, data: parsed });
    } catch (apiErr: any) {
      console.warn("Gemini API Error (Timetable):", apiErr.message);
      return res.json({
        success: false,
        warning: "Running with pre-designed default timetable (API Key offline).",
        data: fallback
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 3. AI Smart Task Breakdown Endpoint
app.post("/api/gemini/breakdown", async (req, res) => {
  try {
    const { taskTitle, taskDescription = "", lang = "English" } = req.body;

    const fallback = [
      { title: "Define constraints and set milestones", estimatedMinutes: 15, difficulty: "Easy" },
      { title: "Gather required reference designs and materials", estimatedMinutes: 30, difficulty: "Medium" },
      { title: "Draft high-fidelity prototyping block", estimatedMinutes: 60, difficulty: "Hard" },
      { title: "Review outcome constraints and polish final touches", estimatedMinutes: 20, difficulty: "Easy" }
    ];

    try {
      const ai = getAI();
      const prompt = `Break down the complex task: "${taskTitle}" (${taskDescription}) into 4 discrete, actionable, step-by-step subtasks in ${lang}.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            description: "Actionable concrete checklist items",
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Subtask action label" },
                estimatedMinutes: { type: Type.INTEGER, description: "Minutes needed" },
                difficulty: { type: Type.STRING, description: "Easy, Medium, or Hard" }
              },
              required: ["title", "estimatedMinutes", "difficulty"]
            }
          }
        }
      });

      const parsed = JSON.parse(response.text || "[]");
      return res.json({ success: true, data: parsed });
    } catch (apiErr: any) {
      console.warn("Gemini API Error (Breakdown):", apiErr.message);
      return res.json({
        success: false,
        warning: "Offline Smart Breakdown generated.",
        data: fallback
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 4. AI Productivity Suggestions & Feedback
app.post("/api/gemini/suggestions", async (req, res) => {
  try {
    const { tasks = [], habits = [], lang = "English" } = req.body;

    const fallback = [
      { text: "Break your high-priority items into smaller interval focus blocks (Pomodoro 25/5).", type: "Strategy", priority: "High" },
      { text: "Your daily focus has been great! Keep your habit streaks alive by logging them in the early morning.", type: "Habit", priority: "Medium" },
      { text: "Review your travel planner milestones ahead of weekends to align schedules perfectly.", type: "Review", priority: "Low" }
    ];

    try {
      const ai = getAI();
      const prompt = `Analyze current status to give 3 dynamic personalized suggestions in ${lang}:
Tasks: ${JSON.stringify(tasks)}
Habits: ${JSON.stringify(habits)}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            description: "Personalized suggestions",
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING, description: "Detailed, encouraging advice block" },
                type: { type: Type.STRING, description: "Focus category: Focus, Habit, Planning, Balance" },
                priority: { type: Type.STRING, description: "High, Medium, or Low" }
              },
              required: ["text", "type", "priority"]
            }
          }
        }
      });

      const parsed = JSON.parse(response.text || "[]");
      return res.json({ success: true, data: parsed });
    } catch (apiErr: any) {
      console.warn("Gemini API Error (Suggestions):", apiErr.message);
      return res.json({
        success: false,
        warning: "Standard AI productivity analysis applied offline.",
        data: fallback
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Setup Vite Dev Server / Static Asset Hosting Middlewares
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Vite loading in Middleware Mode (HMR disabled via AI Studio settings)...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Planora Server] Running successfully on port ${PORT}`);
  });
}

startServer();
