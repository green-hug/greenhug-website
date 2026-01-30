import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Badge from "@/components/shared/Badge";
import SectionHeader from "@/components/shared/SectionHeader";
import MetricCard from "@/components/shared/MetricCard";
import { apiService } from "@/services/api";
import {
  TreePine,
  Users,
  Heart,
  MapPin,
  Calendar,
  ArrowRight,
  Building,
  Quote,
} from "lucide-react";

// Mock data comentado - ahora se usan datos reales del backend
/*
const mockProjectData = {
  "reforestacion-2023": {
    title: "Reforestación Sierra Norte 2023",
    company: "Empresa Manufactura S.A.",
    companySlug: "empresa-manufactura",
    type: "Experience",
    location: "Sierra Norte de Puebla",
    date: "Septiembre 2023",
    description: "Una experiencia de reforestación que involucró a 500 colaboradores de todas las áreas de la empresa, plantando 3,000 árboles de especies nativas en la Sierra Norte de Puebla.",
    metrics: {
      environmental: {
        trees: 3000,
        co2: "15 toneladas capturadas (proyección 10 años)",
        water: "45,000 litros de agua infiltrada (proyección anual)",
      },
      social: {
        volunteers: 500,
        hours: 2000,
        community: "3 comunidades beneficiadas",
      },
      cultural: {
        engagement: "92% de satisfacción",
        nps: 87,
        repeat: "78% quiere participar nuevamente",
      },
    },
    testimonials: [
      {
        quote: "Fue una de las experiencias más significativas que he tenido en la empresa. Sentí que realmente estábamos haciendo algo importante.",
        name: "María López",
        role: "Analista de Finanzas",
      },
      {
        quote: "Ver a todo el equipo trabajando juntos por una causa común fue increíble. El impacto se siente real.",
        name: "Carlos Ramírez",
        role: "Gerente de Operaciones",
      },
    ],
    points: 9000,
    gallery: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800",
    ],
  },
};
*/

// Interfaces para datos del backend
interface ImpactoProyecto {
  id: string;
  tipo_impacto: 'ambiental' | 'social' | 'cultura';
  metrica: string;
  valor: string;
  unidad?: string;
  descripcion_adicional?: string;
}

interface ProyectoDetalle {
  id: string;
  nombre: string;
  fecha: string;
  descripcion_proyecto?: string;
  resultados_concretos?: string;
  impactos_proyecto?: ImpactoProyecto[];
  empresa?: {
    id: string;
    nombre: string;
    region?: string;
    ciudad?: string;
  };
}

interface ProjectData {
  title: string;
  company: string;
  companySlug: string;
  type: string;
  location: string;
  date: string;
  description: string;
  metrics: {
    environmental: {
      trees: number;
      co2: number;
      co2Unit: string;
      water: number;
      waterUnit: string;
    };
    social: {
      volunteers: number;
      hours: number;
      community: string;
    };
    cultural: {
      engagement: string;
      nps: number;
      repeat: string;
    };
  };
  points: number;
}

const ProjectDetail = () => {
  const { empresaSlug, proyectoSlug } = useParams();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para formatear números grandes
  const formatNumber = (value: number): string => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'm';
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k';
    }
    return value.toString();
  };

  useEffect(() => {
    if (proyectoSlug) {
      loadProjectData();
    }
  }, [proyectoSlug]);

  const loadProjectData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Obtener datos del proyecto por ID
      const proyectoData: ProyectoDetalle = await apiService.getProyectoById(proyectoSlug!);
      
      // Mapear datos del backend al formato esperado por el UI
      const mappedProject: ProjectData = {
        title: proyectoData.nombre,
        company: proyectoData.empresa?.nombre || 'Empresa',
        companySlug: empresaSlug || '',
        type: 'Proyecto', // Se podría determinar del tipo de impactos
        location: proyectoData.empresa?.ciudad && proyectoData.empresa?.region 
          ? `${proyectoData.empresa.ciudad}, ${proyectoData.empresa.region}` 
          : proyectoData.empresa?.region || 'Ubicación no especificada',
        date: new Date(proyectoData.fecha).toLocaleDateString('es-ES', { 
          year: 'numeric', 
          month: 'long' 
        }),
        description: proyectoData.descripcion_proyecto || 'Proyecto de impacto social y ambiental.',
        metrics: mapImpactosToMetrics(proyectoData.impactos_proyecto),
        points: calculatePointsFromImpacts(proyectoData.impactos_proyecto)
      };
      
      setProject(mappedProject);
    } catch (err) {
      console.error('Error loading project data:', err);
      setError('Error al cargar los datos del proyecto');
    } finally {
      setLoading(false);
    }
  };

  const mapImpactosToMetrics = (impactos: ImpactoProyecto[]) => {
    const environmental = { trees: 0, co2: 0, co2Unit: '', water: 0, waterUnit: '' };
    const social = { volunteers: 0, hours: 0, community: '' };
    const cultural = { engagement: '', nps: 0, repeat: '' };

    impactos.forEach(impacto => {
      const valor = parseInt(impacto.valor) || 0;
      
      if (impacto.tipo_impacto === 'ambiental') {
        if (impacto.metrica.toLowerCase().includes('árbol') || impacto.metrica.toLowerCase().includes('arbol')) {
          environmental.trees = valor;
        } else if (impacto.metrica.toLowerCase().includes('co2') || impacto.metrica.toLowerCase().includes('carbono')) {
          environmental.co2 = valor;
          environmental.co2Unit = impacto.unidad || 'kg';
        } else if (impacto.metrica.toLowerCase().includes('agua')) {
          environmental.water = valor;
          environmental.waterUnit = impacto.unidad || 'litros';
        }
      } else if (impacto.tipo_impacto === 'social') {
        if (impacto.metrica.toLowerCase().includes('voluntario')) {
          social.volunteers = valor;
        } else if (impacto.metrica.toLowerCase().includes('hora')) {
          social.hours = valor;
        } else if (impacto.metrica.toLowerCase().includes('comunidad')) {
          social.community = `${valor} comunidades beneficiadas`;
        }
      } else if (impacto.tipo_impacto === 'cultura') {
        if (impacto.metrica.toLowerCase().includes('nps')) {
          cultural.nps = valor;
        } else if (impacto.metrica.toLowerCase().includes('satisfac')) {
          cultural.engagement = `${valor}% de satisfacción`;
        } else if (impacto.metrica.toLowerCase().includes('repetir') || impacto.metrica.toLowerCase().includes('participar')) {
          cultural.repeat = `${valor}% quiere participar nuevamente`;
        }
      }
    });

    return { environmental, social, cultural };
  };

  const calculatePointsFromImpacts = (impactos: ImpactoProyecto[]): number => {
    // Sistema de puntos simplificado basado en los impactos
    let points = 0;
    impactos.forEach(impacto => {
      const valor = parseInt(impacto.valor) || 0;
      if (impacto.tipo_impacto === 'ambiental') points += valor * 3;
      if (impacto.tipo_impacto === 'social') points += valor * 2;
      if (impacto.tipo_impacto === 'cultura') points += valor;
    });
    return points;
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-custom section-padding text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Cargando proyecto...</h1>
        </div>
      </Layout>
    );
  }

  if (error || !project) {
    return (
      <Layout>
        <div className="container-custom section-padding text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {error || 'Proyecto no encontrado'}
          </h1>
          <Button asChild>
            <Link to="/ranking">Volver al ranking</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest to-forest-dark opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920')] bg-cover bg-center mix-blend-overlay opacity-40" />
        
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/60 text-sm mb-6 flex-wrap">
              <Link to="/ranking" className="hover:text-white transition-colors">Ranking</Link>
              <span>/</span>
              <Link to={`/ranking/empresa/${project.companySlug}`} className="hover:text-white transition-colors">
                {project.company}
              </Link>
              <span>/</span>
              <span className="text-white">{project.title}</span>
            </div>

            <Badge variant="muted" className="bg-white/20 text-white mb-4">
              {project.type}
            </Badge>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-white/80 mb-6">
              {/* <div className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                {project.company}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {project.location}
              </div> */}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {project.date}
              </div>
            </div>

            <p className="text-white/80 text-lg max-w-2xl">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section-padding bg-sage-tint">
        <div className="container-custom">
          <SectionHeader
            badge="Resultados"
            title="Resultados concretos"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Environmental Impact */}
            {(project.metrics.environmental.trees > 0 || project.metrics.environmental.co2 > 0 || project.metrics.environmental.water > 0) && (
              <div className="card-premium p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="icon-container-sm">
                    <TreePine className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Impacto ambiental</h3>
                </div>
                <ul className="space-y-3">
                  {project.metrics.environmental.trees > 0 && (
                    <li className="text-foreground">
                      <span className="text-2xl font-bold text-primary">{formatNumber(project.metrics.environmental.trees)}</span>
                      <span className="text-muted-foreground ml-2">árboles plantados</span>
                    </li>
                  )}
                  {project.metrics.environmental.water > 0 && (
                    <li className="text-foreground">
                      <span className="text-2xl font-bold text-primary">{formatNumber(project.metrics.environmental.water)}</span>
                      <span className="text-muted-foreground ml-2">{project.metrics.environmental.waterUnit} de agua</span>
                    </li>
                  )}
                  {project.metrics.environmental.co2 > 0 && (
                    <li className="text-foreground">
                      <span className="text-2xl font-bold text-primary">{formatNumber(project.metrics.environmental.co2)}</span>
                      <span className="text-muted-foreground ml-2">{project.metrics.environmental.co2Unit} de CO₂</span>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Social Impact */}
            {(project.metrics.social.volunteers > 0 || project.metrics.social.hours > 0 || project.metrics.social.community) && (
              <div className="card-premium p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="icon-container-sm">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Impacto social</h3>
                </div>
                <ul className="space-y-3">
                  {project.metrics.social.volunteers > 0 && (
                    <li className="text-foreground">
                      <span className="text-2xl font-bold text-primary">{formatNumber(project.metrics.social.volunteers)}</span>
                      <span className="text-muted-foreground ml-2">voluntarios</span>
                    </li>
                  )}
                  {project.metrics.social.hours > 0 && (
                    <li className="text-sm text-muted-foreground">{formatNumber(project.metrics.social.hours)} horas de voluntariado</li>
                  )}
                  {project.metrics.social.community && (
                    <li className="text-sm text-muted-foreground">{project.metrics.social.community}</li>
                  )}
                </ul>
              </div>
            )}

            {/* Cultural Impact */}
            {(project.metrics.cultural.nps > 0 || project.metrics.cultural.engagement || project.metrics.cultural.repeat) && (
              <div className="card-premium p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="icon-container-sm">
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Impacto en cultura</h3>
                </div>
                <ul className="space-y-3">
                  {project.metrics.cultural.nps > 0 && (
                    <li className="text-foreground">
                      <span className="text-2xl font-bold text-primary">{project.metrics.cultural.nps}</span>
                      <span className="text-muted-foreground ml-2">NPS</span>
                    </li>
                  )}
                  {project.metrics.cultural.engagement && (
                    <li className="text-sm text-muted-foreground">{project.metrics.cultural.engagement}</li>
                  )}
                  {project.metrics.cultural.repeat && (
                    <li className="text-sm text-muted-foreground">{project.metrics.cultural.repeat}</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="section-padding-lg bg-forest">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Quieres crear un proyecto como este?
            </h2>
            <p className="text-white/80 mb-8">
              Diseñemos juntos la experiencia perfecta para tu organización.
            </p>
            <Button variant="white" size="xl" onClick={() => window.open("https://wa.me/524443348043?text=" + encodeURIComponent("Hola, me gustaría hablar con un asesor sobre los proyectos de Greenhug."), "_blank")}>
              Hablar con un asesor
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
