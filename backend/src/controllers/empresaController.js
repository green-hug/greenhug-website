const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const empresaController = {
  async list(req, res) {
    try {
      const empresas = await prisma.empresa.findMany({
        include: {
          proyectos: {
            include: {
              impactos_proyecto: true
            }
          }
        }
      });
      res.json(empresas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const empresa = await prisma.empresa.findUnique({
        where: { id },
        include: {
          impactoEmpresa: true,
          proyectos: true
        }
      });

      if (!empresa) {
        return res.status(404).json({ error: 'Empresa no encontrada' });
      }

      res.json(empresa);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const empresa = await prisma.empresa.create({
        data: req.body
      });
      res.status(201).json(empresa);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const empresa = await prisma.empresa.update({
        where: { id },
        data: req.body
      });
      res.json(empresa);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      // Verificar que la empresa existe
      const empresa = await prisma.empresa.findUnique({
        where: { id: id },
        include: {
          proyectos: true,
          impactoEmpresa: true
        }
      });

      if (!empresa) {
        return res.status(404).json({ error: 'Empresa no encontrada' });
      }

      // Eliminar en cascada (Prisma debería manejar esto automáticamente)
      // Pero para mayor seguridad, eliminamos explícitamente:

      // 1. Eliminar todos los impactos de proyectos relacionados
      for (const proyecto of empresa.proyectos) {
        await prisma.impactoProyecto.deleteMany({
          where: { proyectoId: proyecto.id }
        });
      }

      // 2. Eliminar todos los proyectos
      await prisma.proyecto.deleteMany({
        where: { empresaId: id }
      });

      // 3. Eliminar impacto acumulado de la empresa
      if (empresa.impactoEmpresa) {
        await prisma.impactoEmpresa.delete({
          where: { empresaId: id }
        });
      }

      // 4. Eliminar la empresa
      await prisma.empresa.delete({
        where: { id: id }
      });

      res.json({
        success: true,
        message: 'Empresa eliminada correctamente',
        eliminados: {
          empresa: empresa.nombre,
          proyectos: empresa.proyectos.length,
          tieneImpactoAcumulado: !!empresa.impactoEmpresa
        }
      });

    } catch (error) {
      console.error('Error al eliminar empresa:', error);
      res.status(500).json({ 
        error: 'Error al eliminar empresa',
        details: error.message 
      });
    }
  }
};

module.exports = empresaController;