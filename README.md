✨ HireWise – AI Career Assistant

A full-stack project integrating a React + Vite frontend and an Express backend.

🚀 How to Run
1️⃣ Start the backend
cd HireWise
npm install
node server.js


Runs on http://localhost:3000

2️⃣ Start the frontend

Open a new terminal:

cd frontend
npm install
npm run dev


Runs on http://localhost:5175

The frontend proxy automatically forwards /api/* requests to the backend.

✅ Verify Connection

Open the browser console on the frontend and run:

fetch('/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ test: 'hello from frontend' })
})
  .then(r => r.json())
  .then(console.log)


Expected output:

{ "ok": true, "echo": { "test": "hello from frontend" } }
