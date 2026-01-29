import { useEffect, useRef, useState } from "react";

import alpekLogo from "@/assets/logos/alpek.png";
import afirmeLogo from "@/assets/logos/afirme.png";
import atmusLogo from "@/assets/logos/atmus.png";
import aplaLogo from "@/assets/logos/apla.png";
import comunalLogo from "@/assets/logos/comunal.png";
import bmwGroupLogo from "@/assets/logos/bmw-group.png";
import daikinLogo from "@/assets/logos/daikin.png";
import cpaLogo from "@/assets/logos/cpa.png";
import estafetaLogo from "@/assets/logos/estafeta.png";
import draxlmaierLogo from "@/assets/logos/draxlmaier.png";
import iatiLogo from "@/assets/logos/iati.png";
import gemexLogo from "@/assets/logos/gemex.png";
import mabeLogo from "@/assets/logos/mabe.png";
import lorealLogo from "@/assets/logos/loreal.png";
import negLogo from "@/assets/logos/neg.png";
import nestleLogo from "@/assets/logos/nestle.png";
import schnelleckeLogo from "@/assets/logos/schnellecke.png";
import rosewoodLogo from "@/assets/logos/rosewood.png";
import whirlpoolLogo from "@/assets/logos/whirlpool.png";
import farmaciasSimilaresLogo from "@/assets/logos/farmacias-similares.png";

const logos = [
  { name: "Alpek", src: alpekLogo },
  { name: "Afirme", src: afirmeLogo },
  { name: "Atmus", src: atmusLogo },
  { name: "APLA", src: aplaLogo },
  { name: "Comunal", src: comunalLogo },
  { name: "BMW Group", src: bmwGroupLogo },
  { name: "Daikin", src: daikinLogo },
  { name: "CPA", src: cpaLogo },
  { name: "Estafeta", src: estafetaLogo },
  { name: "Dräxlmaier", src: draxlmaierLogo },
  { name: "IATI", src: iatiLogo },
  { name: "Gemex", src: gemexLogo },
  { name: "Mabe", src: mabeLogo },
  { name: "L'Oréal México", src: lorealLogo },
  { name: "NEG", src: negLogo },
  { name: "Nestlé", src: nestleLogo },
  { name: "Schnellecke", src: schnelleckeLogo },
  { name: "Rosewood", src: rosewoodLogo },
  { name: "Whirlpool", src: whirlpoolLogo },
  { name: "Farmacias Similares", src: farmaciasSimilaresLogo },
];

const LogoCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 1500);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsPaused(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 1500);
  };

  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className={`flex items-center ${
          !prefersReducedMotion && !isPaused ? "animate-scroll" : ""
        }`}
        style={{ 
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {/* Triple the logos for seamless infinite loop */}
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 mx-5 md:mx-8 flex items-center justify-center h-16 md:h-20 select-none"
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="w-[56px] md:w-[88px] h-auto object-contain opacity-70 hover:opacity-100 transition-opacity pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;
