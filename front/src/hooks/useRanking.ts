import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { Empresa } from '@/types/backend';

interface CompanyWithPoints extends Empresa {
  points: number;
  growth?: number;
}

interface UseRankingResult {
  companies: CompanyWithPoints[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useRanking = (year: number = new Date().getFullYear()): UseRankingResult => {
  const [companies, setCompanies] = useState<CompanyWithPoints[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRanking = async () => {
    try {
      setLoading(true);
      setError(null);

      // Cargar empresas
      const empresas = await apiService.getEmpresas();
      
      // Calcular puntos basados en impactos anuales
      const companiesWithPoints: CompanyWithPoints[] = await Promise.all(
        empresas.map(async (empresa) => {
          try {
            // Si la empresa ya tiene impactos anuales cargados
            const impactosAnuales = empresa.impactos_anuales || [];
            let impactoActual = impactosAnuales.find(imp => imp.ano === year);
            
            // Si no tiene impactos cargados o no tiene para el año actual, intentar cargar
            if (!impactoActual) {
              try {
                const impactosData = await apiService.getImpactoAnualByEmpresa(empresa.id);
                impactoActual = impactosData.find(imp => imp.ano === year);
              } catch (err) {
                // Si no hay datos de impacto, usar 0
                console.warn(`No se pudieron cargar impactos para empresa ${empresa.nombre}:`, err);
              }
            }
            
            return {
              ...empresa,
              points: impactoActual?.puntos_totales || 0,
              growth: calculateGrowth(empresa, year)
            };
          } catch (err) {
            return {
              ...empresa,
              points: 0,
              growth: 0
            };
          }
        })
      );

      // Ordenar por puntos (descendente)
      companiesWithPoints.sort((a, b) => b.points - a.points);
      
      setCompanies(companiesWithPoints);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar ranking';
      setError(errorMessage);
      console.error('Error loading ranking:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateGrowth = (empresa: Empresa, year: number): number => {
    try {
      if (!empresa.impactos_anuales || empresa.impactos_anuales.length < 2) {
        return 0;
      }

      const currentYear = empresa.impactos_anuales.find(imp => imp.ano === year);
      const previousYear = empresa.impactos_anuales.find(imp => imp.ano === year - 1);

      if (!currentYear || !previousYear || previousYear.puntos_totales === 0) {
        return 0;
      }

      const growth = ((currentYear.puntos_totales - previousYear.puntos_totales) / previousYear.puntos_totales) * 100;
      return Math.round(growth * 10) / 10; // Redondear a 1 decimal
    } catch (err) {
      return 0;
    }
  };

  useEffect(() => {
    fetchRanking();
  }, [year]);

  return {
    companies,
    loading,
    error,
    refetch: fetchRanking
  };
};