import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Badge from "@/components/shared/Badge";
import SectionHeader from "@/components/shared/SectionHeader";
import StepperItem from "@/components/shared/StepperItem";
import { Link } from "react-router-dom";
import upcLogo from "@/assets/upc-logo.png";
import upcHero from "@/assets/upc-hero.jpg";
import upcCircularidad from "@/assets/upc-circularidad.png";
import upcSeparacion from "@/assets/upc-separacion.png";
import upcImpacto from "@/assets/upc-impacto.png";
import upcProductos from "@/assets/upc-productos.png";
import upcEndtoend from "@/assets/upc-endtoend-new.png";
import upcSolucion from "@/assets/upc-solucion-trans.png";
import productMochila from "@/assets/product-mochila.png";
import productLonchera from "@/assets/product-lonchera.png";
import productMonedero from "@/assets/product-monedero.png";
import productEstuche from "@/assets/product-estuche.png";
import productTotebag from "@/assets/product-totebag.png";
import {
  Recycle,
  Shield,
  BarChart3,
  Package,
  Trash2,
  AlertTriangle,
  DollarSign,
  FileWarning,
  ArrowRight,
  Leaf,
  Microscope,
  Globe,
  Wrench,
  Briefcase,
  MapPin,
  Instagram,
  ChevronDown,
} from "lucide-react";

const problems = [
  { icon: Trash2, text: "Uniformes que terminan en rellenos sanitarios" },
  { icon: DollarSign, text: "Costos ocultos de almacenamiento" },
  { icon: AlertTriangle, text: "Riesgo reputacional (venta informal, mal uso)" },
  { icon: FileWarning, text: "Falta de datos auditables para ESG" },
];

const differentiators = [
  { icon: Leaf, title: "Circularidad real", description: "Más de 8 años de experiencia", image: upcCircularidad },
  { icon: Microscope, title: "Separación segura", description: "Protege tu identidad corporativa", image: upcSeparacion },
  { icon: Globe, title: "Impacto medible", description: "Métricas claras y comunicables", image: upcImpacto },
  { icon: Package, title: "Productos útiles", description: "Totebags, mochilas y más", image: upcProductos },
  { icon: Wrench, title: "Servicio end-to-end", description: "De la recolección al producto", image: upcEndtoend },
  { icon: Briefcase, title: "Solución transversal", description: "ESG, RH, Marketing", image: upcSolucion },
];

const products = [
  { name: "Totebag", image: productTotebag },
  { name: "Mochila", image: productMochila },
  { name: "Lonchera", image: productLonchera },
  { name: "Estuche", image: productEstuche },
  { name: "Monedero", image: productMonedero },
];

const regions = [
  { name: "Noroeste", states: "BC, BCS, Sonora, Sinaloa, Chihuahua" },
  { name: "Noreste", states: "Coahuila, Nuevo León, Tamaulipas" },
  { name: "Centro Occidente", states: "Jalisco, Colima, Michoacán, Guanajuato, Nayarit, Aguascalientes, Zacatecas" },
  { name: "Centro Sur", states: "Querétaro, Hidalgo, Morelos, Puebla, Tlaxcala" },
  { name: "Metropolitana", states: "CDMX, Estado de México" },
  { name: "Sur Sureste", states: "Guerrero, Oaxaca, Chiapas, Veracruz, Tabasco, Campeche, Yucatán, Quintana Roo" },
];

const Upcycling = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* Hero Section - Clean with subtle sand overlay */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background image - full visibility */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${upcHero})` }} 
        />
        {/* Very subtle sand overlay (5-8%) */}
        <div className="absolute inset-0 bg-[hsl(35_30%_40%/0.08)]" />
        {/* Dark gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        
        <div className="container-custom relative z-10 py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <img 
                src={upcLogo} 
                alt="Greenhug UPC" 
                className="h-12 md:h-14 w-auto"
              />
              <a 
                href="https://www.instagram.com/greenhugupc/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white hover:border-white/50 transition-all"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Transforma tus uniformes en impacto real y evidencia ESG
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed max-w-2xl">
              Economía circular corporativa que convierte residuos textiles en productos, datos y reputación.
            </p>
            
            <div className="flex flex-wrap gap-5 mb-10">
              {[
                { icon: Recycle, text: "Economía circular aplicada" },
                { icon: BarChart3, text: "Evidencia ESG verificable" },
                { icon: Shield, text: "Destrucción segura de identidad" },
                { icon: Package, text: "Productos útiles con historia" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/90 text-sm">
                  <item.icon className="w-4 h-4 text-white/70" />
                  {item.text}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Primary CTA - Green Greenhug */}
              <Button size="xl" onClick={() => window.open("https://wa.me/524443348043?text=" + encodeURIComponent("Hola, me interesa el proyecto Upcycling de Greenhug."), "_blank")}>
                Hablar con un asesor
                <ArrowRight className="w-5 h-5" />
              </Button>
              {/* Secondary CTA - White outline only */}
              <Button 
                size="xl" 
                className="bg-transparent border border-white/50 text-white hover:bg-white/10 hover:border-white/70 transition-all"
                onClick={() => document.getElementById("el-problema")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver cómo funciona
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Clean white cards */}
      <section id="el-problema" className="section-padding-lg">
        <div className="container-custom">
          <Badge variant="upc" className="mb-4">El problema</Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            El problema que enfrentan hoy las empresas
          </h2>
          <div className="h-1 w-16 bg-project-upc/30 rounded-full mt-4" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {problems.map((problem, i) => (
              <div key={i} className="card-premium p-6 bg-white">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-rose-100 mb-4">
                  <problem.icon className="w-5 h-5 text-rose-500" />
                </div>
                <p className="text-foreground">{problem.text}</p>
              </div>
            ))}
          </div>

          <div className="card-premium p-8 mt-10 max-w-2xl mx-auto text-center bg-white">
            <p className="text-muted-foreground text-lg">
              Hoy ya no basta con "desechar correctamente". Reguladores, inversionistas y colaboradores exigen{" "}
              <span className="relative inline-block">
                <span className="text-foreground font-medium">evidencia real</span>
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-project-upc/40 rounded-full" />
              </span>.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section - Very subtle tint */}
      <section className="section-padding-lg bg-project-upc-muted/50">
        <div className="container-custom">
          <Badge variant="upc" className="mb-4">La solución</Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            ¿Qué es UPC?
          </h2>
          <div className="h-1 w-16 bg-project-upc/30 rounded-full mt-4" />

          <div className="max-w-3xl mx-auto mt-12 text-center">
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Greenhug UPC es el programa que transforma residuos textiles corporativos en productos circulares, datos verificables y narrativa ESG lista para reportar.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="upc" className="text-base px-5 py-2">"No es promesa → es evidencia"</Badge>
              <Badge variant="upc" className="text-base px-5 py-2">"No es gasto → es reputación"</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Why UPC Section */}
      <section className="section-padding-lg">
        <div className="container-custom">
          <Badge variant="upc" className="mb-4">Diferenciadores</Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            ¿Por qué UPC de Greenhug?
          </h2>
          <div className="h-1 w-16 bg-project-upc/30 rounded-full mt-4" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {differentiators.map((item, i) => (
              <div 
                key={i} 
                className="relative h-48 rounded-xl overflow-hidden group"
              >
                {/* Background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/50 transition-colors" />
                {/* Content */}
                <div className="relative z-10 h-full p-6 flex flex-col justify-end">
                  <h4 className="font-semibold text-white text-lg mb-1">{item.title}</h4>
                  <p className="text-sm text-white/80">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Technical, operational feel */}
      <section className="section-padding-lg bg-project-upc-muted/30">
        <div className="container-custom">
          <Badge variant="upc" className="mb-4">Proceso</Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Cómo funciona UPC
          </h2>
          <div className="h-1 w-16 bg-project-upc/30 rounded-full mt-4" />

          <div className="max-w-3xl mx-auto mt-14">
            <StepperItem
              number={1}
              title="Definimos la meta"
              description="Establecemos objetivos claros basados en el volumen de residuos textiles de tu organización."
              bullets={["500 kg", "1,000 kg", "2,000 kg", "4,000 kg"]}
              variant="upc"
            />
            <StepperItem
              number={2}
              title="Bolsas especializadas"
              description="Entregamos bolsas para recolección interna por área, facilitando la separación y organización."
              bullets={["Bolsas identificadas por lote", "Instrucciones claras para tu equipo"]}
              variant="upc"
            />
            <StepperItem
              number={3}
              title="Recolecciones programadas"
              description="Según tu paquete, programamos las recolecciones necesarias."
              bullets={["1 a 8 recolecciones según volumen", "Coordinación flexible con tu operación"]}
              variant="upc"
            />
            <StepperItem
              number={4}
              title="Transformación responsable"
              description="Procesamos los textiles de forma segura y trazable."
              bullets={["Clasificación por material", "Destrucción segura de identidad corporativa", "Conversión en producto nuevo"]}
              variant="upc"
            />
            <StepperItem
              number={5}
              title="Dashboard y evidencia"
              description="Accede a datos en tiempo real listos para tus reportes ESG."
              bullets={["KPIs verificables", "Evidencia fotográfica", "Información lista para auditorías"]}
              variant="upc"
              isLast
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding-lg bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge variant="upc" className="mb-4">Productos</Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Productos que puedes obtener
            </h2>
            <div className="h-1 w-16 bg-project-upc/30 rounded-full mt-4 mx-auto" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
            {products.map((product, i) => (
              <div key={i} className="flex flex-col items-center group">
                {/* Product image with floating shadow */}
                <div className="relative w-full aspect-square flex items-center justify-center mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:-translate-y-2"
                  />
                  {/* Floating shadow */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/10 rounded-[50%] blur-md transition-all duration-300 group-hover:w-2/3 group-hover:bg-black/8" />
                </div>
                {/* Product name */}
                <span className="text-gray-700 font-normal text-base">{product.name}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground text-sm mt-14 max-w-xl mx-auto">
            Los productos se cotizan por separado y pueden usarse en eventos, kits o regalos corporativos.
          </p>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="section-padding-lg bg-project-upc-muted/40">
        <div className="container-custom">
          <Badge variant="upc" className="mb-4">Adicionales</Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Add-ons disponibles
          </h2>
          <div className="h-1 w-16 bg-project-upc/30 rounded-full mt-4" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 max-w-3xl mx-auto">
            {[
              { emoji: "📄", title: "Reporte ESG completo", description: "Documento listo para auditorías" },
              { emoji: "🎥", title: "Video + fotografía", description: "Contenido del proceso completo" },
              { emoji: "🎒", title: "Producción de productos UPC", description: "Transforma residuos en regalos" },
            ].map((addon, i) => (
              <div key={i} className="card-premium p-6 text-center bg-white hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{addon.emoji}</div>
                <h4 className="font-semibold text-foreground mb-1">{addon.title}</h4>
                <p className="text-sm text-muted-foreground">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Section - Warm neutral tone */}
      <section className="section-padding bg-[hsl(35_20%_22%)]">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-white/95 font-medium leading-relaxed">
              Ya no basta producir. Las empresas deben hacerse responsables de lo que generan.
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="section-padding-lg">
        <div className="container-custom">
          <Badge variant="upc" className="mb-4">Cobertura</Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Cobertura nacional
          </h2>
          <div className="h-1 w-16 bg-project-upc/30 rounded-full mt-4" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-14 max-w-4xl mx-auto">
            {regions.map((region, i) => (
              <details key={i} className="group card-premium bg-white cursor-pointer">
                <summary className="flex items-center justify-between gap-3 px-5 py-4 list-none">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-project-upc" />
                    <span className="text-foreground font-medium">{region.name}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-4 pt-1 animate-accordion-down">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {region.states}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Warm, premium */}
      <section className="section-padding-lg bg-[hsl(35_20%_22%)]">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
              Convierte tus residuos en impacto, datos y reputación.
            </h2>
            <Button size="xl" onClick={() => window.open("https://wa.me/524443348043?text=" + encodeURIComponent("Hola, me interesa el proyecto Upcycling de Greenhug."), "_blank")}>
              Hablar con un asesor
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Upcycling;
