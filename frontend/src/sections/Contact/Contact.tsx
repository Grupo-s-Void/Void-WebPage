import { mailto } from "../../config/site";
import { ArrowRight } from "../../components/ui/Icons";
import Footer from "../../components/layout/Footer";
import "./Contact.css";

export default function Contact() {
  return (
    <section
      id="contato"
      className="VOID-section VOID-contact"
      aria-labelledby="void-contact-title"
    >
      <div className="VOID-contact__veil" aria-hidden="true" />

      <div className="VOID-container VOID-contact__grid">
        <div className="VOID-contact__intro VOID-anim VOID-anim--left VOID-gpu">
          <span className="VOID-label">
            Próximos passos
          </span>

          <h2
            id="void-contact-title"
            className="VOID-title"
          >
            Vamos construir
            <br />
            o futuro juntos.
          </h2>
        </div>

        <div
          className="VOID-contact__side VOID-anim VOID-anim--right VOID-gpu"
        >
          <p className="VOID-lead">
            Seja um dos primeiros a acompanhar nossas soluções
            e descubra como a inteligência artificial pode
            gerar resultados reais para o seu negócio.
          </p>

          <a
            href={mailto("Quero conhecer a VOID")}
            className="VOID-btn VOID-btn--light"
          >
            Fale com um especialista
            <ArrowRight />
          </a>
        </div>
      </div>

      <Footer />
    </section>
  );
}