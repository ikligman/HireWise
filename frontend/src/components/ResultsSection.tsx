import { useState } from 'react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { FileText, MessageSquare, Lightbulb, Copy, FileSearch, AlertCircle } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import { Alert, AlertDescription } from './ui/alert';

type AnalysisState = 'idle' | 'loading' | 'success' | 'error';

interface ResultsSectionProps {
  analysisState: AnalysisState;
  errorMessage?: string;
}

export function ResultsSection({ analysisState, errorMessage }: ResultsSectionProps) {
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
            <h2 className="text-gray-900">Analyzing your resume...</h2>
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
      {analysisState === 'success' && (
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
              <BulletPointCard
                text="Collaborated with cross-functional teams of 5+ members to deliver software projects, resulting in 30% faster deployment cycles"
                onCopy={() => copyToClipboard(
                  "Collaborated with cross-functional teams of 5+ members to deliver software projects, resulting in 30% faster deployment cycles",
                  "Bullet point"
                )}
              />
              <BulletPointCard
                text="Designed and executed multi-channel marketing campaigns reaching 50K+ users, increasing engagement by 45%"
                onCopy={() => copyToClipboard(
                  "Designed and executed multi-channel marketing campaigns reaching 50K+ users, increasing engagement by 45%",
                  "Bullet point"
                )}
              />
              <BulletPointCard
                text="Resolved 100+ customer inquiries weekly with 95% satisfaction rate, implementing feedback loops that reduced ticket volume by 20%"
                onCopy={() => copyToClipboard(
                  "Resolved 100+ customer inquiries weekly with 95% satisfaction rate, implementing feedback loops that reduced ticket volume by 20%",
                  "Bullet point"
                )}
              />
              <BulletPointCard
                text="Led agile development team in building scalable web applications, improving code quality metrics by 35%"
                onCopy={() => copyToClipboard(
                  "Led agile development team in building scalable web applications, improving code quality metrics by 35%",
                  "Bullet point"
                )}
              />
              <BulletPointCard
                text="Optimized database queries and API performance, reducing average response time from 800ms to 200ms"
                onCopy={() => copyToClipboard(
                  "Optimized database queries and API performance, reducing average response time from 800ms to 200ms",
                  "Bullet point"
                )}
              />
            </TabsContent>
            
            {/* Cover Letter Tab */}
            <TabsContent value="cover" className="mt-0">
              <div className="rounded-xl border p-6 relative" style={{ backgroundColor: '#FAFAFF', borderColor: '#E5E3FF' }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 hover:bg-white"
                  onClick={() => copyToClipboard(coverLetterText, "Cover letter")}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                
                <h3 className="text-gray-900 mb-4">Professional Cover Letter</h3>
                
                <div className="space-y-4 text-gray-700">
                  <p>Dear Hiring Manager,</p>
                  
                  <p>I am writing to express my strong interest in the position at your organization. With a proven track record in delivering impactful results and a passion for continuous learning, I am excited about the opportunity to contribute to your team.</p>
                  
                  <p>Throughout my experience, I have demonstrated excellence in cross-functional collaboration, project management, and driving measurable outcomes. My ability to combine technical expertise with strong communication skills has enabled me to bridge gaps between teams and deliver solutions that exceed expectations.</p>
                  
                  <p>What particularly draws me to this role is the opportunity to work on challenging projects that make a real difference. I am confident that my experience in leading teams, optimizing processes, and implementing innovative solutions aligns well with your organization's goals.</p>
                  
                  <p>I would welcome the opportunity to discuss how my background, skills, and enthusiasm can contribute to your team's success. Thank you for considering my application.</p>
                  
                  <p>Sincerely,<br />Your Name</p>
                </div>
              </div>
            </TabsContent>
            
            {/* Interview Prep Tab */}
            <TabsContent value="interview" className="mt-0 space-y-4">
              <InterviewQACard
                question="Tell me about yourself"
                answer="Focus on your professional journey, highlighting experiences relevant to this role. Structure your answer: present role → past experience → why this position. Keep it concise (60-90 seconds) and emphasize your key achievements and what makes you a strong fit."
              />
              <InterviewQACard
                question="What are your greatest strengths?"
                answer="Choose 2-3 strengths that directly relate to the job requirements. Provide specific examples that demonstrate these strengths in action. For instance, if you mention 'problem-solving,' share a concrete example of how you solved a challenging problem and the impact it had."
              />
              <InterviewQACard
                question="Why are you interested in this position?"
                answer="Research the company thoroughly. Connect your career goals with the company's mission, projects, or culture. Show genuine enthusiasm by mentioning specific aspects of the role or company that excite you. Demonstrate that you've done your homework."
              />
            </TabsContent>
          </Tabs>
          
          {/* Powered by text */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
            <p className="text-xs text-gray-400">Powered by OpenAI GPT-4</p>
          </div>
        </>
      )}
    </Card>
  );
}

const coverLetterText = `Dear Hiring Manager,

I am writing to express my strong interest in the position at your organization. With a proven track record in delivering impactful results and a passion for continuous learning, I am excited about the opportunity to contribute to your team.

Throughout my experience, I have demonstrated excellence in cross-functional collaboration, project management, and driving measurable outcomes. My ability to combine technical expertise with strong communication skills has enabled me to bridge gaps between teams and deliver solutions that exceed expectations.

What particularly draws me to this role is the opportunity to work on challenging projects that make a real difference. I am confident that my experience in leading teams, optimizing processes, and implementing innovative solutions aligns well with your organization's goals.

I would welcome the opportunity to discuss how my background, skills, and enthusiasm can contribute to your team's success. Thank you for considering my application.

Sincerely,
Your Name`;

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
      <p className="text-gray-700 text-sm"><span style={{ fontWeight: 600 }}>A:</span> {answer}</p>
    </div>
  );
}
