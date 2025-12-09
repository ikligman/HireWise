import { useState } from 'react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { FileText, MessageSquare, Lightbulb, Copy, FileSearch, AlertCircle } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Alert, AlertDescription } from './ui/alert';
import type { AnalysisResult } from '../App';

type AnalysisState = 'idle' | 'loading' | 'success' | 'error';

interface ResultsSectionProps {
  analysisState: AnalysisState;
  analysisResult: AnalysisResult | null;
  errorMessage?: string;
}

export function ResultsSection({ analysisState, analysisResult, errorMessage }: ResultsSectionProps) {
  const [activeTab, setActiveTab] = useState('bullets');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  // Don't render anything in idle state
  if (analysisState === 'idle') {
    return null;
  }

  return (
    <Card className="bg-white shadow-lg border-gray-100 rounded-2xl overflow-hidden" style={{ padding: '24px' }}>
      {/* Error State */}
      {analysisState === 'error' && errorMessage && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {analysisState === 'loading' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#6C63FF] border-t-transparent" />
            <h2 className="text-gray-900">Analyzing your resume with AI... This may take 15-30 seconds.</h2>
          </div>
          
          {/* Skeleton Tabs */}
          <div className="flex gap-2 mb-6">
            <Skeleton className="h-10 w-40 rounded-full" />
            <Skeleton className="h-10 w-40 rounded-full" />
            <Skeleton className="h-10 w-40 rounded-full" />
          </div>
          
          {/* Skeleton Content */}
          <div className="space-y-3">
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-16 w-3/4 rounded-xl" />
          </div>
        </div>
      )}

      {/* Empty State (when error without message or other edge cases) */}
      {analysisState === 'error' && !errorMessage && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-gray-100 p-6 mb-4">
            <FileSearch className="w-12 h-12 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-1">Run an analysis to see your results here.</p>
          <p className="text-sm text-gray-400">Your AI-powered insights will appear in this section</p>
        </div>
      )}

      {/* Success State */}
      {analysisState === 'success' && analysisResult && (
        <>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
              <TabsList className="inline-flex w-auto sm:grid sm:w-full sm:grid-cols-3 bg-transparent gap-2 p-0 mb-6 min-w-max sm:min-w-0">
                <TabsTrigger 
                  value="bullets" 
                  className="rounded-full px-6 py-2.5 data-[state=active]:shadow-sm transition-all whitespace-nowrap"
                  style={{
                    backgroundColor: activeTab === 'bullets' ? '#6C63FF' : '#F3F4F6',
                    color: activeTab === 'bullets' ? 'white' : '#6C63FF'
                  }}
                >
                  <FileText className="w-4 h-4 mr-2 hidden sm:inline-block" />
                  Resume Bullets
                </TabsTrigger>
                <TabsTrigger 
                  value="cover" 
                  className="rounded-full px-6 py-2.5 data-[state=active]:shadow-sm transition-all whitespace-nowrap"
                  style={{
                    backgroundColor: activeTab === 'cover' ? '#6C63FF' : '#F3F4F6',
                    color: activeTab === 'cover' ? 'white' : '#6C63FF'
                  }}
                >
                  <MessageSquare className="w-4 h-4 mr-2 hidden sm:inline-block" />
                  Cover Letter
                </TabsTrigger>
                <TabsTrigger 
                  value="interview" 
                  className="rounded-full px-6 py-2.5 data-[state=active]:shadow-sm transition-all whitespace-nowrap"
                  style={{
                    backgroundColor: activeTab === 'interview' ? '#6C63FF' : '#F3F4F6',
                    color: activeTab === 'interview' ? 'white' : '#6C63FF'
                  }}
                >
                  <Lightbulb className="w-4 h-4 mr-2 hidden sm:inline-block" />
                  Interview Prep
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Resume Bullets Tab */}
            <TabsContent value="bullets" className="mt-0 space-y-4">
              {analysisResult.bullets.map((bullet, index) => (
                <BulletPointCard
                  key={index}
                  text={bullet}
                  onCopy={() => copyToClipboard(bullet, "Bullet point")}
                />
              ))}
            </TabsContent>
            
            {/* Cover Letter Tab */}
            <TabsContent value="cover" className="mt-0">
              <div className="rounded-xl border p-6 relative" style={{ backgroundColor: '#FAFAFF', borderColor: '#E5E3FF' }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 hover:bg-white"
                  onClick={() => copyToClipboard(analysisResult.coverLetter, "Cover letter")}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                
                <h3 className="text-gray-900 mb-4">Professional Cover Letter</h3>
                
                <div className="space-y-4 text-gray-700 whitespace-pre-wrap">
                  {analysisResult.coverLetter}
                </div>
              </div>
            </TabsContent>
            
            {/* Interview Prep Tab */}
            <TabsContent value="interview" className="mt-0 space-y-4">
              {analysisResult.interviewPrep.map((qa, index) => (
                <InterviewQACard
                  key={index}
                  question={qa.question}
                  answer={qa.answer}
                />
              ))}
            </TabsContent>
          </Tabs>
          
          {/* Powered by text */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
            <p className="text-xs text-gray-400">Powered by Mistral AI via Hugging Face</p>
          </div>
        </>
      )}
    </Card>
  );
}

function BulletPointCard({ text, onCopy }: { text: string; onCopy: () => void }) {
  return (
    <div className="rounded-xl border p-4 relative group hover:shadow-sm transition-shadow" style={{ backgroundColor: '#FAFAFF', borderColor: '#E5E3FF' }}>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 hover:text-gray-900 hover:bg-white"
        onClick={onCopy}
      >
        <Copy className="w-4 h-4" />
      </Button>
      <p className="text-gray-800 pr-12">{text}</p>
    </div>
  );
}

function InterviewQACard({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-xl border p-5" style={{ backgroundColor: '#FAFAFF', borderColor: '#E5E3FF' }}>
      <p className="text-gray-900 mb-3"><span style={{ fontWeight: 600 }}>Q:</span> {question}</p>
      <p className="text-gray-700 text-sm whitespace-pre-wrap"><span style={{ fontWeight: 600 }}>A:</span> {answer}</p>
    </div>
  );
}
