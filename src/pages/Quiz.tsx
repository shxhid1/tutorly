
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Plus, ListChecks, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const Quiz = () => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const quizQuestions = [
    {
      question: "Which of the following is a function of mitochondria?",
      options: [
        "Photosynthesis",
        "Cellular respiration",
        "Protein synthesis",
        "Cell division"
      ],
      correctAnswer: 1
    },
    {
      question: "What is the chemical formula of water?",
      options: [
        "H2O",
        "CO2",
        "NaCl",
        "CH4"
      ],
      correctAnswer: 0
    },
    {
      question: "Which of the following is NOT a phase of mitosis?",
      options: [
        "Prophase",
        "Metaphase",
        "Interphase",
        "Telophase"
      ],
      correctAnswer: 2
    },
    {
      question: "Which scientist is known for the theory of evolution by natural selection?",
      options: [
        "Isaac Newton",
        "Albert Einstein",
        "Charles Darwin",
        "Gregor Mendel"
      ],
      correctAnswer: 2
    },
    {
      question: "Which organelle is responsible for protein synthesis in a cell?",
      options: [
        "Mitochondria",
        "Golgi apparatus",
        "Lysosome",
        "Ribosome"
      ],
      correctAnswer: 3
    }
  ];
  
  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    if (index === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Well done, that's the right answer.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer is: ${quizQuestions[currentQuestion].options[quizQuestions[currentQuestion].correctAnswer]}`,
        variant: "destructive",
      });
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };
  
  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 pb-20 md:pb-8">
        <div className="container max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Quiz</h1>
              <p className="text-muted-foreground">Test your knowledge with adaptive difficulty questions</p>
            </div>
            <Button className="spark-button-primary button-click-effect">
              <Plus className="mr-2 h-4 w-4" /> Create New Quiz
            </Button>
          </div>
          
          {!quizCompleted ? (
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {quizQuestions.length}</div>
                  <div className="text-sm font-medium">Score: {score}</div>
                </div>
                <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2" />
              </div>
              
              <Card className="mb-8">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{quizQuestions[currentQuestion].question}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <div 
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer
                        ${selectedAnswer === index && index === quizQuestions[currentQuestion].correctAnswer ? 'bg-green-50 border-green-300' : ''}
                        ${selectedAnswer === index && index !== quizQuestions[currentQuestion].correctAnswer ? 'bg-red-50 border-red-300' : ''}
                        ${selectedAnswer === null ? 'hover:bg-spark-light border-transparent' : ''}
                        ${isAnswered && index === quizQuestions[currentQuestion].correctAnswer ? 'bg-green-50 border-green-300' : ''}
                      `}
                      onClick={() => handleSelectAnswer(index)}
                    >
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0
                        ${selectedAnswer === index && index === quizQuestions[currentQuestion].correctAnswer ? 'bg-green-100 text-green-600' : ''}
                        ${selectedAnswer === index && index !== quizQuestions[currentQuestion].correctAnswer ? 'bg-red-100 text-red-600' : ''}
                        ${selectedAnswer === null ? 'border border-spark-primary' : ''}
                        ${isAnswered && index === quizQuestions[currentQuestion].correctAnswer && selectedAnswer !== index ? 'bg-green-100 text-green-600' : ''}
                      `}>
                        {selectedAnswer === index && index === quizQuestions[currentQuestion].correctAnswer && (
                          <CheckCircle className="h-5 w-5" />
                        )}
                        {selectedAnswer === index && index !== quizQuestions[currentQuestion].correctAnswer && (
                          <XCircle className="h-5 w-5" />
                        )}
                        {isAnswered && index === quizQuestions[currentQuestion].correctAnswer && selectedAnswer !== index && (
                          <CheckCircle className="h-5 w-5" />
                        )}
                      </div>
                      <span className="flex-grow">{option}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button 
                  className="spark-button-primary button-click-effect" 
                  onClick={handleNextQuestion}
                  disabled={!isAnswered}
                >
                  {currentQuestion < quizQuestions.length - 1 ? (
                    <>Next Question <ArrowRight className="ml-2 h-4 w-4" /></>
                  ) : (
                    <>Finish Quiz <ArrowRight className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Quiz Completed!</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-6xl font-bold mb-4 text-spark-primary">{score}/{quizQuestions.length}</div>
                <p className="text-lg text-muted-foreground mb-8">
                  {score === quizQuestions.length ? "Perfect score! Excellent work!" : 
                   score >= quizQuestions.length * 0.7 ? "Great job! You're on the right track." :
                   "Keep studying, you'll do better next time."}
                </p>
                <Button className="spark-button-primary button-click-effect" onClick={handleRestartQuiz}>
                  <ListChecks className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Quiz;
