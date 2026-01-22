require('dotenv').config();
const app = require('./src/app');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Función para crear usuario admin por defecto
async function createDefaultAdmin() {
  try {
    // Verificar si ya existe algún usuario
    const userCount = await prisma.usuario.count();
    
    if (userCount === 0) {
      // No hay usuarios, crear admin por defecto
      const hashedPassword = await bcrypt.hash('Gr33n.hug.2026', 12);
      
      const admin = await prisma.usuario.create({
        data: {
          nombre: 'superadmin_green',
          password: hashedPassword,
          role: 'SUPER_ADMIN'
        }
      });

      console.log('✅ Usuario administrador creado exitosamente:');
      console.log('   Username: superadmin_green');
      console.log('   Password: Gr33n.hug.2026');
      console.log('   Role: SUPER_ADMIN');
    } else {
      console.log('📋 Usuarios existentes en la base de datos');
    }
  } catch (error) {
    console.error('❌ Error al verificar/crear usuario admin:', error);
  }
}

// Función para crear el superadmin específico solicitado
async function createSuperAdminGreen() {
  try {
    // Verificar si ya existe el superadmin_green
    const existeSuper = await prisma.usuario.findUnique({
      where: { nombre: 'superadmin_green' }
    });
    
    if (!existeSuper) {
      const hashedPassword = await bcrypt.hash('Gr33n.hug.2026', 12);
      
      const superAdmin = await prisma.usuario.create({
        data: {
          nombre: 'superadmin_green',
          password: hashedPassword,
          role: 'SUPER_ADMIN'
        }
      });

      console.log('🌿 Nuevo SuperAdmin creado:');
      console.log('   Username: superadmin_green');
      console.log('   Password: Gr33n.hug.2026');
      console.log('   Role: SUPER_ADMIN');
    } else {
      console.log('🌿 SuperAdmin superadmin_green ya existe');
    }
  } catch (error) {
    console.error('❌ Error al crear superadmin_green:', error);
  }
}

app.listen(PORT, async () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  
  // Crear admin por defecto si no existe
  await createDefaultAdmin();
  
  // Crear superadmin_green específico
  await createSuperAdminGreen();
});