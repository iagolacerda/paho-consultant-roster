import React, { useEffect, useRef, useState } from 'react';
import { Wrap, Track, Item, NavButton } from './styles';

interface CarouselProps {
  children: React.ReactNode;
  ariaLabel?: string;
  prevLabel: string;
  nextLabel: string;
}

export function Carousel({ children, ariaLabel, prevLabel, nextLabel }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const updateEdges = () => {
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };

    updateEdges();
    el.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);
    return () => {
      el.removeEventListener('scroll', updateEdges);
      window.removeEventListener('resize', updateEdges);
    };
  }, [children]);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.9, 640), behavior: 'smooth' });
  };

  return (
    <Wrap role="region" aria-label={ariaLabel}>
      <NavButton type="button" onClick={() => scrollByAmount(-1)} disabled={atStart} aria-label={prevLabel}>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </NavButton>
      <Track ref={trackRef}>
        {React.Children.map(children, (child) => <Item>{child}</Item>)}
      </Track>
      <NavButton type="button" onClick={() => scrollByAmount(1)} disabled={atEnd} aria-label={nextLabel}>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </NavButton>
    </Wrap>
  );
}
