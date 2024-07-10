'use client';

import Link from "next/link";

export default function HomePage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <h1 className="text-4xl font-bold mb-6">Welcome to Kanji Learning App</h1>
        <nav className="space-y-4">
          <Link href="/search" legacyBehavior>
            <a className="px-4 py-2 text-xl font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">Search Kanji</a>
          </Link>
          <Link href="/flashcards" legacyBehavior>
            <a className="px-4 py-2 text-xl font-semibold text-white bg-green-500 rounded hover:bg-green-600">Flashcards</a>
          </Link>
          <Link href="/writing-exercises" legacyBehavior>
            <a className="px-4 py-2 text-xl font-semibold text-white bg-yellow-500 rounded hover:bg-yellow-600">Writing Exercises</a>
          </Link>
        </nav>
      </div>
    );
}