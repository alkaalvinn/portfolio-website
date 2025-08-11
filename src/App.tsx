import './index.css'
import Scene from './components/Scene';
import Navbar from './components/navbar';
import About from './components/about';
import Projects from './components/Projects';
import Experience from './components/experience';
import Footer from './components/Footer';
import Skills from './components/Skill';
import Achievement from './components/achievement';
import Contact from './components/contact';
import { ActiveSectionContextProvider } from './context/active-section-context';

function App() {
  return (
    <ActiveSectionContextProvider>
      <Scene />
      <Navbar />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Achievement />
      <Contact />
      <Footer />
    </ActiveSectionContextProvider>
  );
}

export default App;
