import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import type { EventBanner } from "../api/contentService";

interface EventBannerCardProps {
  event: EventBanner;
}

export function EventBannerCard({ event }: EventBannerCardProps) {
  if (event.type === 'clearance') {
    return (
      <div className="bg-white rounded-2xl h-[350px] relative overflow-hidden flex shadow-sm border border-gray-100 group cursor-pointer">
        <div className="absolute top-0 right-1/2 w-64 h-64 bg-gray-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 z-0"></div>
        
        <div className="w-1/2 sm:w-[55%] p-6 sm:p-10 flex flex-col justify-center relative z-10">
          <div className="mb-4">
            <span className="bg-[#ffe4e6] text-[#e11d48] font-bold text-[10px] tracking-wider px-3 py-1.5 rounded-full uppercase">
              {event.tagline}
            </span>
          </div>
          <h2 className="text-[28px] sm:text-3xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">
            {event.title.split('\n').map((line, i, arr) => (
              <Fragment key={i}>{line}{i < arr.length - 1 && <br />}</Fragment>
            ))}
          </h2>
          <p className="text-gray-500 text-[13px] sm:text-sm mb-6 leading-relaxed max-w-[95%]">
            {event.description}
          </p>
          <div>
            <button className="bg-[#111111] text-white px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 hover:bg-gray-800 transition-colors">
              {event.buttonText} <ArrowRight size={16} />
            </button>
          </div>
        </div>
        
        <div className="w-1/2 sm:w-[45%] h-full relative z-10">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
        
        {event.badgePrimaryText && (
          <div className="absolute bottom-8 right-[40%] sm:right-[38%] bg-[#f4ece3] text-[#111] py-3 px-4 rounded-2xl rotate-[-6deg] shadow-xl flex flex-col items-center justify-center z-20 min-w-[90px] border border-white/50 backdrop-blur-sm">
            {event.badgeSecondaryText && <span className="text-[9px] font-bold tracking-widest uppercase text-gray-600">{event.badgeSecondaryText}</span>}
            <span className="text-3xl font-black leading-none my-0.5">{event.badgePrimaryText}</span>
            {event.badgeTertiaryText && <span className="text-[9px] font-bold tracking-widest uppercase text-gray-600">{event.badgeTertiaryText}</span>}
          </div>
        )}
      </div>
    );
  }

  if (event.type === 'collection') {
    return (
      <div className="bg-[#f6f2eb] rounded-2xl h-[350px] relative overflow-hidden flex group cursor-pointer">
        <div className="w-1/2 sm:w-[55%] p-6 sm:p-10 flex flex-col justify-center relative z-10">
          <div className="mb-4 flex flex-col items-start">
            <span className="text-gray-800 font-bold tracking-wider text-[11px] uppercase mb-1.5">
              {event.tagline}
            </span>
            <div className="w-8 h-[2px] bg-[#a46e45]"></div>
          </div>
          <h2 className="text-[28px] sm:text-3xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">
            {event.title.split('\n').map((line, i, arr) => (
              <Fragment key={i}>{line}{i < arr.length - 1 && <br />}</Fragment>
            ))}
          </h2>
          <p className="text-gray-500 text-[13px] sm:text-sm mb-6 leading-relaxed max-w-[95%]">
            {event.description}
          </p>
          <div>
            <button className="bg-[#a46e45] text-white px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 hover:bg-[#8d5b35] transition-colors shadow-sm">
              {event.buttonText} <ArrowRight size={16} />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 opacity-20 w-12 h-12 bg-[#a46e45] rounded-tl-full rounded-br-full -rotate-12 pointer-events-none"></div>
        </div>
        
        <div className="w-1/2 sm:w-[45%] h-full relative z-10">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
      </div>
    );
  }

  return null;
}

export function EventBannerSkeleton() {
  return (
    <div className="bg-white rounded-2xl h-[350px] relative overflow-hidden flex shadow-sm border border-gray-100 animate-pulse">
      <div className="w-1/2 sm:w-[55%] p-6 sm:p-10 flex flex-col justify-center">
        <div className="h-4 bg-gray-200 rounded w-20 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
        <div className="h-10 bg-gray-200 rounded-full w-32"></div>
      </div>
      <div className="w-1/2 sm:w-[45%] h-full bg-gray-200"></div>
    </div>
  );
}
