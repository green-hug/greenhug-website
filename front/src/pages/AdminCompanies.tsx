import { useState, useEffect } from "react";
import { AdminLayout, ProtectedRoute, CompanyModal } from "@/components/admin";
import ProjectModal from "@/components/admin/ProjectModal";
import { ConfirmDeleteModal } from "@/components/admin/ConfirmDeleteModal";
import { CompanyProjectsModal } from "@/components/admin/CompanyProjectsModal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Building,
  Loader2,
  FolderPlus
} from "lucide-react";
import { Empresa, EmpresaFormData, ProyectoFormData } from "@/types/backend";
import { apiService } from "@/services/api";
import { toast } from "@/hooks/use-toast";

const AdminCompanies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedCompany, setSelectedCompany] = useState<Empresa | null>(null);
  const [companies, setCompanies] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para modal de proyectos
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedCompanyForProject, setSelectedCompanyForProject] = useState<Empresa | null>(null);

  // Estados para modal de confirmación de eliminación
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string; type: 'empresa' | 'proyecto' } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Estados para modal de proyectos de empresa
  const [isCompanyProjectsModalOpen, setIsCompanyProjectsModalOpen] = useState(false);
  const [selectedCompanyForView, setSelectedCompanyForView] = useState<Empresa | null>(null);

  // Cargar empresas al inicializar
  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      const companiesData = await apiService.getEmpresas();
      setCompanies(companiesData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar empresas';
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

  const filteredCompanies = companies.filter(company =>
    company.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.tipo_empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.ciudad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (empresa: Empresa) => {
    // Como no tenemos estado en el backend, usamos la fecha de creación para simular estado
    const isRecent = new Date(empresa.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return isRecent ? 
      <Badge className="bg-success/10 text-success hover:bg-success/20">Activa</Badge> :
      <Badge variant="secondary">Establecida</Badge>;
  };

  const handleCreateCompany = () => {
    setModalMode("create");
    setSelectedCompany(null);
    setIsModalOpen(true);
  };

  const handleEditCompany = (company: Empresa) => {
    setModalMode("edit");
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleDeleteCompany = (company: Empresa) => {
    setItemToDelete({
      id: company.id,
      name: company.nombre,
      type: 'empresa'
    });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      setIsDeleting(true);
      
      if (itemToDelete.type === 'empresa') {
        await apiService.deleteEmpresa(itemToDelete.id);
        setCompanies(companies.filter(c => c.id !== itemToDelete.id));
        toast({
          title: "Empresa eliminada",
          description: `La empresa "${itemToDelete.name}" ha sido eliminada correctamente.`,
        });
      } else if (itemToDelete.type === 'proyecto') {
        await apiService.deleteProyecto(itemToDelete.id);
        // Recargar empresas para actualizar contadores y modal de proyectos
        await loadCompanies();
        
        // Actualizar la empresa seleccionada en el modal si está abierto
        if (selectedCompanyForView && isCompanyProjectsModalOpen) {
          const updatedCompany = companies.find(c => c.id === selectedCompanyForView.id);
          if (updatedCompany) {
            setSelectedCompanyForView(updatedCompany);
          }
        }
        
        toast({
          title: "Proyecto eliminado",
          description: `El proyecto "${itemToDelete.name}" ha sido eliminado correctamente.`,
        });
      }
      
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Error al eliminar ${itemToDelete.type}`;
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmitCompany = async (data: EmpresaFormData) => {
    try {
      if (modalMode === "create") {
        const newCompany = await apiService.createEmpresa(data);
        setCompanies([...companies, newCompany]);
        toast({
          title: "Empresa creada",
          description: "La empresa ha sido registrada correctamente.",
        });
      } else if (selectedCompany) {
        const updatedCompany = await apiService.updateEmpresa(selectedCompany.id, data);
        setCompanies(companies.map(c => 
          c.id === selectedCompany.id ? updatedCompany : c
        ));
        toast({
          title: "Empresa actualizada",
          description: "Los cambios han sido guardados correctamente.",
        });
      }
      setIsModalOpen(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar empresa';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Funciones para manejar proyectos
  const handleCreateProject = (company: Empresa) => {
    setSelectedCompanyForProject(company);
    setIsProjectModalOpen(true);
  };

  const handleSubmitProject = async (data: ProyectoFormData) => {
    if (!selectedCompanyForProject) return;

    try {
      await apiService.createProyecto(selectedCompanyForProject.id, data);
      
      // Recargar la lista de empresas para actualizar el contador de proyectos
      await loadCompanies();
      
      toast({
        title: "Proyecto creado",
        description: `El proyecto "${data.nombre}" ha sido registrado correctamente.`,
      });
      
      setIsProjectModalOpen(false);
      setSelectedCompanyForProject(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear proyecto';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Función para ver proyectos de una empresa
  const handleViewCompanyProjects = (company: Empresa) => {
    setSelectedCompanyForView(company);
    setIsCompanyProjectsModalOpen(true);
  };

  // Función para manejar eliminación de proyectos desde el modal
  const handleDeleteProjectFromModal = (proyecto: any) => {
    setItemToDelete({
      id: proyecto.id,
      name: proyecto.nombre,
      type: 'proyecto'
    });
    setIsDeleteModalOpen(true);
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Gestión de Empresas
              </h1>
              <p className="text-muted-foreground mt-1">
                Administra las empresas registradas en la plataforma
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" onClick={handleCreateCompany}>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Empresa
              </Button>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Empresas</p>
                  <p className="text-2xl font-bold">{companies.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <Building className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Empresas Activas</p>
                  <p className="text-2xl font-bold">
                    {companies.filter(company => {
                      const isRecent = new Date(company.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                      return isRecent;
                    }).length}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Filters and search */}
          {/* <Card className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o industria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>
          </Card> */}

          {/* Companies table */}
          <Card className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="ml-2">Cargando empresas...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="text-destructive mb-2">{error}</div>
                <Button onClick={loadCompanies} variant="outline" size="sm">
                  Reintentar
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-xl font-semibold">Empresas Registradas</h2>
                  <div className="flex-1 max-w-md relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nombre, tipo o ciudad..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Empresa</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tipo</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Ubicación</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Estado</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Proyectos</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Fecha</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCompanies.map((company) => (
                        <tr key={company.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-foreground">{company.nombre}</p>
                              <p className="text-sm text-muted-foreground">
                                {company.descripcion_impacto ? 
                                  company.descripcion_impacto.substring(0, 50) + (company.descripcion_impacto.length > 50 ? '...' : '') 
                                  : 'Sin descripción'
                                }
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="text-sm font-medium">{company.tipo_empresa}</p>
                              <Badge variant="outline" className="text-xs">
                                {company.tipo}
                              </Badge>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="text-sm">{company.ciudad}</p>
                              <p className="text-xs text-muted-foreground">{company.region}, {company.pais}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {getStatusBadge(company)}
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              <span className="text-sm">
                                {company.proyectos?.length || 0}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            <p className="text-sm">
                              {new Date(company.created_at).toLocaleDateString('es-ES')}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                title="Ver proyectos"
                                onClick={() => handleViewCompanyProjects(company)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                                onClick={() => handleCreateProject(company)}
                                title="Agregar proyecto"
                              >
                                <FolderPlus className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleEditCompany(company)}
                                title="Editar empresa"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                onClick={() => handleDeleteCompany(company)}
                                title="Eliminar empresa"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredCompanies.length === 0 && !loading && (
                  <div className="text-center py-8">
                    <Building className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      {searchTerm ? 'No se encontraron empresas que coincidan con la búsqueda' : 'No hay empresas registradas'}
                    </p>
                    {!searchTerm && (
                      <Button 
                        onClick={handleCreateCompany} 
                        className="mt-4"
                        variant="outline"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Crear primera empresa
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* Company Modal */}
        <CompanyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitCompany}
          initialData={selectedCompany}
          mode={modalMode}
        />

        {/* Project Modal */}
        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => {
            setIsProjectModalOpen(false);
            setSelectedCompanyForProject(null);
          }}
          onSubmit={handleSubmitProject}
          initialData={null}
          mode="create"
        />

        {/* Delete Confirmation Modal */}
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
          title={`Eliminar ${itemToDelete?.type === 'empresa' ? 'Empresa' : 'Proyecto'}`}
          description={`¿Estás seguro de que quieres eliminar ${itemToDelete?.type === 'empresa' ? 'esta empresa' : 'este proyecto'}? ${
            itemToDelete?.type === 'empresa' 
              ? 'Se eliminarán todos los proyectos y datos asociados.' 
              : 'Se restarán los impactos del total acumulado de la empresa.'
          }`}
          entityName={itemToDelete?.name}
          isDeleting={isDeleting}
        />

        {/* Company Projects Modal */}
        <CompanyProjectsModal
          isOpen={isCompanyProjectsModalOpen}
          onClose={() => {
            setIsCompanyProjectsModalOpen(false);
            setSelectedCompanyForView(null);
          }}
          company={selectedCompanyForView}
          onDeleteProject={handleDeleteProjectFromModal}
        />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminCompanies;