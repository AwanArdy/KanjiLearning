'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function KanjiPage() {
    const { kanji: encodedKanji } = useParams();
    const kanji = decodeURIComponent(encodedKanji);
    const [details, setDetails] = useState({ meanings: [], readings_on: [], readings_kun: [] });

    useEffect(() => {
        if (kanji) {
            fetch (`http://localhost:3001/kanji/${kanji}`)
                .then((res) => res.json())
                .then((data) => setDetails(data))
                .catch((err) => console.error(err));
        }
    }, [kanji]);

    return (
        <div className="flex flex-col items-center min-h-screen py-4 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">{kanji}</h1>
            <div className="text-center">
                <h2 className="text-lg mb-2">Meanings: {details.meanings ? details.meanings.join(', ') : 'N/A'}</h2>
                <h2 className="text-lg mb-2">Onyomi: {details.readings_on ? details.readings_on.join(', ') : 'N/A'}</h2>
                <h2 className="text-lg mb-2">Kunyomi: {details.readings_kun ? details.readings_kun.join(', ') : 'N/A'}</h2>
            </div>
        </div>
    );
}