import React from 'react';

const ScreenshotUI: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#1a1a1a] font-sans">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold">S</div>
          <span className="font-semibold text-lg">SAMP Broadcasts</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <a href="#">AI Broadcasts</a>
          <a href="#">Ready-to-Go Broadcasts</a>
          <button className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm">
            <span className="text-xs">✨</span> Create Broadcast with AI
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="relative bg-white/50 border border-gray-200 rounded-3xl p-12 text-center shadow-sm overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-xs font-medium text-teal-800 mb-6">
            <span>✨</span> AI school broadcast generation
          </div>
          <h1 className="text-5xl font-bold mb-6">Describe Your Broadcast</h1>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">Create a complete school broadcast in minutes with AI, or choose from our collection of ready-to-use broadcasts.</p>
          
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-inner max-w-2xl mx-auto">
            <textarea 
              className="w-full h-32 p-4 text-sm border-none focus:ring-0 resize-none"
              placeholder="Describe the broadcast you want to create..."
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500 text-left">Example: "Create a 10-minute broadcast about the importance of reading for middle school students."</span>
              <button className="bg-[#1a1a1a] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
                <span className="text-sm">🪄</span> Generate Broadcast
              </button>
            </div>
          </div>
        </div>

        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-2">Built for Every School Level</h2>
          <p className="text-gray-600 mb-10">Every AI-generated broadcast is adapted to the language, tone, and depth expected at the selected education level.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Elementary", desc: "For grades 1-6. Broadcasts use simple language, engaging topics, and age-appropriate phrasing designed for younger students." },
              { title: "Middle School", desc: "For grades 7-9. Broadcasts use clear and engaging language with topics and phrasing appropriate for middle school students." },
              { title: "Secondary", desc: "For grades 10-12. Broadcasts use more advanced phrasing, deeper topics, and a more formal presentation suitable for secondary students." }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-white to-[#f5f0e6] p-6 rounded-2xl border border-gray-200">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-100 mb-4 shadow-sm">📚</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl font-bold mb-2">Ready-to-Go Broadcasts</h2>
          <p className="text-gray-600 mb-8">Choose a prepered broadcast and download it in minutes.</p>
          
          <div className="flex gap-2 mb-8 overflow-x-auto">
            {['All Levels', 'Occasions', 'Elementary', 'Seasonal', 'Middle School', 'Culture'].map((f) => (
              <button key={f} className="px-4 py-1.5 rounded-full border border-gray-300 text-sm hover:bg-white">{f}</button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "National Day", desc: "A pationic broadcast celebrating national identity, history, and achievements." },
              { title: "Back to School", desc: "A welcoming breadcast to open the academic year with energy and clear goals." },
              { title: "Reading", desc: "Encourages a daily reading habit with facts, quotes, and a short student segment." }
            ].map((card, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200">
                <div className="h-32 bg-gray-50 rounded-xl mb-4 flex items-center justify-center border border-gray-100">Illustration</div>
                <h3 className="font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 mb-6">{card.desc}</p>
                <button className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-medium">Use This Broadcast</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ScreenshotUI;

