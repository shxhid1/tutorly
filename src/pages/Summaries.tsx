
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollText, FileText, Plus, Clock, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Summaries = () => {
  const subjects = [
    { id: "biology", name: "Biology", active: true },
    { id: "chemistry", name: "Chemistry", active: true },
    { id: "history", name: "History", active: true },
    { id: "physics", name: "Physics", active: false }
  ];
  
  const summaries = [
    { 
      id: 1, 
      title: "Cell Structure and Function", 
      subject: "biology",
      description: "Overview of eukaryotic and prokaryotic cell structures and their functions",
      type: "quick",
      created: "2 days ago",
      readTime: "5 min read"
    },
    { 
      id: 2, 
      title: "Photosynthesis Process", 
      subject: "biology",
      description: "Detailed explanation of the light-dependent and light-independent reactions",
      type: "deep",
      created: "1 week ago",
      readTime: "15 min read"
    },
    { 
      id: 3, 
      title: "Periodic Table Elements", 
      subject: "chemistry",
      description: "Summary of element groups, periods, and their properties",
      type: "quick",
      created: "3 days ago",
      readTime: "7 min read"
    },
    { 
      id: 4, 
      title: "Chemical Bonding", 
      subject: "chemistry",
      description: "Comprehensive guide to ionic, covalent, and metallic bonds",
      type: "deep",
      created: "2 weeks ago",
      readTime: "20 min read"
    },
    { 
      id: 5, 
      title: "World War II Timeline", 
      subject: "history",
      description: "Chronological events of WWII from 1939-1945",
      type: "quick",
      created: "5 days ago",
      readTime: "8 min read"
    },
    { 
      id: 6, 
      title: "Renaissance Art and Culture", 
      subject: "history",
      description: "Analysis of major Renaissance artists, works, and cultural impacts",
      type: "deep",
      created: "3 weeks ago",
      readTime: "25 min read"
    }
  ];
  
  const summaryTypes = {
    quick: { label: "Quick Recap", bg: "bg-spark-blue", icon: ScrollText },
    deep: { label: "Deep Dive", bg: "bg-spark-peach", icon: FileText }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 pb-20 md:pb-8">
        <div className="container max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Smart Summaries</h1>
              <p className="text-muted-foreground">Get condensed versions of your material in different formats</p>
            </div>
            <Button className="spark-button-primary button-click-effect">
              <Plus className="mr-2 h-4 w-4" /> Generate New Summary
            </Button>
          </div>
          
          <Tabs defaultValue="biology" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              {subjects.map(subject => (
                <TabsTrigger 
                  key={subject.id} 
                  value={subject.id}
                  disabled={!subject.active}
                  className="flex items-center gap-2"
                >
                  <ScrollText className="h-4 w-4" />
                  <span>{subject.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {subjects.filter(s => s.active).map(subject => (
              <TabsContent key={subject.id} value={subject.id} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {summaries
                    .filter(summary => summary.subject === subject.id)
                    .map(summary => {
                      const type = summaryTypes[summary.type as keyof typeof summaryTypes];
                      const Icon = type.icon;
                      
                      return (
                        <Card key={summary.id} className="hover-glow hover-lift transition-all duration-300 h-full">
                          <CardHeader className={cn("rounded-t-lg", type.bg)}>
                            <div className="flex justify-between items-center">
                              <div className="bg-white/20 p-2 rounded-full">
                                <Icon className="h-5 w-5 text-white" />
                              </div>
                              <span className="text-xs font-medium px-2 py-1 bg-white/30 rounded-full text-white">
                                {type.label}
                              </span>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <CardTitle className="text-lg mb-2">{summary.title}</CardTitle>
                            <CardDescription className="line-clamp-2 mb-4">{summary.description}</CardDescription>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{summary.created}</span>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{summary.readTime}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
                
                {summaries.filter(s => s.subject === subject.id).length === 0 && (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <ScrollText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No summaries yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Upload study material to generate smart summaries.
                    </p>
                    <Button className="spark-button-primary button-click-effect">
                      <Plus className="mr-2 h-4 w-4" /> Create Your First Summary
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Summaries;
