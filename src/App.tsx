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
  <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4L23 14H33L25 20L28 30L20 24L12 30L15 20L7 14H17L20 4Z" fill="#009667"/>
      <path d="M34 20C34 27.732 27.732 34 20 34C12.268 34 6 27.732 6 20" stroke="#009667" strokeWidth="3" strokeLinecap="round"/>
    </svg>
    <span className="text-2xl font-bold tracking-tighter uppercase text-brand-text">Tahfizh</span>
  </Link>
);

const Navbar = ({ onGetStarted }: { onGetStarted?: () => void }) => (
  <nav className="py-6 bg-brand-surface z-[60]">
    <div className="layout-container flex justify-between items-center">
      <Logo />
      {onGetStarted && (
        <button 
          onClick={onGetStarted}
          className="btn-modern px-10"
        >
          Get Started
        </button>
      )}
    </div>
  </nav>
);

const Library = ({ scrollRef }: { scrollRef: React.RefObject<HTMLDivElement | null> }) => {
  const { data: surahs, error, isLoading } = useSWR<Surah[]>('/src/assets/quran_id.json', fetcher, {
    dedupingInterval: 300000,
    revalidateOnFocus: false,
  });

  if (error) return <div className="p-20 text-center text-red-500 font-medium font-sans">Failed to load library.</div>;
  if (isLoading) return <div className="p-20 text-center animate-pulse text-brand-muted uppercase tracking-[0.2em] text-sm font-bold font-sans">Synchronizing...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-32 pb-40"
    >
      <header className="pt-24 pb-20 relative overflow-hidden">
        <div className="layout-container grid md:grid-cols-2 gap-24 items-center relative z-10">
          <div>
            <motion.div 
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-[12px] font-bold mb-8 uppercase tracking-widest"
            >
              <span className="flex h-2 w-2 rounded-full bg-brand-primary animate-pulse"></span>
              Modern Quran Space
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-[60px]"
            >
              Elevate your <br />
              <span className="text-brand-primary underline decoration-brand-primary/20">Spiritual Focus.</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[19px] text-brand-muted mb-12 leading-relaxed font-normal max-w-lg"
            >
              Experience the Quran with high-fidelity Indonesian translation in a space designed for mastery and reflection.
            </motion.p>
            
            <div className="grid grid-cols-3 gap-10">
              {[
                { label: 'Chapters', val: '114' },
                { label: 'Language', val: 'ID/AR' },
                { label: 'Uptime', val: '99.9%' }
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-3xl font-bold tracking-tighter">{s.val}</p>
                  <p className="text-[11px] font-bold text-brand-muted uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="card-surface p-12 relative z-10 overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-bl-full"></div>
             <div className="flex justify-between items-center mb-10">
                <span className="text-[12px] font-bold text-brand-muted uppercase tracking-[0.2em]">Featured Verse</span>
                <span className="text-[11px] font-bold text-white bg-brand-accent px-3 py-1 rounded-full uppercase">Al-Fatihah</span>
              </div>
              <p className="font-arabic text-4xl leading-[2.2] text-right mb-10">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</p>
              <p className="text-[16px] text-brand-muted leading-relaxed font-medium">Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.</p>
          </motion.div>
        </div>
      </header>

      <section ref={scrollRef} className="pb-32">
        <div className="layout-container">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-[36px] tracking-tighter mb-2">The Library</h2>
              <p className="text-brand-muted font-medium text-[16px]">Select a surah to begin your recitation journey.</p>
            </div>
            <div className="h-[1px] flex-1 bg-brand-accent/5 mx-12 hidden md:block"></div>
            <span className="text-[12px] font-bold text-brand-primary bg-brand-primary/5 px-6 py-2 rounded-full uppercase tracking-widest shadow-smooth">114 Chapters</span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-4">
            {surahs?.map((surah, idx) => (
              <motion.div
                key={surah.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx % 10 * 0.05 }}
              >
                <Link 
                  to={`/surah/${surah.id}`}
                  className="surah-card-item group"
                >
                  <div className="flex items-center gap-10">
                    <span className="w-12 h-12 flex items-center justify-center bg-brand-bg rounded-xl text-[14px] font-bold text-brand-muted group-hover:bg-brand-primary group-hover:text-white transition-all">
                      {String(surah.id).padStart(2, '0')}
                    </span>
                    <div className="text-left">
                      <h3 className="text-[20px] font-semibold mb-1 group-hover:text-brand-primary transition-colors">
                        {surah.transliteration}
                      </h3>
                      <p className="text-[15px] text-brand-muted font-medium">
                        {surah.translation} • {surah.total_verses} Verses
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-12">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">
                        Origin
                      </span>
                      <span className="text-[11px] font-bold uppercase text-brand-text">{surah.type}</span>
                    </div>
                    <div className="arabic-text text-3xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all origin-right">
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-brand-bg min-h-screen"
    >
      <Navbar />
      <ScrollToTop />
      
      <main className="layout-container py-24 max-w-5xl">
        <button 
          onClick={() => navigate('/')}
          className="mb-12 text-[14px] font-bold text-brand-muted hover:text-brand-text flex items-center gap-2 group px-6 py-3 bg-brand-surface rounded-xl shadow-smooth hover:shadow-elevated transition-all"
        >
          <svg 
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className="group-hover:-translate-x-1 transition-transform"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Library
        </button>
        
        <div className="mb-40 text-center">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-brand-surface border border-brand-accent/5 mb-10 shadow-smooth"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-brand-muted">{surah.type}</span>
            <span className="w-1 h-1 rounded-full bg-brand-primary"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-muted">{surah.total_verses} Verses</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[72px] mb-4 tracking-tighter"
          >
            {surah.transliteration}
          </motion.h1>
          
          <motion.p 
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[20px] text-brand-muted uppercase tracking-[0.5em] font-bold mb-16"
          >
            {surah.translation}
          </motion.p>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[120px] font-arabic text-brand-primary leading-none"
          >
            {surah.name}
          </motion.div>
        </div>

        <div className="space-y-16">
          {surah.verses.map((verse) => (
            <motion.div 
              key={verse.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="card-surface p-12 md:p-16 border border-brand-accent/5"
            >
              <div className="flex flex-col items-end gap-12">
                <div className="flex items-start gap-12 w-full justify-end">
                  <span className="text-[18px] font-bold text-brand-text bg-brand-bg w-16 h-16 flex items-center justify-center rounded-2xl order-last transition-all">
                    {verse.id}
                  </span>
                  <div className="arabic-text text-[48px] leading-[2.5] text-right flex-1 pt-2">
                    {verse.text}
                  </div>
                </div>
                <div className="w-full text-left md:pl-28 max-w-3xl mr-auto">
                  <p className="text-[21px] text-brand-text leading-relaxed font-normal opacity-80">
                    {verse.translation}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-60">
          <div className="card-surface p-20 bg-brand-accent text-white text-center rounded-[40px] overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>
            <h3 className="text-4xl font-bold mb-6">Maha benar Allah <br /> dengan segala firman-Nya.</h3>
            <p className="text-white/60 mb-12 max-w-sm mx-auto text-[18px] font-medium italic">"The best among you is the one who learns the Quran and teaches it."</p>
            <button 
              onClick={() => navigate('/')}
              className="px-12 py-5 bg-white text-brand-accent font-bold rounded-xl hover:scale-105 active:scale-95 transition-all text-[16px]"
            >
              Back to Library
            </button>
          </div>
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
    <div className="min-h-screen flex flex-col relative bg-brand-bg">
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

      <footer className="py-24 border-t border-brand-accent/5 bg-brand-surface relative z-10">
        <div className="layout-container flex flex-col md:flex-row justify-between items-center gap-12 text-[14px] font-bold uppercase tracking-widest text-brand-muted">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4L23 14H33L25 20L28 30L20 24L12 30L15 20L7 14H17L20 4Z" fill="#009667" opacity="0.4"/>
            </svg>
            <span className="text-2xl font-bold tracking-tighter opacity-40">Tahfizh</span>
          </div>
          <p className="opacity-40">© 2026 Tahfizh Collective. Digital Quran Space.</p>
          <div className="flex gap-12 opacity-40 hover:opacity-100 transition-opacity">
            <a href="#" className="hover:text-brand-primary">Privacy</a>
            <a href="#" className="hover:text-brand-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
