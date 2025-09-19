import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Clock, Trophy, Brain } from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

interface QuizProps {
  questions: QuizQuestion[];
  timeLimit?: number; // in seconds
  onComplete: (score: number, answers: number[]) => void;
}

export const InteractiveQuiz = ({ questions, timeLimit, onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit || 0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (quizStarted && timeLimit && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleQuizComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizStarted, timeLeft, timeLimit]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(timeLimit || 0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedOption(answerIndex);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = selectedOption || -1;
    setSelectedAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleQuizComplete(newAnswers);
    }
  };

  const handleQuizComplete = (answers: number[] = selectedAnswers) => {
    const finalAnswers = [...answers];
    if (selectedOption !== null && currentQuestion < questions.length) {
      finalAnswers[currentQuestion] = selectedOption;
    }

    const calculatedScore = finalAnswers.reduce((total, answer, index) => {
      if (answer === questions[index]?.correctAnswer) {
        return total + questions[index].points;
      }
      return total;
    }, 0);

    setScore(calculatedScore);
    setSelectedAnswers(finalAnswers);
    setShowResult(true);
    onComplete(calculatedScore, finalAnswers);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-success';
      case 'medium': return 'text-warning';
      case 'hard': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  if (!quizStarted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            Quiz Ready!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{questions.length}</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">
                {questions.reduce((sum, q) => sum + q.points, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Max Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">
                {timeLimit ? formatTime(timeLimit) : '∞'}
              </div>
              <div className="text-sm text-muted-foreground">Time Limit</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">
                {questions.filter(q => q.difficulty === 'easy').length}
              </div>
              <div className="text-sm text-muted-foreground">Easy</div>
            </div>
          </div>
          <Button onClick={handleStartQuiz} className="w-full" size="lg">
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResult) {
    const correctAnswers = selectedAnswers.filter((answer, index) => 
      answer === questions[index]?.correctAnswer
    ).length;
    const percentage = Math.round((correctAnswers / questions.length) * 100);

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-warning" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{percentage}%</div>
            <div className="text-lg text-muted-foreground">
              {correctAnswers} out of {questions.length} correct
            </div>
            <div className="text-2xl font-bold text-accent mt-2">{score} points earned</div>
          </div>

          <div className="space-y-3">
            {questions.map((question, index) => (
              <div key={question.id} className="p-4 border rounded-lg">
                <div className="flex items-start gap-3">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">{question.question}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="text-success">
                        ✓ Correct: {question.options[question.correctAnswer]}
                      </div>
                      {selectedAnswers[index] !== question.correctAnswer && (
                        <div className="text-destructive">
                          ✗ Your answer: {question.options[selectedAnswers[index]] || 'Not answered'}
                        </div>
                      )}
                    </div>
                    {question.explanation && (
                      <p className="text-sm text-muted-foreground mt-2 italic">
                        {question.explanation}
                      </p>
                    )}
                  </div>
                  <Badge variant="outline" className={getDifficultyColor(question.difficulty)}>
                    {question.points} pts
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <Badge variant="outline" className={getDifficultyColor(currentQ.difficulty)}>
              {currentQ.difficulty} • {currentQ.points} pts
            </Badge>
          </div>
          {timeLimit && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              <span className={timeLeft < 60 ? 'text-destructive font-bold' : ''}>
                {formatTime(timeLeft)}
              </span>
            </div>
          )}
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <h3 className="text-lg font-semibold leading-relaxed">{currentQ.question}</h3>
        
        <RadioGroup value={selectedOption?.toString()} onValueChange={(value) => handleAnswerSelect(parseInt(value))}>
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
            className="min-w-[120px]"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is the capital of Punjab?',
    options: ['Amritsar', 'Chandigarh', 'Ludhiana', 'Patiala'],
    correctAnswer: 1,
    explanation: 'Chandigarh serves as the capital of both Punjab and Haryana.',
    difficulty: 'easy',
    points: 10
  },
  {
    id: '2',
    question: 'Which is the largest planet in our solar system?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 2,
    explanation: 'Jupiter is the largest planet in our solar system, with a mass greater than all other planets combined.',
    difficulty: 'medium',
    points: 15
  },
  {
    id: '3',
    question: 'What is 15 × 24?',
    options: ['340', '360', '380', '400'],
    correctAnswer: 1,
    explanation: '15 × 24 = 15 × 20 + 15 × 4 = 300 + 60 = 360',
    difficulty: 'medium',
    points: 15
  },
  {
    id: '4',
    question: 'Who wrote the Indian National Anthem?',
    options: ['Rabindranath Tagore', 'Bankim Chandra Chatterjee', 'Sarojini Naidu', 'Mahatma Gandhi'],
    correctAnswer: 0,
    explanation: 'Rabindranath Tagore wrote "Jana Gana Mana", which became India\'s National Anthem.',
    difficulty: 'hard',
    points: 20
  }
];