# HireWise - AI Career Assistant

A modern web application that helps students improve their resumes using AI.

## Features

- 📝 Resume analysis and enhancement
- 💼 AI-powered resume bullet points
- 📄 Cover letter generation
- 🎯 Interview preparation tips
- 🎨 Clean, modern UI with Tailwind CSS
- 📱 Fully responsive design

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository or download the files

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **ShadCN UI** - Component library
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## Project Structure

```
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
├── components/
│   ├── Navigation.tsx     # Top navigation bar
│   ├── MainContent.tsx    # Main input section
│   ├── ResultsSection.tsx # AI results display
│   ├── Sidebar.tsx        # Tips and history sidebar
│   └── ui/                # ShadCN UI components
├── styles/
│   └── globals.css        # Global styles and Tailwind config
└── index.html            # HTML template

```

## Usage

1. Paste your resume content in the "Your Resume" text area
2. (Optional) Add a job description you're targeting
3. Click "Analyze with AI" button
4. View enhanced resume bullets, cover letter, and interview tips
5. Copy any content using the copy buttons

## License

MIT
