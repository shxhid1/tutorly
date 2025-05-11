
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import StudyPlans from "./pages/StudyPlans";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import Flashcards from "./pages/Flashcards";
import Quiz from "./pages/Quiz";
import Summaries from "./pages/Summaries";
import MicroLessons from "./pages/MicroLessons";
import AIAssistant from "./pages/AIAssistant";
import StudyTechniques from "./pages/StudyTechniques";
import "./css/animations.css";
import "./css/darkMode.css";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Document title update
document.title = "Tutorly - Smart Learning Platform";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Navigate to="/dashboard" replace />} />
            <Route path="/landing" element={<Index />} />
            <Route path="/library" element={<Library />} />
            <Route path="/study-plans" element={<StudyPlans />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/summaries" element={<Summaries />} />
            <Route path="/micro-lessons" element={<MicroLessons />} />
            <Route path="/study-techniques" element={<StudyTechniques />} />
            <Route path="/upload" element={<Navigate to="/library" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
