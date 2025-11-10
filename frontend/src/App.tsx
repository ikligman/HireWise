import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { MainContent } from './components/MainContent';
import { Sidebar } from './components/Sidebar';
import { Toaster } from './components/ui/sonner';

type AnalysisState = 'idle' | 'loading' | 'success' | 'error';

export default function App() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysisState, setAnalysisState] = useState<AnalysisState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAnalyze = () => {
    // Validate input
    if (!resumeText.trim()) {
      setErrorMessage('Please provide more resume content.');
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
    setAnalysisState('loading');

    // Simulate AI processing
    setTimeout(() => {
      setAnalysisState('success');
    }, 2000);
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
