import Header from "./components/layout/Header";
import { useSectionScroll } from "./hooks/useSectionScroll";
import About from "./sections/About/About";
import Contact from "./sections/Contact/Contact";
import Hero from "./sections/Hero/Hero";
import Solutions from "./sections/Solutions/Solutions";

export default function App() {
  useSectionScroll();

  return (
    <>
      <a href="#conteudo" className="VOID-skip-link">
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo" className="VOID-main">
        <Hero />
        <Solutions />
        <About />
        <Contact />
      </main>
    </>
  );
}
