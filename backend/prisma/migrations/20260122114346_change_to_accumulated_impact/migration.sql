/*
  Warnings:

  - You are about to drop the `impacto_anual` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "impacto_anual" DROP CONSTRAINT "impacto_anual_empresa_id_fkey";

-- DropForeignKey
ALTER TABLE "impacto_proyecto" DROP CONSTRAINT "impacto_proyecto_proyecto_id_fkey";

-- DropForeignKey
ALTER TABLE "proyectos" DROP CONSTRAINT "proyectos_empresa_id_fkey";

-- DropTable
DROP TABLE "impacto_anual";

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

-- CreateIndex
CREATE UNIQUE INDEX "impacto_empresa_empresa_id_key" ON "impacto_empresa"("empresa_id");

-- AddForeignKey
ALTER TABLE "impacto_empresa" ADD CONSTRAINT "impacto_empresa_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proyectos" ADD CONSTRAINT "proyectos_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "impacto_proyecto" ADD CONSTRAINT "impacto_proyecto_proyecto_id_fkey" FOREIGN KEY ("proyecto_id") REFERENCES "proyectos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
