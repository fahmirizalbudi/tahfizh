import React from 'react';

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
        <a href="#" className="nav-item">Pricing</a>
      </div>
      <div className="flex items-center gap-8">
        <button className="text-[15px] font-medium text-brand-muted hover:text-brand-text">Log in</button>
        <button className="btn-modern">Join Community</button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <header className="py-20 md:py-32">
    <div className="layout-container">
      <div className="max-w-2xl">
        <h1 className="mb-8">
          The most refined way to <br />
          read and memorize Quran.
        </h1>
        <p className="text-[17px] text-brand-muted mb-12 leading-relaxed font-normal">
          A minimalist platform designed for spiritual consistency. 
          No distractions, just the word of Allah in high-fidelity.
        </p>
        <div className="flex items-center gap-4">
          <button className="btn-modern px-10">Start Reciting</button>
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-brand-surface flex items-center justify-center text-[10px] font-bold">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <span className="pl-4 text-[13px] font-medium text-brand-muted flex items-center">
              +2k active readers
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>
);

const SURAHS = [
  { id: '01', name: 'Al-Fatihah', translation: 'The Opening', arabic: 'الفاتحة', count: '7 Verses' },
  { id: '02', name: 'Al-Baqarah', translation: 'The Cow', arabic: 'البقرة', count: '286 Verses' },
  { id: '03', name: 'Ali \'Imran', translation: 'Family of Imran', arabic: 'آل عمران', count: '200 Verses' },
  { id: '04', name: 'An-Nisa', translation: 'The Women', arabic: 'النساء', count: '176 Verses' },
  { id: '05', name: 'Al-Ma\'idah', translation: 'The Table Spread', arabic: 'المائدة', count: '120 Verses' },
];

function App() {
  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white">
      <Navbar />
      
      <main>
        <Hero />

        <section className="pb-40">
          <div className="layout-container">
            <div className="mb-12">
              <h2 className="text-brand-text">Recommended</h2>
              <div className="h-1 w-8 bg-brand-accent mt-2"></div>
            </div>
            
            <div className="flex flex-col">
              {SURAHS.map((surah) => (
                <div key={surah.id} className="surah-flat-row group">
                  <div className="flex items-baseline gap-12">
                    <span className="text-[13px] font-semibold text-brand-muted tabular-nums">
                      {surah.id}
                    </span>
                    <div>
                      <h3 className="text-[18px] font-semibold mb-1 group-hover:text-brand-primary transition-colors">
                        {surah.name}
                      </h3>
                      <p className="text-[14px] text-brand-muted">
                        {surah.translation} • {surah.count}
                      </p>
                    </div>
                  </div>
                  <div className="arabic-text">
                    {surah.arabic}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-24 py-16 px-10 bg-brand-surface rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-md">
                <h3 className="text-[24px] font-semibold mb-4">Join our global network.</h3>
                <p className="text-brand-muted leading-relaxed">
                  Connect with students and teachers from around the world in our modern learning environment.
                </p>
              </div>
              <button className="btn-modern px-12">Register Now</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 bg-white">
        <div className="layout-container">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div>
              <Logo />
              <p className="mt-6 text-brand-muted text-[15px] max-w-xs">
                Refining the digital Quran experience for the modern era.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
              <div className="flex flex-col gap-4">
                <span className="font-bold text-[13px] uppercase tracking-widest text-brand-accent">Product</span>
                <a href="#" className="text-brand-muted text-[15px] hover:text-brand-text transition-colors">Library</a>
                <a href="#" className="text-brand-muted text-[15px] hover:text-brand-text transition-colors">Audio</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-bold text-[13px] uppercase tracking-widest text-brand-accent">Resources</span>
                <a href="#" className="text-brand-muted text-[15px] hover:text-brand-text transition-colors">Community</a>
                <a href="#" className="text-brand-muted text-[15px] hover:text-brand-text transition-colors">Guides</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-bold text-[13px] uppercase tracking-widest text-brand-accent">Social</span>
                <a href="#" className="text-brand-muted text-[15px] hover:text-brand-text transition-colors">Twitter</a>
                <a href="#" className="text-brand-muted text-[15px] hover:text-brand-text transition-colors">Instagram</a>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center text-[13px] text-brand-muted font-medium">
            <p>© 2026 Tahfizh Collective. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
