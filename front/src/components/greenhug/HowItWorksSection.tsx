import { useState, useEffect, useRef, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, QrCode, TreePine, Wrench, BarChart3, X } from "lucide-react";

// Import real screenshots
import flowCrearEvento from "@/assets/flow-crear-evento.png";
import flowRegistroVoluntarios from "@/assets/flow-registro-voluntarios.png";
import flowRegistroArboles from "@/assets/flow-registro-arboles.png";
import flowMantenimiento from "@/assets/flow-mantenimiento.png";
import flowReportes from "@/assets/flow-reportes.png";

const steps = [
  {
    step: 1,
    title: "Crear evento",
    description: "Define territorio, fecha, metas y logística completa del evento de reforestación.",
    icon: Calendar,
    image: flowCrearEvento,
    imageType: "desktop" as const
  },
  {
    step: 2,
    title: "Registro de voluntarios",
    description: "Los participantes se registran fácilmente con código QR, link o código de acceso.",
    icon: QrCode,
    image: flowRegistroVoluntarios,
    imageType: "mobile" as const
  },
  {
    step: 3,
    title: "Registro de árboles",
    description: "Cada árbol queda documentado con ID único, foto, coordenadas GPS y especie.",
    icon: TreePine,
    image: flowRegistroArboles,
    imageType: "mobile" as const
  },
  {
    step: 4,
    title: "Mantenimiento",
    description: "Seguimiento calendarizado con riego, limpieza y cuidado continuo del árbol.",
    icon: Wrench,
    image: flowMantenimiento,
    imageType: "mobile" as const
  },
  {
    step: 5,
    title: "Reportes",
    description: "Datos listos para ESG, auditorías y comunicación con KPIs en tiempo real.",
    icon: BarChart3,
    image: flowReportes,
    imageType: "desktop" as const
  }
];

// Mobile Step Card with Teaser + Modal
const MobileStepCard = ({ 
  step, 
  index, 
  shouldAnimate,
  onOpenModal
}: { 
  step: typeof steps[0]; 
  index: number; 
  shouldAnimate: boolean;
  onOpenModal: (step: typeof steps[0]) => void;
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  // Subtle pulse animation on first view (staggered, only once)
  useEffect(() => {
    if (shouldAnimate && !hasAnimated) {
      const delay = index * 250;
      const timeout = setTimeout(() => {
        setIsPulsing(true);
        // Stop pulse after 1.2s
        setTimeout(() => {
          setIsPulsing(false);
          setHasAnimated(true);
        }, 1200);
      }, delay);
      
      return () => clearTimeout(timeout);
    }
  }, [shouldAnimate, hasAnimated, index]);

  const handleTeaserClick = () => {
    onOpenModal(step);
  };

  return (
    <div className="space-y-3">
      {/* Main Card - Text Content */}
      <div className="bg-card rounded-2xl p-5 border border-border/50 shadow-sm">
        <div className="flex items-start gap-4">
          {/* Step Number & Icon */}
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-md">
              <step.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-primary">Paso {step.step}</span>
          </div>
          
          {/* Content - Primary hierarchy */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold mb-1.5 text-foreground">{step.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
          </div>
        </div>
      </div>

      {/* Teaser Preview + CTA */}
      <div 
        className={`relative cursor-pointer group transition-all duration-300 ${
          isPulsing ? 'animate-pulse' : ''
        }`}
        onClick={handleTeaserClick}
      >
        {/* Mini Preview Image */}
        <div 
          className="relative overflow-hidden rounded-xl border border-border/30 shadow-sm bg-muted/20"
          style={{ height: '140px' }}
        >
          <img 
            src={step.image} 
            alt={`Preview: ${step.title}`}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
          {/* Gradient overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          
          {/* CTA overlay */}
          <div className="absolute inset-0 flex items-end justify-center pb-3">
            <div className="flex items-center gap-2 bg-card/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-primary/20 transition-transform group-hover:scale-105">
              <span className="text-sm">👆</span>
              <span className="text-xs font-medium text-foreground">Toca para ver cómo se ve en la app</span>
            </div>
          </div>
        </div>

        {/* Subtle glow effect during pulse */}
        {isPulsing && (
          <div className="absolute inset-0 rounded-xl border-2 border-primary/40 pointer-events-none" />
        )}
      </div>
    </div>
  );
};

// Fullscreen Modal for Mockup
const MockupModal = ({ 
  step, 
  isOpen, 
  onClose 
}: { 
  step: typeof steps[0] | null; 
  isOpen: boolean;
  onClose: () => void;
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !step) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-sm max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center shadow-lg z-10 transition-transform hover:scale-110"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {/* Step Badge */}
        <div className="text-center mb-4">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <step.icon className="w-4 h-4 mr-2" />
            Paso {step.step}: {step.title}
          </Badge>
        </div>

        {/* Mockup Container */}
        <div className="relative flex-1 overflow-auto rounded-2xl bg-card border border-border/50 shadow-2xl">
          {step.imageType === 'desktop' ? (
            // Desktop mockup style
            <div className="h-full flex flex-col">
              {/* Browser Chrome */}
              <div className="bg-muted/50 px-3 py-2 flex items-center gap-2 border-b border-border/50 flex-shrink-0">
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-background/50 rounded px-3 py-0.5 text-[10px] text-muted-foreground">
                    🔒 www.greenhug.app
                  </div>
                </div>
              </div>
              {/* Screenshot */}
              <div className="flex-1 overflow-auto">
                <img 
                  src={step.image} 
                  alt={`Greenhug App - ${step.title}`}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          ) : (
            // Mobile mockup - just the image with scroll
            <div className="h-full overflow-auto">
              <img 
                src={step.image} 
                alt={`Greenhug App - ${step.title}`}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* Hint to close */}
        <p className="text-center text-xs text-muted-foreground mt-3">
          Toca fuera o el botón X para cerrar
        </p>
      </div>
    </div>
  );
};

// Desktop Timeline Card
const TimelineCard = ({ 
  step, 
  isActive, 
  onHover, 
  onClick 
}: { 
  step: typeof steps[0]; 
  isActive: boolean;
  onHover: () => void;
  onClick: () => void;
}) => {
  return (
    <div 
      className={`relative bg-card rounded-2xl p-5 border transition-all duration-300 cursor-pointer ${
        isActive 
          ? 'border-primary/50 shadow-lg shadow-primary/10 scale-[1.02]' 
          : 'border-border/50 hover:border-primary/30 hover:shadow-md'
      }`}
      onMouseEnter={onHover}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {/* Step Number Circle */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          isActive 
            ? 'bg-primary text-primary-foreground shadow-lg' 
            : 'bg-primary/10 text-primary'
        }`}>
          <step.icon className="w-6 h-6" />
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold transition-colors ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`}>
              Paso {step.step}
            </span>
          </div>
          <h3 className="text-base font-bold mb-1">{step.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
        </div>
      </div>
      
      {/* Active indicator line */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-primary rounded-r-full" />
      )}
    </div>
  );
};

// Desktop Mockup Display
const MockupDisplay = ({ 
  step, 
  isTransitioning,
  isLastStep
}: { 
  step: typeof steps[0]; 
  isTransitioning: boolean;
  isLastStep: boolean;
}) => {
  const isDesktopImage = step.imageType === 'desktop';
  
  return (
    <div 
      className={`transition-all duration-500 ease-out ${
        isLastStep ? 'mt-auto' : 'mt-0'
      }`}
    >
      <div className={`transition-all duration-400 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
        {isDesktopImage ? (
          // Desktop/Laptop Mockup
          <div className="bg-card rounded-2xl shadow-2xl border border-border/50 overflow-hidden">
            {/* Browser Chrome */}
            <div className="bg-muted/50 px-4 py-3 flex items-center gap-2 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-background/50 rounded-md px-4 py-1 text-xs text-muted-foreground flex items-center gap-2">
                  <span className="w-3 h-3 text-primary">🔒</span>
                  www.greenhug.app
                </div>
              </div>
            </div>
            {/* Screenshot */}
            <div className={`relative overflow-hidden ${step.step === 5 ? 'max-h-[400px] flex items-end' : ''}`}>
              <img 
                src={step.image} 
                alt={`Greenhug App - ${step.title}`}
                className={`w-full h-auto ${step.step === 5 ? 'object-cover object-bottom' : 'object-cover'}`}
                loading="lazy"
              />
              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-card/5 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        ) : (
          // Mobile Mockup
          <div className="flex justify-center">
            <div className="w-72 bg-card rounded-[2.5rem] shadow-2xl border border-border/50 overflow-hidden p-2">
              {/* Phone Frame */}
              <div className="bg-foreground/5 rounded-[2rem] overflow-hidden">
                {/* Status Bar */}
                <div className="bg-background px-6 py-2 flex justify-between items-center text-xs text-muted-foreground">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <span>📶</span>
                    <span>🔋</span>
                  </div>
                </div>
                {/* Screenshot */}
                <div className="relative overflow-hidden bg-background">
                  <img 
                    src={step.image} 
                    alt={`Greenhug App - ${step.title}`}
                    className="w-full h-auto object-cover object-top"
                    style={{ maxHeight: '500px' }}
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Home Indicator */}
              <div className="py-2 flex justify-center">
                <div className="w-28 h-1 bg-foreground/20 rounded-full" />
              </div>
            </div>
          </div>
        )}
        
        {/* Step Badge Below Mockup */}
        <div className="mt-6 text-center">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <step.icon className="w-4 h-4 mr-2" />
            Paso {step.step}: {step.title}
          </Badge>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
    </div>
  );
};

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [modalStep, setModalStep] = useState<typeof steps[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Trigger animation when section comes into view (mobile only)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTriggerAnimation(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle hover on timeline cards (desktop only)
  const handleHover = useCallback((index: number) => {
    if (index === activeStep) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveStep(index);
      setIsTransitioning(false);
    }, 150);
  }, [activeStep]);

  // Modal handlers for mobile
  const handleOpenModal = (step: typeof steps[0]) => {
    setModalStep(step);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setModalStep(null), 200);
  };
  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            Flujo de operación
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cómo funciona <span className="text-gradient-forest">Greenhug.app</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Desde la creación del evento hasta los reportes finales, cada paso está diseñado para garantizar transparencia y resultados.
          </p>
        </div>

        {/* Desktop Layout: Timeline + Mockup */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Timeline */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div 
                key={step.step}
                ref={(el) => (cardRefs.current[index] = el)}
              >
                <TimelineCard
                  step={step}
                  isActive={activeStep === index}
                  onHover={() => handleHover(index)}
                  onClick={() => handleHover(index)}
                />
              </div>
            ))}
          </div>

          {/* Right Column: Mockup Display - Position changes based on active step */}
          <div className={`relative flex flex-col transition-all duration-500 ${
            activeStep === 4 ? 'justify-end min-h-[600px]' : 'justify-start'
          }`}>
            <MockupDisplay 
              step={steps[activeStep]} 
              isTransitioning={isTransitioning}
              isLastStep={activeStep === 4}
            />
          </div>
        </div>

        {/* Mobile Layout: Cards with Teaser + Modal */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <MobileStepCard
              key={step.step}
              step={step}
              index={index}
              shouldAnimate={triggerAnimation}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>

        {/* Mobile Modal */}
        <MockupModal 
          step={modalStep}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
};

export default HowItWorksSection;
