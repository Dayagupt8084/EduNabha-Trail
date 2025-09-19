import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Upload, FileVideo, FileText, Brain, Save, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LessonUploadProps {
  onLessonUploaded: (lesson: any) => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const LessonUpload = ({ onLessonUploaded }: LessonUploadProps) => {
  const [lessonType, setLessonType] = useState<'video' | 'pdf' | 'quiz'>('video');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    class: '',
    language: 'english',
    difficulty: 'medium',
    estimatedDuration: ''
  });
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: ''
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const subjects = ['Mathematics', 'Science', 'English', 'Hindi', 'Punjabi', 'Social Studies', 'Computer Science'];
  const classes = ['6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  const languages = [
    { code: 'english', label: 'English' },
    { code: 'hindi', label: 'हिंदी (Hindi)' },
    { code: 'punjabi', label: 'ਪੰਜਾਬੀ (Punjabi)' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleQuestionChange = (field: string, value: string | string[] | number) => {
    setCurrentQuestion(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
  };

  const addQuestion = () => {
    if (currentQuestion.question && currentQuestion.options.every(opt => opt.trim())) {
      setQuizQuestions(prev => [...prev, currentQuestion]);
      setCurrentQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: ''
      });
    }
  };

  const removeQuestion = (index: number) => {
    setQuizQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.subject || !formData.class) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (lessonType !== 'quiz' && !uploadedFile) {
      toast({
        title: "File Required",
        description: "Please upload a file for this lesson type.",
        variant: "destructive"
      });
      return;
    }

    if (lessonType === 'quiz' && quizQuestions.length === 0) {
      toast({
        title: "Quiz Questions Required",
        description: "Please add at least one question for the quiz.",
        variant: "destructive"
      });
      return;
    }

    const lessonData = {
      ...formData,
      type: lessonType,
      file: uploadedFile,
      questions: lessonType === 'quiz' ? quizQuestions : undefined,
      createdAt: new Date().toISOString(),
      status: 'pending_approval'
    };

    onLessonUploaded(lessonData);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      subject: '',
      class: '',
      language: 'english',
      difficulty: 'medium',
      estimatedDuration: ''
    });
    setQuizQuestions([]);
    setUploadedFile(null);

    toast({
      title: "Lesson Uploaded",
      description: "Your lesson has been submitted for approval.",
    });
  };

  const getTypeIcon = () => {
    switch (lessonType) {
      case 'video': return <FileVideo className="w-5 h-5" />;
      case 'pdf': return <FileText className="w-5 h-5" />;
      case 'quiz': return <Brain className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Create New Lesson
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Lesson Type Selection */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Lesson Type</Label>
            <div className="grid grid-cols-3 gap-4">
              {(['video', 'pdf', 'quiz'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setLessonType(type)}
                  className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                    lessonType === type 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:bg-accent'
                  }`}
                >
                  {type === 'video' && <FileVideo className="w-8 h-8" />}
                  {type === 'pdf' && <FileText className="w-8 h-8" />}
                  {type === 'quiz' && <Brain className="w-8 h-8" />}
                  <span className="font-medium capitalize">{type}</span>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Lesson Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter lesson title"
              />
            </div>
            <div>
              <Label htmlFor="duration">Estimated Duration</Label>
              <Input
                id="duration"
                value={formData.estimatedDuration}
                onChange={(e) => handleInputChange('estimatedDuration', e.target.value)}
                placeholder="e.g., 30 minutes"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe what students will learn"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="subject">Subject *</Label>
              <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="class">Class *</Label>
              <Select value={formData.class} onValueChange={(value) => handleInputChange('class', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map(cls => (
                    <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>{lang.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={formData.difficulty} onValueChange={(value) => handleInputChange('difficulty', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* File Upload for Video/PDF */}
          {lessonType !== 'quiz' && (
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Upload {lessonType === 'video' ? 'Video' : 'PDF'} File *
              </Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  {getTypeIcon()}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {lessonType === 'video' 
                        ? 'Upload MP4, AVI, or MOV files (max 500MB)'
                        : 'Upload PDF files (max 50MB)'
                      }
                    </p>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept={lessonType === 'video' ? 'video/*' : 'application/pdf'}
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button variant="outline" className="pointer-events-none">
                        Choose File
                      </Button>
                    </label>
                  </div>
                  {uploadedFile && (
                    <Badge variant="secondary" className="mt-2">
                      {uploadedFile.name}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quiz Builder */}
          {lessonType === 'quiz' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Quiz Questions ({quizQuestions.length})</Label>
                {quizQuestions.length > 0 && (
                  <Badge variant="secondary">{quizQuestions.length} question{quizQuestions.length !== 1 ? 's' : ''}</Badge>
                )}
              </div>

              {/* Add Question Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add New Question</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="question">Question *</Label>
                    <Textarea
                      id="question"
                      value={currentQuestion.question}
                      onChange={(e) => handleQuestionChange('question', e.target.value)}
                      placeholder="Enter your question"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Answer Options *</Label>
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleQuestionChange('correctAnswer', index)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            currentQuestion.correctAnswer === index
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border'
                          }`}
                        >
                          {currentQuestion.correctAnswer === index && '✓'}
                        </button>
                        <Input
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                        />
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground">Click the circle to mark the correct answer</p>
                  </div>

                  <div>
                    <Label htmlFor="explanation">Explanation (Optional)</Label>
                    <Textarea
                      id="explanation"
                      value={currentQuestion.explanation}
                      onChange={(e) => handleQuestionChange('explanation', e.target.value)}
                      placeholder="Explain why this is the correct answer"
                      rows={2}
                    />
                  </div>

                  <Button onClick={addQuestion} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                </CardContent>
              </Card>

              {/* Questions List */}
              {quizQuestions.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Added Questions</Label>
                  {quizQuestions.map((q, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-2">{index + 1}. {q.question}</h4>
                            <div className="space-y-1 text-sm">
                              {q.options.map((option, optIndex) => (
                                <div key={optIndex} className={`flex items-center gap-2 ${
                                  optIndex === q.correctAnswer ? 'text-success font-medium' : 'text-muted-foreground'
                                }`}>
                                  <span>{optIndex === q.correctAnswer ? '✓' : '○'}</span>
                                  {option}
                                </div>
                              ))}
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeQuestion(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={handleSubmit} size="lg" className="min-w-[200px]">
              <Save className="w-4 h-4 mr-2" />
              Upload Lesson
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};