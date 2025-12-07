import Link from 'next/link';

const GAMES = [
  {
    name: 'Sound Slide',
    href: '/games/sound-slide?lesson=4&exercise=0',
    description: 'Slide onset and rime together to blend words',
    color: 'bg-orange-500',
    icon: '🎚️',
  },
  {
    name: 'Fingor',
    href: '/games/fingor?lesson=4&exercise=0',
    description: 'Touch and drag across letters to hear each sound',
    color: 'bg-blue-500',
    icon: '👆',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-indigo-900 mb-4">
            Blendy
          </h1>
          <p className="text-xl text-indigo-700">
            Learn to read with phonics games
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {GAMES.map((game) => (
            <Link
              key={game.name}
              href={game.href}
              className="group block"
            >
              <div className={`
                ${game.color} rounded-2xl p-6 text-white
                shadow-lg transition-all duration-200
                hover:scale-105 hover:shadow-xl
                active:scale-100
              `}>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-4xl">{game.icon}</span>
                  <h2 className="text-2xl font-bold">{game.name}</h2>
                </div>
                <p className="text-white/90">
                  {game.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            More games coming soon: Rhyme Match, Word Builder, Sound Detective...
          </p>
        </div>
      </div>
    </main>
  );
}
