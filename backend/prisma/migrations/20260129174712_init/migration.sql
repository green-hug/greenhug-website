-- CreateEnum
CREATE TYPE "TipoEmpresa" AS ENUM ('Manufactura', 'Retail', 'Servicios', 'Tecnologia', 'Alimentos', 'Construccion', 'Logistica', 'Farmaceutica');

-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('EXP', 'LIFE', 'UPC', 'PRO');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('Norte', 'Sur', 'Centro', 'Metropolitana');

-- CreateEnum
CREATE TYPE "TipoImpacto" AS ENUM ('ambiental', 'social', 'cultura');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUPER_ADMIN');

-- CreateTable
CREATE TABLE "empresas" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo_empresa" "TipoEmpresa" NOT NULL,
    "region" "Region" NOT NULL,
    "ciudad" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "descripcion_impacto" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "impacto_empresa" (
    "id" TEXT NOT NULL,
    "empresa_id" TEXT NOT NULL,
    "litros_agua" INTEGER NOT NULL DEFAULT 0,
    "arboles_plantados" INTEGER NOT NULL DEFAULT 0,
    "botellas_recicladas" INTEGER NOT NULL DEFAULT 0,
    "voluntarios" INTEGER NOT NULL DEFAULT 0,
    "uniformes_reciclados" INTEGER NOT NULL DEFAULT 0,
    "co2_kg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "impacto_empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proyectos" (
    "id" TEXT NOT NULL,
    "empresa_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" "Tipo" NOT NULL DEFAULT 'PRO',
    "fecha" TIMESTAMP(3) NOT NULL,
    "descripcion_proyecto" TEXT,
    "resultados_concretos" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "proyectos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "impacto_proyecto" (
    "id" TEXT NOT NULL,
    "proyecto_id" TEXT NOT NULL,
    "tipo_impacto" "TipoImpacto" NOT NULL,
    "metrica" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "unidad" TEXT,
    "descripcion_adicional" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "impacto_proyecto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "impacto_empresa_empresa_id_key" ON "impacto_empresa"("empresa_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_nombre_key" ON "usuarios"("nombre");

-- AddForeignKey
ALTER TABLE "impacto_empresa" ADD CONSTRAINT "impacto_empresa_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proyectos" ADD CONSTRAINT "proyectos_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "impacto_proyecto" ADD CONSTRAINT "impacto_proyecto_proyecto_id_fkey" FOREIGN KEY ("proyecto_id") REFERENCES "proyectos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
