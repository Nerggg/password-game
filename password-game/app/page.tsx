'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [hoverText, setHoverText] = useState('');

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen py-2 h-screen">
    <div className="flex flex-col items-center justify-center pt-[15%]">
      <h1 className="text-4xl font-bold mb-8">pASSword game :D</h1>
      <div className="flex flex-col space-y-4">
        <Link href="/easy" className="px-4 py-2 border text-white rounded-lg hover:bg-blue-700 text-center"
            onMouseEnter={() => setHoverText('difficulty easy')}
            onMouseLeave={() => setHoverText('')}>
            easy
        </Link>
        <Link href="/medium" className="px-4 py-2 border text-white rounded-lg hover:bg-green-700 text-center">
            Medium
        </Link>
        <Link href="/hard" className="px-4 py-2 border text-white rounded-lg hover:bg-red-700 text-center">
            harD
        </Link>
      </div>
      {hoverText && (
        <div className="pt-6 text-lg text-gray-700">
          {hoverText}
        </div>
      )}
    </div>
  );
}
