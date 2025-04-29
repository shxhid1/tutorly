
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  BookOpenText, 
  Sparkles, 
  Brain, 
  BookOpen, 
  BarChart3, 
  Zap, 
  MessageSquare, 
  FileText,
  CheckCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    setIsLoading(true);
    // Simulate loading for better UX
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 800);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Simplified navbar for landing page only */}
      <header className="border-b border-spark-light bg-white sticky top-0 z-50 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 hover-lift">
              <BookOpenText className="h-6 w-6 text-spark-primary" />
              <span className="text-xl font-bold">SparkLearn</span>
            </div>
          </div>
          <div>
            <Button 
              variant="ghost" 
              onClick={handleGetStarted}
            >
              Sign In
            </Button>
            <Button 
              className="ml-2 bg-spark-primary text-white hover:bg-spark-secondary"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section with improved readability and contrast */}
        <section className="py-24 px-4 bg-gradient-to-br from-[#9b87f5]/20 via-white to-[#e5deff]/40 relative overflow-hidden">
          {/* Abstract shapes in the background */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#9b87f5]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-[#d3e4fd]/20 rounded-full blur-3xl"></div>
          
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left animate-fade-in">
                <div className="inline-flex items-center gap-2 bg-spark-light px-4 py-2 rounded-full mb-3">
                  <Sparkles className="h-4 w-4 text-spark-primary" />
                  <span className="text-sm font-semibold text-spark-secondary">AI-Powered Learning</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
                  📚 Supercharge Your Studies with
                  <span className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-transparent bg-clip-text block mt-3">
                    AI-Powered Flashcards
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-700 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Upload notes, get instant summaries, flashcards, and personalized quizzes. Study smarter, not harder.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-spark-primary hover:bg-spark-secondary text-white button-click-effect text-base font-semibold shadow-lg"
                    onClick={handleGetStarted}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Loading...</span>
                      </div>
                    ) : (
                      <>
                        <Zap className="mr-2 h-5 w-5" />
                        Get Started Free
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full sm:w-auto text-base font-medium border-spark-primary text-spark-primary hover:bg-spark-light"
                    onClick={() => {
                      // Play demo video or show features
                      toast({
                        title: "Coming Soon!",
                        description: "Our product tour video will be available soon!"
                      });
                    }}
                  >
                    See How It Works
                  </Button>
                </div>
                
                {/* Social proof */}
                <div className="pt-4">
                  <p className="text-sm font-medium text-gray-600">Trusted by <span className="font-bold text-spark-secondary">10,000+</span> students worldwide</p>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 flex justify-center animate-slide-up relative">
                <div className="relative w-full max-w-md">
                  <div className="absolute -top-6 -right-6 w-40 h-40 bg-[#FDE1D3] rounded-full opacity-70 blur-2xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#E5DEFF] rounded-full opacity-70 blur-3xl"></div>
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                    alt="Student studying with SparkLearn"
                    className="w-full h-auto rounded-2xl shadow-2xl relative z-10 object-cover"
                  />
                  
                  {/* Floating elements */}
                  <div className="absolute -right-8 top-1/4 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-pulse-subtle">
                    <div className="bg-green-100 p-2 rounded-full">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Exam Score</p>
                      <p className="text-green-600 font-bold">+30%</p>
                    </div>
                  </div>
                  
                  <div className="absolute -left-8 bottom-1/4 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Brain className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Study Time</p>
                      <p className="text-blue-600 font-bold">-40%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section with improved readability */}
        <section className="py-20 bg-white px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Everything You Need To Study Smarter</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Our AI-powered platform transforms the way you learn with these powerful features
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                icon={<Brain className="w-10 h-10 text-spark-primary" />}
                title="AI Study Tutor"
                description="Chat with your personalized AI tutor about any topic in your study materials"
              />
              <FeatureCard 
                icon={<BookOpen className="w-10 h-10 text-spark-primary" />}
                title="Smart Flashcards"
                description="Automatically generated flashcards to help you memorize key concepts"
              />
              <FeatureCard 
                icon={<BarChart3 className="w-10 h-10 text-spark-primary" />}
                title="Progress Tracking"
                description="Monitor your learning progress with detailed analytics"
              />
              <FeatureCard 
                icon={<Zap className="w-10 h-10 text-spark-primary" />}
                title="Instant Quizzes"
                description="Test your knowledge with AI-generated quizzes tailored to your materials"
              />
            </div>
          </div>
        </section>
        
        {/* Upload Section - Redesigned with better contrast and imagery */}
        <section className="py-20 bg-[#F1F0FB] px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Upload Any Study Material</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Our AI instantly processes your documents and helps you learn faster
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-xl p-8 border border-[#E5DEFF]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Supports Multiple Formats</h3>
                  <p className="text-gray-700 mb-8 text-lg">
                    Upload PDFs, Word documents, images, or plain text. Our AI processes everything.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <DocumentTypeCard 
                      icon={<FileText className="h-6 w-6 text-red-600" />}
                      title="PDF Files"
                      description="Textbooks, articles, papers"
                    />
                    <DocumentTypeCard 
                      icon={<FileText className="h-6 w-6 text-blue-600" />}
                      title="Word Documents"
                      description="Notes, essays, assignments"
                    />
                    <DocumentTypeCard 
                      icon={<FileText className="h-6 w-6 text-green-600" />}
                      title="Images"
                      description="Diagrams, charts, screenshots"
                    />
                    <DocumentTypeCard 
                      icon={<MessageSquare className="h-6 w-6 text-purple-600" />}
                      title="Text & URLs"
                      description="Copy-paste or link websites"
                    />
                  </div>
                  
                  <Button 
                    className="w-full md:w-auto bg-spark-primary hover:bg-spark-secondary text-white button-click-effect font-semibold text-base shadow-lg"
                    onClick={handleGetStarted}
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Upload Your First Document
                  </Button>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#9b87f5]/20 to-[#7E69AB]/20 rounded-xl blur-lg"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&h=400&q=80" 
                      alt="Document upload preview" 
                      className="rounded-lg shadow-lg relative z-10 w-full h-auto object-cover"
                    />
                    {/* Decorative elements */}
                    <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-lg shadow-lg z-20 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-spark-primary" />
                      <span className="text-sm font-semibold">Instant Processing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why SparkLearn Works Section - New section */}
        <section className="py-20 bg-white px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Why SparkLearn Works</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Our science-based approach combines proven learning methods with cutting-edge AI
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BenefitCard 
                number="01"
                title="Active Recall"
                description="Our flashcards and quizzes force your brain to retrieve information, strengthening neural connections."
              />
              <BenefitCard 
                number="02"
                title="Spaced Repetition"
                description="Our system automatically schedules reviews at optimal intervals to maximize long-term retention."
              />
              <BenefitCard 
                number="03"
                title="AI Personalization"
                description="Our advanced algorithms adapt to your learning style, focusing on areas where you need the most help."
              />
            </div>
          </div>
        </section>
        
        {/* Testimonials Section with improved cards */}
        <section className="py-20 bg-[#F1F0FB] px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Loved by Students Everywhere</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
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
            
            {/* Stats section with improved visibility */}
            <div className="mt-16 bg-white rounded-xl shadow-lg p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center">
                <div className="text-5xl font-bold text-spark-primary mb-3">30%</div>
                <p className="text-lg font-medium text-gray-700">Average Exam Score Improvement</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-spark-primary mb-3">10,000+</div>
                <p className="text-lg font-medium text-gray-700">Active Student Users</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-spark-primary mb-3">40%</div>
                <p className="text-lg font-medium text-gray-700">Less Study Time Required</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Start Learning Smarter - New CTA Section */}
        <section className="py-20 bg-white px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] rounded-2xl shadow-xl p-10 md:p-16 text-white">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Learning Smarter Today</h2>
                <p className="text-xl mb-8 text-white/90">
                  Join thousands of students who are already using AI to transform their study habits.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-spark-primary hover:bg-white/90 font-semibold text-base"
                    onClick={handleGetStarted}
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Get Started Free
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 font-medium text-base"
                    onClick={() => {
                      toast({
                        title: "Coming Soon!",
                        description: "Our product tour video will be available soon!"
                      });
                    }}
                  >
                    See How It Works
                  </Button>
                </div>
                <p className="mt-6 text-sm text-white/70">No credit card required • Cancel anytime</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section with improved contrast */}
        <section className="py-20 bg-[#121212] text-white px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Learning?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Join thousands of students who are already studying smarter, not harder.
            </p>
            <Button 
              size="lg" 
              className="bg-spark-primary hover:bg-spark-secondary button-click-effect text-base font-semibold shadow-lg" 
              onClick={handleGetStarted}
            >
              <Zap className="mr-2 h-5 w-5" />
              Get Started Free
            </Button>
            
            <p className="mt-4 text-sm text-white/70">No credit card required</p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Feature Card Component with improved visibility
const FeatureCard = ({ icon, title, description }) => (
  <Card className="feature-card hover-glow border border-[#E5DEFF] shadow-md p-6 h-full">
    <CardContent className="p-0 space-y-4 h-full">
      <div className="p-3 bg-[#F1F0FB] w-fit rounded-xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </CardContent>
  </Card>
);

// Document Type Card with improved contrast
const DocumentTypeCard = ({ icon, title, description }) => (
  <div className="bg-[#F1F0FB] p-4 rounded-lg">
    <div className="flex items-start gap-3">
      <div className="mt-1">{icon}</div>
      <div>
        <h4 className="font-bold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </div>
  </div>
);

// Benefit Card - New component
const BenefitCard = ({ number, title, description }) => (
  <div className="bg-white border border-[#E5DEFF] rounded-xl p-6 shadow-md transition-all duration-300 hover:-translate-y-1">
    <div className="text-sm font-bold text-spark-primary mb-3">{number}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-700">{description}</p>
    <div className="mt-4 flex items-center text-spark-secondary font-semibold">
      <CheckCircle className="h-5 w-5 mr-2" />
      <span>Proven Effective</span>
    </div>
  </div>
);

// Testimonial Card Component with improved design
const TestimonialCard = ({ quote, author, role }) => (
  <Card className="p-6 hover-glow border border-[#E5DEFF] shadow-md h-full">
    <CardContent className="p-0 space-y-4 h-full">
      <div className="text-4xl text-spark-primary">"</div>
      <p className="text-gray-700 italic">{quote}</p>
      <div className="mt-auto pt-4">
        <p className="font-bold text-gray-900">{author}</p>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </CardContent>
  </Card>
);

export default Index;

