import React from 'react';

const IdleGachaCaseStudy = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-gray-800 font-sans">
      
      {/* Hero Section */}
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
          Idle Gacha PWA Engine
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          A high-performance, mathematically balanced Progressive Web App game engine. Engineered from scratch to handle complex state management, event-driven architecture, and secure micro-transactions.
        </p>
        <div className="flex justify-center gap-4">
          <a 
            href="https://gacha-game-gs75.onrender.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1"
          >
            Play Live Demo (1-Click Guest)
          </a>
          <a 
            href="https://github.com/yourusername/idle-gacha" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1"
          >
            View GitHub Source
          </a>
        </div>
      </header>

      {/* Tech Stack Bar */}
      <section className="bg-gray-50 rounded-2xl p-6 mb-16 border border-gray-100 shadow-sm flex flex-wrap justify-center gap-4">
        {['React-like Reactivity (Alpine.js)', 'Tailwind CSS', 'Laravel 10', 'PostgreSQL', 'PHPUnit', 'PWA / Service Workers', 'Docker'].map((tech) => (
          <span key={tech} className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
            {tech}
          </span>
        ))}
      </section>

      {/* Main Image Placeholder */}
      <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
        {/* Replace src with your actual dashboard screenshot */}
        <img 
          src="/images/gacha-dashboard.png" 
          alt="Idle Gacha Dashboard Interface" 
          className="w-full object-cover"
        />
      </div>

      

      {/* The Challenge & Solution */}
      <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-indigo-100 pb-2">The Vision & Challenge</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Building a web-based gacha game requires managing thousands of micro-transactions, tracking massive player inventories, and balancing an exponential economy so players remain engaged for months.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The initial challenge was architectural: A naive data fetching approach would trigger hundreds of cascading N+1 database queries to load user wallets, card instances, and daily shops simultaneously, which would crash the server under heavy player load.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-indigo-100 pb-2">The Engineering Solution</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            I completely flattened the data pipeline. By utilizing strict Eloquent eager loading and memory-grouped collections for daily generations, I reduced the main dashboard load down to just 4 highly optimized database reads.
          </p>
          <p className="text-gray-600 leading-relaxed">
            On the frontend, I integrated a custom Service Worker and <code>manifest.json</code> to transform the engine into a fully installable Progressive Web App (PWA) for iOS and Android, stripping away the browser UI for a native fullscreen mobile experience.
          </p>
        </div>
      </section>

      {/* Deep Dives */}
      <section className="space-y-12 mb-16">
        
        {/* Feature 1 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <span className="bg-green-100 text-green-700 p-2 rounded-lg mr-4">🛡️</span>
            <h3 className="text-xl font-bold text-gray-900">Securing the Economy with Database Transactions</h3>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">
            When players purchase an item from the Daily Shop or merge cards, the system must deduct coins and mint new instances simultaneously. To prevent race-condition exploits (e.g., macro double-clicking), every shop purchase and card merge is wrapped in strict <code>DB::transaction</code> blocks.
          </p>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-green-400 font-mono">
              {`// Example: Bulletproof test verifying economy protection
public function test_user_cannot_pull_gacha_with_insufficient_coins(): void
{
    $user = User::factory()->create(['coins' => 100]); 
    
    $response = $this->actingAs($user)->postJson('/gacha/pull');
    
    $response->assertStatus(400); 
    $this->assertDatabaseHas('users', ['id' => $user->id, 'coins' => 100]);
    $this->assertDatabaseCount('user_card_instances', 0);
}`}
            </pre>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <span className="bg-blue-100 text-blue-700 p-2 rounded-lg mr-4">⚡</span>
            <h3 className="text-xl font-bold text-gray-900">Optimistic UI & Reactive State</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Traditional page reloads break the immersion of a fast-paced idle game. By leveraging Alpine.js directly within the blade templates, I built a highly interactive dashboard featuring optimistic UI updates. When a player buys a card, the asynchronous fetch request instantly ticks down the global coin state and snaps the item to a "Sold Out" state—all without the overhead of a heavy Single Page Application framework.
          </p>
        </div>

      </section>

    </div>
  );
};

export default IdleGachaCaseStudy;
