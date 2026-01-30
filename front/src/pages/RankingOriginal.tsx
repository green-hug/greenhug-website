import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Badge from "@/components/shared/Badge";
import SectionHeader from "@/components/shared/SectionHeader";
import { Link } from "react-router-dom";
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
  Loader2,
  Trophy
} from "lucide-react";
import { Empresa } from "@/types/backend";
import { apiService } from "@/services/api";
import { toast } from "@/hooks/use-toast";

const pointsSystem = [
  { icon: Droplets, value: "2,000 L de agua", points: "= 1 punto" },
  { icon: TreePine, value: "1 árbol plantado", points: "= 3 puntos" },
  { icon: Recycle, value: "8 botellas PET", points: "= 1 punto" },
  { icon: Users, value: "1 voluntario", points: "= 3 puntos" },
  { icon: Shirt, value: "2 uniformes reciclados", points: "= 1 punto" },
  { icon: Cloud, value: "3 kg CO₂", points: "= 1 punto" },
];

interface CompanyWithPoints extends Empresa {
  points: number;
  growth?: number;
}

const RankingT = () => {
  const [companies, setCompanies] = useState<CompanyWithPoints[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyWithPoints[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Todas");
  const [selectedRegion, setSelectedRegion] = useState("Todas");
  const [selectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    loadRanking();
  }, [selectedYear]);

  const loadRanking = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Cargando ranking...');
      
      // Usar el endpoint de ranking que ya calcula todo correctamente
      const rankingResponse = await apiService.getRankingGeneral();
      
      if (!rankingResponse.success || !rankingResponse.ranking) {
        throw new Error('No se pudo cargar el ranking');
      }

      console.log('📊 Ranking cargado:', rankingResponse.ranking);
      
      // Mapear los datos del ranking al formato esperado
      const companiesWithPoints: CompanyWithPoints[] = rankingResponse.ranking.map((item: any) => {
        const empresa = item.empresa;
        
        return {
          id: empresa.id,
          nombre: empresa.nombre,
          tipo_empresa: empresa.tipo_empresa,
          region: empresa.region,
          ciudad: empresa.ciudad,
          pais: empresa.pais,
          descripcion_impacto: empresa.descripcion_impacto,
          created_at: empresa.created_at,
          updated_at: empresa.updated_at,
          points: item.puntos_totales || 0,
          growth: Math.floor(Math.random() * 50) // Simulado por ahora
        };
      });

      console.log('\n✅ Ranking procesado:', companiesWithPoints.map(c => ({ 
        nombre: c.nombre, 
        puntos: c.points 
      })));
      
      setCompanies(companiesWithPoints);
      setFilteredCompanies(companiesWithPoints);
      
    } catch (err) {
      console.error('❌ Error cargando ranking:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar ranking';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }
  // Filtros
  useEffect(() => {
    let filtered = companies;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(company =>
        company.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.tipo_empresa.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por tipo de empresa
    if (selectedFilter !== "Todas") {
      filtered = filtered.filter(company => company.tipo_empresa === selectedFilter);
    }

    // Filtrar por región
    if (selectedRegion !== "Todas") {
      filtered = filtered.filter(company => company.region === selectedRegion);
    }

    setFilteredCompanies(filtered);
  }, [companies, searchTerm, selectedFilter, selectedRegion]);

  const industries = ["Todas", "Manufactura", "Retail", "Servicios", "Tecnologia", "Alimentos", "Construccion", "Logistica", "Farmaceutica"];
  const regions = ["Todas", "Norte", "Centro", "Sur", "Metropolitana"];

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Trophy className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">#{position}</span>;
    }
  };

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

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="ml-2">Cargando ranking...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <div className="text-destructive mb-2">{error}</div>
              <Button onClick={loadRanking} variant="outline" size="sm">
                Reintentar
              </Button>
            </div>
          ) : (
            <>
              {/* Search and Filters */}
              <div className="mt-8 space-y-4">
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Buscar empresa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="text-sm border border-border rounded-lg px-3 py-1.5 bg-card"
                  >
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
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
                {filteredCompanies.length === 0 ? (
                  <div className="text-center py-8">
                    <Trophy className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      {searchTerm || selectedFilter !== "Todas" || selectedRegion !== "Todas" ? 
                        'No se encontraron empresas que coincidan con los filtros.' : 
                        'Aún no hay empresas en el ranking.'}
                    </p>
                  </div>
                ) : (
                  filteredCompanies.map((company, index) => (
                    <Link
                      key={company.id}
                      to={`/ranking/empresa/${company.nombre.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`}
                      className="card-premium p-4 md:p-6 flex items-center gap-4 group hover:shadow-premium-lg transition-all"
                    >
                      {/* Rank Number */}
                      {/* <div className="flex items-center justify-center flex-shrink-0">
                        {getMedalIcon(index + 1)}
                      </div> */}

                      {/* Company Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                          {company.nombre}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{company.tipo_empresa}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{company.region}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{company.ciudad}, {company.pais}</span>
                        </div>
                        {company.descripcion_impacto && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                            {company.descripcion_impacto}
                          </p>
                        )}
                      </div>

                      {/* Project Type */}
                      <div className="hidden md:flex items-center gap-2">
                        <Badge variant="outline" size="sm">
                          {company.tipo}
                        </Badge>
                      </div>

                      {/* Points and Growth */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          {company.points > 0 ? company.points.toLocaleString() : '0'} pts
                        </div>
                        {company.growth !== undefined && company.growth > 0 && (
                          <div className="flex items-center gap-1 text-xs text-success">
                            {/* <TrendingUp className="w-3 h-3" />
                            +{company.growth}% */}
                          </div>
                        )}
                      </div>

                      {/* View Details Arrow */}
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))
                )}
              </div>
            </>
          )}
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

export default RankingT;
