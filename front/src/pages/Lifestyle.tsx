import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Badge from "@/components/shared/Badge";
import SectionHeader from "@/components/shared/SectionHeader";
import StepperItem from "@/components/shared/StepperItem";
import { Link } from "react-router-dom";
import lifeLogo from "@/assets/life-logo.png";
import lifeHero from "@/assets/life-hero.jpg";
import programTeamEssentials from "@/assets/program-team-essentials.jpg";
import programIdentityBuilder from "@/assets/program-identity-builder.jpg";
import programCultureMovement from "@/assets/program-culture-movement.jpg";
import productPlayera from "@/assets/product-playera.png";
import productMangaLarga from "@/assets/product-manga-larga.png";
import productDeportiva from "@/assets/product-deportiva.png";
import productHoodie from "@/assets/product-hoodie.png";
import productSudadera from "@/assets/product-sudadera.png";
import {
  Spline,
  Palette,
  Recycle,
  BarChart3,
  Check,
  ArrowRight,
  ShoppingBag,
  Clock,
  Users,
  Heart,
  Zap,
  DollarSign,
  Target,
  Award,
  Package,
  Truck,
  CreditCard,
  Paintbrush,
  Instagram,
  Building2,
  type LucideIcon,
} from "lucide-react";

const problems = [
  "Merch comprado por urgencia",
  "Falta de identidad visual entre áreas",
  "Prendas que nadie usa",
  "Costos impredecibles",
  "Cero narrativa ESG",
  "Mala experiencia para el colaborador",
];

const benefits = [
  { icon: Recycle, text: "Material 100% reciclado (GRS)" },
  { icon: Zap, text: "+60% ahorro de agua" },
  { icon: Target, text: "Producción 100% en México" },
  { icon: Paintbrush, text: "Diseño profesional incluido" },
  { icon: DollarSign, text: "Ahorro por volumen anual" },
  { icon: Clock, text: "Cero compras urgentes" },
  { icon: Palette, text: "Consistencia visual corporativa" },
  { icon: CreditCard, text: "Pagos a meses sin intereses" },
];

const programs: {
  name: string;
  icon: LucideIcon;
  pieces: string;
  msi: string;
  shipments: string;
  description: string;
  image: string;
  popular?: boolean;
}[] = [
  {
    name: "Team Essentials",
    icon: Users,
    pieces: "300–2,000 piezas",
    msi: "3 MSI",
    shipments: "Hasta 6 envíos",
    description: "Ideal para comenzar con un programa estructurado",
    image: programTeamEssentials,
  },
  {
    name: "Identity Builder",
    icon: Award,
    pieces: "2,001–4,000 piezas",
    msi: "6 MSI",
    shipments: "Hasta 13 envíos",
    description: "Para empresas que buscan consolidar su identidad",
    popular: true,
    image: programIdentityBuilder,
  },
  {
    name: "Culture Movement",
    icon: Building2,
    pieces: "4,001–8,000 piezas",
    msi: "6 MSI",
    shipments: "Hasta 26 envíos",
    description: "Programa completo para grandes organizaciones",
    image: programCultureMovement,
  },
];

const catalogCategories = [
  {
    name: "Playeras",
    composition: "50% algodón reciclado / 50% PET reciclado",
    variants: [
      { name: "Manga corta", image: productPlayera },
      { name: "Manga larga", image: productMangaLarga },
    ],
  },
  {
    name: "Deportivas",
    composition: "100% PET reciclado",
    variants: [
      { name: "Playera deportiva", image: productDeportiva },
    ],
  },
  {
    name: "Hoodies y Sudaderas",
    composition: "50% algodón reciclado / 50% PET reciclado",
    variants: [
      { name: "Hoodie", image: productHoodie },
      { name: "Sudadera", image: productSudadera },
    ],
  },
];

const companyBenefits = [
  "Ahorro por volumen",
  "Planeación financiera",
  "Identidad consistente",
  "Materiales ecológicos",
  "Narrativa ESG clara",
];

const peopleBenefits = [
  "Prendas modernas",
  "Comodidad real",
  "Orgullo de pertenencia",
  "Conexión con propósito",
];

const expectations = [
  "Diseño profesional",
  "Producción confiable",
  "Entregas puntuales",
  "Comunicación clara",
  "Acompañamiento continuo",
];

const Lifestyle = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Base dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/40" />
        {/* Subtle LIFE blue tint - very light */}
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, hsl(210 40% 50% / 0.06) 0%, hsl(210 35% 40% / 0.08) 100%)' }}
        />
        <div 
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: `url(${lifeHero})` }}
        />
        
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={lifeLogo} 
                alt="Greenhug LIFE" 
                className="h-10 md:h-12 w-auto"
              />
              <a 
                href="https://www.instagram.com/greenhuglife/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white hover:border-white/60 transition-all"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Merch ecológica corporativa que sí se usa, sí representa tu marca y sí genera impacto.
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-6 leading-relaxed max-w-2xl">
              Un programa anual de prendas ecológicas hechas en México que unifica identidad, cultura organizacional y narrativa ESG.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Spline, text: "Hilo certificado" },
                { icon: Recycle, text: "Material 100% reciclado" },
                { icon: Palette, text: "Diseño profesional incluido" },
                { icon: BarChart3, text: "Evidencia para ESG" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/90 text-sm">
                  <item.icon className="w-4 h-4" />
                  {item.text}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="white" size="xl" className="hover:bg-project-life-light hover:text-project-life" onClick={() => window.open("https://wa.me/524443348043?text=" + encodeURIComponent("Hola, me interesa el proyecto Lifestyle de Greenhug."), "_blank")}>
                Hablar con un asesor
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                size="xl" 
                className="bg-transparent border border-white/60 text-white hover:bg-white/10 hover:border-white transition-all"
                onClick={() => document.getElementById("el-problema")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver cómo funciona
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="el-problema" className="section-padding bg-life-subtle">
        <div className="container-custom">
          <SectionHeader
            badge="El problema"
            title="El problema que LIFE resuelve"
            variant="life"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto">
            {problems.map((problem, i) => (
              <div key={i} className="card-premium p-4 flex items-center gap-3 border-life">
                <span className="text-lg font-bold text-rose-500">{i + 1}</span>
                <span className="text-foreground">{problem}</span>
              </div>
            ))}
          </div>

          <div className="card-premium p-6 mt-8 max-w-2xl mx-auto text-center border-life">
            <p className="text-muted-foreground">
              El merch tradicional genera estrés operativo, desperdicio y <strong className="text-foreground">cero impacto real</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section-padding bg-life-tint">
        <div className="container-custom">
          <SectionHeader
            badge="La solución"
            title="¿Qué es LIFE?"
            variant="life"
          />

          <div className="max-w-3xl mx-auto mt-8 text-center">
            <p className="text-lg text-muted-foreground mb-8">
              Greenhug LIFE es un programa anual de merch ecológica corporativa que elimina las urgencias, garantiza consistencia visual y convierte cada prenda en una herramienta de cultura e impacto ambiental.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="life">"No es una compra → es un programa"</Badge>
              <Badge variant="life">"No es urgencia → es planeación"</Badge>
              <Badge variant="life">"No es gasto → es identidad"</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Why LIFE Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Diferenciadores"
            title="¿Por qué LIFE es diferente?"
            variant="life"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {benefits.map((benefit, i) => (
              <div key={i} className="card-premium p-4 flex items-center gap-3 border-life">
                <div className="icon-container-life-sm flex-shrink-0">
                  <benefit.icon className="w-4 h-4 text-project-life" />
                </div>
                <span className="text-foreground text-sm">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-life-subtle">
        <div className="container-custom">
          <SectionHeader
            badge="Proceso"
            title="Cómo funciona LIFE"
            variant="life"
          />

          <div className="max-w-3xl mx-auto mt-12">
            <StepperItem
              number={1}
              title="Definimos tus necesidades anuales"
              description="Analizamos todos los momentos donde necesitas prendas corporativas."
              bullets={["Eventos", "Cultura interna", "Voluntariados", "Regalos y activaciones"]}
              variant="life"
            />
            <StepperItem
              number={2}
              title="Eliges tu programa LIFE"
              description="Seleccionamos el programa ideal según tu volumen y necesidades."
              bullets={["Volumen anual", "Número de diseños", "Meses sin intereses"]}
              variant="life"
            />
            <StepperItem
              number={3}
              title="Seleccionas productos, telas y colores"
              description="Personalizamos cada detalle de tu programa."
              bullets={["Playeras, hoodies, sudaderas y deportivas", "Variedad de telas ecológicas", "Colores alineados a tu marca"]}
              variant="life"
            />
            <StepperItem
              number={4}
              title="Producimos con calidad constante"
              description="Fabricamos en México con los más altos estándares."
              bullets={["Material 100% reciclado", "Producción profesional", "Alineación a tu marca"]}
              variant="life"
            />
            <StepperItem
              number={5}
              title="Entregamos durante todo el año"
              description="Producciones programadas, sin urgencias ni sorpresas."
              bullets={["Primera producción: 15–70 días", "Subsecuentes: 15–30 días", "MSI desde la firma del contrato"]}
              isLast
              variant="life"
            />
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Programas"
            title="Programas LIFE"
            variant="life"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {programs.map((program, i) => (
              <div 
                key={i} 
                className={`relative overflow-hidden rounded-xl flex flex-col min-h-[320px] ${program.popular ? "ring-2 ring-project-life" : ""}`}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${program.image})` }}
                />
                {/* Dark Overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/40" />
                
                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col h-full">
                  {program.popular && (
                    <Badge variant="life" className="absolute -top-0 left-1/2 -translate-x-1/2 translate-y-3">
                      Más solicitado
                    </Badge>
                  )}
                  
                  <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center mb-4">
                    <program.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="mt-auto">
                    <h3 className="text-xl font-semibold text-white mb-2">{program.name}</h3>
                    <p className="text-sm text-white/80 mb-4">{program.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Package className="w-4 h-4 text-project-life-light" />
                        <span className="text-white/90">{program.pieces}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CreditCard className="w-4 h-4 text-project-life-light" />
                        <span className="text-white/90">{program.msi}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Truck className="w-4 h-4 text-project-life-light" />
                        <span className="text-white/90">{program.shipments}</span>
                      </div>
                    </div>

                    <Button variant="white" className="w-full hover:bg-project-life-light hover:text-project-life" asChild>
                      <Link to="/#contacto">Conocer este programa</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground text-sm mt-6">
            📌 Todos incluyen: 1 diseño con 3 variaciones por cada 300 prendas.
          </p>
        </div>
      </section>

      {/* Catalog Section - Editorial Lookbook */}
      <section className="py-20 md:py-28 bg-life-tint">
        <div className="container-custom">
          <SectionHeader
            badge="Catálogo"
            title="Colección LIFE"
            variant="life"
          />

          <div className="mt-12 md:mt-16 space-y-16 md:space-y-24">
            {catalogCategories.map((category, i) => (
              <div key={i} className="space-y-6">
                {/* Category Title */}
                <h3 className="text-lg md:text-xl font-light tracking-wide text-foreground border-b border-project-life/20 pb-3">
                  {category.name}
                </h3>

                {/* Grid 12 columns: 8 products + 4 specs */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                  {/* Left: Product Gallery - 8 columns */}
                  <div className="lg:col-span-8">
                    <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 lg:pb-0 lg:overflow-visible scrollbar-hide">
                      {category.variants.map((variant, j) => (
                        <div key={j} className="flex-shrink-0 flex flex-col items-center w-[140px] md:w-[160px] lg:w-[180px]">
                          {/* Product Image Container with shadow line */}
                          <div className="relative w-full h-[160px] md:h-[180px] lg:h-[200px] overflow-hidden">
                            <img
                              src={variant.image}
                              alt={variant.name}
                              className="absolute bottom-0 left-1/2 -translate-x-1/2 max-h-[110%] w-auto object-contain object-bottom"
                            />
                            {/* Subtle shadow line at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-t from-project-life/20 to-transparent" />
                          </div>
                          {/* Variant Name */}
                          <span className="mt-3 text-xs font-light tracking-wide text-muted-foreground text-center">
                            {variant.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Technical Specifications - 4 columns */}
                  <div className="lg:col-span-4 flex lg:items-center mt-4 lg:mt-0">
                    <div className="space-y-3 lg:pl-6 lg:border-l lg:border-project-life/15">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-project-life/60">
                          Composición
                        </span>
                        <p className="text-xs font-light text-muted-foreground leading-relaxed max-w-[200px]">
                          {category.composition}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <Recycle className="w-3 h-3 text-project-life/50" />
                        <span className="text-[10px] text-muted-foreground/70 font-light">
                          Material GRS Certificado
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Subtle footer notes */}
        </div>
      </section>

      {/* Deliveries Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Entregas"
            title="Entregas durante el año"
            variant="life"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            {[
              { icon: Package, title: "Envíos desde 300 piezas", description: "Producción mínima eficiente" },
              { icon: Clock, title: "Entregas programadas", description: "Sin sorpresas ni urgencias" },
              { icon: Truck, title: "Producción bajo demanda anual", description: "Flexibilidad total" },
            ].map((item, i) => (
              <div key={i} className="card-premium p-6 text-center border-life">
                <div className="icon-container-life mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-project-life" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-life-subtle">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-premium p-6 md:p-8 border-life">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-container-life-sm">
                  <Award className="w-4 h-4 text-project-life" />
                </div>
                <h3 className="font-semibold text-foreground">Beneficios para tu empresa</h3>
              </div>
              <ul className="space-y-3">
                {companyBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground">
                    <Check className="w-5 h-5 text-project-life flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-premium p-6 md:p-8 border-life">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-container-life-sm">
                  <Heart className="w-4 h-4 text-project-life" />
                </div>
                <h3 className="font-semibold text-foreground">Beneficios para tu gente</h3>
              </div>
              <ul className="space-y-3">
                {peopleBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground">
                    <Check className="w-5 h-5 text-project-life flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Expectations Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Compromiso"
            title="Qué puedes esperar de Greenhug"
            variant="life"
          />

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {expectations.map((expectation, i) => (
              <div key={i} className="card-premium px-6 py-4 flex items-center gap-2 border-life">
                <Check className="w-5 h-5 text-project-life" />
                <span className="text-foreground">{expectation}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding-lg" style={{ background: 'linear-gradient(135deg, hsl(210 35% 35%) 0%, hsl(210 40% 25%) 100%)' }}>
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              LIFE no es merch. LIFE es identidad, cultura e impacto ambiental durante todo el año.
            </h2>
            <Button variant="white" size="xl" className="hover:bg-project-life-light hover:text-project-life" onClick={() => window.open("https://wa.me/524443348043?text=" + encodeURIComponent("Hola, me interesa el proyecto Lifestyle de Greenhug."), "_blank")}>
              👉 Hablar con un asesor
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Lifestyle;
