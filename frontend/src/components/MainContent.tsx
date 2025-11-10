import { useRef } from 'react';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { FileText, Briefcase, Sparkles, Upload } from 'lucide-react';
import { Badge } from './ui/badge';
import { ResultsSection } from './ResultsSection';
import { toast } from 'sonner';

type AnalysisState = 'idle' | 'loading' | 'success' | 'error';

interface MainContentProps {
  resumeText: string;
  setResumeText: (text: string) => void;
  jobDescription: string;
  setJobDescription: (text: string) => void;
  analysisState: AnalysisState;
  errorMessage: string;
  onAnalyze: () => void;
}

export function MainContent({
  resumeText,
  setResumeText,
  jobDescription,
  setJobDescription,
  analysisState,
  errorMessage,
  onAnalyze
}: MainContentProps) {
  const resumeFileInputRef = useRef<HTMLInputElement>(null);
  const jobFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setTextCallback: (text: string) => void
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const validTypes = ['.txt', '.pdf', '.doc', '.docx'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!validTypes.some(type => fileExtension === type)) {
      toast.error('Please upload a .txt, .pdf, .doc, or .docx file');
      return;
    }

    // For now, we'll primarily support .txt files
    // PDF and DOCX would require additional libraries
    if (fileExtension === '.txt') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setTextCallback(text);
        toast.success(`${file.name} uploaded successfully!`);
      };
      reader.onerror = () => {
        toast.error('Error reading file. Please try again.');
      };
      reader.readAsText(file);
    } else {
      // For PDF/DOCX, show a helpful message
      toast.info('PDF/DOCX support coming soon! For now, please copy and paste the text from your file.');
    }

    // Reset input
    event.target.value = '';
  };
  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="p-6 bg-white shadow-lg shadow-indigo-100/50 border-indigo-100 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" style={{ color: '#6C63FF' }} />
                <label className="text-gray-900">Your Resume</label>
                <Badge variant="secondary" className="text-xs" style={{ backgroundColor: '#EBE9FE', color: '#6C63FF' }}>
                  Required
                </Badge>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => resumeFileInputRef.current?.click()}
                className="text-xs border-[#6C63FF] text-[#6C63FF] hover:bg-[#EBE9FE]"
              >
                <Upload className="w-3.5 h-3.5 mr-1.5" />
                Upload File
              </Button>
              <input
                ref={resumeFileInputRef}
                type="file"
                accept=".txt,.pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => handleFileUpload(e, setResumeText)}
              />
            </div>
            <div className="relative">
              <Textarea
                placeholder="Paste your resume content here or upload a file..."
                className="min-h-[280px] resize-none border-gray-200 focus:border-[#6C63FF] focus:ring-[#6C63FF] rounded-xl"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
              {!resumeText && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center text-gray-400 space-y-2">
                    <Upload className="w-8 h-8 mx-auto opacity-30" />
                    <p className="text-sm">Drop a file or paste text</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" style={{ color: '#6C63FF' }} />
                <label className="text-gray-900">Job Description</label>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                  Optional
                </Badge>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => jobFileInputRef.current?.click()}
                className="text-xs border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                <Upload className="w-3.5 h-3.5 mr-1.5" />
                Upload File
              </Button>
              <input
                ref={jobFileInputRef}
                type="file"
                accept=".txt,.pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => handleFileUpload(e, setJobDescription)}
              />
            </div>
            <div className="relative">
              <Textarea
                placeholder="Paste the job description you're targeting (optional) or upload a file..."
                className="min-h-[280px] resize-none border-gray-200 focus:border-[#6C63FF] focus:ring-[#6C63FF] rounded-xl"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              {!jobDescription && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center text-gray-400 space-y-2">
                    <Upload className="w-8 h-8 mx-auto opacity-30" />
                    <p className="text-sm">Drop a file or paste text</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            onClick={onAnalyze}
            disabled={analysisState === 'loading'}
            size="lg"
            className="px-12 py-6 rounded-xl shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
            style={{
              background: analysisState === 'loading' ? '#9C95FF' : 'linear-gradient(to right, #6C63FF, #9C85FF)',
              color: 'white'
            }}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {analysisState === 'loading' ? 'Analyzing...' : 'Analyze with AI'}
          </Button>
        </div>
      </Card>

      {/* Results Section */}
      <ResultsSection
        analysisState={analysisState}
        errorMessage={errorMessage}
      />
    </div>
  );
}
