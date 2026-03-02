import { Suspense } from 'react';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import GameHUD from './components/GameHUD';
import ScanlineOverlay from './components/ScanlineOverlay';
import AchievementSystem from './components/AchievementSystem';
import GlobalCanvas from './scenes/GlobalCanvas';
import EasterEggs from './components/EasterEggs';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Preloader />
      <GameHUD />
      <ScanlineOverlay />
      <AchievementSystem />
      <EasterEggs />
      
      {/* 3D Global Background Canvas */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        <Suspense fallback={null}>
          <GlobalCanvas />
        </Suspense>
      </div>

      {/* Main Content Wrapper */}
      <main className="relative z-10 w-full flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </SmoothScroll>
  );
}

export default App;
