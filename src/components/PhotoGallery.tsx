import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { X } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const photos = [
  { src: gallery1, alt: "Dinner with friends" },
  { src: gallery2, alt: "Champagne toast" },
  { src: gallery3, alt: "The cake" },
  { src: gallery4, alt: "Floral arrangement" },
  { src: gallery5, alt: "Rooftop sunset" },
  { src: gallery6, alt: "Cocktail hour" },
];

export default function PhotoGallery() {
  const sectionRef = useScrollReveal<HTMLElement>(true, 90);
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <section ref={sectionRef} id="gallery" className="section-reveal py-24 sm:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 stagger-child">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-body font-medium mb-3">Memories</p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground text-balance leading-[1.1]">Gallery</h2>
            <div className="w-16 h-px bg-primary/40 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="stagger-child group relative aspect-square overflow-hidden rounded-xl gold-border active:scale-[0.97] transition-transform"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-background/20 flex items-center justify-center hover:bg-background/30 transition-colors"
          >
            <X className="w-5 h-5 text-primary-foreground" />
          </button>
          <img
            src={photos[lightbox].src}
            alt={photos[lightbox].alt}
            className="max-w-full max-h-[85vh] rounded-xl object-contain animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
