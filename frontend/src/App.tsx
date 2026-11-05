import { useVoidAnimations } from "./animations/useVoidAnimations";
import Header from "./components/layout/Header";
import { useSectionScroll } from "./hooks/useSectionScroll";
import Contact from "./sections/Contact/Contact";
import Hero from "./sections/Hero/Hero";
import Plans from "./sections/Plans/Plans";
import Solutions from "./sections/Solutions/Solutions";

export default function App() {
  useSectionScroll();
  useVoidAnimations();

  return (
    <>
      <a href="#conteudo" className="VOID-skip-link">
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo" className="VOID-main">
        <Hero />
        <Solutions />
        <Plans />
        <Contact />
      </main>
    </>
  );
}
