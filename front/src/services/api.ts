// API service for backend communication
import { 
  Empresa, 
  Proyecto, 
  ImpactoAnual, 
  ImpactoEmpresa,
  EmpresaFormData, 
  ProyectoFormData,
  ImpactoProyectoFormData,
  ImpactoAnualFormData,
  Usuario,
  LoginRequest,
  LoginResponse,
  UsuarioFormData 
} from '@/types/backend';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error desconocido' }));
      throw new Error(error.message || `Error ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // Empresa endpoints
  async getEmpresas(): Promise<Empresa[]> {
    return this.request<Empresa[]>('/empresas');
  }

  async getEmpresaById(id: string): Promise<Empresa> {
    return this.request<Empresa>(`/empresas/${id}`);
  }

  async createEmpresa(data: EmpresaFormData): Promise<Empresa> {
    return this.request<Empresa>('/empresas', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateEmpresa(id: string, data: EmpresaFormData): Promise<Empresa> {
    return this.request<Empresa>(`/empresas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Proyecto endpoints
  async getProyectosByEmpresa(empresaId: string): Promise<Proyecto[]> {
    return this.request<Proyecto[]>(`/proyectos/empresa/${empresaId}`);
  }

  async getProyectoById(id: string): Promise<Proyecto> {
    return this.request<Proyecto>(`/proyectos/${id}`);
  }

  async createProyecto(empresaId: string, data: ProyectoFormData): Promise<Proyecto> {
    const { impactos, ...proyectoData } = data;
    
    // Crear el proyecto primero
    const proyecto = await this.request<Proyecto>(`/proyectos/empresa/${empresaId}`, {
      method: 'POST',
      body: JSON.stringify(proyectoData),
    });

    // Luego agregar los impactos si existen
    if (impactos && impactos.length > 0) {
      await this.addImpactosToProyecto(proyecto.id, impactos);
    }

    return proyecto;
  }

  async addImpactosToProyecto(proyectoId: string, impactos: ImpactoProyectoFormData[]): Promise<void> {
    return this.request<void>(`/proyectos/${proyectoId}/impactos`, {
      method: 'POST',
      body: JSON.stringify(impactos),
    });
  }

  async deleteProyecto(proyectoId: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/proyectos/${proyectoId}`, {
      method: 'DELETE',
    });
  }

  // Empresa deletion
  async deleteEmpresa(empresaId: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/empresas/${empresaId}`, {
      method: 'DELETE',
    });
  }

  // Impacto Empresa endpoints
  async getImpactoEmpresa(empresaId: string): Promise<ImpactoEmpresa> {
    return this.request<ImpactoEmpresa>(`/impacto/${empresaId}`);
  }

  async createImpactoAnual(empresaId: string, data: ImpactoAnualFormData): Promise<ImpactoAnual> {
    return this.request<ImpactoAnual>('/impacto-anual', {
      method: 'POST',
      body: JSON.stringify({ ...data, empresaId }),
    });
  }

  async updateImpactoAnual(id: string, data: ImpactoAnualFormData): Promise<ImpactoAnual> {
    return this.request<ImpactoAnual>(`/impacto-anual/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Ranking endpoints
  async getRankingGeneral(): Promise<any[]> {
    return this.request<any[]>('/ranking');
  }

  async getRankingByYear(ano: number): Promise<any[]> {
    return this.request<any[]>(`/ranking/${ano}`);
  }

  async getRankingByRegion(region: string, ano: number): Promise<any[]> {
    return this.request<any[]>(`/ranking/region/${region}/${ano}`);
  }

  async getCompareYears(empresaId: string): Promise<any> {
    return this.request<any>(`/ranking/comparar/${empresaId}`);
  }

  async getResumenEjecutivo(empresaId: string): Promise<any> {
    return this.request<any>(`/ranking/resumen/${empresaId}`);
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async verifyToken(): Promise<{ success: boolean; usuario: Usuario }> {
    return this.request<{ success: boolean; usuario: Usuario }>('/auth/verify');
  }

  async createDefaultAdmin(): Promise<{ success: boolean; message: string; usuario: Usuario; credentials: any }> {
    return this.request<{ success: boolean; message: string; usuario: Usuario; credentials: any }>('/auth/setup', {
      method: 'POST',
    });
  }

  // Usuario endpoints
  async getUsuarios(): Promise<Usuario[]> {
    return this.request<Usuario[]>('/usuarios');
  }

  async getUsuario(id: string): Promise<Usuario> {
    return this.request<Usuario>(`/usuarios/${id}`);
  }

  async createUsuario(data: UsuarioFormData): Promise<{ success: boolean; message: string; usuario: Usuario }> {
    return this.request<{ success: boolean; message: string; usuario: Usuario }>('/usuarios', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateUsuario(id: string, data: Partial<UsuarioFormData>): Promise<{ success: boolean; message: string; usuario: Usuario }> {
    return this.request<{ success: boolean; message: string; usuario: Usuario }>(`/usuarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteUsuario(id: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/usuarios/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();