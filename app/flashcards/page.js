'use client';

import { useEffect, useState } from "react";

// const kanjiList = ["尻", "他の漢字"];

export default function FlashcardPage() {
    const [kanjiList, setKanjiList] = useState([]);
    const [index, setIndex] = useState(0);
    const [kanjiDetails, setKanjiDetails] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/kanji')
            .then(res => res.json())
            .then(data => setKanjiList(data))
            .catch(err => console.error(err));
    }, []);

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % kanjiList.length);
    };
    
    const handlePrevious = () => {
        setIndex((prevIndex) => (prevIndex - 1 + kanjiList.length) % kanjiList.length);
    };

    useEffect(() => {
        if (kanjiList.length > 0) {
            fetchKanjiDetails(kanjiList[index]);
        }
    }, [index, kanjiList]);
    

    const fetchKanjiDetails = (kanji) => {
        fetch(`http://localhost:3001/kanji/${kanji}`)
            .then(res => res.json())
            .then(data => setKanjiDetails(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchKanjiDetails(kanjiList[index]);
    }, [index]);

    return (
        <div className="flex flex-col items-center min-h-screen py-4 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Flashcards</h1>
                {kanjiList.length > 0 ? (
            <>
            <div className="flex space-x-4 mb-4">
                <button onClick={handlePrevious} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Previous</button>
                <button onClick={handleNext} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Next</button>
            </div>
            <h2 className="text-2xl font-bold mb-4">{kanjiList[index]}</h2>
            {kanjiDetails && (
                <div className="text-center">
                    <p className="text-lg">Meanings: {kanjiDetails.meanings ? kanjiDetails.meanings.join(', ') : 'N/A'}</p>
                    <p className="text-lg">Onyomi: {kanjiDetails.readings_on ? kanjiDetails.readings_on.join(', ') : 'N/A'}</p>
                    <p className="text-lg">Kunyomi: {kanjiDetails.readings_kun ? kanjiDetails.readings_kun.join(', ') : 'N/A'}</p>
                </div>
            )}
            </>
        ) : (
            <p>Loading...</p>
        )}
        </div>
    );
}