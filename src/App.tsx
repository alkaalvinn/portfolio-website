import './index.css'
import Scene from './components/scene';
import Navbar from './components/navbar';
import About from './components/about';
import Projects from './components/projects';
import Experience from './components/experience';
import Footer from './components/footer';
import Skills from './components/skill';
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
