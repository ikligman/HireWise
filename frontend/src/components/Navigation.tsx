import { Sparkles } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="bg-white border-b border-indigo-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-indigo-900">HireWise</h1>
              <p className="text-xs text-indigo-600">AI Career Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-indigo-700 hover:text-indigo-900 transition-colors">
              About
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
