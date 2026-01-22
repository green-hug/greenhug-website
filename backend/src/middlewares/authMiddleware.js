const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'greenhug_secret_key_2024';

const authMiddleware = {
  // Verificar que el usuario esté autenticado
  authenticate: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({ error: 'Token de acceso requerido' });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Verificar que el usuario aún exista en la base de datos
      const usuario = await prisma.usuario.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          nombre: true,
          role: true
        }
      });

      if (!usuario) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }

      // Agregar información del usuario a la request
      req.user = usuario;
      next();

    } catch (error) {
      console.error('Error en autenticación:', error);
      res.status(401).json({ error: 'Token inválido o expirado' });
    }
  },

  // Verificar que el usuario tenga role ADMIN o SUPER_ADMIN
  requireAdmin: (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    if (req.user.role !== 'ADMIN' && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ error: 'Acceso denegado: Se requieren permisos de administrador' });
    }

    next();
  },

  // Verificar que el usuario tenga role SUPER_ADMIN
  requireSuperAdmin: (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    if (req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ error: 'Acceso denegado: Se requieren permisos de Super Administrador' });
    }

    next();
  }
};

module.exports = authMiddleware;