// controllers/ranking.controller.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class RankingController {
  // Obtener ranking general acumulado
  async getRankingGeneral(req, res) {
    try {
      const ranking = await prisma.impactoEmpresa.findMany({
        include: {
          empresa: {
            select: {
              nombre: true,
              tipo_empresa: true,
              region: true,
              ciudad: true,
              pais: true,
              descripcion_impacto: true
            }
          }
        }
        // No ordenamos aquí, lo haremos después de calcular puntos
      });

      // Formatear respuesta y calcular puntos
      const rankingFormateado = ranking.map((impacto) => {
        // Calcular impacto ambiental
        const impactoAmbiental = {
          arboles: impacto.arboles_plantados || 0,
          co2Kg: impacto.co2kg || 0,
          litrosAgua: impacto.litros_agua || 0
        };

        // Calcular impacto social
        const impactoSocial = {
          voluntarios: impacto.voluntarios || 0,
          horasVoluntariado: (impacto.voluntarios || 0) * 4, // Estimado: 4 horas por voluntario
          comunidadesBeneficiadas: Math.ceil((impacto.arboles_plantados || 0) / 1000) // Estimado
        };

        // Calcular puntos totales usando sistema Greenhug
        const litrosAgua = impacto.litros_agua || 0;
        const arbolesPlantados = impacto.arboles_plantados || 0;
        const botellasRecicladas = impacto.botellas_recicladas || 0;
        const voluntarios = impacto.voluntarios || 0;
        const uniformesReciclados = impacto.uniformes_reciclados || 0;
        const co2Kg = impacto.co2kg || 0;
        
        const puntosTotales = 
          Math.floor(litrosAgua / 2000) + // 2,000L = 1 punto
          (arbolesPlantados * 3) + // 1 árbol = 3 puntos
          Math.floor(botellasRecicladas / 8) + // 8 botellas = 1 punto
          (voluntarios * 3) + // 1 voluntario = 3 puntos
          Math.floor(uniformesReciclados / 2) + // 2 uniformes = 1 punto
          Math.floor(co2Kg / 3); // 3kg CO₂ = 1 punto

        return {
          empresaId: impacto.empresaId,
          empresa: {
            id: impacto.empresaId,
            nombre: impacto.empresa.nombre,
            tipo_empresa: impacto.empresa.tipo_empresa,
            region: impacto.empresa.region,
            ciudad: impacto.empresa.ciudad,
            pais: impacto.empresa.pais,
            descripcion_impacto: impacto.empresa.descripcion_impacto
          },
          puntos_totales: puntosTotales,
          impactoAmbiental,
          impactoSocial,
          litros_agua: litrosAgua,
          arboles_plantados: arbolesPlantados,
          botellas_recicladas: botellasRecicladas,
          voluntarios: voluntarios,
          uniformes_reciclados: uniformesReciclados,
          co2kg: co2Kg
        };
      });

      // Ordenar por puntos totales (descendente) y asignar posiciones
      const rankingOrdenado = rankingFormateado
        .sort((a, b) => b.puntos_totales - a.puntos_totales)
        .map((item, index) => ({
          ...item,
          posicion: index + 1
        }));

      res.json({
        success: true,
        totalEmpresas: rankingOrdenado.length,
        ranking: rankingOrdenado,
        estadisticas: {
          totalEmpresas: rankingOrdenado.length,
          totalPuntos: rankingOrdenado.reduce((sum, item) => sum + item.puntos_totales, 0),
          promedioImpacto: {
            arboles: Math.floor(rankingOrdenado.reduce((sum, item) => sum + item.arboles_plantados, 0) / rankingOrdenado.length),
            agua: Math.floor(rankingOrdenado.reduce((sum, item) => sum + item.litros_agua, 0) / rankingOrdenado.length)
          }
        }
      });

    } catch (error) {
      console.error('Error al obtener ranking general:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Error al obtener el ranking general' 
      });
    }
  }

  // Obtener ranking por región (acumulado)
  async getRankingPorRegion(req, res) {
    try {
      const { region } = req.params;

      const ranking = await prisma.impactoEmpresa.findMany({
        where: {
          empresa: {
            region: region
          }
        },
        include: {
          empresa: {
            select: {
              nombre: true,
              tipoEmpresa: true,
              ciudad: true
            }
          }
        },
        orderBy: {
          puntosTotales: 'desc'
        }
      });

      const rankingFormateado = ranking.map((impacto, index) => ({
        posicion: index + 1,
        nombre: impacto.empresa.nombre,
        tipoEmpresa: impacto.empresa.tipoEmpresa,
        ciudad: impacto.empresa.ciudad,
        puntosTotales: impacto.puntosTotales || 0,
        arbolesPlantados: impacto.arbolesPlantados || 0,
        litrosAgua: impacto.litrosAgua || 0,
        co2Kg: impacto.co2Kg || 0,
        voluntarios: impacto.voluntarios || 0
      }));

      res.json({
        success: true,
        region,
        totalEmpresas: rankingFormateado.length,
        ranking: rankingFormateado
      });

    } catch (error) {
      console.error('Error al obtener ranking por región:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Error al obtener el ranking por región' 
      });
    }
  }

  // Obtener ranking por tipo de empresa (acumulado)
  async getRankingPorTipoEmpresa(req, res) {
    try {
      const { tipo } = req.params;

      const ranking = await prisma.impactoEmpresa.findMany({
        where: {
          empresa: {
            tipoEmpresa: tipo
          }
        },
        include: {
          empresa: {
            select: {
              nombre: true,
              region: true,
              ciudad: true
            }
          }
        },
        orderBy: {
          puntosTotales: 'desc'
        }
      });

      const rankingFormateado = ranking.map((impacto, index) => ({
        posicion: index + 1,
        nombre: impacto.empresa.nombre,
        region: impacto.empresa.region,
        ciudad: impacto.empresa.ciudad,
        puntosTotales: impacto.puntosTotales || 0,
        arbolesPlantados: impacto.arbolesPlantados || 0,
        litrosAgua: impacto.litrosAgua || 0,
        co2Kg: impacto.co2Kg || 0,
        voluntarios: impacto.voluntarios || 0
      }));

      res.json({
        success: true,
        tipoEmpresa: tipo,
        totalEmpresas: rankingFormateado.length,
        ranking: rankingFormateado
      });

    } catch (error) {
      console.error('Error al obtener ranking por tipo:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Error al obtener el ranking por tipo de empresa' 
      });
    }
  }

  // Método auxiliar para calcular estadísticas generales
  async calcularEstadisticasGenerales() {
    try {
      const estadisticas = await prisma.impactoEmpresa.aggregate({
        _count: {
          id: true
        },
        _sum: {
          puntosTotales: true,
          arbolesPlantados: true,
          litrosAgua: true,
          co2Kg: true,
          botellasRecicladas: true,
          voluntarios: true,
          uniformesReciclados: true
        },
        _avg: {
          puntosTotales: true
        }
      });

      const distribucionRegion = await prisma.empresa.groupBy({
        by: ['region'],
        _count: {
          id: true
        },
        where: {
          impactoEmpresa: {
            isNot: null
          }
        }
      });

      const distribucionTipo = await prisma.empresa.groupBy({
        by: ['tipoEmpresa'],
        _count: {
          id: true
        },
        where: {
          impactoEmpresa: {
            isNot: null
          }
        }
      });

      return {
        totales: {
          empresas: estadisticas._count.id || 0,
          puntosTotales: estadisticas._sum.puntosTotales || 0,
          arboles: estadisticas._sum.arbolesPlantados || 0,
          litrosAgua: estadisticas._sum.litrosAgua || 0,
          co2Kg: estadisticas._sum.co2Kg || 0,
          botellas: estadisticas._sum.botellasRecicladas || 0,
          voluntarios: estadisticas._sum.voluntarios || 0,
          uniformes: estadisticas._sum.uniformesReciclados || 0
        },
        promedioPuntos: estadisticas._avg.puntosTotales || 0,
        distribucionRegion: distribucionRegion.map(r => ({
          region: r.region,
          cantidadEmpresas: r._count.id
        })),
        distribucionTipo: distribucionTipo.map(t => ({
          tipoEmpresa: t.tipoEmpresa,
          cantidadEmpresas: t._count.id
        }))
      };
    } catch (error) {
      console.error('Error al calcular estadísticas:', error);
      return null;
    }
  }
}

module.exports = new RankingController();