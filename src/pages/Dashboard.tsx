
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  MessageSquare, 
  FileText, 
  User, 
  BookOpenText,
  BarChart3, 
  Upload, 
  Clock,
  Bookmark,
  Zap
} from "lucide-react";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    name: "Alex Johnson",
    filesUploaded: 5,
    chatsUsed: 12,
    recentActivity: [
      { type: "file", name: "Psychology 101 Notes", time: "2 hours ago" },
      { type: "chat", name: "Asked about cognitive biases", time: "Yesterday" }
    ],
    bookmarks: [
      { type: "note", name: "Chapter 4 Summary", id: "note1" },
      { type: "chat", name: "AI explanation of quantum physics", id: "chat1" }
    ]
  });
  
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Check if user is online
    const handleOnlineStatusChange = () => {
      if (!navigator.onLine) {
        toast({
          title: "You are offline",
          description: "Some features may not work while you're offline.",
          variant: "destructive"
        });
      }
    };
    
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, [toast]);
  
  const handleUpload = () => {
    document.getElementById('document-uploader')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 pb-20 md:pb-0">
        {/* Welcome Section */}
        <section className="py-8 md:py-12 px-4 bg-gradient-to-br from-spark-light via-white to-spark-blue">
          <div className="container max-w-6xl mx-auto">
            <div className="animate-fade-in">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-muted-foreground mb-6">
                Ready to continue your learning journey today?
              </p>
              <div className="flex flex-wrap gap-3">
                <Button 
                  className="spark-button-primary button-click-effect"
                  onClick={handleUpload}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Material
                </Button>
                <Button 
                  variant="outline"
                  className="spark-button-secondary"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat with AI Tutor
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quick Stats */}
        <section className="py-8 px-4">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-5">Your Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard 
                title="Files Uploaded" 
                value={isLoading ? "-" : user.filesUploaded} 
                icon={<FileText className="h-5 w-5 text-spark-primary" />} 
                isLoading={isLoading}
              />
              <StatCard 
                title="Chats Used" 
                value={isLoading ? "-" : user.chatsUsed} 
                icon={<MessageSquare className="h-5 w-5 text-spark-primary" />} 
                isLoading={isLoading}
              />
              <StatCard 
                title="Study Plans" 
                value="2" 
                icon={<BookOpenText className="h-5 w-5 text-spark-primary" />} 
                isLoading={isLoading}
              />
              <StatCard 
                title="Progress" 
                value="73%" 
                icon={<BarChart3 className="h-5 w-5 text-spark-primary" />} 
                isLoading={isLoading}
              />
            </div>
          </div>
        </section>
        
        {/* Quick Access & Recent Activity */}
        <section className="py-6 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quick Access */}
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-semibold">Quick Access</h2>
                <div className="grid grid-cols-2 gap-4">
                  <QuickAccessCard 
                    title="Library" 
                    icon={<BookOpen className="h-6 w-6 text-white" />} 
                    href="/library"
                    color="bg-spark-primary"
                  />
                  <QuickAccessCard 
                    title="AI Tutor" 
                    icon={<MessageSquare className="h-6 w-6 text-white" />} 
                    href="/chat"
                    color="bg-spark-secondary"
                  />
                  <QuickAccessCard 
                    title="Study Plans" 
                    icon={<BookOpenText className="h-6 w-6 text-white" />} 
                    href="/study-plans"
                    color="bg-blue-500"
                  />
                  <QuickAccessCard 
                    title="Profile" 
                    icon={<User className="h-6 w-6 text-white" />} 
                    href="/profile"
                    color="bg-purple-500"
                  />
                </div>
              </div>
              
              {/* Recent Activity */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl md:text-2xl font-semibold">Recent Activity</h2>
                </div>
                <div className="space-y-3">
                  {isLoading ? (
                    <div className="animate-pulse">
                      <div className="h-16 bg-gray-200 rounded-lg mb-3"></div>
                      <div className="h-16 bg-gray-200 rounded-lg"></div>
                    </div>
                  ) : (
                    user.recentActivity.map((activity, index) => (
                      <ActivityItem key={index} activity={activity} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Bookmarks */}
        <section className="py-6 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-semibold">Your Bookmarks</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {isLoading ? (
                Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="animate-pulse h-32 bg-gray-200 rounded-lg"></div>
                ))
              ) : (
                user.bookmarks.map((bookmark, index) => (
                  <BookmarkCard key={index} bookmark={bookmark} />
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <BottomNav />
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, isLoading }) => (
  <Card className="hover-glow">
    <CardContent className="p-4 md:p-6">
      {isLoading ? (
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-200 h-10 w-10 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">
          <div className="p-2 rounded-full bg-spark-light mb-3">
            {icon}
          </div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      )}
    </CardContent>
  </Card>
);

// Quick Access Card Component
const QuickAccessCard = ({ title, icon, href, color }) => (
  <Link to={href} className="group">
    <div className={`p-6 rounded-xl ${color} hover-lift transform transition-all duration-300 group-hover:scale-105 shadow-md`}>
      <div className="flex flex-col items-center text-center">
        <div className="p-2 rounded-full bg-white/20 mb-3">
          {icon}
        </div>
        <p className="text-sm font-medium text-white">{title}</p>
      </div>
    </div>
  </Link>
);

// Activity Item Component
const ActivityItem = ({ activity }) => (
  <Card className="hover-glow">
    <CardContent className="p-4 flex items-center gap-4">
      <div className={`p-2 rounded-full ${activity.type === 'file' ? 'bg-spark-blue' : 'bg-spark-peach'}`}>
        {activity.type === 'file' ? (
          <FileText className="h-4 w-4 text-blue-600" />
        ) : (
          <MessageSquare className="h-4 w-4 text-orange-600" />
        )}
      </div>
      <div className="flex-1">
        <p className="font-medium">{activity.name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>{activity.time}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Bookmark Card Component
const BookmarkCard = ({ bookmark }) => (
  <Card className="hover-glow overflow-hidden">
    <CardContent className="p-0">
      <div className={`p-4 border-t-4 ${bookmark.type === 'note' ? 'border-spark-primary' : 'border-spark-secondary'}`}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="font-medium line-clamp-2">{bookmark.name}</p>
            <p className="text-xs text-muted-foreground mt-1 capitalize">{bookmark.type}</p>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bookmark className="h-4 w-4 fill-spark-primary stroke-spark-primary" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Adding React Router Link component to prevent TypeScript errors
const Link = ({ to, children, className }) => {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
};

export default Dashboard;
