// Types based on backend Prisma schema

export interface Empresa {
  id: string;
  nombre: string;
  tipo_empresa: TipoEmpresa;
  region: Region;
  ciudad: string;
  pais: string;
  descripcion_impacto?: string;
  created_at: string;
  updated_at: string;
  impactos_anuales?: ImpactoAnual[];
  proyectos?: Proyecto[];
  puntos_totales?: number;
  impactoEmpresa?: ImpactoEmpresa;
}

export interface ImpactoAnual {
  id: string;
  empresaId: string;
  ano: number;
  puntos_totales: number;
  litros_agua: number;
  arboles_plantados: number;
  botellas_recicladas: number;
  voluntarios: number;
  uniformes_reciclados: number;
  co2kg: number;
  created_at: string;
  updated_at: string;
  empresa?: Empresa;
}

export interface ImpactoEmpresa {
  id: string;
  empresaId: string;
  litros_agua: number;
  arboles_plantados: number;
  botellas_recicladas: number;
  voluntarios: number;
  uniformes_reciclados: number;
  co2kg: number;
  created_at: string;
  updated_at: string;
  empresa?: Empresa;
}

export interface Proyecto {
  id: string;
  empresaId: string;
  nombre: string;
  tipo: Tipo;
  fecha: string;
  descripcion_proyecto?: string;
  resultados_concretos?: string;
  created_at: string;
  updated_at: string;
  empresa?: Empresa;
  impactos_proyecto?: ImpactoProyecto[];
}

export interface ImpactoProyecto {
  id: string;
  proyectoId: string;
  tipo_impacto: TipoImpacto;
  metrica: string;
  valor: string;
  unidad?: string;
  descripcion_adicional?: string;
  created_at: string;
  proyecto?: Proyecto;
}

export enum TipoEmpresa {
  Manufactura = 'Manufactura',
  Retail = 'Retail',
  Servicios = 'Servicios',
  Tecnologia = 'Tecnologia',
  Alimentos = 'Alimentos',
  Construccion = 'Construccion',
  Logistica = 'Logistica',
  Farmaceutica = 'Farmaceutica'
}

export enum Tipo {
  EXP = 'EXP',
  LIFE = 'LIFE',
  UPC = 'UPC',
  PRO = 'PRO'
}

export enum Region {
  Norte = 'Norte',
  Sur = 'Sur',
  Centro = 'Centro',
  Metropolitana = 'Metropolitana'
}

export enum TipoImpacto {
  ambiental = 'ambiental',
  social = 'social',
  cultura = 'cultura'
}

// Form interfaces for frontend
export interface EmpresaFormData {
  nombre: string;
  tipo_empresa: TipoEmpresa;
  region: Region;
  ciudad: string;
  pais: string;
  descripcion_impacto?: string;
}

export interface ProyectoFormData {
  nombre: string;
  tipo: Tipo;
  fecha: string;
  descripcion_proyecto?: string;
  resultados_concretos?: string;
  impactos: ImpactoProyectoFormData[];
}

export interface ImpactoProyectoFormData {
  tipo_impacto: TipoImpacto;
  metrica: string;
  valor: string;
  unidad?: string;
  descripcion_adicional?: string;
}

export interface ImpactoAnualFormData {
  ano: number;
  litros_agua: number;
  arboles_plantados: number;
  botellas_recicladas: number;
  voluntarios: number;
  uniformes_reciclados: number;
  co2kg: number;
}

// Tipos para autenticación y usuarios
export interface Usuario {
  id: string;
  nombre: string;
  role: Role;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  nombre: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  usuario: Usuario;
}

export interface UsuarioFormData {
  nombre: string;
  password: string;
  role?: Role;
}

export type Role = 'ADMIN' | 'SUPER_ADMIN';