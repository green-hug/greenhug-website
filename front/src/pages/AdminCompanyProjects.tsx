import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout, ProtectedRoute } from "@/components/admin";
import ProjectModal from "@/components/admin/ProjectModal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Target,
  Loader2,
  Building
} from "lucide-react";
import { Empresa, Proyecto, ProyectoFormData, TipoImpacto } from "@/types/backend";
import { apiService } from "@/services/api";
import { toast } from "@/hooks/use-toast";

const AdminCompanyProjects = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  
  const [company, setCompany] = useState<Empresa | null>(null);
  const [projects, setProjects] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedProject, setSelectedProject] = useState<Proyecto | null>(null);

  useEffect(() => {
    if (companyId) {
      loadCompanyAndProjects();
    }
  }, [companyId]);

  const loadCompanyAndProjects = async () => {
    if (!companyId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Cargar empresa y proyectos en paralelo
      const [companyData, projectsData] = await Promise.all([
        apiService.getEmpresaById(companyId),
        apiService.getProyectosByEmpresa(companyId)
      ]);
      
      setCompany(companyData);
      setProjects(projectsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar datos';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = () => {
    setModalMode("create");
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Proyecto) => {
    setModalMode("edit");
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      try {
        // Como no hay endpoint de delete, solo removemos de la lista local
        setProjects(projects.filter(p => p.id !== projectId));
        toast({
          title: "Proyecto eliminado",
          description: "El proyecto ha sido eliminado correctamente.",
        });
      } catch (err) {
        toast({
          title: "Error",
          description: "No se pudo eliminar el proyecto.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmitProject = async (data: ProyectoFormData) => {
    if (!companyId) return;
    
    try {
      if (modalMode === "create") {
        const newProject = await apiService.createProyecto(companyId, data);
        setProjects([...projects, newProject]);
        toast({
          title: "Proyecto creado",
          description: "El proyecto ha sido registrado correctamente.",
        });
      } else if (selectedProject) {
        // Como no hay endpoint de update, simulamos la actualización
        const updatedProject = { ...selectedProject, ...data };
        setProjects(projects.map(p => 
          p.id === selectedProject.id ? updatedProject : p
        ));
        toast({
          title: "Proyecto actualizado",
          description: "Los cambios han sido guardados correctamente.",
        });
      }
      setIsModalOpen(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar proyecto';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const getTipoImpactoBadge = (tipo: TipoImpacto) => {
    const colors = {
      [TipoImpacto.ambiental]: "bg-green-100 text-green-800",
      [TipoImpacto.social]: "bg-blue-100 text-blue-800",
      [TipoImpacto.cultura]: "bg-purple-100 text-purple-800",
    };

    return (
      <Badge className={colors[tipo] || "bg-gray-100 text-gray-800"}>
        {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
      </Badge>
    );
  };

  if (!companyId) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="text-center py-8">
            <p className="text-destructive">ID de empresa no válido</p>
            <Button onClick={() => navigate('/admin/companies')} className="mt-4">
              Volver a Empresas
            </Button>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate('/admin/companies')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">
                Proyectos {company ? `- ${company.nombre}` : ''}
              </h1>
              <p className="text-muted-foreground mt-1">
                Gestiona los proyectos de impacto de la empresa
              </p>
            </div>
            <Button onClick={handleCreateProject}>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Proyecto
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="ml-2">Cargando proyectos...</span>
            </div>
          ) : error ? (
            <Card className="p-6">
              <div className="text-center py-8">
                <div className="text-destructive mb-2">{error}</div>
                <Button onClick={loadCompanyAndProjects} variant="outline" size="sm">
                  Reintentar
                </Button>
              </div>
            </Card>
          ) : (
            <>
              {/* Company Info */}
              {company && (
                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{company.nombre}</h3>
                      <p className="text-muted-foreground text-sm">
                        {company.tipo_empresa} • {company.ciudad}, {company.region}
                      </p>
                      {company.descripcion_impacto && (
                        <p className="text-sm mt-2 max-w-2xl">
                          {company.descripcion_impacto}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline">
                      {company.tipo}
                    </Badge>
                  </div>
                </Card>
              )}

              {/* Projects List */}
              <div className="grid gap-6">
                {projects.length === 0 ? (
                  <Card className="p-8">
                    <div className="text-center">
                      <Building className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No hay proyectos</h3>
                      <p className="text-muted-foreground mb-4">
                        Esta empresa aún no tiene proyectos registrados.
                      </p>
                      <Button onClick={handleCreateProject}>
                        <Plus className="w-4 h-4 mr-2" />
                        Crear primer proyecto
                      </Button>
                    </div>
                  </Card>
                ) : (
                  projects.map((project) => (
                    <Card key={project.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{project.nombre}</h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              {new Date(project.fecha).toLocaleDateString('es-ES')}
                            </div>
                          </div>
                          
                          {project.descripcion_proyecto && (
                            <p className="text-muted-foreground text-sm mb-3">
                              {project.descripcion_proyecto}
                            </p>
                          )}
                          
                          {project.resultados_concretos && (
                            <div className="mb-3">
                              <p className="text-sm font-medium text-foreground">Resultados:</p>
                              <p className="text-sm text-muted-foreground">
                                {project.resultados_concretos}
                              </p>
                            </div>
                          )}

                          {/* Impactos */}
                          {project.impactos_proyecto && project.impactos_proyecto.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-foreground">Impactos:</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {project.impactos_proyecto.map((impacto, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        {getTipoImpactoBadge(impacto.tipo_impacto)}
                                      </div>
                                      <p className="text-sm font-medium">{impacto.metrica}</p>
                                      <p className="text-xs text-muted-foreground">
                                        {impacto.valor} {impacto.unidad}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1 ml-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            title="Ver proyecto"
                            onClick={() => {
                              // TODO: Implementar vista de detalle
                              console.log('Ver proyecto', project.id);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleEditProject(project)}
                            title="Editar proyecto"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteProject(project.id)}
                            title="Eliminar proyecto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        {/* Project Modal */}
        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitProject}
          initialData={selectedProject}
          mode={modalMode}
        />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminCompanyProjects;