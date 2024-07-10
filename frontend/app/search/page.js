'use client';

import { useState } from "react";

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        fetch(`http://localhost:3001/kanji/search/${query}`)
            .then(res => res.json())
            .then(data => setResults(data))
            .catch(err => console.error(err));
    };

    return (
        <div className="flex flex-col items-center min-h-screen py-4 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Search Kanji</h1>
            <div className="flex space-x-4 mb-4">
                <input 
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter Kanji or Keyword"
                    className="px-4 py-2 border rounded"
                />
                <button onClick={handleSearch} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Search</button>
            </div>
            <ul className="space-y-2">
                {results.map(kanji => (
                    <li key={kanji}>
                        <a href={`/${kanji}`} className="text-lg font-medium text-blue-600 hover:underline">{kanji}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}