const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class RankingService {
  async getRankingByYear(year) {
    return await prisma.impacto_anual.findMany({
      where: { ano: year },
      include: {
        empresa: {
          select: {
            id: true,
            nombre: true,
            tipo_empresa: true,
            region: true,
            ciudad: true,
            pais: true,
          }
        }
      },
      orderBy: {
        puntos_totales: 'desc'
      }
    });
  }

  async getRankingByRegion(year, region) {
    return await prisma.impacto_anual.findMany({
      where: { 
        ano: year,
        empresa: {
          region: region
        }
      },
      include: {
        empresa: {
          select: {
            id: true,
            nombre: true,
            tipo_empresa: true,
            region: true,
            ciudad: true,
            pais: true,
          }
        }
      },
      orderBy: {
        puntos_totales: 'desc'
      }
    });
  }

  async compareYears(empresaId, year1, year2) {
    const impactos = await prisma.impacto_anual.findMany({
      where: {
        empresaId: empresaId,
        ano: { in: [year1, year2] }
      },
      orderBy: {
        ano: 'asc'
      }
    });

    return {
      empresaId,
      comparacion: impactos.map(i => ({
        ano: i.ano,
        puntos_totales: i.puntos_totales,
        litros_agua: i.litros_agua,
        arboles_plantados: i.arboles_plantados,
        botellas_recicladas: i.botellas_recicladas,
        voluntarios: i.voluntarios,
        uniformes_reciclados: i.uniformes_reciclados,
        co2kg: i.co2kg
      }))
    };
  }

  async getResumenEjecutivo(empresaId) {
    const impactos = await prisma.impacto_anual.findMany({
      where: { empresaId: empresaId }
    });

    const resumen = {
      total_arboles: impactos.reduce((sum, i) => sum + i.arboles_plantados, 0),
      total_agua: impactos.reduce((sum, i) => sum + i.litros_agua, 0),
      total_co2: impactos.reduce((sum, i) => sum + i.co2kg, 0),
      total_botellas: impactos.reduce((sum, i) => sum + i.botellas_recicladas, 0),
      total_uniformes: impactos.reduce((sum, i) => sum + i.uniformes_reciclados, 0),
      total_voluntarios: impactos.reduce((sum, i) => sum + i.voluntarios, 0)
    };

    return resumen;
  }
}

module.exports = new RankingService();