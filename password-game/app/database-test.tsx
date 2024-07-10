'use client';

import { useEffect, useState } from 'react';

interface ImageData {
  answer: string;
  image: string;
}

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    fetch('/api/images')
      .then(response => response.json())
      .then(data => setImages(data));
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Random Images from Database</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div key={index} className="flex flex-col items-center p-4 bg-white rounded shadow text-black">
            <img
              src={`data:image/png;base64,${img.image}`}
              alt={img.answer}
              className="w-full h-auto"
            />
            <p className="mt-2 text-center">{img.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
