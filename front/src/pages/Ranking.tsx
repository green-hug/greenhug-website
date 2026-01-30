import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Badge from "@/components/shared/Badge";
import SectionHeader from "@/components/shared/SectionHeader";
import { Link } from "react-router-dom";
import { apiService } from "@/services/api";
import {
  Search,
  ArrowRight,
  TrendingUp,
  Droplets,
  TreePine,
  Recycle,
  Users,
  Shirt,
  Cloud,
  Filter,
} from "lucide-react";

const pointsSystem = [
  { icon: Droplets, value: "2,000 L de agua", points: "= 1 punto" },
  { icon: TreePine, value: "1 árbol plantado", points: "= 3 puntos" },
  { icon: Recycle, value: "8 botellas PET", points: "= 1 punto" },
  { icon: Users, value: "1 voluntario", points: "= 3 puntos" },
  { icon: Shirt, value: "2 uniformes reciclados", points: "= 1 punto" },
  { icon: Cloud, value: "3 kg CO₂", points: "= 1 punto" },
];

// Mock data comentado - ahora se usa datos reales del backend
/*
const mockCompanies = [
  {
    id: 1,
    name: "Empresa Manufactura S.A.",
    slug: "empresa-manufactura",
    points: 15420,
    growth: 23,
    industry: "Manufactura",
    projects: ["EXP", "LIFE"],
    region: "Centro",
  },
  {
    id: 2,
    name: "Grupo Retail México",
    slug: "grupo-retail",
    points: 12890,
    growth: 18,
    industry: "Retail",
    projects: ["EXP", "UPC"],
    region: "Metropolitana",
  },
  {
    id: 3,
    name: "Servicios Financieros Corp",
    slug: "servicios-financieros",
    points: 11250,
    growth: 31,
    industry: "Servicios",
    projects: ["EXP", "LIFE", "UPC"],
    region: "Norte",
  },
  {
    id: 4,
    name: "Tecnología Innovadora",
    slug: "tecnologia-innovadora",
    points: 9870,
    growth: 15,
    industry: "Tecnología",
    projects: ["LIFE"],
    region: "Metropolitana",
  },
  {
    id: 5,
    name: "Alimentos del Campo",
    slug: "alimentos-campo",
    points: 8540,
    growth: 42,
    industry: "Alimentos",
    projects: ["EXP", "UPC"],
    region: "Sur",
  },
  {
    id: 6,
    name: "Construcciones Verdes",
    slug: "construcciones-verdes",
    points: 7230,
    growth: 28,
    industry: "Construcción",
    projects: ["EXP"],
    region: "Centro",
  },
  {
    id: 7,
    name: "Logística Nacional",
    slug: "logistica-nacional",
    points: 6890,
    growth: 12,
    industry: "Logística",
    projects: ["LIFE", "UPC"],
    region: "Norte",
  },
  {
    id: 8,
    name: "Farmacéutica Plus",
    slug: "farmaceutica-plus",
    points: 5670,
    growth: 35,
    industry: "Farmacéutica",
    projects: ["EXP", "LIFE"],
    region: "Metropolitana",
  },
];
*/

// Interface para los datos de ranking del backend
interface RankingCompany {
  id: string;
  name: string;
  slug: string;
  points: number;
  growth: number;
  industry: string;
  projects: string[];
  region: string;
}

const industries = ["Todas", "Manufactura", "Retail", "Servicios", "Tecnología", "Alimentos", "Construcción", "Logística", "Farmacéutica"];
const projectTypes = ["Todos", "EXP", "LIFE", "UPC"];
const regions = ["Todas", "Norte", "Centro", "Sur", "Metropolitana"];

const Ranking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("Todas");
  const [selectedProject, setSelectedProject] = useState("Todos");
  const [selectedRegion, setSelectedRegion] = useState("Todas");
  const [companies, setCompanies] = useState<RankingCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadRankingData();
  }, []);

  const loadRankingData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Helper para acceder a campos en diferentes formatos
      const getField = (obj: any, field: string) => {
        if (!obj) return null;
        if (obj[field] !== undefined) return obj[field];
        
        const camelCase = field.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        if (obj[camelCase] !== undefined) return obj[camelCase];
        
        const snakeCase = field.replace(/([A-Z])/g, '_$1').toLowerCase();
        if (obj[snakeCase] !== undefined) return obj[snakeCase];
        
        return null;
      };
      
      // Intentar obtener ranking del año actual primero
      const currentYear = new Date().getFullYear();
      let rankingResponse;
      
      try {
        console.log('Intentando obtener ranking por año:', currentYear);
        rankingResponse = await apiService.getRankingByYear(currentYear);
      } catch (yearError) {
        console.warn('Fallo ranking por año, intentando ranking general:', yearError.message);
        try {
          rankingResponse = await apiService.getRankingGeneral();
        } catch (generalError) {
          console.error('También falló ranking general:', generalError.message);
          throw generalError;
        }
      }
      
      // El backend ahora devuelve { success, totalEmpresas, ranking, estadisticas }
      console.log('Respuesta completa del backend:', rankingResponse);
      const rankingData = rankingResponse.ranking || rankingResponse;
      console.log('Datos de ranking extraídos:', rankingData);
      
      if (!rankingData || !Array.isArray(rankingData) || rankingData.length === 0) {
        console.error('Error: No hay datos de ranking o no es un array');
        throw new Error('No se encontraron datos de ranking');
      }
      
      console.log('Total de empresas en ranking:', rankingData.length);
      
      // Mapear los datos del backend al formato esperado por el UI
      const mappedCompanies: RankingCompany[] = rankingData.map((item: any, idx: number) => {
        console.log(`\n=== Procesando empresa ${idx + 1} ===`);
        console.log('Item completo:', JSON.stringify(item, null, 2));
        
        // El backend ya calcula los puntos y tiene la estructura correcta
        const empresa = item.empresa || item;
        
        // Generar slug a partir del nombre de la empresa
        const nombreEmpresa = getField(empresa, 'nombre') || `Empresa`;
        const slug = nombreEmpresa
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        
        // Obtener métricas de impacto del item o empresa - IMPORTANTE: convertir a número
        const arboles = Number(getField(item, 'arboles_plantados')) || 0;
        const agua = Number(getField(item, 'litros_agua')) || 0;
        const co2 = Number(getField(item, 'co2kg') || getField(item, 'co2_kg')) || 0;
        const botellas = Number(getField(item, 'botellas_recicladas')) || 0;
        const voluntarios = Number(getField(item, 'voluntarios')) || 0;
        const uniformes = Number(getField(item, 'uniformes_reciclados')) || 0;
        
        // Simular proyectos basados en los tipos de impacto
        const projects: string[] = [];
        if (arboles > 0 || agua > 0) projects.push("EXP");
        if (voluntarios > 0 || co2 > 0) projects.push("LIFE");
        if (botellas > 0 || uniformes > 0) projects.push("UPC");
        
        // Usar puntos calculados por el backend o calcular manualmente
        let puntosTotales = Number(getField(item, 'puntos_totales')) || 0;
        
        // Si no hay puntos_totales del backend, calcular usando el sistema de Greenhug
        if (puntosTotales === 0) {
          puntosTotales += arboles * 3;                    // 1 árbol = 3 puntos
          puntosTotales += Math.floor(agua / 2000);        // 2,000L agua = 1 punto
          puntosTotales += Math.floor(co2 / 3);            // 3kg CO₂ = 1 punto
          puntosTotales += Math.floor(botellas / 8);       // 8 botellas = 1 punto
          puntosTotales += voluntarios * 3;                // 1 voluntario = 3 puntos
          puntosTotales += Math.floor(uniformes / 2);      // 2 uniformes = 1 punto
        }
        
        console.log(`Empresa: ${nombreEmpresa}, Puntos: ${puntosTotales}`, {
          arboles, agua, co2, botellas, voluntarios, uniformes,
          puntosDelBackend: getField(item, 'puntos_totales')
        });
        
        // Calcular crecimiento simulado (se podría obtener comparando con año anterior)
        const growth = Math.floor(Math.random() * 40) + 10; // Temporal: 10-50%
        
        return {
          id: getField(empresa, 'id') || getField(item, 'empresaId') || `empresa-${item.posicion}`,
          name: nombreEmpresa,
          slug,
          points: puntosTotales,
          growth,
          industry: getField(empresa, 'tipo_empresa') || getField(empresa, 'tipoEmpresa') || 'Otros',
          projects,
          region: getField(empresa, 'region') || 'No especificada'
        };
      });
      
      console.log('Datos de ranking mapeados:', mappedCompanies);
      setCompanies(mappedCompanies);
    } catch (err) {
      console.error('Error loading ranking data:', err);
      setError('Error al cargar los datos del ranking');
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustry === "Todas" || company.industry === selectedIndustry;
    const matchesProject = selectedProject === "Todos" || company.projects.includes(selectedProject);
    const matchesRegion = selectedRegion === "Todas" || company.region === selectedRegion;
    return matchesSearch && matchesIndustry && matchesProject && matchesRegion;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest to-forest-dark opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1920')] bg-cover bg-center mix-blend-overlay opacity-30" />
        
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Reconocemos a las empresas que decidieron pasar de la intención a la acción.
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Impacto real, medible y verificable a través de proyectos ejecutados con Greenhug.
            </p>
            <Button variant="white" size="xl" onClick={() => window.open("https://wa.me/525512345678?text=" + encodeURIComponent("Hola, me gustaría que mi empresa aparezca en el Ranking de Impacto de Greenhug."), "_blank")}>
              Quiero que mi empresa aparezca aquí
            </Button>
          </div>
        </div>
      </section>

      {/* What is Ranking Section */}
      <section className="section-padding bg-sage-tint">
        <div className="container-custom">
          <SectionHeader
            badge="Sobre el Ranking"
            title="¿Qué es el Ranking de Impacto?"
          />

          <div className="max-w-2xl mx-auto mt-8">
            <ul className="space-y-4">
              {[
                "No es un ranking de 'quién es más verde'",
                "Es un sistema de reconocimiento continuo",
                "Solo considera proyectos realizados con Greenhug",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground text-sm mt-6 text-center">
              Muchas empresas hacen acciones fuera de Greenhug. Aquí medimos únicamente lo que construimos juntos.
            </p>
          </div>
        </div>
      </section>

      {/* Points System Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Sistema de puntos"
            title="¿Cómo se mide el impacto?"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            {pointsSystem.map((item, i) => (
              <div key={i} className="card-premium p-4 text-center group hover:scale-105 transition-transform">
                <div className="icon-container mx-auto mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-sm text-foreground font-medium mb-1">{item.value}</div>
                <div className="text-xs text-primary font-bold">{item.points}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Ranking Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <SectionHeader
            title="Ranking interactivo"
          />

          {/* Search and Filters */}
          <div className="mt-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar empresa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filtrar:</span>
              </div>
              
              {/* Industry Filter */}
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="text-sm border border-border rounded-lg px-3 py-1.5 bg-card"
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>

              {/* Project Filter */}
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="text-sm border border-border rounded-lg px-3 py-1.5 bg-card"
              >
                {projectTypes.map((project) => (
                  <option key={project} value={project}>{project}</option>
                ))}
              </select>

              {/* Region Filter */}
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="text-sm border border-border rounded-lg px-3 py-1.5 bg-card"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Companies List */}
          <div className="mt-8 space-y-4">
            {loading && (
              <div className="text-center py-12 text-muted-foreground">
                Cargando datos del ranking...
              </div>
            )}
            
            {error && (
              <div className="text-center py-12 text-red-600">
                {error}
              </div>
            )}
            
            {!loading && !error && filteredCompanies.map((company, index) => (
              <Link
                key={company.id}
                to={`/ranking/empresa/${company.slug}`}
                className="card-premium p-4 md:p-6 flex items-center gap-4 group hover:shadow-premium-lg transition-all"
              >
                {/* Rank Number */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {index + 1}
                </div>

                {/* Company Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {company.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{company.industry}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{company.region}</span>
                  </div>
                </div>

                {/* Projects */}
                <div className="hidden md:flex gap-1">
                  {company.projects.map((project) => (
                    <Badge key={project} variant="muted" className="text-xs">
                      {project}
                    </Badge>
                  ))}
                </div>

                {/* Points */}
                <div className="text-right flex-shrink-0">
                  <div className="text-xl md:text-2xl font-bold text-primary">
                    {company.points.toLocaleString()}
                  </div>
                  <div className="flex items-center justify-end gap-1 text-success text-sm">
                    <TrendingUp className="w-3 h-3" />
                    {/* +{company.growth}% */}
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </Link>
            ))}

            {!loading && !error && filteredCompanies.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No se encontraron empresas con los filtros seleccionados.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding-lg bg-forest">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Cada punto representa una acción real. ¿Cuántos puntos podría generar tu empresa este año?
            </h2>
            <div className="flex justify-center mt-8">
              <Button variant="white" size="xl" onClick={() => window.open("https://wa.me/524443348043?text=" + encodeURIComponent("Hola, me gustaría hablar con un asesor sobre los proyectos de Greenhug."), "_blank")}>
                Hablar con un asesor
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Ranking;