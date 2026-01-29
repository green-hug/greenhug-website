import { useState, useEffect } from "react";
import { AdminLayout, ProtectedRoute } from "@/components/admin";
import { ConfirmDeleteModal } from "@/components/admin/ConfirmDeleteModal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Plus,
  Trash2,
  Users,
  Shield,
  Crown,
  Loader2
} from "lucide-react";
import { Usuario, UsuarioFormData } from "@/types/backend";
import { apiService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para modal de confirmación de eliminación
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<Usuario | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Estados para creación/edición de usuario
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [userForm, setUserForm] = useState<UsuarioFormData>({
    nombre: "",
    password: "",
    role: "ADMIN"
  });
  const [isCreating, setIsCreating] = useState(false);

  const { user: currentUser } = useAuth();

  // Cargar usuarios al inicializar
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const usersData = await apiService.getUsuarios();
      setUsers(usersData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar usuarios';
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

  const filteredUsers = users.filter(user =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getRoleBadge = (role: string) => {
    if (role === "SUPER_ADMIN") {
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
          <Crown className="w-3 h-3 mr-1" />
          Super Admin
        </Badge>
      );
    }
    return (
      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
        <Shield className="w-3 h-3 mr-1" />
        Admin
      </Badge>
    );
  };

  const handleDeleteUser = (user: Usuario) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      setIsDeleting(true);
      await apiService.deleteUsuario(userToDelete.id);
      setUsers(users.filter(u => u.id !== userToDelete.id));
      toast({
        title: "Usuario eliminado",
        description: `El usuario "${userToDelete.nombre}" ha sido eliminado correctamente.`,
      });
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al eliminar usuario";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateUser = () => {
    setUserForm({
      nombre: "",
      password: "",
      role: "ADMIN"
    });
    setIsCreateModalOpen(true);
  };

  const handleSubmitUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userForm.nombre ||  !userForm.password) {
      toast({
        title: "Error",
        description: "Todos los campos son requeridos",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCreating(true);
      const response = await apiService.createUsuario(userForm);
      setUsers([...users, response.usuario]);
      toast({
        title: "Usuario creado",
        description: response.message,
      });
      setIsCreateModalOpen(false);
      setUserForm({ nombre: "", password: "", role: "ADMIN" });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al crear usuario";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const canDeleteUser = (user: Usuario) => {
    // No puede eliminarse a sí mismo
    if (currentUser?.id === user.id) return false;
    
    // Solo SUPER_ADMIN puede eliminar otros usuarios
    return currentUser?.role === "SUPER_ADMIN";
  };

  const canCreateUser = () => {
    return currentUser?.role === "SUPER_ADMIN";
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Gestión de Usuarios
              </h1>
              <p className="text-muted-foreground mt-1">
                Administra los usuarios del sistema
              </p>
            </div>
            {canCreateUser() && (
              <div className="flex items-center gap-3">
                <Button size="sm" onClick={handleCreateUser}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Usuario
                </Button>
              </div>
            )}
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Usuarios</p>
                  <p className="text-2xl font-bold">{users.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Administradores</p>
                  <p className="text-2xl font-bold">
                    {users.filter(u => u.role === "ADMIN").length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Super Admins</p>
                  <p className="text-2xl font-bold">
                    {users.filter(u => u.role === "SUPER_ADMIN").length}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Users table */}
          <Card className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="ml-2">Cargando usuarios...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="text-destructive mb-2">{error}</div>
                <Button onClick={loadUsers} variant="outline" size="sm">
                  Reintentar
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-xl font-semibold">Usuarios del Sistema</h2>
                  <div className="flex-1 max-w-md relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nombre..."
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
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Usuario</th>

                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Rol</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Fecha</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-medium text-primary">
                                  {user.nombre.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{user.nombre}</p>
                                {currentUser?.id === user.id && (
                                  <p className="text-xs text-muted-foreground">(Tú)</p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {getRoleBadge(user.role)}
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            <p className="text-sm">
                              {new Date(user.created_at).toLocaleDateString('es-ES')}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1">
                              {canDeleteUser(user) && (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                  onClick={() => handleDeleteUser(user)}
                                  title="Eliminar usuario"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredUsers.length === 0 && !loading && (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      {searchTerm ? 'No se encontraron usuarios que coincidan con la búsqueda' : 'No hay usuarios registrados'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
          }}
          onConfirm={handleConfirmDelete}
          title="Eliminar Usuario"
          description="¿Estás seguro de que quieres eliminar este usuario? El usuario no podrá acceder al sistema."
          entityName={userToDelete?.nombre}
          isDeleting={isDeleting}
        />

        {/* Create User Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Crear Nuevo Usuario</h2>
              <form onSubmit={handleSubmitUser} className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium mb-1">
                    Nombre
                  </label>
                  <Input
                    id="nombre"
                    type="text"
                    value={userForm.nombre}
                    onChange={(e) => setUserForm({ ...userForm, nombre: e.target.value })}
                    placeholder="Nombre completo"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Contraseña
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={userForm.password}
                    onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                    placeholder="Mínimo 6 caracteres"
                    required
                    minLength={6}
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium mb-1">
                    Rol
                  </label>
                  <select
                    id="role"
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="ADMIN">Administrador</option>
                    <option value="SUPER_ADMIN">Super Administrador</option>
                  </select>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateModalOpen(false)}
                    disabled={isCreating}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={isCreating}>
                    {isCreating ? "Creando..." : "Crear Usuario"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminUsers;