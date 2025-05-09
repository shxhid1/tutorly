
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";
import { 
  BarChart3,
  Calendar,
  ArrowUp,
  ArrowDown,
  Book,
  Clock,
  Award,
  TrendingUp,
  BarChart as BarChartIcon,
  CalendarDays
} from "lucide-react";

const Progress = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([
    { day: 'Mon', hours: 1.5 },
    { day: 'Tue', hours: 2.2 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 2.5 },
    { day: 'Fri', hours: 3.0 },
    { day: 'Sat', hours: 1.0 },
    { day: 'Sun', hours: 0.5 },
  ]);
  
  const [progressData, setProgressData] = useState({
    totalHours: 12.5,
    weeklyChange: 2.3,
    completedTopics: 15,
    topicsChange: 3,
    streakDays: 8,
    materials: [
      { name: 'Psychology', progress: 75 },
      { name: 'Calculus', progress: 40 },
      { name: 'History', progress: 90 },
      { name: 'Chemistry', progress: 25 },
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
  
  const monthlyData = [
    { name: 'Jan', hours: 20 },
    { name: 'Feb', hours: 25 },
    { name: 'Mar', hours: 18 },
    { name: 'Apr', hours: 30 },
    { name: 'May', hours: 0 },
    { name: 'Jun', hours: 0 },
    { name: 'Jul', hours: 0 },
    { name: 'Aug', hours: 0 },
    { name: 'Sep', hours: 0 },
    { name: 'Oct', hours: 0 },
    { name: 'Nov', hours: 0 },
    { name: 'Dec', hours: 0 }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117] text-white">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 pb-20 md:pb-8">
        <div className="container max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <BarChart3 className="h-7 w-7 text-spark-primary" />
              Learning Progress
            </h1>
            <p className="text-muted-foreground">Track your study habits and achievements</p>
          </div>
          
          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse h-28 bg-gray-200 rounded-lg"></div>
              ))
            ) : (
              <>
                <ProgressStatCard 
                  title="Study Hours This Week" 
                  value={progressData.totalHours} 
                  unit="hrs" 
                  change={progressData.weeklyChange} 
                  icon={<Clock className="h-5 w-5 text-spark-primary" />} 
                />
                <ProgressStatCard 
                  title="Topics Completed" 
                  value={progressData.completedTopics} 
                  change={progressData.topicsChange}
                  icon={<Book className="h-5 w-5 text-spark-primary" />} 
                />
                <ProgressStatCard 
                  title="Study Streak" 
                  value={progressData.streakDays} 
                  unit="days" 
                  change={0}
                  icon={<Award className="h-5 w-5 text-spark-primary" />} 
                />
              </>
            )}
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChartIcon className="h-5 w-5 text-spark-primary" />
                  Weekly Study Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {isLoading ? (
                  <div className="animate-pulse h-64 bg-gray-200 rounded-lg"></div>
                ) : (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value} hrs`, 'Study Time']} 
                          labelFormatter={(label) => `${label}`}
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="hours" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-spark-primary" />
                  Monthly Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {isLoading ? (
                  <div className="animate-pulse h-64 bg-gray-200 rounded-lg"></div>
                ) : (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [`${value} hrs`, 'Total Hours']} 
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="hours" 
                          stroke="#9b87f5" 
                          strokeWidth={2}
                          dot={{ r: 4, strokeWidth: 2 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Study Materials Progress */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Study Materials Progress</h2>
            {isLoading ? (
              <div className="animate-pulse space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {progressData.materials.map((material, index) => (
                  <MaterialProgressCard 
                    key={index}
                    name={material.name}
                    progress={material.progress}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Learning Insights */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Learning Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="hover-glow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-spark-light rounded-full">
                      <CalendarDays className="h-5 w-5 text-spark-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Best Study Day</h3>
                      <p className="text-2xl font-bold">Friday</p>
                      <p className="text-sm text-muted-foreground">
                        You study an average of 3 hours on Fridays
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-glow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-spark-peach rounded-full">
                      <Award className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Most Progress In</h3>
                      <p className="text-2xl font-bold">History</p>
                      <p className="text-sm text-muted-foreground">
                        You've completed 90% of your history materials
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <BottomNav />
    </div>
  );
};

const ProgressStatCard = ({ title, value, unit = "", change, icon }) => (
  <Card className="hover-glow">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold">
            {value} {unit && <span className="text-base font-normal">{unit}</span>}
          </p>
          {change !== 0 && (
            <div className={`flex items-center text-xs ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              <span>{Math.abs(change)} {unit}</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-spark-light rounded-full">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

const MaterialProgressCard = ({ name, progress }) => (
  <Card className="hover-glow">
    <CardContent className="p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${progress >= 75 ? 'bg-green-100' : progress >= 50 ? 'bg-blue-100' : progress >= 25 ? 'bg-yellow-100' : 'bg-red-100'}`}>
            <Book className={`h-5 w-5 ${progress >= 75 ? 'text-green-600' : progress >= 50 ? 'text-blue-600' : progress >= 25 ? 'text-yellow-600' : 'text-red-600'}`} />
          </div>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">
              {progress < 25 ? 'Just started' : 
               progress < 50 ? 'Making progress' : 
               progress < 75 ? 'Well underway' : 
               'Almost complete'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${progress >= 75 ? 'bg-green-500' : progress >= 50 ? 'bg-blue-500' : progress >= 25 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default Progress;
