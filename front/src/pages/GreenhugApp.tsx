import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TreePine, 
  MapPin, 
  BarChart3, 
  Shield, 
  Users, 
  Smartphone,
  Monitor,
  Check,
  X,
  QrCode,
  Camera,
  Calendar,
  Download,
  Lock,
  Gamepad2,
  Star,
  Wrench,
  Globe,
  Building2,
  ChevronRight,
  Leaf,
  Target,
  FileCheck,
  Map,
  Award,
  TrendingUp
} from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";
import appDesktop from "@/assets/app-desktop.png";
import appMobile from "@/assets/app-mobile.png";
import HowItWorksSection from "@/components/greenhug/HowItWorksSection";

const GreenhugApp = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCTA = () => {
    openWhatsApp("Hola, me interesa conocer cómo integrar Greenhug.app a mi proyecto.");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-up">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
                <Leaf className="w-4 h-4 mr-2" />
                Plataforma de Impacto Ambiental
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                El sistema operativo del{" "}
                <span className="text-gradient-forest">impacto ambiental</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                No es un dashboard. Es la plataforma que permite ejecutar proyectos ambientales bien hechos, 
                darles seguimiento y convertir cada árbol en datos claros, trazables y auditables.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: TreePine, text: "Reforestaciones bien ejecutadas" },
                  { icon: Target, text: "Árboles que sobreviven" },
                  { icon: BarChart3, text: "Impacto medible y transparente" },
                  { icon: FileCheck, text: "Evidencia lista para auditorías" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-foreground/80">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={() => window.open('https://www.greenhug.app', '_blank')} 
                size="xl" 
                className="group"
              >
                Conoce Greenhug.app
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            {/* Right - App Mockups */}
            <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
              {/* Desktop Mockup */}
              <div className="relative z-10 bg-card rounded-2xl shadow-2xl border border-border/50 overflow-hidden group hover:shadow-primary/20 hover:shadow-3xl transition-all duration-500">
                {/* Browser Chrome */}
                <div className="bg-muted/50 px-4 py-3 flex items-center gap-2 border-b border-border/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-background/50 rounded-md px-4 py-1 text-xs text-muted-foreground flex items-center gap-2">
                      <Lock className="w-3 h-3" />
                      app.greenhug.mx
                    </div>
                  </div>
                </div>
                {/* Real Desktop Screenshot */}
                <div className="relative overflow-hidden">
                  <img 
                    src={appDesktop} 
                    alt="Greenhug App - Vista de mapa del proyecto con árboles geolocalizados" 
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  {/* Subtle gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card/10 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
              
              {/* Mobile Mockup */}
              <div className="absolute -bottom-8 -right-4 lg:right-8 w-36 md:w-44 bg-card rounded-[2rem] shadow-2xl border border-border/50 overflow-hidden z-20 group hover:shadow-primary/30 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                {/* Real Mobile Screenshot - cropped to hide camera area */}
                <div className="relative overflow-hidden bg-background">
                  <img 
                    src={appMobile} 
                    alt="Greenhug App - Registro de árbol en móvil" 
                    className="w-full h-auto object-cover object-bottom group-hover:scale-[1.02] transition-transform duration-700 -mt-8"
                  />
                </div>
                {/* Home Indicator */}
                <div className="bg-background py-2 flex justify-center">
                  <div className="w-24 h-1 bg-foreground/20 rounded-full" />
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute top-1/2 -right-8 w-24 h-24 bg-primary/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
              
              {/* Floating Badge */}
              <div className="absolute -top-4 right-8 lg:right-24 bg-card rounded-xl shadow-lg border border-primary/20 px-4 py-2 z-30 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <TreePine className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Árboles registrados</p>
                    <p className="text-sm font-bold text-primary">+12,847</p>
                  </div>
                </div>
              </div>
              
              {/* Second Floating Badge */}
              <div className="absolute bottom-24 -left-4 lg:-left-8 bg-card rounded-xl shadow-lg border border-primary/20 px-4 py-2 z-30 animate-fade-in hidden lg:block" style={{ animationDelay: "0.7s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Supervivencia</p>
                    <p className="text-sm font-bold text-green-500">94.2%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge className="bg-destructive/10 text-destructive border-destructive/20 mb-4">
              El problema actual
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Por qué la mayoría de las reforestaciones <span className="text-destructive">no funcionan</span>?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <div className="bg-card rounded-2xl p-8 border border-destructive/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <X className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold">Sin Greenhug.app</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Se planta → foto grupal → nadie vuelve",
                    "No hay datos confiables ni medibles",
                    "No se sabe cuántos árboles siguen vivos",
                    "ESG basado en narrativa, no en evidencia",
                    "Eventos sin continuidad ni seguimiento"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* After */}
            <div className="bg-card rounded-2xl p-8 border border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Con Greenhug.app</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Registro en campo con evidencia real",
                    "Seguimiento calendarizado y obligatorio",
                    "Roles claros y responsables asignados",
                    "Datos auditables y descargables",
                    "Impacto que mejora con el tiempo"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Flow Section with Real Screenshots */}
      <HowItWorksSection />

      {/* Roles Section */}
      <section className="section-padding bg-gradient-to-b from-primary/5 to-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              Ecosistema conectado
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Roles dentro de <span className="text-gradient-forest">Greenhug.app</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conectamos a todas las personas involucradas en un proyecto ambiental, cada una con su rol, responsabilidades y beneficios claros.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                role: "Voluntario",
                color: "bg-blue-500",
                benefit: "Vive una experiencia clara, gamificada y con sentido. Tu impacto queda registrado y visible.",
                features: ["Registro a eventos", "Registro de árboles", "Visualiza tu impacto", "Itinerario y líderes", "Logros y rankings"]
              },
              {
                icon: Star,
                role: "Líder Reforestador",
                color: "bg-amber-500",
                benefit: "Reconocimiento, responsabilidad y seguimiento de tu desempeño como líder.",
                features: ["Apoyo en coordinación", "Badge especial por evento", "Evaluación por puntos", "Historial de liderazgo"]
              },
              {
                icon: Wrench,
                role: "Brigadista",
                color: "bg-emerald-500",
                benefit: "Trabajo técnico ordenado y medible con herramientas profesionales.",
                features: ["Mapa geolocalizado", "Registro de riego y mantenimiento", "Priorización por urgencia", "Evidencia del cuidado"]
              },
              {
                icon: Globe,
                role: "Socio Regional",
                color: "bg-purple-500",
                benefit: "Control total del territorio y operación clara de todos los proyectos.",
                features: ["Gestión de eventos", "Control de brigadistas", "KPIs del territorio", "Comparativa regional", "Finanzas y facturación"]
              },
              {
                icon: Building2,
                role: "Admin Corporativo",
                color: "bg-rose-500",
                benefit: "Impacto real para ESG, auditorías y comunicación interna/externa.",
                features: ["KPIs y evidencia", "Mapas y supervivencia", "Reportes descargables", "Gestión de eventos", "Branding personalizado"]
              }
            ].map((item, i) => (
              <div key={i} className="group bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-lg`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold">{item.role}</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  {item.benefit}
                </p>
                <ul className="space-y-2">
                  {item.features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              Funcionalidades clave
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lo que hace única a <span className="text-gradient-forest">Greenhug.app</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Trazabilidad real del impacto",
                description: "Cada árbol tiene ID único, ubicación, fotos, especie y historial completo de cuidados."
              },
              {
                icon: Map,
                title: "Mapa interactivo del proyecto",
                description: "Filtros por estado, especie y tipo de mantenimiento. Visualiza todo en tiempo real."
              },
              {
                icon: TrendingUp,
                title: "Seguimiento que garantiza supervivencia",
                description: "El sistema obliga a cuidar, no solo plantar. Alertas y recordatorios automáticos."
              },
              {
                icon: Download,
                title: "Reportes listos para empresa",
                description: "CSV, listas, certificados y evidencias para ESG y auditorías internas."
              },
              {
                icon: Lock,
                title: "Control de acceso a eventos",
                description: "Links personalizados, códigos QR, códigos de acceso y aprobación manual."
              },
              {
                icon: Gamepad2,
                title: "Experiencia gamificada",
                description: "Clara, guiada y motivante para voluntarios. Rankings, logros y reconocimientos."
              }
            ].map((item, i) => (
              <div key={i} className="group bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantage Section */}
      <section className="section-padding bg-primary/5">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-6">
              Ventaja competitiva
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
              Greenhug.app es lo que convierte una reforestación en un{" "}
              <span className="text-gradient-forest">proyecto serio</span>
            </h2>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {[
                "Impacto verificable, no narrativo",
                "Escalabilidad sin perder calidad",
                "Transparencia total en cada paso",
                "Mayor supervivencia de árboles",
                "Experiencia premium para empresas",
                "Datos auditables y exportables"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-card rounded-xl px-4 py-3 border border-primary/10">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-left">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <TreePine className="w-16 h-16 mx-auto mb-8 opacity-80" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Esto no es plantar árboles.
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90">
              Es construir bosques con datos, cuidado y responsabilidad.
            </p>
            <Button 
              onClick={handleCTA}
              size="xl" 
              variant="white"
              className="group shadow-2xl"
            >
              <span>👉</span>
              <span className="ml-2">Conoce cómo integrar Greenhug.app</span>
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GreenhugApp;
