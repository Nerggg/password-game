import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Navigasi dengan Tombol</h1>
      <div className="flex flex-col space-y-4">
        <Link href="/easy" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 text-center">
          Tombol A
        </Link>
        <Link href="/medium" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 text-center">
          Tombol B
        </Link>
        <Link href="/hard" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 text-center">
          Tombol C
        </Link>
      </div>
    </div>
  );
}
