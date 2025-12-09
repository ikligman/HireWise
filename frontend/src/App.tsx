import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { MainContent } from './components/MainContent';
import { Sidebar } from './components/Sidebar';
import { Toaster } from './components/ui/sonner';

type AnalysisState = 'idle' | 'loading' | 'success' | 'error';

// Type for the AI analysis result
export interface AnalysisResult {
  bullets: string[];
  coverLetter: string;
  interviewPrep: { question: string; answer: string }[];
  raw?: string;
}

export default function App() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAnalyze = async () => {
    // Validate input
    if (!resumeText.trim()) {
      setErrorMessage('Please provide your resume content.');
      setAnalysisState('error');
      return;
    }

    if (resumeText.trim().length < 50) {
      setErrorMessage('Please provide more resume content to get better results.');
      setAnalysisState('error');
      return;
    }

    // Start loading
    setErrorMessage('');
    setAnalysisResult(null);
    setAnalysisState('loading');

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume: resumeText,
          jobDescription: jobDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Analysis failed. Please try again.');
      }

      setAnalysisResult(data.result);
      setAnalysisState('success');
    } catch (err) {
      console.error('Analysis error:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setAnalysisState('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navigation />
      
      <div className="max-w-[1400px] mx-auto px-4 py-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <MainContent
            resumeText={resumeText}
            setResumeText={setResumeText}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            analysisState={analysisState}
            analysisResult={analysisResult}
            errorMessage={errorMessage}
            onAnalyze={handleAnalyze}
          />
          
          <Sidebar />
        </div>
      </div>
      
      <Toaster />
    </div>
  );
}
