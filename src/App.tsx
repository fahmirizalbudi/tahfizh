import React, { useRef, useEffect } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';

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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Logo = () => (
  <Link to="/" className="flex items-center gap-6 group">
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-brand-emerald rotate-45 rounded-sm group-hover:rotate-90 transition-transform duration-700"></div>
      <div className="absolute inset-0 bg-brand-ink/10 -rotate-12 rounded-sm"></div>
      <span className="relative text-white font-serif font-bold text-xl italic mt-0.5">T</span>
    </div>
    <div className="flex flex-col">
      <span className="text-xl font-serif font-bold tracking-tight uppercase leading-none">Tahfizh</span>
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mt-1">Sacred Space</span>
    </div>
  </Link>
);

const Navbar = ({ onGetStarted }: { onGetStarted?: () => void }) => (
  <nav className="py-12 bg-white relative z-50">
    <div className="layout-container flex justify-between items-end">
      <Logo />
      {onGetStarted && (
        <div className="flex items-center gap-12">
          <button 
            onClick={onGetStarted}
            className="text-[12px] font-bold uppercase tracking-[0.2em] border-b-2 border-brand-emerald pb-1 hover:text-brand-emerald transition-colors"
          >
            Enter Library
          </button>
        </div>
      )}
    </div>
  </nav>
);

const Library = ({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement | null> }) => {
  const { data: surahs, error, isLoading } = useSWR<Surah[]>('/src/assets/quran_id.json', fetcher, {
    dedupingInterval: 300000,
    revalidateOnFocus: false,
  });

  if (error) return <div className="p-20 text-center font-serif italic text-xl">Something went wrong in the library.</div>;
  if (isLoading) return <div className="p-20 text-center font-serif italic text-xl animate-pulse">Gathering the sacred texts...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pb-40"
    >
      <header className="py-24">
        <div className="layout-container">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-8">
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                Refinement in <br />
                <span className="text-brand-emerald italic">Sacred Recitation.</span>
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="text-2xl font-serif italic text-brand-muted max-w-xl leading-relaxed"
              >
                A space designed for the intentional study and memorization of the Holy Quran. 
                Focus. Reflect. Memorize.
              </motion.p>
            </div>
            <div className="md:col-span-4 pt-12">
              <div className="flex flex-col gap-12">
                {[
                  { label: "Language", val: "Indonesian" },
                  { label: "Collection", val: "114 Chapters" },
                  { label: "Perspective", val: "2026 Modern" }
                ].map((s, i) => (
                  <div key={i} className="border-l border-brand-ink/10 pl-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2 text-brand-muted">{s.label}</p>
                    <p className="text-xl font-serif">{s.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section ref={scrollRef} className="pt-24 border-t border-brand-ink/5">
        <div className="layout-container">
          <div className="flex items-end gap-12 mb-20">
            <h2 className="mb-0">Selected Surahs</h2>
            <div className="h-px flex-1 bg-brand-ink/10 mb-3"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-3 text-brand-muted italic">Chapter Index</span>
          </div>
          
          <div className="flex flex-col">
            {surahs?.map((surah) => (
              <Link 
                key={surah.id} 
                to={`/surah/${surah.id}`}
                className="surah-editorial-item group"
              >
                <div className="flex items-baseline gap-16 md:gap-32 w-full">
                  <span className="text-[12px] font-serif italic text-brand-muted opacity-40 group-hover:opacity-100 group-hover:text-brand-emerald transition-all duration-700">
                    {String(surah.id).padStart(3, '0')}
                  </span>
                  <div className="flex-1 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                    <div>
                      <h3 className="text-3xl font-serif font-medium tracking-tight group-hover:italic transition-all duration-700">
                        {surah.transliteration}
                      </h3>
                      <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-muted mt-2">
                        {surah.translation} • {surah.total_verses} Verses
                      </p>
                    </div>
                    <div className="arabic-text group-hover:text-brand-emerald">
                      {surah.name}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const SurahDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: surahs } = useSWR<Surah[]>('/src/assets/quran_id.json', fetcher);
  
  const surah = surahs?.find(s => s.id === Number(id));

  if (!surah) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen relative"
    >
      <Navbar />
      <ScrollToTop />
      
      <main className="layout-container py-24">
        <div className="grid md:grid-cols-12 gap-20">
          <aside className="md:col-span-3 sticky top-12 h-fit hidden md:block">
            <button 
              onClick={() => navigate('/')}
              className="text-[10px] font-bold uppercase tracking-[0.4em] mb-20 flex items-center gap-4 hover:text-brand-emerald transition-colors group"
            >
              <span className="group-hover:-translate-x-2 transition-transform duration-500">←</span> Back to index
            </button>
            
            <div className="flex flex-col gap-12 border-l border-brand-ink/5 pl-8 mt-40">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.4em] mb-3 text-brand-muted">ORIGIN</p>
                <p className="text-lg font-serif italic">{surah.type}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.4em] mb-3 text-brand-muted">CHAPTER</p>
                <p className="text-lg font-serif italic">{String(surah.id).padStart(3, '0')}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.4em] mb-3 text-brand-muted">CONTEXT</p>
                <p className="text-lg font-serif italic">{surah.total_verses} Verses</p>
              </div>
            </div>
          </aside>

          <section className="md:col-span-9">
            <header className="mb-40">
              <h1 className="text-[72px] mb-4 leading-none">{surah.transliteration}</h1>
              <p className="text-xl font-serif italic text-brand-emerald mb-20">{surah.translation}</p>
              
              <div className="flex items-center gap-12 mb-32">
                <div className="h-px flex-1 bg-brand-ink/10"></div>
                <div className="text-[80px] font-arabic leading-none text-brand-ink">{surah.name}</div>
              </div>
            </header>

            <div className="space-y-40">
              {surah.verses.map((verse) => (
                <motion.div 
                  key={verse.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="group relative pb-20 border-b border-brand-ink/5 last:border-0"
                >
                  <div className="flex flex-col items-end gap-16">
                    <div className="flex items-start gap-12 w-full justify-end">
                      <span className="text-[11px] font-serif italic text-brand-muted mt-6 opacity-30 group-hover:opacity-100 group-hover:text-brand-emerald transition-all duration-700">
                        Verse {verse.id}
                      </span>
                      <div className="arabic-text text-[42px] leading-[2.2] text-right flex-1 pt-2">
                        {verse.text}
                      </div>
                    </div>
                    <div className="w-full text-left md:pl-20 max-w-2xl mr-auto">
                      <p className="text-[20px] font-serif leading-relaxed text-brand-ink opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                        {verse.translation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-80 p-24 bg-brand-ink text-white rounded-sm text-center">
              <h3 className="text-4xl font-serif italic mb-8">End of recitation.</h3>
              <p className="text-white/40 font-serif italic mb-12 max-w-sm mx-auto">
                "Whoever recites a letter from the Book of Allah, he will be credited with a good deed, and a good deed gets a ten-fold reward."
              </p>
              <button 
                onClick={() => navigate('/')}
                className="text-[10px] font-bold uppercase tracking-[0.4em] border-b border-white pb-2 hover:text-brand-emerald hover:border-brand-emerald transition-all"
              >
                Return to Index
              </button>
            </div>
          </section>
        </div>
      </main>
    </motion.div>
  );
};

function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const onGetStarted = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-white">
      <ScrollToTop />
      
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Navbar onGetStarted={onGetStarted} />
                  <Library scrollRef={scrollRef} />
                </>
              } 
            />
            <Route path="/surah/:id" element={<SurahDetail />} />
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="py-24 border-t border-brand-ink/5 bg-brand-surface relative z-10">
        <div className="layout-container flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-brand-muted">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-brand-ink rotate-45 flex items-center justify-center text-[8px] text-white">T</div>
            <span className="text-lg font-serif italic tracking-tight normal-case text-brand-ink">Tahfizh</span>
          </div>
          <p className="opacity-40">© 2026 Tahfizh — Dedicated to the word of Allah.</p>
          <div className="flex gap-12 opacity-40 hover:opacity-100 transition-opacity">
            <a href="#" className="hover:text-brand-emerald">Privacy</a>
            <a href="#" className="hover:text-brand-emerald">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
