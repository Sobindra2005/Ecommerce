import { useState, Fragment } from "react";
import { ArrowRight, ArrowLeft, Leaf, Truck, RefreshCw } from "lucide-react";
import type { HeroSlide } from "../api/contentService";

interface HeroSectionProps {
  slides: HeroSlide[];
}

export function HeroSection({ slides }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide] || null;

  return (
    <section className="relative w-full min-h-[90vh] bg-slate-900 overflow-hidden flex items-center">
      {slide && (
        <>
          {/* Right Side Image (Model) */}
          <div className="absolute top-0 right-0 w-full md:w-[60%] h-full z-0 opacity-40 md:opacity-100">
            <img
              key={slide._id}
              src={slide.image}
              alt={slide.title.replace('\n', ' ')}
              className="w-full h-full object-cover object-center animate-[fadeIn_0.5s_ease-in-out]"
            />
            {/* Gradient overlay to blend the left edge smoothly into the background color */}
            <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-transparent w-full md:w-1/2"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex w-full z-10 py-12 md:py-12">
            <div className="w-full md:w-[55%] flex flex-col justify-center">
              {/* TAGLINE */}
              <div className="flex items-center gap-4 mb-6">
                <span className="uppercase tracking-[0.2em] text-[10px] sm:text-[11px] font-bold text-gray-300">{slide.tagline}</span>
                <div className="w-8 sm:w-12 h-[1px] bg-gray-600"></div>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold text-white leading-[1.05] mb-6 tracking-tight">
                {slide.title.split('\n').map((line, i, arr) => (
                  <Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </Fragment>
                ))}
              </h1>

              <p className="text-gray-300 text-base sm:text-lg mb-10 max-w-[420px] leading-relaxed">
                {slide.description}
              </p>

              <button className="bg-white text-black px-8 py-3.5 sm:py-4 rounded-full font-semibold text-sm w-fit flex items-center gap-3 hover:bg-gray-200 transition-colors mb-12 sm:mb-16 shadow-lg shadow-black/10">
                Shop Now <ArrowRight size={16} />
              </button>

              {/* Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-[500px] mb-12">
            {/* Feature 1 */}
                <div className="flex gap-3 items-start">
                  <Leaf size={18} className="text-gray-300 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-white mb-0.5">Premium Quality</span>
                    <span className="text-[11px] text-gray-400 leading-tight">Crafted to last</span>
                  </div>
                </div>
            {/* Feature 2 */}
                <div className="flex gap-3 items-start">
                  <Truck size={18} className="text-gray-300 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-white mb-0.5">Free Shipping</span>
                    <span className="text-[11px] text-gray-400 leading-tight">On orders over $100</span>
                  </div>
                </div>
            {/* Feature 3 */}
                <div className="flex gap-3 items-start">
                  <RefreshCw size={18} className="text-gray-300 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-white mb-0.5">Easy Returns</span>
                    <span className="text-[11px] text-gray-400 leading-tight">Hassle free</span>
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center gap-4 mt-auto">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer z-20"
                >
                  <ArrowLeft size={16} />
                </button>
                <span className="text-[11px] font-bold text-gray-500 tracking-[0.15em] w-12 text-center">
                  {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </span>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer z-20"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Handwritten Text on Right */}
            <div className="hidden lg:flex absolute right-16 xl:right-32 top-1/2 -translate-y-1/2 z-10 flex-col items-center">
              <div className="font-serif italic text-2xl xl:text-3xl text-white mix-blend-overlay -rotate-12 opacity-90 text-right leading-tight drop-shadow-md">
                {slide.handwritten.split('\n').map((line, i, arr) => (
                  <Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </Fragment>
                ))}
              </div>
              <svg className="w-16 h-3 mt-3 -rotate-12 text-white opacity-70 mix-blend-overlay drop-shadow-md" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 0 100 5" stroke="currentColor" fill="transparent" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export function HeroSkeleton() {
  return (
    <section className="relative w-full min-h-[90vh] bg-slate-900 overflow-hidden flex items-center animate-pulse">
      <div className="absolute top-0 right-0 w-full md:w-[60%] h-full z-0 bg-slate-800"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex w-full z-10 py-12 md:py-12">
        <div className="w-full md:w-[55%] flex flex-col justify-center">
          <div className="h-3 bg-slate-800 rounded w-24 mb-6"></div>
          
          <div className="h-16 md:h-20 bg-slate-800 rounded w-[80%] mb-4"></div>
          <div className="h-16 md:h-20 bg-slate-800 rounded w-[60%] mb-6"></div>

          <div className="h-5 bg-slate-800 rounded w-[70%] mb-2"></div>
          <div className="h-5 bg-slate-800 rounded w-[50%] mb-10"></div>

          <div className="h-14 bg-slate-800 rounded-full w-40 mb-16"></div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-[500px] mb-12">
            <div className="h-10 bg-slate-800 rounded w-full"></div>
            <div className="h-10 bg-slate-800 rounded w-full"></div>
            <div className="h-10 bg-slate-800 rounded w-full"></div>
          </div>

          <div className="flex items-center gap-4 mt-auto">
            <div className="w-10 h-10 rounded-full bg-slate-800"></div>
            <div className="h-4 bg-slate-800 rounded w-12"></div>
            <div className="w-10 h-10 rounded-full bg-slate-800"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
