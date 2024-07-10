'use client';

import { useState, useRef } from "react";

const kanjiList = ["尻", "他の漢字"];

export default function WritingExercisesPage() {
    const [kanji, setKanji] = useState(kanjiList[0]);
    const canvasRef = useRef(null);

    const handleClear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, cavnas.width, canvas.height);
    };

    return (
        <div className="flex flex-col items-center min-h-screen py-4 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Writing Exercises</h1>
            <select onChange={(e) => setKanji(e.target.value)} className="px-4 py-2 mb-4 border rounded">
                {kanjiList.map(k => (
                    <option key={k} value={k}>{k}</option>
                ))}
            </select>
            <div className="flex flex-col items-center">
                <p className="text-lg mb-2">Practice writing: {kanji}</p>
                <canvas ref={canvasRef} width="500" height="500" className="border mb-4" />
                <button onClick={handleClear} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">Clear</button>
            </div>
        </div>
    );
}