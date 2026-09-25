import { useEffect, useRef, useState } from "react";
import { useAnimate } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import Reveal from "../ui/Reveal";
import { prompt } from "../../content";
import { whatsappUrl } from "../../lib/links";

// Placeholder que se digita sozinho, em ciclo.
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const useTypewriter = (phrases, enabled) => {
  const [text, setText] = useState(() => (prefersReducedMotion() ? phrases[0] : ""));
  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return;
    let phrase = 0;
    let char = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const current = phrases[phrase];
      char += deleting ? -1 : 1;
      setText(current.slice(0, char));
      let delay = deleting ? 22 : 45;
      if (!deleting && char === current.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && char === 0) {
        deleting = false;
        phrase = (phrase + 1) % phrases.length;
        delay = 350;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [phrases, enabled]);
  return text;
};

const PromptBox = () => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [scope, animate] = useAnimate();
  const inputRef = useRef(null);
  const typed = useTypewriter(prompt.placeholders, !focused && !value);

  const submit = (e) => {
    e.preventDefault();
    const text = value.trim();
    if (!text) {
      animate(scope.current, { x: [0, -8, 8, -5, 5, 0] }, { duration: 0.4 });
      inputRef.current?.focus();
      return;
    }
    window.open(whatsappUrl(prompt.messagePrefix + text), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container-mod">
        <Reveal as="h2" className="display text-center text-[34px] sm:text-[44px] lg:text-[52px]">
          {prompt.title}
        </Reveal>
        <Reveal delay={0.1}>
          <form
            ref={scope}
            onSubmit={submit}
            className="mx-auto mt-8 max-w-[600px] rounded-[20px] bg-white p-2 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.25)] ring-1 ring-black/5"
          >
            <label htmlFor="prompt" className="sr-only">
              Descreva o que você quer resolver no seu negócio
            </label>
            <textarea
              id="prompt"
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) submit(e);
              }}
              rows={4}
              placeholder={focused ? "Conte em poucas palavras o que você quer resolver…" : typed}
              className="block w-full resize-none rounded-[14px] bg-transparent px-4 py-3 text-[16px] outline-none placeholder:text-ink/40"
            />
            <div className="flex items-center gap-2 rounded-[14px] bg-mist p-1.5">
              <div className="no-scrollbar fade-x flex flex-1 gap-1.5 overflow-x-auto">
                {prompt.chips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => {
                      setValue(chip);
                      inputRef.current?.focus();
                    }}
                    className="shrink-0 rounded-[10px] bg-white px-3 py-1.5 text-[13px] text-ink/70 ring-1 ring-black/5 transition-colors hover:text-ink"
                  >
                    {chip}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                aria-label="Enviar pelo WhatsApp"
                className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-ink text-white transition-transform hover:scale-105"
              >
                <HiArrowRight />
              </button>
            </div>
          </form>
          <p className="mt-3 text-center text-[13px] text-muted">Sua mensagem abre direto no WhatsApp, pronta para enviar.</p>
        </Reveal>
      </div>
    </section>
  );
};

export default PromptBox;
