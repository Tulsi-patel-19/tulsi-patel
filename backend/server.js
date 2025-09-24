// import express from "express";
// import cors from "cors";
// import fs from "fs";

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// const data = JSON.parse(fs.readFileSync("data.json"));

// app.get("/api/career-paths", (req, res) => res.json(data.careerPaths));
// app.get("/api/gov-exams", (req, res) => res.json(data.govExams));
// app.get("/api/colleges", (req, res) => res.json(data.colleges));

// app.listen(PORT, () => {
//   console.log(`✅ Backend running at http://localhost:${PORT}`);
// });


// backend/server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// load optional data.json
const dataPath = path.join(__dirname, 'data.json');
let data = { careerPaths: [], govExams: [], colleges: [] };
if (fs.existsSync(dataPath)) {
  try { data = JSON.parse(fs.readFileSync(dataPath, 'utf8')); } catch (e) { console.error('Error parsing data.json', e); }
}

// API endpoints
app.get('/api/career-paths', (req, res) => res.json(data.careerPaths));
app.get('/api/gov-exams', (req, res) => res.json(data.govExams));
app.get('/api/colleges', (req, res) => res.json(data.colleges));

// store quiz results in memory (simple). Optionally persist to file.
let quizResults = [];
app.post('/api/save-result', (req, res) => {
  const { user = 'guest', subject, score, total } = req.body;
  const record = { user, subject, score, total, date: new Date().toISOString() };
  quizResults.push(record);

  // Optional: append to file results.json (uncomment to persist)
  // fs.appendFileSync(path.join(__dirname, 'results.json'), JSON.stringify(record) + '\n');

  res.json({ success: true, saved: record });
});

app.get('/api/results', (req, res) => res.json(quizResults));

// (Optional) Serve frontend files from parent folder so you can open via http://localhost:5000/index.html
app.use(express.static(path.join(__dirname, '..')));

app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
