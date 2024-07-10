const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const kanjiData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'kanji.json'), 'utf-8'));

router.get('/search/:query', (req, res) => {
    const query = req.params.query;
    const results = Object.keys(kanjiData).filter(kanji => 
        kanji.includes(query) || 
        (kanjiData[kanji].meanings || []).some(meaning => meaning.includes(query)) || 
        (kanjiData[kanji].readings_on || []).some(reading => reading.includes(query)) || 
        (kanjiData[kanji].readings_kun || []).some(reading => reading.includes(query))
    );
    res.json(results);
});

router.get('/:kanji', (req, res) => {
    const kanji = req.params.kanji;
    const details = kanjiData[kanji];

    if (details) {
        res.json(details);
    } else {
        res.status(404).send('Kanji not found');
    }
});

module.exports = router;