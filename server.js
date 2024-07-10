const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const app = express();
const PORT = 3001;

const kanjiData = JSON.parse(fs.readFileSync(path.join(__dirname, 'kanji.json'), 'utf-8'));

app.use(cors());

app.get('/kanji', (req, res) => {
  const kanjiList = Object.keys(kanjiData);
  res.json(kanjiList);
});

app.get('/kanji/:kanji', (req, res) => {
  const kanji = req.params.kanji;
  const details = kanjiData[kanji] || {};
  res.json(details);
});

app.get('/kanji/search/:query', (req, res) => {
  const query = req.params.query;
  const results = Object.keys(kanjiData).filter(kanji => kanji.includes(query) || kanjiData[kanji].meanings.some(meaning => meaning.includes(query)));
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
