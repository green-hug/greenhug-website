const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const impactoEmpresaController = require('./impactoEmpresaController');

const proyectoController = {
  async getByEmpresa(req, res) {
    try {
      const { empresaId } = req.params;
      const proyectos = await prisma.proyecto.findMany({
        where: { empresaId },
        include: {
          impactos_proyecto: true
        }
      });
      res.json(proyectos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const proyecto = await prisma.proyecto.findUnique({
        where: { id },
        include: {
          impactos_proyecto: true
        }
      });

      if (!proyecto) {
        return res.status(404).json({ error: 'Proyecto no encontrado' });
      }

      res.json(proyecto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { empresaId } = req.params;
      const { nombre, fecha, descripcion_proyecto, resultados_concretos } = req.body;

      // Validar campos requeridos
      if (!nombre || !fecha) {
        return res.status(400).json({ 
          error: 'Nombre y fecha son requeridos' 
        });
      }

      // Verificar que la empresa existe
      const empresa = await prisma.empresa.findUnique({
        where: { id: empresaId }
      });

      if (!empresa) {
        return res.status(404).json({ 
          error: 'Empresa no encontrada' 
        });
      }

      const proyecto = await prisma.proyecto.create({
        data: {
          nombre,
          fecha: new Date(fecha),
          descripcion_proyecto: descripcion_proyecto || null,
          resultados_concretos: resultados_concretos || null,
          empresaId
        }
      });
      
      res.status(201).json(proyecto);
    } catch (error) {
      console.error('Error al crear proyecto:', error);
      res.status(500).json({ error: error.message });
    }
  },

  async addImpacto(req, res) {
    try {
      const { proyectoId } = req.params;
      const impactos = req.body;

      // Validar que es un array
      if (!Array.isArray(impactos)) {
        return res.status(400).json({ 
          error: 'Se esperaba un array de impactos' 
        });
      }

      // Validar que el proyecto existe
      const proyecto = await prisma.proyecto.findUnique({
        where: { id: proyectoId }
      });

      if (!proyecto) {
        return res.status(404).json({ error: 'Proyecto no encontrado' });
      }

      // Preparar datos para creación múltiple
      const impactosData = impactos.map(impacto => {
        // Asegurar que los campos coincidan con el modelo Prisma
        return {
          tipo_impacto: impacto.tipo_impacto,
          metrica: impacto.metrica,
          valor: impacto.valor,
          unidad: impacto.unidad,
          descripcion_adicional: impacto.descripcion_adicional,
          proyectoId: proyectoId
        };
      });

      // Usar createMany para insertar múltiples registros
      const result = await prisma.impactoProyecto.createMany({
        data: impactosData,
        skipDuplicates: false, // No saltar duplicados (puedes cambiar a true si quieres)
      });

      // Obtener los impactos recién creados
      const impactosCreados = await prisma.impactoProyecto.findMany({
        where: {
          proyectoId: proyectoId,
          // Opcional: Filtrar por fecha reciente
          created_at: {
            gte: new Date(Date.now() - 60000) // Último minuto
          }
        },
        orderBy: {
          created_at: 'desc'
        },
        take: impactos.length
      });

      if (impactos && impactos.length > 0) {
      // Actualizar el impacto acumulado de la empresa
      await impactoEmpresaController.incrementarDesdeProyecto(proyecto.id);
    }

      res.status(201).json({
        message: `${result.count} impactos creados exitosamente`,
        count: result.count,
        impactos: impactosCreados
      });

    } catch (error) {
      console.error('Error al crear impactos:', error);
      
      if (error.code === 'P2003') {
        res.status(400).json({ error: 'Proyecto no válido' });
      } else if (error.code === 'P2002') {
        res.status(409).json({ error: 'Algunos impactos ya existen' });
      } else {
        res.status(500).json({ 
          error: 'Error interno del servidor',
          details: error.message 
        });
      }
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      // Verificar que el proyecto existe
      const proyecto = await prisma.proyecto.findUnique({
        where: { id: id },
        include: {
          impactos_proyecto: true,
          empresa: true
        }
      });

      if (!proyecto) {
        return res.status(404).json({ error: 'Proyecto no encontrado' });
      }

      // Restar impactos del total acumulado de la empresa
      const impactosProyecto = proyecto.impactos_proyecto;
      let decremento = {
        litrosAgua: 0,
        arbolesPlantados: 0,
        botellasRecicladas: 0,
        voluntarios: 0,
        uniformesReciclados: 0,
        co2Kg: 0
      };

      // Calcular el decremento basado en los impactos del proyecto
      impactosProyecto.forEach(impacto => {
        const valorNumerico = parseFloat(impacto.valor) || 0;
        
        switch(impacto.metrica.toLowerCase()) {
          case 'árboles plantados':
          case 'arboles plantados':
            decremento.arbolesPlantados += valorNumerico;
            break;
          case 'agua infiltrada':
            decremento.litrosAgua += valorNumerico;
            break;
          case 'voluntarios':
            decremento.voluntarios += valorNumerico;
            break;
          case 'uniformes reciclados':
            decremento.uniformesReciclados += valorNumerico;
            break;
          case 'botellas recicladas':
            decremento.botellasRecicladas += valorNumerico;
            break;
          case 'co2 capturado':
            if (impacto.unidad && impacto.unidad.toLowerCase().includes('ton')) {
              decremento.co2Kg += valorNumerico * 1000;
            } else {
              decremento.co2Kg += valorNumerico;
            }
            break;
        }
      });

      // 1. Eliminar impactos del proyecto
      await prisma.impactoProyecto.deleteMany({
        where: { proyectoId: id }
      });

      // 2. Eliminar el proyecto
      await prisma.proyecto.delete({
        where: { id: id }
      });

      // 3. Actualizar impacto acumulado de la empresa (restar)
      const impactoEmpresa = await prisma.impactoEmpresa.findUnique({
        where: { empresaId: proyecto.empresaId }
      });

      if (impactoEmpresa) {
        const nuevosValores = {
          litros_agua: Math.max(0, (impactoEmpresa.litros_agua || 0) - decremento.litrosAgua),
          arboles_plantados: Math.max(0, (impactoEmpresa.arboles_plantados || 0) - decremento.arbolesPlantados),
          botellas_recicladas: Math.max(0, (impactoEmpresa.botellas_recicladas || 0) - decremento.botellasRecicladas),
          voluntarios: Math.max(0, (impactoEmpresa.voluntarios || 0) - decremento.voluntarios),
          uniformes_reciclados: Math.max(0, (impactoEmpresa.uniformes_reciclados || 0) - decremento.uniformesReciclados),
          co2kg: Math.max(0, (impactoEmpresa.co2kg || 0) - decremento.co2Kg)
        };

        await prisma.impactoEmpresa.update({
          where: { empresaId: proyecto.empresaId },
          data: nuevosValores
        });
      }

      res.json({
        success: true,
        message: 'Proyecto eliminado correctamente',
        eliminado: {
          proyecto: proyecto.nombre,
          empresa: proyecto.empresa.nombre,
          impactosEliminados: impactosProyecto.length,
          decrementoAplicado: decremento
        }
      });

    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
      res.status(500).json({ 
        error: 'Error al eliminar proyecto',
        details: error.message 
      });
    }
  }
};

module.exports = proyectoController;