// controllers/impactoEmpresa.controller.js
const { PrismaClient } = require('@prisma/client');
const puntosService = require('../services/puntosService');
const prisma = new PrismaClient();

class ImpactoEmpresaController {
  // Crear o actualizar impacto acumulado
  async upsertImpacto(req, res) {
    try {
      const { empresaId } = req.params;
      const {
        litros_agua,
        arboles_plantados,
        botellas_recicladas,
        voluntarios,
        uniformes_reciclados,
        co2_kg
      } = req.body;

      // Verificar que la empresa existe
      const empresa = await prisma.empresa.findUnique({
        where: { id: empresaId }
      });

      if (!empresa) {
        return res.status(404).json({ error: 'Empresa no encontrada' });
      }

      // Buscar impacto existente
      const impactoExistente = await prisma.impactoEmpresa.findUnique({
        where: { empresaId: empresaId }
      });

      let nuevosValores;
      
      if (impactoExistente) {
        // Actualizar valores acumulados
        nuevosValores = puntosService.actualizarPuntosAcumulados(impactoExistente, {
          litrosAgua: litros_agua,
          arbolesPlantados: arboles_plantados,
          botellasRecicladas: botellas_recicladas,
          voluntarios: voluntarios,
          uniformesReciclados: uniformes_reciclados,
          co2Kg: co2_kg
        });
      } else {
        // Crear nuevos valores
        nuevosValores = {
          litrosAgua: litros_agua || 0,
          arbolesPlantados: arboles_plantados || 0,
          botellasRecicladas: botellas_recicladas || 0,
          voluntarios: voluntarios || 0,
          uniformesReciclados: uniformes_reciclados || 0,
          co2Kg: co2_kg || 0
        };
      }

      // Calcular puntos totales
      const puntosTotales = puntosService.calcularPuntos(nuevosValores);

      // Crear o actualizar el impacto
      const impacto = await prisma.impactoEmpresa.upsert({
        where: { empresaId: empresaId },
        update: {
          puntosTotales,
          litrosAgua: nuevosValores.litrosAgua,
          arbolesPlantados: nuevosValores.arbolesPlantados,
          botellasRecicladas: nuevosValores.botellasRecicladas,
          voluntarios: nuevosValores.voluntarios,
          uniformesReciclados: nuevosValores.uniformesReciclados,
          co2Kg: nuevosValores.co2Kg
        },
        create: {
          empresaId: empresaId,
          puntosTotales,
          litrosAgua: nuevosValores.litrosAgua,
          arbolesPlantados: nuevosValores.arbolesPlantados,
          botellasRecicladas: nuevosValores.botellasRecicladas,
          voluntarios: nuevosValores.voluntarios,
          uniformesReciclados: nuevosValores.uniformesReciclados,
          co2Kg: nuevosValores.co2Kg
        }
      });

      res.status(200).json({
        message: impactoExistente ? 'Impacto actualizado' : 'Impacto creado',
        impacto,
        empresa: {
          id: empresa.id,
          nombre: empresa.nombre
        }
      });

    } catch (error) {
      console.error('Error al crear/actualizar impacto:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor',
        details: error.message 
      });
    }
  }

  // Obtener impacto de una empresa
  async getImpactoEmpresa(req, res) {
    try {
      const { empresaId } = req.params;

      const impacto = await prisma.impactoEmpresa.findUnique({
        where: { empresaId: empresaId },
        include: {
          empresa: {
            select: {
              nombre: true,
              tipo_empresa: true,
              region: true
            }
          }
        }
      });

      if (!impacto) {
        return res.status(404).json({ 
          message: 'No se encontró impacto para esta empresa',
          impacto: {
            litros_agua: 0,
            arboles_plantados: 0,
            botellas_recicladas: 0,
            voluntarios: 0,
            uniformes_reciclados: 0,
            co2kg: 0
          }
        });
      }

      res.json(impacto);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Incrementar impacto desde proyecto
  async incrementarDesdeProyecto(proyectoId) {
    try {
      // Obtener métricas del proyecto
      const impactosProyecto = await prisma.impactoProyecto.findMany({
        where: { proyectoId: proyectoId },
        select: {
          tipo_impacto: true,
          metrica: true,
          valor: true,
          unidad: true
        }
      });

      // Obtener el proyecto para saber la empresa
      const proyecto = await prisma.proyecto.findUnique({
        where: { id: proyectoId },
        include: { empresa: true }
      });

      if (!proyecto) {
        throw new Error('Proyecto no encontrado');
      }

      // Convertir métricas del proyecto a valores numéricos
      let incremento = {
        litrosAgua: 0,
        arbolesPlantados: 0,
        botellasRecicladas: 0,
        voluntarios: 0,
        uniformesReciclados: 0,
        co2Kg: 0
      };

      impactosProyecto.forEach(impacto => {
        const valorNumerico = parseFloat(impacto.valor) || 0;
        
        switch(impacto.metrica.toLowerCase()) {
          case 'árboles plantados':
          case 'arboles plantados':
            incremento.arbolesPlantados += valorNumerico;
            break;
          case 'agua infiltrada':
            incremento.litrosAgua += valorNumerico;
            break;
          case 'voluntarios':
            incremento.voluntarios += valorNumerico;
            break;
          case 'uniformes reciclados':
            incremento.uniformesReciclados += valorNumerico;
            break;
          case 'botellas recicladas':
            incremento.botellasRecicladas += valorNumerico;
            break;
          case 'co2 capturado':
            // Convertir toneladas a kg si es necesario
            if (impacto.unidad && impacto.unidad.toLowerCase().includes('ton')) {
              incremento.co2Kg += valorNumerico * 1000;
            } else {
              incremento.co2Kg += valorNumerico;
            }
            break;
        }
      });

      // Actualizar impacto acumulado de la empresa
      await this.upsertImpactoPorIncremento(proyecto.empresaId, incremento);

      return incremento;

    } catch (error) {
      console.error('Error al incrementar desde proyecto:', error);
      throw error;
    }
  }

  async upsertImpactoPorIncremento(empresaId, incremento) {
    // Asegurar que incremento tiene valores válidos
    const incrementoLimpio = {
      litrosAgua: incremento.litrosAgua || 0,
      arbolesPlantados: incremento.arbolesPlantados || 0,
      botellasRecicladas: incremento.botellasRecicladas || 0,
      voluntarios: incremento.voluntarios || 0,
      uniformesReciclados: incremento.uniformesReciclados || 0,
      co2Kg: incremento.co2Kg || 0
    };

    const impactoExistente = await prisma.impactoEmpresa.findUnique({
      where: { empresaId: empresaId }
    });

    let nuevosValores;
    
    if (impactoExistente) {
      nuevosValores = {
        litrosAgua: (impactoExistente.litros_agua || 0) + incrementoLimpio.litrosAgua,
        arbolesPlantados: (impactoExistente.arboles_plantados || 0) + incrementoLimpio.arbolesPlantados,
        botellasRecicladas: (impactoExistente.botellas_recicladas || 0) + incrementoLimpio.botellasRecicladas,
        voluntarios: (impactoExistente.voluntarios || 0) + incrementoLimpio.voluntarios,
        uniformesReciclados: (impactoExistente.uniformes_reciclados || 0) + incrementoLimpio.uniformesReciclados,
        co2Kg: (impactoExistente.co2kg || 0) + incrementoLimpio.co2Kg
      };
    } else {
      nuevosValores = incrementoLimpio;
    }

    const puntosTotales = puntosService.calcularPuntos(nuevosValores);

    return await prisma.impactoEmpresa.upsert({
      where: { empresaId: empresaId },
      update: {
        litros_agua: nuevosValores.litrosAgua || 0,
        arboles_plantados: nuevosValores.arbolesPlantados || 0,
        voluntarios: nuevosValores.voluntarios || 0,
        co2kg: nuevosValores.co2Kg || 0,
        botellas_recicladas: nuevosValores.botellasRecicladas || 0,
        uniformes_reciclados: nuevosValores.uniformesReciclados || 0
      },
      create: {
        litros_agua: nuevosValores.litrosAgua || 0,
        arboles_plantados: nuevosValores.arbolesPlantados || 0,
        botellas_recicladas: nuevosValores.botellasRecicladas || 0,
        voluntarios: nuevosValores.voluntarios || 0,
        uniformes_reciclados: nuevosValores.uniformesReciclados || 0,
        co2kg: nuevosValores.co2Kg || 0,
        empresa: {
          connect: { id: empresaId }
        }
      }
    });
  }

  async getResumenEjecutivo(req, res) {
    try {
      const { empresaId } = req.params;

      const empresa = await prisma.empresa.findUnique({
        where: { id: empresaId },
        include: {
          impactoEmpresa: true,
          proyectos: {
            include: {
              impactos_proyecto: true
            },
            orderBy: {
              fecha: 'desc'
            },
            take: 5 // Últimos 5 proyectos
          }
        }
      });

      if (!empresa) {
        return res.status(404).json({ error: 'Empresa no encontrada' });
      }

      // Calcular totales de proyectos
      const totalProyectos = empresa.proyectos.length;
      let totalVoluntariosProyectos = 0;
      let totalArbolesProyectos = 0;

      empresa.proyectos.forEach(proyecto => {
        proyecto.impactos_proyecto.forEach(impacto => {
          const valor = parseFloat(impacto.valor) || 0;
          if (impacto.metrica.toLowerCase().includes('voluntario')) {
            totalVoluntariosProyectos += valor;
          }
          if (impacto.metrica.toLowerCase().includes('árbol') || impacto.metrica.toLowerCase().includes('arbol')) {
            totalArbolesProyectos += valor;
          }
        });
      });

      const resumen = {
        empresa: {
          id: empresa.id,
          nombre: empresa.nombre,
          tipoEmpresa: empresa.tipoEmpresa,
          region: empresa.region,
          ciudad: empresa.ciudad,
          pais: empresa.pais,
          descripcionImpacto: empresa.descripcionImpacto
        },
        impactoAcumulado: empresa.impactoEmpresa ? {
          puntosTotales: empresa.impactoEmpresa.puntosTotales,
          arbolesPlantados: empresa.impactoEmpresa.arbolesPlantados,
          litrosAgua: empresa.impactoEmpresa.litrosAgua,
          co2Kg: empresa.impactoEmpresa.co2Kg,
          botellasRecicladas: empresa.impactoEmpresa.botellasRecicladas,
          uniformesReciclados: empresa.impactoEmpresa.uniformesReciclados,
          voluntarios: empresa.impactoEmpresa.voluntarios
        } : {
          puntosTotales: 0,
          arbolesPlantados: 0,
          litrosAgua: 0,
          co2Kg: 0,
          botellasRecicladas: 0,
          uniformesReciclados: 0,
          voluntarios: 0
        },
        proyectos: {
          total: totalProyectos,
          ultimos: empresa.proyectos.map(p => ({
            id: p.id,
            nombre: p.nombre,
            fecha: p.fecha,
            descripcion: p.descripcionProyecto
          })),
          metricas: {
            totalVoluntarios: totalVoluntariosProyectos,
            totalArboles: totalArbolesProyectos
          }
        },
        metricasVisualizacion: empresa.impactoEmpresa ? [
          { nombre: 'Árboles plantados', valor: empresa.impactoEmpresa.arbolesPlantados, icono: '🌳' },
          { nombre: 'Litros de agua', valor: empresa.impactoEmpresa.litrosAgua, unidad: 'L', icono: '💧' },
          { nombre: 'CO₂ capturado', valor: empresa.impactoEmpresa.co2Kg, unidad: 'kg', icono: '🌱' },
          { nombre: 'Botellas PET', valor: empresa.impactoEmpresa.botellasRecicladas, icono: '♻️' },
          { nombre: 'Voluntarios', valor: empresa.impactoEmpresa.voluntarios, icono: '👥' },
          { nombre: 'Uniformes reciclados', valor: empresa.impactoEmpresa.uniformesReciclados, icono: '👕' }
        ] : []
      };

      res.json({
        success: true,
        resumen
      });

    } catch (error) {
      console.error('Error al obtener resumen ejecutivo:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Error al obtener el resumen ejecutivo' 
      });
    }
  }
}

module.exports = new ImpactoEmpresaController();