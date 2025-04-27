
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DocumentUploader from "@/components/features/DocumentUploader";
import StudyModes from "@/components/features/StudyModes";
import AITutor from "@/components/features/AITutor";
import ProgressDashboard from "@/components/features/ProgressDashboard";
import { Button } from "@/components/ui/button";
import { BookOpenText, Sparkles, Brain, Calendar, BarChart3, LightbulbIcon, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [showUploader, setShowUploader] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Animation states
  const [animateFeatures, setAnimateFeatures] = useState(false);
  
  useEffect(() => {
    // Trigger animations after page load
    const timer = setTimeout(() => {
      setAnimateFeatures(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleStartStudying = () => {
    setIsLoading(true);
    // Simulate API call or processing
    setTimeout(() => {
      setShowUploader(false);
      setShowContent(true);
      setIsLoading(false);
      toast({
        title: "Welcome to your study dashboard!",
        description: "Your personalized learning experience awaits.",
        duration: 5000,
      });
    }, 1000);
  };
  
  const handleGetStarted = () => {
    // Smooth scroll to document uploader section
    document.getElementById('document-uploader')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-spark-light via-white to-spark-blue">
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left animate-fade-in">
                <div className="inline-flex items-center gap-2 bg-spark-light px-4 py-2 rounded-full mb-2">
                  <Sparkles className="h-4 w-4 text-spark-primary" />
                  <span className="text-sm font-medium text-spark-secondary">AI-Powered Learning</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Your Personal
                  <span className="bg-gradient-to-r from-spark-primary to-spark-secondary text-transparent bg-clip-text"> AI Study </span>
                  Companion
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                  Upload any study material and let our AI create personalized learning resources to help you master any subject.
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
                  <Button 
                    size="lg" 
                    className="spark-button-primary button-click-effect text-base" 
                    onClick={handleGetStarted}
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Get Started
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="spark-button-secondary text-base"
                  >
                    See Examples
                  </Button>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 flex justify-center animate-slide-up">
                <div className="relative w-full max-w-md">
                  <div className="absolute -top-6 -right-6 w-40 h-40 bg-spark-peach rounded-full opacity-70 blur-2xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-spark-light rounded-full opacity-70 blur-3xl"></div>
                  <img
                    src="https://lovable.dev/opengraph-image-p98pqg.png"
                    alt="SparkLearn Platform Screenshot"
                    className="w-full h-auto rounded-xl shadow-2xl relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Everything You Need To Study Smarter</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered platform transforms the way you learn with these powerful features
              </p>
            </div>
            
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${animateFeatures ? 'staggered-fade-in' : 'opacity-0'}`}>
              <FeatureCard 
                icon={<Brain className="w-10 h-10 text-spark-primary" />}
                title="AI Study Tutor"
                description="Chat with your personalized AI tutor about any topic in your study materials"
              />
              <FeatureCard 
                icon={<Zap className="w-10 h-10 text-spark-primary" />}
                title="Smart Flashcards"
                description="Automatically generated flashcards to help you memorize key concepts"
              />
              <FeatureCard 
                icon={<BarChart3 className="w-10 h-10 text-spark-primary" />}
                title="Progress Tracking"
                description="Monitor your learning progress with detailed analytics"
              />
              <FeatureCard 
                icon={<Calendar className="w-10 h-10 text-spark-primary" />}
                title="Study Scheduler"
                description="Create personalized study plans based on your goals"
              />
            </div>
          </div>
        </section>
        
        {/* Document Uploader Section */}
        <section id="document-uploader" className="py-16 bg-spark-gray px-4 scroll-mt-16">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Start Learning Now</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Upload your study material and let our AI do the heavy lifting
              </p>
            </div>
            
            <div className="animate-fade-in">
              <DocumentUploader />
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                className="spark-button-primary button-click-effect"
                onClick={handleStartStudying}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-pulse mr-2">Loading...</span>
                  </>
                ) : (
                  <>
                    <BookOpenText className="mr-2 h-4 w-4" />
                    Start Studying (Demo)
                  </>
                )}
              </Button>
            </div>
          </div>
        </section>
        
        {/* Dashboard Section */}
        {showContent && (
          <section className="py-12 px-4 bg-white animate-fade-in">
            <div className="container mx-auto max-w-7xl space-y-8">
              <ProgressDashboard />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="animate-slide-up">
                  <StudyModes />
                </div>
                <div className="animate-slide-up delay-200">
                  <AITutor />
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Testimonials Section (Only visible on landing page) */}
        {showUploader && (
          <section className="py-16 bg-white px-4">
            <div className="container mx-auto max-w-5xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Loved by Students Everywhere</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  See what our users are saying about their learning experience
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <TestimonialCard 
                  quote="SparkLearn completely changed how I study. I've improved my grades significantly!"
                  author="Alex K."
                  role="Computer Science Student"
                />
                <TestimonialCard 
                  quote="The AI tutor feels like having a professor available 24/7. It's incredible!"
                  author="Sarah M."
                  role="Medical Student"
                />
                <TestimonialCard 
                  quote="Flashcards generated from my notes have saved me countless hours of study time."
                  author="James L."
                  role="Law Student"
                />
              </div>
            </div>
          </section>
        )}
        
        {/* CTA Section (Only visible on landing page) */}
        {showUploader && (
          <section className="py-16 bg-spark-light px-4">
            <div className="container mx-auto max-w-5xl text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Join thousands of students who are already studying smarter, not harder.
              </p>
              <Button 
                size="lg" 
                className="spark-button-primary button-click-effect text-base" 
                onClick={handleGetStarted}
              >
                <Zap className="mr-2 h-4 w-4" />
                Get Started Now
              </Button>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <Card className="feature-card hover-glow p-6">
    <CardContent className="p-0 space-y-4">
      <div className="p-3 bg-spark-light w-fit rounded-xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

// Testimonial Card Component
const TestimonialCard = ({ quote, author, role }) => (
  <Card className="p-6 hover-glow">
    <CardContent className="p-0 space-y-4">
      <div className="text-4xl text-spark-primary">"</div>
      <p className="text-muted-foreground">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </CardContent>
  </Card>
);

export default Index;
