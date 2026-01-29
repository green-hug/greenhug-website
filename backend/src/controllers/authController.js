const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'greenhug_secret_key_2024';

const authController = {
  async login(req, res) {
    try {
      const { nombre, password } = req.body;

      if (!nombre || !password) {
        return res.status(400).json({ error: 'Nombre de usuario y contraseña son requeridos' });
      }

      // Buscar usuario por nombre
      const usuario = await prisma.usuario.findUnique({
        where: { nombre: nombre }
      });

      if (!usuario) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Verificar contraseña
      const passwordValida = await bcrypt.compare(password, usuario.password);
      
      if (!passwordValida) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Generar token JWT
      const token = jwt.sign(
        { 
          id: usuario.id, 
          nombre: usuario.nombre, 
          role: usuario.role
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Respuesta sin la contraseña
      const { password: _, ...usuarioSinPassword } = usuario;

      res.json({
        success: true,
        message: 'Login exitoso',
        token,
        usuario: usuarioSinPassword
      });

    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async verifyToken(req, res) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Verificar que el usuario aún exista
      const usuario = await prisma.usuario.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          nombre: true,
          role: true,
          created_at: true
        }
      });

      if (!usuario) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }

      res.json({
        success: true,
        usuario
      });

    } catch (error) {
      console.error('Error verificando token:', error);
      res.status(401).json({ error: 'Token inválido' });
    }
  },

  async createDefaultAdmin(req, res) {
    try {
      // Verificar si ya existe un admin
      const existeAdmin = await prisma.usuario.findFirst();
      
      if (existeAdmin) {
        return res.status(400).json({ error: 'Ya existen usuarios en el sistema' });
      }

      // Crear admin por defecto
      const hashedPassword = await bcrypt.hash('Gr33nhug.2026', 12);
      
      const admin = await prisma.usuario.create({
        data: {
          nombre: 'admin_1',
          password: hashedPassword,
          role: 'SUPER_ADMIN'
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
        message: 'Administrador creado exitosamente',
        usuario: admin,
        credentials: {
          nombre: 'admin_1',
          password: 'Gr33nhug.2026'
        }
      });

    } catch (error) {
      console.error('Error creando admin por defecto:', error);
      res.status(500).json({ error: 'Error al crear administrador' });
    }
  }
};

module.exports = authController;