import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import type { EventBanner } from "../api/contentService";

interface EventBannerCardProps {
  event: EventBanner;
}

export function EventBannerCard({ event }: EventBannerCardProps) {
  if (event.type === 'clearance') {
    return (
      <div className="bg-vogue-canvas rounded-vogue-card h-vogue-banner-height relative overflow-hidden flex shadow-vogue-soft border border-vogue-border-subtle group cursor-pointer">
        <div className="absolute top-0 right-1/2 w-64 h-64 bg-vogue-surface-subtle rounded-vogue-pill blur-2xl -translate-y-1/2 translate-x-1/4 z-0"></div>
        
        <div className="w-1/2 sm:w-[55%] p-6 sm:p-10 flex flex-col justify-center relative z-10">
          <div className="mb-4">
            <span className="bg-vogue-promo text-vogue-promo-ink font-bold text-[10px] tracking-wider px-3 py-1.5 rounded-vogue-pill uppercase">
              {event.tagline}
            </span>
          </div>
          <h2 className="text-[28px] sm:text-3xl font-extrabold text-vogue-text mb-3 leading-tight tracking-tight">
            {event.title.split('\n').map((line, i, arr) => (
              <Fragment key={i}>{line}{i < arr.length - 1 && <br />}</Fragment>
            ))}
          </h2>
          <p className="text-vogue-text-muted text-[13px] sm:text-sm mb-6 leading-relaxed max-w-[95%]">
            {event.description}
          </p>
          <div>
            <button className="bg-vogue-dark text-vogue-canvas px-6 py-3 rounded-vogue-pill font-semibold text-sm inline-flex items-center gap-2 hover:bg-vogue-dark-hover transition-colors">
              {event.buttonText} <ArrowRight size={16} />
            </button>
          </div>
        </div>
        
        <div className="w-1/2 sm:w-[45%] h-full relative z-10">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
        
        {event.badgePrimaryText && (
          <div className="absolute bottom-8 right-[40%] sm:right-[38%] bg-vogue-accent-soft text-vogue-dark py-3 px-4 rounded-vogue-card rotate-[-6deg] shadow-vogue-popover flex flex-col items-center justify-center z-20 min-w-[90px] border border-vogue-canvas/50 backdrop-blur-sm">
            {event.badgeSecondaryText && <span className="text-[9px] font-bold tracking-widest uppercase text-vogue-text-muted">{event.badgeSecondaryText}</span>}
            <span className="text-3xl font-black leading-none my-0.5">{event.badgePrimaryText}</span>
            {event.badgeTertiaryText && <span className="text-[9px] font-bold tracking-widest uppercase text-vogue-text-muted">{event.badgeTertiaryText}</span>}
          </div>
        )}
      </div>
    );
  }

  if (event.type === 'collection') {
    return (
      <div className="bg-vogue-surface-muted rounded-vogue-card h-vogue-banner-height relative overflow-hidden flex group cursor-pointer">
        <div className="w-1/2 sm:w-[55%] p-6 sm:p-10 flex flex-col justify-center relative z-10">
          <div className="mb-4 flex flex-col items-start">
            <span className="text-vogue-text font-bold tracking-wider text-[11px] uppercase mb-1.5">
              {event.tagline}
            </span>
            <div className="w-8 h-[2px] bg-vogue-accent"></div>
          </div>
          <h2 className="text-[28px] sm:text-3xl font-extrabold text-vogue-text mb-3 leading-tight tracking-tight">
            {event.title.split('\n').map((line, i, arr) => (
              <Fragment key={i}>{line}{i < arr.length - 1 && <br />}</Fragment>
            ))}
          </h2>
          <p className="text-vogue-text-muted text-[13px] sm:text-sm mb-6 leading-relaxed max-w-[95%]">
            {event.description}
          </p>
          <div>
            <button className="bg-vogue-accent text-vogue-canvas px-6 py-3 rounded-vogue-pill font-semibold text-sm inline-flex items-center gap-2 hover:bg-vogue-accent-dark transition-colors shadow-vogue-soft">
              {event.buttonText} <ArrowRight size={16} />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 opacity-20 w-12 h-12 bg-vogue-accent rounded-tl-full rounded-br-full -rotate-12 pointer-events-none"></div>
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
    <div className="bg-vogue-canvas rounded-vogue-card h-vogue-banner-height relative overflow-hidden flex shadow-vogue-soft border border-vogue-border-subtle animate-pulse">
      <div className="w-1/2 sm:w-[55%] p-6 sm:p-10 flex flex-col justify-center">
        <div className="h-4 bg-vogue-surface-skeleton rounded w-20 mb-4"></div>
        <div className="h-8 bg-vogue-surface-skeleton rounded w-3/4 mb-3"></div>
        <div className="h-8 bg-vogue-surface-skeleton rounded w-1/2 mb-6"></div>
        <div className="h-4 bg-vogue-surface-skeleton rounded w-full mb-2"></div>
        <div className="h-4 bg-vogue-surface-skeleton rounded w-5/6 mb-6"></div>
        <div className="h-10 bg-vogue-surface-skeleton rounded-vogue-pill w-32"></div>
      </div>
      <div className="w-1/2 sm:w-[45%] h-full bg-vogue-surface-skeleton"></div>
    </div>
  );
}
