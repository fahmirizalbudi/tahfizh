import React, { useState } from 'react';
import useSWR from 'swr';

// Fetcher for local JSON (handled by Vite)
const fetcher = (url: string) => fetch(url).then(res => res.json());

interface Verse {
  id: number;
  text: string;
  translation: string;
}

interface Surah {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
  total_verses: number;
  verses: Verse[];
}

const Logo = () => (
  <div className="flex items-center gap-3">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2L18.5 10.5H27L20 15.5L22.5 24L16 19L9.5 24L12 15.5L5 10.5H13.5L16 2Z" fill="#1A1A1A"/>
      <path d="M26 16C26 21.5228 21.5228 26 16 26C10.4772 26 6 21.5228 6 16" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
    <span className="text-xl font-bold tracking-tighter uppercase">Tahfizh</span>
  </div>
);

const Navbar = () => (
  <nav className="py-8 bg-brand-bg">
    <div className="layout-container flex justify-between items-center">
      <Logo />
      <div className="hidden md:flex gap-10">
        <a href="#" className="nav-item">Reading</a>
        <a href="#" className="nav-item">Memorize</a>
        <a href="#" className="nav-item">Reciters</a>
      </div>
      <div className="flex items-center gap-4">
        <button className="btn-modern px-8">Get Started</button>
      </div>
    </div>
  </nav>
);

function App() {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  
  // SWR with 5-minute caching (dedupingInterval + focusThrottleInterval)
  const { data: surahs, error, isLoading } = useSWR<Surah[]>('/src/assets/quran_id.json', fetcher, {
    dedupingInterval: 300000, // 5 minutes in ms
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  if (error) return <div className="p-20 text-center text-red-500">Failed to load Quran data.</div>;
  if (isLoading) return <div className="p-20 text-center animate-pulse text-brand-muted uppercase tracking-widest font-bold">Connecting to Divine Text...</div>;

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white">
      <Navbar />
      
      <main>
        {/* Detail Modal Overlay */}
        {selectedSurah && (
          <div className="fixed inset-0 bg-white z-[100] overflow-y-auto pt-20 pb-40 px-6">
            <div className="layout-container max-w-3xl">
              <button 
                onClick={() => setSelectedSurah(null)}
                className="mb-12 text-sm font-bold text-brand-muted hover:text-brand-text flex items-center gap-2 group"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Library
              </button>
              
              <div className="text-center mb-20">
                <h1 className="mb-4">{selectedSurah.transliteration}</h1>
                <p className="text-brand-muted uppercase tracking-widest text-xs font-bold mb-8">
                  {selectedSurah.translation} • {selectedSurah.total_verses} Verses • {selectedSurah.type}
                </p>
                <div className="text-6xl font-arabic text-brand-text">{selectedSurah.name}</div>
              </div>

              <div className="space-y-16">
                {selectedSurah.verses.map((verse) => (
                  <div key={verse.id} className="relative">
                    <div className="absolute -left-12 top-2 text-[10px] font-bold text-brand-muted tabular-nums opacity-30">
                      {String(verse.id).padStart(3, '0')}
                    </div>
                    <div className="arabic-text text-4xl mb-6 leading-[2.5] text-right">
                      {verse.text}
                    </div>
                    <p className="text-[15px] text-brand-muted leading-relaxed font-medium">
                      {verse.translation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <header className="py-20 md:py-32">
          <div className="layout-container">
            <div className="max-w-2xl">
              <h1 className="mb-8">
                Spiritual clarity for the <br />
                modern era.
              </h1>
              <p className="text-[17px] text-brand-muted mb-12 leading-relaxed font-normal">
                An ultra-minimalist space designed for high-precision recitation and seamless Quranic memorization.
              </p>
              <button className="btn-modern px-10">Start Reading</button>
            </div>
          </div>
        </header>

        <section className="pb-40">
          <div className="layout-container">
            <div className="mb-12">
              <h2 className="text-brand-text">Surah Library</h2>
              <div className="h-1 w-8 bg-brand-accent mt-2"></div>
            </div>
            
            <div className="flex flex-col">
              {surahs?.map((surah) => (
                <div 
                  key={surah.id} 
                  onClick={() => setSelectedSurah(surah)}
                  className="surah-flat-row group"
                >
                  <div className="flex items-baseline gap-12">
                    <span className="text-[13px] font-semibold text-brand-muted tabular-nums">
                      {String(surah.id).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-[18px] font-semibold mb-1 group-hover:text-brand-primary transition-colors">
                        {surah.transliteration}
                      </h3>
                      <p className="text-[14px] text-brand-muted">
                        {surah.translation} • {surah.total_verses} Verses
                      </p>
                    </div>
                  </div>
                  <div className="arabic-text">
                    {surah.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-brand-border/10">
        <div className="layout-container flex justify-between items-center text-[13px] text-brand-muted font-medium">
          <p>© 2026 Tahfizh Collective. Minimalist Quran Reader.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-brand-text">Privacy</a>
            <a href="#" className="hover:text-brand-text">Open Source</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
