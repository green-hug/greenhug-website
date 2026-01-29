import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Badge from "@/components/shared/Badge";
import SectionHeader from "@/components/shared/SectionHeader";
import MetricCard from "@/components/shared/MetricCard";
import { apiService } from "@/services/api";
import {
  TreePine,
  Droplets,
  Cloud,
  Recycle,
  Shirt,
  Users,
  ArrowRight,
  MapPin,
  Calendar,
  TrendingUp,
  Building,
} from "lucide-react";

// Interfaces para datos del backend
interface CompanyData {
  name: string;
  location: string;
  points: number;
  description: string;
  story: string;
  metrics: {
    trees: number;
    water: number;
    co2: number;
    bottles: number;
    uniforms: number;
    volunteers: number;
  };
  projects: {
    type: string;
    slug: string;
    title: string;
    description: string;
    impact: string;
  }[];
  yearlyData: {
    year: number;
    points: number;
  }[];
}

const CompanyDetail = () => {
  const { slug } = useParams();
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para formatear números grandes con k, m
  const formatNumber = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}m`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      loadCompanyData(slug);
    }
  }, [slug]);

  const loadCompanyData = async (companySlug: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Helper para acceder a campos con formatos flexibles
      const getField = (obj: any, field: string) => {
        if (!obj) return null;
        // Intentar el campo original
        if (obj[field] !== undefined) return obj[field];
        
        // Convertir snake_case a camelCase
        const camelCase = field.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        if (obj[camelCase] !== undefined) return obj[camelCase];
        
        // Convertir camelCase a snake_case
        const snakeCase = field.replace(/([A-Z])/g, '_$1').toLowerCase();
        if (obj[snakeCase] !== undefined) return obj[snakeCase];
        
        return null;
      };
      // Helper para crear objeto de impacto estandarizado
      const crearObjetoImpacto = (datos: any) => {
        if (!datos) {
          return {
            litros_agua: 0,
            arboles_plantados: 0,
            botellas_recicladas: 0,
            voluntarios: 0,
            uniformes_reciclados: 0,
            co2kg: 0,
            empresaId: empresa.id,
          };
        }
        
        return {
          litros_agua: getField(datos, 'litros_agua') || getField(datos, 'litrosAgua') || 0,
          arboles_plantados: getField(datos, 'arboles_plantados') || getField(datos, 'arbolesPlantados') || 0,
          botellas_recicladas: getField(datos, 'botellas_recicladas') || getField(datos, 'botellasRecicladas') || 0,
          voluntarios: getField(datos, 'voluntarios') || 0,
          uniformes_reciclados: getField(datos, 'uniformes_reciclados') || getField(datos, 'uniformesReciclados') || 0,
          co2kg: getField(datos, 'co2kg') || getField(datos, 'co2_kg') || getField(datos, 'co2Kg') || 0,
          empresaId: empresa.id,
        };
      };      
      // Obtener todas las empresas y buscar por nombre
      const empresas = await apiService.getEmpresas();
      const empresa = empresas.find(e => 
        e.nombre.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') === companySlug
      );
      
      if (!empresa) {
        setError('Empresa no encontrada');
        return;
      }

      // Estrategia: Combinar datos de empresa con datos de impacto reales del backend
      //console.log('Cargando datos reales para empresa:', empresa.nombre, 'ID:', empresa.id);
      
      let datosImpacto = null;
      
      // Intentar obtener impacto desde el endpoint específico
      try {
       // console.log('Intentando cargar impacto desde /api/impacto/${empresaId}');
        const impactoResponse = await apiService.getImpactoEmpresa(empresa.id);
        //console.log('✅ Impacto cargado exitosamente:', impactoResponse);
        datosImpacto = impactoResponse;
      } catch (impactoError) {
        console.warn('❌ Fallo endpoint de impacto individual:', impactoError.message);
        
        // Fallback: Intentar obtener empresa con includes
        try {
          //console.log('Intentando cargar empresa con datos incluidos');
          const empresaCompleta = await apiService.getEmpresaById(empresa.id);
          //console.log('✅ Empresa completa cargada:', empresaCompleta);
          
          // Verificar si tiene impactoEmpresa o impacto_empresa
          datosImpacto = empresaCompleta.impactoEmpresa || 
                        (empresaCompleta as any).impacto_empresa || 
                        null;
          
          if (datosImpacto) {
            //console.log('✅ Encontrados datos de impacto en empresa');
          } else {
            //console.log('ℹ️ Empresa no tiene datos de impacto incluidos');
          }
        } catch (empresaError) {
          //console.warn('❌ También falló cargar empresa completa:', empresaError.message);
        }
      }
      
      // Crear objeto de impacto estandarizado
      const impactoEmpresa = crearObjetoImpacto(datosImpacto);
      //console.log('Datos de impacto finales estandarizados:', impactoEmpresa);

      // Obtener proyectos de la empresa
      let proyectos = [];
      try {
        proyectos = await apiService.getProyectosByEmpresa(empresa.id);
      } catch (error) {
        console.warn('No se pudieron cargar proyectos de empresa, usando array vacío:', error);
        proyectos = [];
      }

      // Función para calcular puntos desde impactos de un proyecto
      const calcularPuntosProyecto = (impactos: any[]): number => {
        if (!impactos || impactos.length === 0) return 0;
        
        let puntos = 0;
        let arboles = 0, agua = 0, co2 = 0, botellas = 0, voluntarios = 0, uniformes = 0;
        
        impactos.forEach((impacto: any) => {
          const valor = parseInt(impacto.valor) || 0;
          const metrica = (impacto.metrica || '').toLowerCase();
          
          if (metrica.includes('árbol') || metrica.includes('arbol')) {
            arboles += valor;
          } else if (metrica.includes('agua') || metrica.includes('litro')) {
            agua += valor;
          } else if (metrica.includes('co2') || metrica.includes('carbono')) {
            co2 += valor;
          } else if (metrica.includes('botella') || metrica.includes('pet')) {
            botellas += valor;
          } else if (metrica.includes('voluntario')) {
            voluntarios += valor;
          } else if (metrica.includes('uniforme')) {
            uniformes += valor;
          }
        });
        
        // Calcular puntos según el sistema Greenhug
        puntos += arboles * 3; // 1 árbol = 3 puntos
        puntos += Math.floor(agua / 2000); // 2,000L = 1 punto
        puntos += Math.floor(co2 / 3); // 3kg CO₂ = 1 punto
        puntos += Math.floor(botellas / 8); // 8 botellas = 1 punto
        puntos += voluntarios * 3; // 1 voluntario = 3 puntos
        puntos += Math.floor(uniformes / 2); // 2 uniformes = 1 punto
        
        return puntos;
      };

      // Función para sumar todos los impactos de los proyectos
      const sumarImpactosProyectos = (proyectos: any[]) => {
        const totales = {
          arboles: 0, agua: 0, co2: 0, botellas: 0, voluntarios: 0, uniformes: 0
        };
        
        proyectos.forEach((proyecto: any) => {
          if (!proyecto.impactos_proyecto) return;
          
          proyecto.impactos_proyecto.forEach((impacto: any) => {
            const valor = parseInt(impacto.valor) || 0;
            const metrica = (impacto.metrica || '').toLowerCase();
            
            if (metrica.includes('árbol') || metrica.includes('arbol')) {
              totales.arboles += valor;
            } else if (metrica.includes('agua') || metrica.includes('litro')) {
              totales.agua += valor;
            } else if (metrica.includes('co2') || metrica.includes('carbono')) {
              totales.co2 += valor;
            } else if (metrica.includes('botella') || metrica.includes('pet')) {
              totales.botellas += valor;
            } else if (metrica.includes('voluntario')) {
              totales.voluntarios += valor;
            } else if (metrica.includes('uniforme')) {
              totales.uniformes += valor;
            }
          });
        });
        
        return totales;
      };

      // Calcular impactos totales sumando todos los proyectos
      const impactosTotales = sumarImpactosProyectos(proyectos);
      
      // Calcular puntos totales desde los impactos agregados
      let puntosCalculados = 0;
      puntosCalculados += impactosTotales.arboles * 3;
      puntosCalculados += Math.floor(impactosTotales.agua / 2000);
      puntosCalculados += Math.floor(impactosTotales.co2 / 3);
      puntosCalculados += Math.floor(impactosTotales.botellas / 8);
      puntosCalculados += impactosTotales.voluntarios * 3;
      puntosCalculados += Math.floor(impactosTotales.uniformes / 2);

      // Mapear datos del backend al formato esperado por el UI
      const mappedCompany: CompanyData = {
        name: empresa.nombre,
        location: `${empresa.ciudad || 'Ciudad'}, ${empresa.pais}`,
        points: puntosCalculados,
        description: empresa.descripcion_impacto || `Empresa comprometida con el impacto sostenible en ${empresa.tipo_empresa}.`,
        story: `${empresa.nombre} ha decidido actuar para generar un impacto positivo en el medio ambiente y la sociedad. A través de proyectos con Greenhug, han logrado convertir sus intenciones en acciones medibles y resultados concretos que benefician tanto a su organización como a las comunidades donde operan.`,
        metrics: {
          trees: impactosTotales.arboles,
          water: impactosTotales.agua,
          co2: impactosTotales.co2,
          bottles: impactosTotales.botellas,
          uniforms: impactosTotales.uniformes,
          volunteers: impactosTotales.voluntarios,
        },
        projects: proyectos.map((proyecto: any) => {
          // El tipo viene directamente del proyecto, no se calcula
          const tipoProyecto = proyecto.tipo || 'PRO';
          
          // Mapear el tipo a etiqueta legible
          let typeLabel = 'Proyecto';
          if (tipoProyecto === 'EXP') typeLabel = 'Experience';
          else if (tipoProyecto === 'LIFE') typeLabel = 'Lifestyle';
          else if (tipoProyecto === 'UPC') typeLabel = 'Upcycling';

          // Calcular puntos del proyecto desde sus impactos
          const puntosProyecto = calcularPuntosProyecto(proyecto.impactos_proyecto || []);

          return {
            type: typeLabel,
            slug: proyecto.id,
            title: proyecto.nombre,
            description: proyecto.descripcion_proyecto || 'Proyecto de impacto sostenible',
            impact: `${puntosProyecto.toLocaleString()} puntos`,
          };
        }),
        // Como ahora no hay evolución temporal, crear datos simulados basados en el impacto actual
        yearlyData: [
          { year: 2023, points: Math.floor(puntosCalculados * 0.6) },
          { year: 2024, points: puntosCalculados },
        ]
      };

      setCompany(mappedCompany);
    } catch (err) {
      console.error('Error loading company data:', err);
      setError('Error al cargar los datos de la empresa');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-custom section-padding text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Cargando empresa...</h1>
        </div>
      </Layout>
    );
  }

  if (error || !company) {
    return (
      <Layout>
        <div className="container-custom section-padding text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {error || 'Empresa no encontrada'}
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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920')] bg-cover bg-center mix-blend-overlay opacity-30" />
        
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
              <Link to="/ranking" className="hover:text-white transition-colors">Ranking</Link>
              <span>/</span>
              <span className="text-white">{company.name}</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                  {company.name}
                </h1>
                <div className="flex items-center gap-2 text-white/70 mt-1">
                  <MapPin className="w-4 h-4" />
                  {company.location}
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-3 bg-white/10 rounded-xl px-6 py-4">
              <span className="text-white/70 text-sm">Puntos totales</span>
              <span className="text-4xl font-bold text-white">{company.points.toLocaleString()}</span>
            </div>

            <p className="text-white/80 mt-6 max-w-xl">
              Impacto generado a través de proyectos Greenhug.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="section-padding bg-sage-tint">
        <div className="container-custom">
          <SectionHeader
            badge="Resumen ejecutivo"
            title="Impacto generado"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            <MetricCard
              icon={TreePine}
              value={company.metrics.trees.toLocaleString()}
              label="Árboles plantados"
            />
            <MetricCard
              icon={Droplets}
              value={`${(company.metrics.water / 1000).toFixed(0)}k L`}
              label="Agua infiltrada"
            />
            <MetricCard
              icon={Cloud}
              value={
                <span className="whitespace-nowrap">
                  {formatNumber(company.metrics.co2)} ton
                </span>
              }
              label="CO₂ capturado"
            />
            <MetricCard
              icon={Recycle}
              value={`${(company.metrics.bottles / 1000).toFixed(0)}k`}
              label="Botellas PET"
            />
            <MetricCard
              icon={Shirt}
              value={company.metrics.uniforms.toLocaleString()}
              label="Uniformes reciclados"
            />
            <MetricCard
              icon={Users}
              value={company.metrics.volunteers.toLocaleString()}
              label="Voluntarios"
            />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Historia"
            title="Impacto explicado"
          />

          <div className="max-w-3xl mx-auto mt-8">
            <p className="text-muted-foreground leading-relaxed text-lg">
              {company.story}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <SectionHeader
            badge="Proyectos"
            title="Proyectos asociados"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {company.projects.map((project, i) => (
              <Link
                key={i}
                to={`/ranking/empresa/${slug}/proyecto/${project.slug}`}
                className="card-premium p-6 group hover:shadow-premium-lg transition-all"
              >
                <Badge variant="primary" className="mb-4">{project.type}</Badge>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">{project.impact}</span>
                  <span className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                    Ver proyecto <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Evolution Section */}
      {/*<section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Evolución"
            title="Evolución del impacto"
          />

          <div className="max-w-2xl mx-auto mt-12">
            <div className="flex items-end justify-between gap-4 h-48">
              {company.yearlyData.map((data, i) => {
                const maxPoints = Math.max(...company.yearlyData.map(d => d.points));
                const height = (data.points / maxPoints) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-primary rounded-t-lg transition-all hover:bg-primary/80"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{data.year}</span>
                    <span className="text-sm font-semibold text-foreground">{data.points.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-2 mt-6 text-success">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Crecimiento sostenido año tras año</span>
            </div>
          </div>
        </div>
      </section>*/}

      {/* CTA Section */}
      <section className="section-padding-lg bg-forest">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Tu empresa podría generar un impacto similar?
            </h2>
            <p className="text-white/80 mb-8">
              Platiquemos sobre cómo crear tu propia historia de impacto.
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

export default CompanyDetail;
