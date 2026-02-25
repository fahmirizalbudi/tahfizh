import React, { useRef } from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';

// Fetcher for local JSON
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
  <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
    <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4L23 14H33L25 20L28 30L20 24L12 30L15 20L7 14H17L20 4Z" fill="#1A1A1A"/>
      <path d="M34 20C34 27.732 27.732 34 20 34C12.268 34 6 27.732 6 20" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round"/>
    </svg>
    <span className="text-xl font-bold tracking-tighter uppercase text-brand-text">Tahfizh</span>
  </Link>
);

const Navbar = ({ onGetStarted }: { onGetStarted: () => void }) => (
  <nav className="py-8 bg-transparent relative z-50">
    <div className="layout-container flex justify-between items-center">
      <Logo />
      <button 
        onClick={onGetStarted}
        className="btn-modern shadow-spread px-8"
      >
        Get Started
      </button>
    </div>
  </nav>
);

const Library = ({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement | null> }) => {
  const { data: surahs, error, isLoading } = useSWR<Surah[]>('/src/assets/quran_id.json', fetcher, {
    dedupingInterval: 300000,
    revalidateOnFocus: false,
  });

  if (error) return <div className="p-20 text-center text-red-500 font-medium">Failed to load library.</div>;
  if (isLoading) return <div className="p-20 text-center animate-pulse text-brand-muted uppercase tracking-[0.2em] text-sm font-bold">Synchronizing Library...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-40 pb-40"
    >
      <header className="pt-16 pb-10">
        <div className="layout-container grid md:grid-cols-2 gap-20 items-center">
          <div>
            <motion.div 
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[11px] font-bold mb-8 uppercase tracking-widest"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-brand-primary animate-pulse"></span>
              Modern Quran Space
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Read. Reflect. <br />
              <span className="text-brand-primary">Memorize Quran.</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[17px] text-brand-muted mb-10 leading-relaxed font-normal max-w-md"
            >
              The most advanced, minimalist, and distraction-free platform designed to help you stay connected with the words of Allah every day.
            </motion.p>
            
            <motion.div 
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-6"
            >
              {[
                { label: 'Active Readers', val: '12k+' },
                { label: 'Audio Quality', val: '4K Hi-Fi' },
                { label: 'Avg Mastery', val: '87%' }
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-xl font-bold tracking-tighter">{s.val}</p>
                  <p className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div 
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            <div className="card-shadow p-10 bg-white relative z-10">
              <div className="flex justify-between items-center mb-8">
                <span className="text-[11px] font-bold text-brand-muted uppercase tracking-[0.2em]">Daily Ayah</span>
                <span className="text-[10px] font-bold text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-full uppercase">Featured</span>
              </div>
              <p className="font-arabic text-2xl leading-[2] text-right mb-8">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</p>
              <p className="text-[14px] text-brand-muted leading-relaxed font-medium">With the Name of Allah, the Most Gracious, the Most Merciful.</p>
              <div className="mt-10 h-1 w-full bg-brand-surface rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-brand-primary rounded-full shadow-sm"></div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-56 h-56 bg-brand-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-brand-yellow/10 rounded-full blur-2xl"></div>
          </motion.div>
        </div>
      </header>

      <section ref={scrollRef} className="pb-32 pt-16">
        <div className="layout-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-[28px] tracking-tighter mb-1">Explore Library</h2>
              <p className="text-brand-muted font-medium text-[14px]">Find and read any chapter from the Quran in Indonesian.</p>
            </div>
            <div className="flex gap-3">
              <span className="tag px-4 py-2 bg-brand-surface rounded-xl text-[11px] font-bold text-brand-muted shadow-sm uppercase tracking-widest">All Surahs</span>
              <span className="tag px-4 py-2 text-[11px] font-bold text-brand-muted opacity-40 uppercase tracking-widest hover:opacity-100 cursor-pointer">Collections</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-3">
            {surahs?.map((surah, idx) => (
              <motion.div
                key={surah.id}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 + idx * 0.03 }}
              >
                <Link 
                  to={`/surah/${surah.id}`}
                  className="surah-item-row group"
                >
                  <div className="flex items-center gap-8">
                    <span className="w-10 h-10 flex items-center justify-center bg-brand-surface rounded-lg text-[13px] font-bold text-brand-muted group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors">
                      {String(surah.id).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-[17px] font-semibold mb-0.5 group-hover:text-brand-primary transition-colors">
                        {surah.transliteration}
                      </h3>
                      <p className="text-[13px] text-brand-muted font-medium">
                        {surah.translation} • {surah.total_verses} Verses
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <span className="text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em] hidden lg:block opacity-30 group-hover:opacity-100 transition-opacity">
                      {surah.type}
                    </span>
                    <div className="arabic-text opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all origin-right">
                      {surah.name}
                    </div>
                  </div>
                </Link>
              </motion.div>
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
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 120 }}
      className="bg-white min-h-screen z-[100] relative"
    >
      <div className="layout-container py-16 max-w-4xl">
        <button 
          onClick={() => navigate('/')}
          className="mb-12 text-[13px] font-bold text-brand-muted hover:text-brand-text flex items-center gap-3 group px-5 py-2.5 bg-brand-surface rounded-xl shadow-soft hover:shadow-spread transition-all"
        >
          <span className="group-hover:-translate-x-1 transition-transform text-lg">←</span> Back
        </button>
        
        <div className="text-center mb-24 relative">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-arabic opacity-[0.02] select-none pointer-events-none"
          >
            {surah.name}
          </motion.div>
          {/* Refined Proportionate Sizes for Surah Name */}
          <h1 className="text-[52px] mb-4 tracking-tighter text-brand-text">{surah.transliteration}</h1>
          <div className="flex items-center justify-center gap-5 text-[10px] font-bold text-brand-muted uppercase tracking-[0.3em] mb-10">
            <span className="bg-brand-surface px-3 py-1.5 rounded-lg">{surah.translation}</span>
            <span className="bg-brand-surface px-3 py-1.5 rounded-lg">{surah.total_verses} Verses</span>
            <span className="bg-brand-surface px-3 py-1.5 rounded-lg">{surah.type}</span>
          </div>
          <div className="text-8xl font-arabic text-brand-text mb-8 leading-none">{surah.name}</div>
        </div>

        <div className="space-y-24 relative z-10">
          {surah.verses.map((verse) => (
            <motion.div 
              key={verse.id} 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 15 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group"
            >
              <div className="flex flex-col items-end gap-10">
                <div className="flex items-start gap-8 w-full justify-end">
                  <span className="text-[16px] font-bold text-brand-text bg-white shadow-spread w-14 h-14 flex items-center justify-center rounded-[20px] order-last transition-all group-hover:scale-105 group-hover:bg-brand-primary group-hover:text-white">
                    {verse.id}
                  </span>
                  <div className="arabic-text text-[42px] leading-[2.2] text-right flex-1 pt-1">
                    {verse.text}
                  </div>
                </div>
                <div className="w-full pl-0 md:pl-20 pr-22">
                  <p className="text-[17px] text-brand-text leading-relaxed font-normal opacity-60 group-hover:opacity-100 transition-opacity">
                    {verse.translation}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-40 mb-20">
          <div className="card-shadow p-16 bg-brand-accent text-white text-center rounded-[32px]">
            <h3 className="text-2xl font-bold mb-4">Complete your session.</h3>
            <p className="text-white/60 mb-8 max-w-sm mx-auto text-sm">The best among you is the one who learns the Quran and teaches it.</p>
            <button 
              onClick={() => navigate('/')}
              className="px-10 py-3 bg-white text-brand-accent font-bold rounded-xl shadow-spread hover:scale-105 active:scale-95 transition-all text-[14px]"
            >
              Finish Reading
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const onGetStarted = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] -left-[5%] w-[40vw] h-[40vw] bg-brand-primary/2 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] -right-[10%] w-[50vw] h-[50vw] bg-brand-yellow/2 rounded-full blur-[150px]"></div>
      </div>

      <Navbar onGetStarted={onGetStarted} />
      
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Library scrollRef={scrollRef} />} />
            <Route path="/surah/:id" element={<SurahDetail />} />
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="py-20 border-t border-brand-border/5 bg-white relative z-10">
        <div className="layout-container flex flex-col md:flex-row justify-between items-center gap-10 text-[12px] font-bold uppercase tracking-widest text-brand-muted">
          <div className="flex items-center gap-2 grayscale opacity-30">
            <div className="w-8 h-8 bg-brand-text rounded-lg"></div>
            <span className="text-lg font-bold tracking-tighter">Tahfizh</span>
          </div>
          <p>© 2026 Tahfizh Collective. All rights reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-brand-text transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-text transition-colors">Open Source</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
