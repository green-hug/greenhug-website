import { useState, useRef, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Badge from "@/components/shared/Badge";
import SectionHeader from "@/components/shared/SectionHeader";
import MetricCard from "@/components/shared/MetricCard";
import ProjectCard from "@/components/shared/ProjectCard";
import TestimonialCard from "@/components/shared/TestimonialCard";
import TestimonialCarousel from "@/components/shared/TestimonialCarousel";
import ContactForm from "@/components/shared/ContactForm";
import LogoCarousel from "@/components/shared/LogoCarousel";
import MetricCarousel from "@/components/shared/MetricCarousel";
import { Link } from "react-router-dom";
import {
  TreePine,
  Recycle,
  Shirt,
  Smartphone,
  Users,
  Droplets,
  Cloud,
  Leaf,
  ArrowRight,
  Trophy,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ChevronsLeftRight,
} from "lucide-react";
import empresaCertificada from "@/assets/empresa-certificada-white.png";
import bcorpLogo from "@/assets/bcorp-logo-white.png";
import bcorpBg from "@/assets/bcorp-mountains-bg.jpg";
import heroForest from "@/assets/hero-forest-landscape.jpg";

const Index = () => {
  const [hasScrolledProjects, setHasScrolledProjects] = useState(false);
  const projectsScrollRef = useRef<HTMLDivElement>(null);

  const scrollToProjects = () => {
    document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const scrollContainer = projectsScrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (scrollContainer.scrollLeft > 20) {
        setHasScrolledProjects(true);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-forest to-forest-dark opacity-90" />
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40" style={{ backgroundImage: `url(${heroForest})` }} />
        
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl">
            <Badge variant="muted" className="bg-white/20 text-white mb-6">
              +8 años creando impacto ambiental real
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Convertimos organizaciones en{" "}
              <span className="text-sage">ambientalistas imperfectos</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-6 leading-relaxed max-w-2xl">
              Proyectos ambientales medibles, verificables y con impacto real en personas, comunidades y ecosistemas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="white"
                size="xl"
                onClick={scrollToProjects}
              >
                Conoce nuestros proyectos
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                variant="whiteOutline" 
                size="xl" 
                onClick={() => window.open("https://wa.me/524443348043?text=" + encodeURIComponent("Hola, me gustaría hablar con un asesor sobre los proyectos de Greenhug."), "_blank")}
              >
                Hablar con un asesor
              </Button>
            </div>

            {/* Certificación badge */}
            <div className="flex justify-center md:justify-start mt-6">
              <img 
                src={empresaCertificada} 
                alt="Empresa Certificada en Impacto Ambiental" 
                className="h-[60px] md:h-[80px] w-auto opacity-90"
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-12 md:py-16 bg-card border-y border-border/50">
        <div className="container-custom mb-8">
          <p className="text-center text-sm text-muted-foreground font-medium">
            Organizaciones que decidieron pasar de la intención a la acción
          </p>
        </div>
        <LogoCarousel />
      </section>

      {/* What is Greenhug Section */}
      <section id="nosotros" className="section-padding bg-sage-tint">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4">
              Sobre Greenhug
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground max-w-2xl mx-auto">
              Hacemos el impacto ambiental accionable, medible y humano
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <MetricCard
              value="+8"
              label="años de experiencia"
            />
            <MetricCard
              value="+50,000"
              label="personas involucradas"
            />
            <MetricCard
              value="+70"
              label="organizaciones aliadas"
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="section-padding-lg">
        <div className="container-custom">
          <SectionHeader
            badge="Nuestros Proyectos"
            title="Cuatro formas de crear impacto real"
            subtitle="Cada proyecto está diseñado para resolver un problema específico y generar resultados medibles que puedes compartir con tus stakeholders."
          />

          <div className="relative mt-12">
            {/* Scroll indicator - arrow icon */}
            <div 
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1 text-muted-foreground transition-opacity duration-500 pointer-events-none md:hidden ${
                hasScrolledProjects ? "opacity-0" : "opacity-40"
              }`}
            >
              <ChevronsLeftRight className="w-5 h-5" />
            </div>

            {/* Gradient fade on right edge */}
            <div 
              className={`absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none transition-opacity duration-500 md:hidden ${
                hasScrolledProjects ? "opacity-0" : "opacity-100"
              }`}
            />

            <div 
              ref={projectsScrollRef}
              className="flex gap-4 md:gap-6 overflow-x-auto pb-4 -mx-4 px-4 pr-12 md:-mx-6 md:px-6 scrollbar-hide snap-x snap-mandatory"
            >
              <ProjectCard
                icon={TreePine}
                title="Experience"
                acronym="EXP"
                problem="Voluntariados olvidables sin impacto medible"
                solution="Reforestaciones corporativas con metodología y trazabilidad"
                metric="+46,538 árboles"
                href="/experience"
                variant="exp"
                className="w-[85vw] max-w-[320px] md:min-w-[280px] md:w-auto flex-shrink-0 snap-start"
              />
              <ProjectCard
                icon={Shirt}
                title="Lifestyle"
                acronym="LIFE"
                problem="Merch corporativo sin propósito ni identidad"
                solution="Programa anual de prendas ecológicas hechas en México"
                metric="+85,350 ton agua"
                href="/lifestyle"
                variant="life"
                className="w-[85vw] max-w-[320px] md:min-w-[280px] md:w-auto flex-shrink-0 snap-start"
              />
              <ProjectCard
                icon={Recycle}
                title="Upcycling"
                acronym="UPC"
                problem="Uniformes que terminan en rellenos sanitarios"
                solution="Economía circular que transforma residuos en productos"
                metric="+5,000 uniformes"
                href="/upcycling"
                variant="upc"
                className="w-[85vw] max-w-[320px] md:min-w-[280px] md:w-auto flex-shrink-0 snap-start"
              />
              <ProjectCard
                icon={Smartphone}
                title="App"
                acronym="PLATAFORMA"
                problem="Falta de visibilidad del impacto generado"
                solution="Dashboard con KPIs y evidencia para ESG"
                metric="Datos en tiempo real"
                href="/greenhug-app"
                variant="app"
                className="w-[85vw] max-w-[320px] md:min-w-[280px] md:w-auto flex-shrink-0 snap-start"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impacto" className="section-padding-lg bg-forest">
        <div className="container-custom">
          <SectionHeader
            title="Números que hablan de acciones reales"
            subtitle="Cada número representa un compromiso cumplido, una comunidad beneficiada y un paso más hacia un México más verde."
            variant="light"
          />

          <div className="mt-8">
          <MetricCarousel>
            <MetricCard
              icon={TreePine}
              value="46,538"
              label="Árboles plantados"
              variant="light"
              className="min-w-[140px] flex-shrink-0"
            />
            <MetricCard
              icon={Users}
              value="50,000+"
              label="Personas impactadas"
              variant="light"
              className="min-w-[140px] flex-shrink-0"
            />
            <MetricCard
              icon={Droplets}
              value="85,350"
              label="Ton de agua ahorrada"
              variant="light"
              className="min-w-[140px] flex-shrink-0"
            />
            <MetricCard
              icon={Cloud}
              value="230"
              label="CO₂ evitado (ton)"
              variant="light"
              className="min-w-[140px] flex-shrink-0"
            />
            <MetricCard
              icon={Recycle}
              value="384,366"
              label="Botellas PET recicladas"
              variant="light"
              className="min-w-[140px] flex-shrink-0"
            />
            <MetricCard
              icon={Shirt}
              value="+5,000"
              label="Uniformes reciclados"
              variant="light"
              className="min-w-[140px] flex-shrink-0"
            />
            <MetricCard
              icon={Leaf}
              value="+100"
              label="Proyectos completados"
              variant="light"
              className="min-w-[140px] flex-shrink-0"
            />
            <MetricCard
              icon={Trophy}
              value="+70"
              label="Empresas aliadas"
              variant="light"
              className="min-w-[140px] flex-shrink-0"
            />
          </MetricCarousel>
          </div>
        </div>
      </section>

      {/* Ranking Teaser Section */}
      <section className="section-padding bg-sage-tint">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="primary" className="mb-4">
              Ranking de Impacto
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Reconocemos a quienes pasan de la intención a la acción
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              No es competencia. Es inspiración colectiva.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/ranking">
                Ir al ranking de impacto
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* B Corp Section */}
      <section className="relative h-[320px] md:h-[450px] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bcorpBg})` }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-forest/65" />
        
        {/* Content */}
        <a 
          href="https://www.bcorporation.net/en-us/find-a-b-corp/company/green-hug-industries/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 flex flex-col items-center text-center px-6 group cursor-pointer"
        >
          <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-white/80 mb-4">
            Certificación
          </span>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-8 md:mb-10">
            Orgullosamente parte de la comunidad B Corp
          </h2>
          <img 
            src={bcorpLogo} 
            alt="B Corp Certified" 
            className="h-[100px] md:h-[160px] w-auto mb-6 md:mb-8 transition-all duration-300 group-hover:brightness-110"
          />
          <span className="text-sm md:text-base text-white/80 transition-all duration-300 group-hover:text-white group-hover:underline underline-offset-4">
            Haz clic y conoce nuestra puntuación
          </span>
        </a>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding-lg overflow-hidden">
        <div className="container-custom">
          <SectionHeader
            title="Historias de impacto real"
            subtitle="Organizaciones que confiaron en nosotros comparten su experiencia"
          />
        </div>

        <div className="mt-12">
          <TestimonialCarousel>
            <TestimonialCard
              quote="Para mi colaborar con Greenhug ha sido una experiencia increíble; es observar el impacto ambiental con ojos de conciencia."
              name="David Ramírez Mendoza"
              role="Responsable de calidad, seguridad, ambiental, ingeniería de procesos, mejora continua y comercial"
              company="Schnellecke Logistics"
              className="w-[320px] md:w-[380px] flex-shrink-0"
            />
            <TestimonialCard
              quote="Ha sido muy grato poder contribuir al planeta y regresarle un poquito de lo mucho que nos da en colaboración con la compañía en pro del futuro."
              name="Elvia Mariela Ramos Martinez"
              role="Coordinadora de servicios al colaborador y comunicación"
              company="L'Oreal Planta SLP"
              className="w-[320px] md:w-[380px] flex-shrink-0"
            />
            <TestimonialCard
              quote="Nuestra experiencia ha sido muy buena, creemos que hemos tenido el impacto que deseábamos con esta acción y nos han ayudado a posicionarnos en el mercado mexicano."
              name="Mariana Naccaratti"
              role="Líder de crecimiento LATAM"
              company="Iati Seguros"
              className="w-[320px] md:w-[380px] flex-shrink-0"
            />
            <TestimonialCard
              quote="Fue una experiencia muy satisfactoria y bonita, desde la clase de yoga/preparar el cuerpo para el trabajo de reforestar hasta el final, todo muy bien organizado."
              name="Daniela Robles"
              role="Especialista Social"
              company="Marcol"
              className="w-[320px] md:w-[380px] flex-shrink-0"
            />
            <TestimonialCard
              quote="Logramos plantar +500 árboles con 100 voluntarios, la logística estuvo increíble y fue un evento que disfrutamos todo."
              name="Eduardo Hernandez"
              role="Planner Environmental Management System"
              company="BMW Group Planta San Luis Potosí"
              className="w-[320px] md:w-[380px] flex-shrink-0"
            />
            <TestimonialCard
              quote="Contar con un aliado que ofrece opciones de aplicaciones de textiles sustentables amplifica el impacto de nuestros esfuerzos por proteger y restaurar el planeta."
              name="Carlos Alejandro Becerra Ortega"
              role="Gerente de ESG & Sustentabilidad"
              company="Nestlé México"
              className="w-[320px] md:w-[380px] flex-shrink-0"
            />
            <TestimonialCard
              quote="Juntos nos aliamos para dar un paso más en el proceso de economía circular para generar un mayor impacto positivo en el planeta."
              name="Marta Munt"
              role="Walmart KAM"
              company="PepsiCo Mexico"
              className="w-[320px] md:w-[380px] flex-shrink-0"
            />
          </TestimonialCarousel>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="section-padding-lg bg-muted">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <Badge variant="primary" className="mb-4">
                Contacto
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                ¿Listo para pasar de la intención a la acción?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Platiquemos y diseñemos juntos el proyecto de impacto ambiental que mejor se alinee con tu organización.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="icon-container-sm">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">hola@greenhug.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="icon-container-sm">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">+52 444 334 8043</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="icon-container-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">En todo México</span>
                </div>
              </div>
            </div>

            <div className="card-premium p-6 md:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
