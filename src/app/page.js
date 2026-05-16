export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-b from-pink-50 to-white">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold text-pink-600 mb-4">
          🎁 Giftit
        </h1>
        <p className="text-2xl text-gray-700 mb-8">
          Group gifts, made simple.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          Stop chasing your friends for money. Collect contributions, 
          pick the perfect gift, and sign the card — all in one place.
        </p>
        <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition">
          Start a Gift Pool
        </button>
      </div>
    </main>
  );
}