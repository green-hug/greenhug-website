import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Badge from "@/components/shared/Badge";
import SectionHeader from "@/components/shared/SectionHeader";
import MetricCard from "@/components/shared/MetricCard";
import StepperItem from "@/components/shared/StepperItem";

import { Link } from "react-router-dom";
import logoExp from "@/assets/logo-exp.png";
import heroExperience from "@/assets/hero-experience.jpg";
import flipCorporativo from "@/assets/flip-corporativo.jpg";
import flipSignificativo from "@/assets/flip-significativo.jpg";
import flipMonitoreo from "@/assets/flip-monitoreo.jpg";
import flipReporteEsg from "@/assets/flip-reporte-esg.jpg";
import metodoEspecies from "@/assets/metodo-especies.jpg";
import metodoInsumos from "@/assets/metodo-insumos.jpg";
import metodoGeolocalizacion from "@/assets/metodo-geolocalizacion.png";
import metodoMantenimiento from "@/assets/metodo-mantenimiento.png";
import {
  TreePine,
  Users,
  MapPin,
  BarChart3,
  Calendar,
  Leaf,
  Droplets,
  Target,
  Heart,
  Building,
  Megaphone,
  Shield,
  Camera,
  Clock,
  ArrowRight,
  Check,
  AlertTriangle,
  Instagram,
  Sprout,
  Trees,
  Globe,
  type LucideIcon,
} from "lucide-react";

import packageCommunity from "@/assets/package-community.jpg";
import packageSignature from "@/assets/package-signature.jpg";
import packageEnterprise from "@/assets/package-enterprise.jpg";
import packageGlobal from "@/assets/package-global.jpg";

const packages: {
  name: string;
  icon: LucideIcon;
  description: string;
  image: string;
  features: string[];
  popular?: boolean;
}[] = [
  {
    name: "Community",
    icon: Sprout,
    description: "Ideal para equipos pequeños o primeras experiencias",
    image: packageCommunity,
    features: [
      "Hasta 50 personas",
      "Reforestación guiada",
      "Metodología Greenhug",
      "Proyecto multiempresa",
    ],
  },
  {
    name: "Signature",
    icon: Leaf,
    description: "La experiencia más solicitada",
    image: packageSignature,
    features: [
      "Hasta 150 personas",
      "Planeación técnica completa",
      "Evidencia fotográfica y geolocalizada",
      "Reporte de impacto",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Trees,
    description: "Para organizaciones con estrategia ESG definida",
    image: packageEnterprise,
    features: [
      "Hasta 300 personas",
      "Monitoreo y mantenimiento",
      "Información lista para reportes ESG",
      "Acceso a greenhug.app",
    ],
  },
  {
    name: "Global",
    icon: Globe,
    description: "Impacto a gran escala",
    image: packageGlobal,
    features: [
      "Hasta 600 personas",
      "Proyectos multisitio",
      "Acceso a greenhug.app",
      "Beneficios exclusivos",
    ],
  },
];

const methodology = [
  {
    icon: Leaf,
    title: "Selección de especies",
    description: "Adaptadas al territorio y condiciones locales.",
    image: metodoEspecies,
  },
  {
    icon: Droplets,
    title: "Insumos especializados",
    description: "Uso de lluvia sólida, micromódulos y tierra preparada.",
    image: metodoInsumos,
  },
  {
    icon: MapPin,
    title: "Geolocalización",
    description: "Cada árbol queda registrado con coordenadas.",
    image: metodoGeolocalizacion,
  },
  {
    icon: Clock,
    title: "Mantenimiento",
    description: "Visitas técnicas y seguimiento en el tiempo.",
    image: metodoMantenimiento,
  },
];

const benefits = [
  {
    area: "ESG / Sustentabilidad",
    icon: BarChart3,
    items: ["Evidencia real", "Seguimiento técnico", "Indicadores ambientales"],
  },
  {
    area: "Recursos Humanos",
    icon: Users,
    items: ["Engagement", "Orgullo de pertenencia", "Trabajo en equipo"],
  },
  {
    area: "Marketing / Comunicación",
    icon: Megaphone,
    items: ["Historias reales", "Contenido auténtico", "Reputación positiva"],
  },
];

const Experience = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroExperience} 
            alt="Reforestación Greenhug" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/80 to-forest-dark/60" />
        </div>
        
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={logoExp} 
                alt="Greenhug Experience" 
                className="h-12 md:h-16 w-auto"
              />
              <a 
                href="https://www.instagram.com/greenhugexp/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="w-5 h-5 text-white/80 hover:text-white" />
              </a>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Reforestaciones corporativas que se viven, se miden y se recuerdan.
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
              Diseñamos experiencias de reforestación donde las personas se conectan con la naturaleza y las empresas generan impacto ambiental real y verificable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="white" size="xl" onClick={() => window.open("https://wa.me/524443348043?text=" + encodeURIComponent("Hola, me interesa el proyecto Experience de Greenhug."), "_blank")}>
                Hablar con un asesor
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="whiteOutline" size="xl" onClick={() => document.getElementById("el-problema")?.scrollIntoView({ behavior: "smooth" })}>
                Ver cómo funciona
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="section-padding bg-sage-tint">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-2xl md:text-3xl font-light text-foreground leading-relaxed italic mb-6">
              "En Greenhug creemos que plantar un árbol es un acto de esperanza, incluso en los momentos más complejos."
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="el-problema" className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="El problema"
            title="¿Por qué las reforestaciones tradicionales no funcionan?"
            centered={false}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="card-premium p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="icon-container-sm bg-destructive/10">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                </div>
                <h3 className="font-semibold text-foreground">Problema ambiental</h3>
              </div>
              <ul className="space-y-3">
                {["Crisis hídrica", "Suelos degradados", "Baja supervivencia en reforestaciones tradicionales"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-premium p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="icon-container-sm bg-warning/10">
                  <Building className="w-4 h-4 text-warning" />
                </div>
                <h3 className="font-semibold text-foreground">Problema empresarial</h3>
              </div>
              <ul className="space-y-3">
                {["Proyectos ESG sin trazabilidad", "Activaciones que no generan legado", "Voluntariados olvidables"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-warning mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <SectionHeader
            badge="Nuestra solución"
            title="Greenhug Experience convierte la intención en acción medible"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { icon: TreePine, label: "Reforestaciones corporativas", image: flipCorporativo },
              { icon: Heart, label: "Voluntariado significativo", image: flipSignificativo },
              { icon: MapPin, label: "Impacto monitoreado", image: flipMonitoreo },
              { icon: BarChart3, label: "Reportes ESG", image: flipReporteEsg },
            ].map((item, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl h-[200px] group">
                {/* Background Image */}
                <img 
                  src={item.image} 
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Dark overlay for legibility - AA contrast */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
                
                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-semibold text-white text-lg">{item.label}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" className="section-padding-lg">
        <div className="container-custom">
          <SectionHeader
            badge="Proceso"
            title="Cómo funciona Greenhug Experience"
          />

          <div className="max-w-3xl mx-auto mt-12">
            <StepperItem
              number={1}
              title="Definimos paquete, fecha y territorio"
              description="Trabajamos contigo para elegir la experiencia que mejor se alinee a tus objetivos ESG, cultura organizacional y disponibilidad de tu equipo."
              bullets={[
                "Selección del paquete (Community, Signature, Enterprise o Global)",
                "Elección de territorio estratégico",
                "Definición de fecha y número de participantes",
              ]}
            />
            <StepperItem
              number={2}
              title="Preparamos el terreno y la logística"
              description="Antes de que tu equipo llegue, todo ya está listo técnica y operativamente."
              bullets={[
                "Selección y preparación del polígono",
                "Trazado del área de reforestación",
                "Logística, insumos y staff Greenhug",
                "Diseño de la experiencia y dinámicas",
              ]}
            />
            <StepperItem
              number={3}
              title="Vivimos la experiencia de reforestación"
              description="Tu equipo participa en una experiencia guiada, educativa y emocionalmente significativa."
              bullets={[
                "Dinámica educativa ambiental",
                "Acompañamiento técnico en todo momento",
                "Plantación con metodología validada",
                "Actividad colaborativa y segura",
              ]}
            />
            <StepperItem
              number={4}
              title="Medimos, damos seguimiento y reportamos"
              description="El impacto no termina el día del evento. Aquí es donde Greenhug marca la diferencia."
              bullets={[
                "Geolocalización árbol por árbol",
                "Registro en plataforma Greenhug",
                "Evidencia fotográfica y mapas",
                "Mantenimiento y monitoreo técnico",
                "Información lista para reportes ESG",
              ]}
              isLast
            />
          </div>


          {/* Benefits mini-block */}
          <div className="card-premium p-6 md:p-8 max-w-2xl mx-auto mt-12">
            <h4 className="font-semibold text-foreground mb-4">🧠 ¿Qué gana tu empresa?</h4>
            <ul className="space-y-3">
              {[
                "Impacto ambiental real y medible",
                "Evidencia clara para ESG y comunicación",
                "Engagement profundo del equipo",
                "Un proyecto que trasciende el evento",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-foreground">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center mt-8">
            <Button variant="hero" size="lg" onClick={() => window.open("https://wa.me/524443348043?text=" + encodeURIComponent("Hola, me interesa el proyecto Experience de Greenhug."), "_blank")}>
              Hablar con un asesor
            </Button>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <SectionHeader
            badge="Paquetes"
            title="Paquetes diseñados para distintos niveles de impacto"
            subtitle="Cada organización es distinta. Por eso diseñamos experiencias escalables según tu alcance, equipo y objetivos."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {packages.map((pkg, i) => (
              <div 
                key={i} 
                className={`relative overflow-hidden rounded-xl flex flex-col h-full min-h-[400px] ${pkg.popular ? "ring-2 ring-primary" : ""}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={pkg.image} 
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Dark overlay for legibility */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col h-full">
                  {pkg.popular && (
                    <Badge variant="primary" className="absolute -top-0 left-1/2 -translate-x-1/2 top-3">
                      Más solicitado
                    </Badge>
                  )}
                  <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center mb-4 mt-6">
                    <pkg.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{pkg.name}</h3>
                  <p className="text-sm text-white/80 mb-4">{pkg.description}</p>
                  <ul className="space-y-2 flex-1">
                    {pkg.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-white">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="subtle" 
                    className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white border-white/20"
                    onClick={() => window.open("https://wa.me/524443348043?text=" + encodeURIComponent(`Hola, me interesa el paquete ${pkg.name} del proyecto Experience de Greenhug.`), "_blank")}
                  >
                    Conocer este paquete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Metodología"
            title="Nuestra metodología garantiza impacto real"
            subtitle="No solo plantamos árboles. Diseñamos proyectos con base técnica, seguimiento y evidencia."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {methodology.map((item, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl h-[220px]">
                {/* Background Image */}
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark overlay for legibility - AA contrast */}
                <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />
                
                {/* Content */}
                <div className="relative z-10 p-6 text-center h-full flex flex-col justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-white/90">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section-padding bg-sage-tint">
        <div className="container-custom">
          <SectionHeader
            badge="Resultados"
            title="Resultados claros, verificables y comunicables"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="card-premium p-6">
              <ul className="space-y-3">
                {[
                  "Árboles plantados con ubicación exacta",
                  "Personas involucradas",
                  "Beneficios ambientales estimados",
                  "Evidencia fotográfica y técnica",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-premium p-6 flex flex-col justify-center">
              <Badge variant="success" className="mb-2 w-fit">✔ Información lista para reportes ESG</Badge>
              <Badge variant="success" className="w-fit">✔ Evita greenwashing</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits by Area Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Beneficios"
            title="¿Qué áreas de tu empresa se benefician?"
            subtitle="Un solo proyecto, múltiples beneficios internos"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {benefits.map((benefit, i) => (
              <div key={i} className="card-premium p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="icon-container-sm">
                    <benefit.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{benefit.area}</h3>
                </div>
                <ul className="space-y-2">
                  {benefit.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Season Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="icon-container mx-auto mb-4">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              La reforestación tiene temporada
            </h2>
            <p className="text-muted-foreground mb-6">
              Las experiencias se realizan principalmente durante temporada de lluvias para asegurar mejores resultados.
            </p>
            <ul className="inline-flex flex-wrap justify-center gap-4">
              {["Planeación con anticipación", "Cupos limitados por territorio", "Mayor supervivencia de árboles"].map((item, i) => (
                <Badge key={i} variant="muted">{item}</Badge>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding-lg bg-forest">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              ¿Listo para crear impacto real con tu equipo?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Diseñemos juntos tu proyecto Greenhug Experience.
            </p>
            <Button variant="white" size="xl" onClick={() => window.open("https://wa.me/524443348043?text=" + encodeURIComponent("Hola, me interesa el proyecto Experience de Greenhug."), "_blank")}>
              👉 Hablar con un asesor
            </Button>
            <p className="text-white/60 text-sm mt-4">
              Agenda tu fecha con anticipación.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Experience;
