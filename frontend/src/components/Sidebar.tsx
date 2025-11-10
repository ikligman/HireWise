import { Card } from './ui/card';
import { Lightbulb, History, TrendingUp, Target, Zap, Clock } from 'lucide-react';
import { Badge } from './ui/badge';

export function Sidebar() {
  return (
    <div className="space-y-6">
      {/* Tips Card */}
      <Card className="p-6 bg-white shadow-lg shadow-indigo-100/50 border-indigo-100 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-lg">
            <Lightbulb className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-indigo-900">Tips</h3>
        </div>
        
        <div className="space-y-3">
          <TipItem
            icon={<Target className="w-4 h-4" />}
            text="Use action verbs like 'led', 'developed', 'increased'"
          />
          <TipItem
            icon={<TrendingUp className="w-4 h-4" />}
            text="Quantify achievements with numbers and percentages"
          />
          <TipItem
            icon={<Zap className="w-4 h-4" />}
            text="Tailor your resume to match job description keywords"
          />
          <TipItem
            icon={<Target className="w-4 h-4" />}
            text="Keep bullet points concise (1-2 lines max)"
          />
        </div>
      </Card>
      
      {/* History Card */}
      <Card className="p-6 bg-white shadow-lg shadow-indigo-100/50 border-indigo-100 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
            <History className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-indigo-900">Recent Analysis</h3>
        </div>
        
        <div className="space-y-3">
          <HistoryItem
            title="Software Engineer Resume"
            date="2 hours ago"
            status="completed"
          />
          <HistoryItem
            title="Product Manager Position"
            date="Yesterday"
            status="completed"
          />
          <HistoryItem
            title="Marketing Coordinator"
            date="3 days ago"
            status="completed"
          />
        </div>
        
        <button className="w-full mt-4 text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
          View all history →
        </button>
      </Card>
      
      {/* Quick Stats Card */}
      <Card className="p-6 bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-300/50 border-0 rounded-2xl text-white">
        <h3 className="mb-4">Your Progress</h3>
        
        <div className="space-y-4">
          <StatItem label="Resumes Analyzed" value="12" />
          <StatItem label="Applications Sent" value="8" />
          <StatItem label="Success Rate" value="75%" />
        </div>
      </Card>
    </div>
  );
}

function TipItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
      <div className="text-indigo-600 mt-0.5">
        {icon}
      </div>
      <p className="text-sm text-indigo-900">{text}</p>
    </div>
  );
}

function HistoryItem({ title, date, status }: { title: string; date: string; status: string }) {
  return (
    <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors cursor-pointer">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="text-sm text-indigo-900">{title}</p>
          <div className="flex items-center gap-2 mt-1">
            <Clock className="w-3 h-3 text-indigo-500" />
            <p className="text-xs text-indigo-600">{date}</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
          {status}
        </Badge>
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-indigo-100">{label}</p>
      <p className="text-white">{value}</p>
    </div>
  );
}
