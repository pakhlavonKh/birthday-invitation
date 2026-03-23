import { useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(100);
  const SLIDE_DURATION = 5000; // 5 seconds

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let slideInterval: NodeJS.Timeout;

    // Update progress bar
    // eslint-disable-next-line prefer-const
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) return 100;
        return prev - (100 / (SLIDE_DURATION / 50));
      });
    }, 50);

    // Auto advance slides
    // eslint-disable-next-line prefer-const
    slideInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
      setProgress(100);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    setProgress(100);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setProgress(100);
  };

  // Get indices for carousel display
  const getPhotoIndex = (offset: number) => {
    return (currentIndex + offset + photos.length) % photos.length;
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="gallery"
        className="section-reveal py-24 sm:py-32 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 stagger-child">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-body font-medium mb-3">
              Memories
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-foreground text-balance leading-[1.1]">
              Gallery
            </h2>
            <div className="w-16 h-px bg-primary/40 mx-auto mt-6" />
          </div>

          {/* Carousel Container */}
          <div className="relative h-96 flex items-center justify-center">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute -left-6 sm:left-0 z-30 w-12 h-12 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center transition-all duration-300 text-primary"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute -right-6 sm:right-0 z-30 w-12 h-12 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center transition-all duration-300 text-primary"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Photos Container */}
            <div className="relative w-full h-full flex items-center justify-center perspective-[1200px]">
              {photos.map((photo, index) => {
                // Calculate the difference between this photo's index and the current index
                let offset = index - currentIndex;
                
                // Normalize to shortest path (wrap around)
                if (offset > photos.length / 2) {
                  offset -= photos.length;
                } else if (offset < -photos.length / 2) {
                  offset += photos.length;
                }

                const abs = Math.abs(offset);

                return (
                  <div
                    key={index}
                    className="absolute transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      transform: `
            translateX(${offset * 180}px)
            scale(${1 - abs * 0.15})
            rotateY(${offset * -25}deg)
          `,
                      opacity: abs > 2 ? 0 : 1 - abs * 0.3,
                      zIndex: 100 - abs,
                    }}
                  >
                    <button
                      onClick={() => {
                        setCurrentIndex(index);
                      }}
                      className="group relative w-72 h-96 sm:w-96 sm:h-[28rem] rounded-2xl overflow-hidden shadow-2xl"
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Photo Counter */}
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground font-body mb-4">
              {currentIndex + 1} / {photos.length}
            </p>
          </div>
        </div>
      </section>
    </>
  );}
