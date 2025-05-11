
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Brain, FileText, Map, Repeat, Book, Layers } from "lucide-react";

interface StudyTechnique {
  id: string;
  title: string;
  description: string;
  steps: string[];
  benefits: string[];
  icon: React.ElementType;
}

const StudyTechniques = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const techniques: StudyTechnique[] = [
    {
      id: "pomodoro",
      title: "Pomodoro Technique",
      description: "A time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.",
      steps: [
        "Choose a task to work on",
        "Set a timer for 25 minutes",
        "Work on the task until the timer rings",
        "Take a 5-minute break",
        "After 4 pomodoros, take a longer break (15-30 minutes)"
      ],
      benefits: [
        "Increases focus and concentration",
        "Reduces mental fatigue",
        "Helps manage distractions",
        "Creates a sense of urgency"
      ],
      icon: Clock
    },
    {
      id: "feynman",
      title: "Feynman Technique",
      description: "A learning method named after physicist Richard Feynman, focused on explaining complex concepts in simple terms.",
      steps: [
        "Choose a concept to learn",
        "Explain it to yourself as if teaching a child",
        "Identify gaps in your explanation",
        "Review and simplify further"
      ],
      benefits: [
        "Identifies knowledge gaps",
        "Improves understanding through teaching",
        "Creates clearer mental models",
        "Enhances retention of information"
      ],
      icon: Brain
    },
    {
      id: "mindmapping",
      title: "Mind Mapping",
      description: "A visual thinking tool that helps structure information by creating relationships around a central concept.",
      steps: [
        "Start with a central idea in the middle",
        "Branch out with related concepts",
        "Use colors, images, and symbols",
        "Connect related branches",
        "Revise and refine your map"
      ],
      benefits: [
        "Organizes information visually",
        "Connects related concepts",
        "Stimulates creative thinking",
        "Improves recall through visual associations"
      ],
      icon: Map
    },
    {
      id: "spaced",
      title: "Spaced Repetition",
      description: "A learning technique that incorporates increasing intervals of time between subsequent review of previously learned material.",
      steps: [
        "Learn the material initially",
        "Review after 1 day",
        "Review after 3 days",
        "Review after 1 week",
        "Review after 2 weeks",
        "Continue with longer intervals"
      ],
      benefits: [
        "Optimizes memory retention",
        "Reduces total study time",
        "Prevents cramming",
        "Works with how the brain naturally remembers"
      ],
      icon: Repeat
    },
    {
      id: "active-recall",
      title: "Active Recall",
      description: "A learning principle that actively stimulates memory during the learning process by challenging yourself to recall information.",
      steps: [
        "Study the material",
        "Close your notes",
        "Try to recall what you learned",
        "Check your answers",
        "Focus on areas where recall was difficult"
      ],
      benefits: [
        "Strengthens neural pathways",
        "Identifies knowledge gaps quickly",
        "Improves long-term retention",
        "More effective than passive review"
      ],
      icon: Brain
    },
    {
      id: "cornell",
      title: "Cornell Method",
      description: "A note-taking system devised in the 1950s at Cornell University, providing a systematic format for organizing notes.",
      steps: [
        "Divide paper into three sections: notes, cues, and summary",
        "Take notes in the largest section",
        "Write cues/questions in the left column",
        "Summarize the main points at the bottom",
        "Review by covering notes and answering cues"
      ],
      benefits: [
        "Organizes information systematically",
        "Creates built-in review system",
        "Encourages active engagement",
        "Helps identify key concepts"
      ],
      icon: FileText
    },
    {
      id: "interleaved",
      title: "Interleaved Practice",
      description: "A learning technique that involves mixing different types of problems or content within a single study session.",
      steps: [
        "Instead of studying one topic at a time, mix related topics",
        "Practice different types of problems in a single session",
        "Switch between topics before reaching mastery",
        "Create connections between different subjects"
      ],
      benefits: [
        "Improves ability to discriminate between problem types",
        "Enhances transfer of knowledge to new situations",
        "Prevents autopilot learning",
        "Better mimics real-world application of knowledge"
      ],
      icon: Layers
    }
  ];
  
  const filteredTechniques = activeTab === "all" ? 
    techniques : 
    techniques.filter(technique => technique.id === activeTab);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container py-8 px-4 pb-20 md:pb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">Advanced Study Techniques</h1>
        <p className="text-gray-700 dark:text-gray-200 mb-8">Research-backed methods to improve your learning and retention</p>
        
        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 scrollbar-hide">
          <button 
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeTab === "all" ? "bg-primary text-white" : "bg-muted text-gray-700 dark:text-white"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Techniques
          </button>
          {techniques.map(technique => (
            <button 
              key={technique.id}
              className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-2 ${
                activeTab === technique.id ? "bg-primary text-white" : "bg-muted text-gray-700 dark:text-white"
              }`}
              onClick={() => setActiveTab(technique.id)}
            >
              <technique.icon className="h-4 w-4" />
              {technique.title}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTechniques.map(technique => (
            <Card key={technique.id} className="hover-glow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <technique.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-800 dark:text-white">{technique.title}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">{technique.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="steps">
                    <AccordionTrigger className="text-gray-800 dark:text-white">How to use it</AccordionTrigger>
                    <AccordionContent>
                      <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-200">
                        {technique.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="benefits">
                    <AccordionTrigger className="text-gray-800 dark:text-white">Benefits</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-200">
                        {technique.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
      <BottomNav />
    </div>
  );
};

export default StudyTechniques;
