import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Gift, Wine, Plane, BookOpen, Palette, UtensilsCrossed } from "lucide-react";

const gifts = [
  { icon: Wine, name: "Fine Wine Collection", desc: "A bottle from a cherished vineyard", link: "#" },
  { icon: Plane, name: "Travel Fund", desc: "Contribute to the next adventure", link: "#" },
  { icon: BookOpen, name: "First Edition Books", desc: "Rare reads for the library", link: "#" },
  { icon: Palette, name: "Art Piece", desc: "A statement piece for the home", link: "#" },
  { icon: UtensilsCrossed, name: "Dinner Experience", desc: "A tasting menu at a top restaurant", link: "#" },
  { icon: Gift, name: "Surprise Me", desc: "Your choice — we trust your taste", link: "#" },
];

export default function GiftRegistry() {
  const sectionRef = useScrollReveal<HTMLElement>(true, 100);

  return (
    <section ref={sectionRef} id="gifts" className="section-reveal py-24 sm:py-32 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14 stagger-child">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-body font-medium mb-3">Gift Ideas</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground text-balance leading-[1.1]">Registry</h2>
          <p className="mt-4 text-muted-foreground font-body max-w-md mx-auto text-pretty">
            Your presence is the greatest gift. But if you'd like to spoil me, here are some ideas.
          </p>
          <div className="w-16 h-px bg-primary/40 mx-auto mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gifts.map((g, i) => (
            <a
              key={i}
              href={g.link}
              className="stagger-child group gold-border rounded-xl bg-background/70 backdrop-blur-sm p-6 hover:gold-glow transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
            >
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <g.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-medium text-foreground mb-1">{g.name}</h3>
              <p className="text-sm text-muted-foreground font-body">{g.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
