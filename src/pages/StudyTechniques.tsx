
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollText, Clock, Check, FileText, X, Loader } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const StudyTechniques = () => {
  const techniques = [
    {
      id: "pomodoro",
      title: "Pomodoro Technique",
      description: "Work in focused intervals with short breaks",
      icon: Clock,
      content: `
        The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.
        
        ## How to use it:
        1. Choose a task to work on
        2. Set a timer for 25 minutes (one "Pomodoro")
        3. Work on the task until the timer rings
        4. Take a short 5-minute break
        5. After 4 Pomodoros, take a longer 15-30 minute break
        
        ## Benefits:
        - Improves focus and concentration
        - Reduces mental fatigue
        - Creates a sense of urgency
        - Helps track time spent on tasks
      `
    },
    {
      id: "feynman",
      title: "Feynman Technique",
      description: "Learn by teaching concepts in simple terms",
      icon: FileText,
      content: `
        The Feynman Technique is a method for learning concepts thoroughly by explaining them in simple terms, as if teaching a child.
        
        ## How to use it:
        1. Choose a concept to learn
        2. Explain it in simple terms, as if teaching a 12-year-old
        3. Identify gaps in your explanation or understanding
        4. Review and simplify further
        
        ## Benefits:
        - Exposes knowledge gaps
        - Enhances deep understanding
        - Improves ability to communicate complex ideas
        - Forces clarification of concepts
      `
    },
    {
      id: "mind-mapping",
      title: "Mind Mapping",
      description: "Visualize connections between related concepts",
      icon: ScrollText,
      content: `
        Mind mapping is a visual technique for organizing information around a central concept, with branches representing related ideas.
        
        ## How to use it:
        1. Write the main topic in the center of a page
        2. Draw branches for main subtopics
        3. Add smaller branches for details
        4. Use colors, symbols, and images to enhance memory
        
        ## Benefits:
        - Shows relationships between concepts
        - Aids visual learning and recall
        - Encourages creative thinking
        - Provides a comprehensive overview of a subject
      `
    },
    {
      id: "spaced-repetition",
      title: "Spaced Repetition",
      description: "Review material at increasing intervals over time",
      icon: Check,
      content: `
        Spaced repetition is a learning technique that involves reviewing information at systematically increasing intervals.
        
        ## How to use it:
        1. Review new material shortly after learning it
        2. Review again after a slightly longer interval (perhaps 1 day)
        3. If recalled correctly, double the interval (2 days, then 4 days, etc.)
        4. If forgotten, reset to a shorter interval
        
        ## Benefits:
        - Maximizes long-term memory retention
        - Optimizes study time efficiency
        - Reduces forgetting curve
        - Works well with flashcards and digital apps
      `
    },
    {
      id: "active-recall",
      title: "Active Recall",
      description: "Actively stimulate memory during the learning process",
      icon: Check,
      content: `
        Active recall involves actively stimulating your memory for information rather than passively reviewing it.
        
        ## How to use it:
        1. Study new material
        2. Close your notes/books
        3. Try to recall everything you can about the topic
        4. Check your notes to see what you missed
        
        ## Benefits:
        - Strengthens neural connections
        - Identifies knowledge gaps
        - Improves exam performance
        - More effective than re-reading
      `
    },
    {
      id: "cornell",
      title: "Cornell Note-Taking Method",
      description: "Structured note-taking system with cues and summaries",
      icon: FileText,
      content: `
        The Cornell method is a note-taking system that divides pages into sections for questions/cues, notes, and summaries.
        
        ## How to use it:
        1. Divide your page into three sections: a narrow left column (cue column), a wide right column (note column), and a section at the bottom (summary)
        2. Take notes in the right column
        3. After class, write questions or keywords in the left column
        4. Write a summary at the bottom
        
        ## Benefits:
        - Encourages active engagement with material
        - Facilitates quick review
        - Organizes information systematically
        - Promotes meaningful learning
      `
    },
    {
      id: "interleaved",
      title: "Interleaved Practice",
      description: "Mix different topics within a single study session",
      icon: ScrollText,
      content: `
        Interleaved practice involves mixing different topics or types of problems within a single study session, rather than focusing on one skill at a time.
        
        ## How to use it:
        1. Instead of practicing topic A, then B, then C in blocks
        2. Practice in a mixed order: A, B, C, B, A, C
        3. Create a study schedule that alternates between different subjects
        4. Switch topics before you feel you've mastered one
        
        ## Benefits:
        - Improves ability to discriminate between problem types
        - Strengthens long-term retention
        - Enhances transfer of learning
        - Better prepares for real-world application
      `
    }
  ];

  const [expandedTechnique, setExpandedTechnique] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 pb-20 md:pb-8 text-gray-800 dark:text-white">
        <div className="container max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-white">Effective Study Techniques</h1>
            <p className="text-gray-700 dark:text-gray-200">Science-backed methods to improve your learning and retention</p>
          </div>
          
          <div className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              {techniques.map((technique) => {
                const Icon = technique.icon;
                
                return (
                  <AccordionItem 
                    key={technique.id} 
                    value={technique.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4 bg-white dark:bg-gray-800"
                  >
                    <AccordionTrigger className="px-4 py-4 hover:no-underline">
                      <div className="flex items-center text-left">
                        <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg mr-3">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg text-gray-800 dark:text-white">{technique.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{technique.description}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pt-0 pb-4">
                      <div className="mt-2 prose-sm md:prose max-w-none dark:prose-invert">
                        {technique.content.split('\n\n').map((paragraph, i) => {
                          if (paragraph.startsWith('## ')) {
                            return <h3 key={i} className="font-bold text-lg mt-4 text-gray-800 dark:text-white">{paragraph.replace('## ', '')}</h3>;
                          }
                          if (paragraph.startsWith('- ')) {
                            return (
                              <ul key={i} className="list-disc pl-5 mt-2 text-gray-700 dark:text-gray-200">
                                {paragraph.split('\n').map((line, j) => (
                                  <li key={j}>{line.replace('- ', '')}</li>
                                ))}
                              </ul>
                            );
                          }
                          if (paragraph.match(/^\d\./)) {
                            return (
                              <ol key={i} className="list-decimal pl-5 mt-2 text-gray-700 dark:text-gray-200">
                                {paragraph.split('\n').map((line, j) => (
                                  <li key={j}>{line.replace(/^\d\.\s/, '')}</li>
                                ))}
                              </ol>
                            );
                          }
                          return <p key={i} className="text-gray-700 dark:text-gray-200">{paragraph}</p>;
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
          
          <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">How to Maximize Your Study Sessions</h2>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              Combine these techniques for even better results. For example, use the Pomodoro Technique to structure your time, 
              Active Recall during your study sessions, and Spaced Repetition to schedule your reviews.
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              Remember that different subjects and learning objectives may benefit from different approaches. 
              Experiment to find what works best for you and your specific learning needs.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
      <BottomNav />
    </div>
  );
};

export default StudyTechniques;
