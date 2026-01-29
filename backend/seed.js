const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const seedData = async () => {
  try {
    console.log('🌱 Agregando datos de prueba...');

    // Crear empresas de ejemplo
    const empresas = await Promise.all([
      prisma.empresa.create({
        data: {
          nombre: 'EcoTech Solutions',
          tipo_empresa: 'Tecnologia',
          region: 'Norte',
          ciudad: 'Monterrey',
          pais: 'México',
          descripcion_impacto: 'Empresa líder en soluciones tecnológicas sostenibles con enfoque en la reducción de huella de carbono.'
        }
      }),
      prisma.empresa.create({
        data: {
          nombre: 'Green Manufacturing',
          tipo_empresa: 'Manufactura',
          region: 'Centro',
          ciudad: 'Guadalajara',
          pais: 'México',
          descripcion_impacto: 'Manufactura sustentable con procesos de economía circular y responsabilidad social.'
        }
      }),
      prisma.empresa.create({
        data: {
          nombre: 'Sustainable Logistics',
          tipo_empresa: 'Logistica',
          region: 'Sur',
          ciudad: 'Mérida',
          pais: 'México',
          descripcion_impacto: 'Soluciones logísticas con enfoque en sustentabilidad y comunidades.'
        }
      }),
      prisma.empresa.create({
        data: {
          nombre: 'Retail Verde',
          tipo_empresa: 'Retail',
          region: 'Metropolitana',
          ciudad: 'Ciudad de México',
          pais: 'México',
          descripcion_impacto: 'Cadena de retail comprometida con el medio ambiente y la inclusión social.'
        }
      })
    ]);

    console.log('✅ Empresas creadas:', empresas.length);

    // Crear proyectos para cada empresa
    const proyectos = [];
    
    // Proyectos para EcoTech Solutions
    const proyecto1 = await prisma.proyecto.create({
      data: {
        empresaId: empresas[0].id,
        nombre: 'Programa de Reciclaje Digital',
        tipo: 'EXP',
        fecha: new Date('2024-03-15'),
        descripcion_proyecto: 'Implementación de un programa integral de reciclaje de equipos electrónicos',
        resultados_concretos: 'Reciclaje de 500 equipos electrónicos y reducción del 25% en residuos digitales'
      }
    });

    // Impactos del proyecto 1
    await prisma.impactoProyecto.createMany({
      data: [
        {
          proyectoId: proyecto1.id,
          tipo_impacto: 'ambiental',
          metrica: 'Equipos reciclados',
          valor: '500',
          unidad: 'unidades',
          descripcion_adicional: 'Computadoras, tablets y smartphones'
        },
        {
          proyectoId: proyecto1.id,
          tipo_impacto: 'ambiental',
          metrica: 'CO2 reducido',
          valor: '2500',
          unidad: 'kg',
          descripcion_adicional: 'Reducción de emisiones por reciclaje'
        }
      ]
    });

    // Proyecto para Green Manufacturing
    const proyecto2 = await prisma.proyecto.create({
      data: {
        empresaId: empresas[1].id,
        nombre: 'Reforestación Industrial',
        tipo: 'EXP',
        fecha: new Date('2024-02-10'),
        descripcion_proyecto: 'Programa de reforestación en zonas industriales',
        resultados_concretos: 'Plantación de 1000 árboles y creación de 3 espacios verdes'
      }
    });

    await prisma.impactoProyecto.createMany({
      data: [
        {
          proyectoId: proyecto2.id,
          tipo_impacto: 'ambiental',
          metrica: 'Árboles plantados',
          valor: '1000',
          unidad: 'unidades'
        },
        {
          proyectoId: proyecto2.id,
          tipo_impacto: 'social',
          metrica: 'Voluntarios participantes',
          valor: '150',
          unidad: 'personas'
        }
      ]
    });

    proyectos.push(proyecto1, proyecto2);

    // Proyecto para Sustainable Logistics
    const proyecto3 = await prisma.proyecto.create({
      data: {
        empresaId: empresas[2].id,
        nombre: 'Logística Verde',
        tipo: 'LIFE',
        fecha: new Date('2024-01-20'),
        descripcion_proyecto: 'Implementación de rutas de distribución sostenibles y vehículos eléctricos',
        resultados_concretos: 'Reducción del 40% en emisiones de transporte y optimización de 15 rutas'
      }
    });

    await prisma.impactoProyecto.createMany({
      data: [
        {
          proyectoId: proyecto3.id,
          tipo_impacto: 'ambiental',
          metrica: 'CO2 reducido',
          valor: '1800',
          unidad: 'kg',
          descripcion_adicional: 'Reducción por uso de vehículos eléctricos'
        },
        {
          proyectoId: proyecto3.id,
          tipo_impacto: 'social',
          metrica: 'Voluntarios participantes',
          valor: '40',
          unidad: 'personas',
          descripcion_adicional: 'Capacitación en logística sostenible'
        }
      ]
    });

    // Proyecto para Retail Verde
    const proyecto4 = await prisma.proyecto.create({
      data: {
        empresaId: empresas[3].id,
        nombre: 'Programa de Uniformes Sostenibles',
        tipo: 'UPC',
        fecha: new Date('2024-04-05'),
        descripcion_proyecto: 'Reciclaje y reutilización de uniformes corporativos en nuevos productos',
        resultados_concretos: 'Reciclaje de 140 uniformes y creación de 80 productos reutilizables'
      }
    });

    await prisma.impactoProyecto.createMany({
      data: [
        {
          proyectoId: proyecto4.id,
          tipo_impacto: 'social',
          metrica: 'Uniformes reciclados',
          valor: '140',
          unidad: 'unidades',
          descripcion_adicional: 'Transformados en bolsas y accesorios'
        },
        {
          proyectoId: proyecto4.id,
          tipo_impacto: 'social',
          metrica: 'Voluntarios participantes',
          valor: '80',
          unidad: 'personas',
          descripcion_adicional: 'Empleados participando en el programa'
        },
        {
          proyectoId: proyecto4.id,
          tipo_impacto: 'ambiental',
          metrica: 'Botellas recicladas',
          valor: '2800',
          unidad: 'unidades',
          descripcion_adicional: 'Botellas recolectadas en tiendas'
        }
      ]
    });

    // Segundo proyecto para EcoTech Solutions
    const proyecto5 = await prisma.proyecto.create({
      data: {
        empresaId: empresas[0].id,
        nombre: 'Ahorro de Agua Inteligente',
        tipo: 'LIFE',
        fecha: new Date('2024-05-12'),
        descripcion_proyecto: 'Sistema IoT para optimización del consumo de agua en oficinas',
        resultados_concretos: 'Ahorro de 15,000 litros de agua y reducción del 30% en consumo'
      }
    });

    await prisma.impactoProyecto.createMany({
      data: [
        {
          proyectoId: proyecto5.id,
          tipo_impacto: 'ambiental',
          metrica: 'Litros de agua ahorrada',
          valor: '15000',
          unidad: 'litros',
          descripcion_adicional: 'Ahorro mediante sensores inteligentes'
        },
        {
          proyectoId: proyecto5.id,
          tipo_impacto: 'social',
          metrica: 'Voluntarios participantes',
          valor: '25',
          unidad: 'personas',
          descripcion_adicional: 'Equipo de implementación y monitoreo'
        }
      ]
    });

    // Segundo proyecto para Green Manufacturing
    const proyecto6 = await prisma.proyecto.create({
      data: {
        empresaId: empresas[1].id,
        nombre: 'Reciclaje de Envases',
        tipo: 'PRO',
        fecha: new Date('2024-06-18'),
        descripcion_proyecto: 'Programa integral de reciclaje de envases y empaques industriales',
        resultados_concretos: 'Reciclaje de 3,000 botellas y reducción de residuos industriales'
      }
    });

    await prisma.impactoProyecto.createMany({
      data: [
        {
          proyectoId: proyecto6.id,
          tipo_impacto: 'ambiental',
          metrica: 'Botellas recicladas',
          valor: '3000',
          unidad: 'unidades',
          descripcion_adicional: 'Envases de materias primas'
        },
        {
          proyectoId: proyecto6.id,
          tipo_impacto: 'ambiental',
          metrica: 'Litros de agua ahorrada',
          valor: '25000',
          unidad: 'litros',
          descripcion_adicional: 'Ahorro en procesos de manufactura'
        }
      ]
    });

    proyectos.push(proyecto3, proyecto4, proyecto5, proyecto6);

    console.log('✅ Proyectos creados:', proyectos.length);
    console.log('✅ Los impactos se calcularán automáticamente desde los proyectos');
    console.log('🎉 ¡Datos de prueba agregados exitosamente!');

  } catch (error) {
    console.error('❌ Error al agregar datos de prueba:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedData();