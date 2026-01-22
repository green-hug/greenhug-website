const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const usuarioController = {
  async list(req, res) {
    try {
      const usuarios = await prisma.usuario.findMany({
        select: {
          id: true,
          nombre: true,
          role: true,
          created_at: true,
          updated_at: true
        },
        orderBy: {
          created_at: 'desc'
        }
      });

      res.json(usuarios);
    } catch (error) {
      console.error('Error listando usuarios:', error);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;

      const usuario = await prisma.usuario.findUnique({
        where: { id },
        select: {
          id: true,
          nombre: true,
          role: true,
          created_at: true,
          updated_at: true
        }
      });

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.json(usuario);
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  },

  async create(req, res) {
    try {
      const { nombre, password, role } = req.body;

      // Validaciones básicas
      if (!nombre || !password) {
        return res.status(400).json({ 
          error: 'Nombre y contraseña son requeridos' 
        });
      }

      // Verificar que el nombre no esté en uso
      const nombreExiste = await prisma.usuario.findUnique({
        where: { nombre: nombre.trim() }
      });

      if (nombreExiste) {
        return res.status(400).json({ 
          error: 'Ya existe un usuario con este nombre' 
        });
      }

      // Validar contraseña (mínimo 6 caracteres)
      if (password.length < 6) {
        return res.status(400).json({ 
          error: 'La contraseña debe tener al menos 6 caracteres' 
        });
      }

      // Hashear contraseña
      const hashedPassword = await bcrypt.hash(password, 12);

      // Crear usuario
      const nuevoUsuario = await prisma.usuario.create({
        data: {
          nombre: nombre.trim(),
          password: hashedPassword,
          role: role || 'ADMIN'
        },
        select: {
          id: true,
          nombre: true,
          role: true,
          created_at: true
        }
      });

      res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente',
        usuario: nuevoUsuario
      });

    } catch (error) {
      console.error('Error creando usuario:', error);
      res.status(500).json({ error: 'Error al crear usuario' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nombre, password, role } = req.body;

      // Verificar que el usuario existe
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { id }
      });

      if (!usuarioExistente) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Preparar datos para actualizar
      const datosActualizar = {};
      
      if (nombre) datosActualizar.nombre = nombre.trim();
      if (email) datosActualizar.email = email.toLowerCase().trim();
      if (role) datosActualizar.role = role;
      
      // Si se proporciona nueva contraseña, hashearla
      if (password) {
        if (password.length < 6) {
          return res.status(400).json({ 
            error: 'La contraseña debe tener al menos 6 caracteres' 
          });
        }
        datosActualizar.password = await bcrypt.hash(password, 12);
      }

      // Actualizar usuario
      const usuarioActualizado = await prisma.usuario.update({
        where: { id },
        data: datosActualizar,
        select: {
          id: true,
          nombre: true,
          role: true,
          updated_at: true
        }
      });

      res.json({
        success: true,
        message: 'Usuario actualizado exitosamente',
        usuario: usuarioActualizado
      });

    } catch (error) {
      console.error('Error actualizando usuario:', error);
      res.status(500).json({ error: 'Error al actualizar usuario' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      // Verificar que el usuario existe
      const usuario = await prisma.usuario.findUnique({
        where: { id },
        select: { id: true, nombre: true, email: true, role: true }
      });

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Prevenir eliminar al último SUPER_ADMIN
      if (usuario.role === 'SUPER_ADMIN') {
        const cantidadSuperAdmins = await prisma.usuario.count({
          where: { role: 'SUPER_ADMIN' }
        });

        if (cantidadSuperAdmins <= 1) {
          return res.status(400).json({ 
            error: 'No se puede eliminar el último Super Administrador' 
          });
        }
      }

      // Eliminar usuario
      await prisma.usuario.delete({
        where: { id }
      });

      res.json({
        success: true,
        message: 'Usuario eliminado exitosamente',
        usuario: {
          id: usuario.id,
          nombre: usuario.nombreSubistS
        }
      });

    } catch (error) {
      console.error('Error eliminando usuario:', error);
      res.status(500).json({ error: 'Error al eliminar usuario' });
    }
  }
};

module.exports = usuarioController;