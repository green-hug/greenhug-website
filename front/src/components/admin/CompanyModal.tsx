import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Empresa, 
  EmpresaFormData, 
  TipoEmpresa, 
  Region 
} from "@/types/backend";

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EmpresaFormData) => void;
  initialData?: Empresa | null;
  mode: "create" | "edit";
}

const tiposEmpresa = Object.values(TipoEmpresa);
const regiones = Object.values(Region);

const CompanyModal = ({ isOpen, onClose, onSubmit, initialData, mode }: CompanyModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<EmpresaFormData>({
    defaultValues: {
      nombre: "",
      tipo_empresa: TipoEmpresa.Manufactura,
      region: Region.Norte,
      ciudad: "",
      pais: "México",
      descripcion_impacto: "",
    },
  });

  // Reinicializar formulario cuando cambian los datos iniciales
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        const mappedData: EmpresaFormData = {
          nombre: initialData.nombre || "",
          tipo_empresa: initialData.tipo_empresa || TipoEmpresa.Manufactura,
          region: initialData.region || Region.Norte,
          ciudad: initialData.ciudad || "",
          pais: initialData.pais || "México",
          descripcion_impacto: initialData.descripcion_impacto || "",
        };
        reset(mappedData);
      } else if (mode === "create") {
        reset({
          nombre: "",
          tipo_empresa: TipoEmpresa.Manufactura,
          region: Region.Norte,
          ciudad: "",
          pais: "México",
          descripcion_impacto: "",
        });
      }
    }
  }, [isOpen, initialData, mode, reset]);

  const onFormSubmit = async (data: EmpresaFormData) => {
    try {
      console.log("Datos a enviar:", data);
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      // No cerrar el modal si hay error
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {mode === "create" ? "Nueva Empresa" : "Editar Empresa"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" 
              ? "Registra una nueva empresa en el sistema." 
              : "Actualiza la información de la empresa."
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Información Básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Información Básica</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre de la Empresa *</Label>
                <Input
                  id="nombre"
                  {...register("nombre", { required: "El nombre es requerido" })}
                  placeholder="Ej: Empresa Manufactura S.A."
                />
                {errors.nombre && (
                  <p className="text-sm text-destructive">{errors.nombre.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad *</Label>
                <Input
                  id="ciudad"
                  {...register("ciudad", { required: "La ciudad es requerida" })}
                  placeholder="Ciudad de México"
                />
                {errors.ciudad && (
                  <p className="text-sm text-destructive">{errors.ciudad.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipo_empresa">Tipo de Empresa *</Label>
                <Select 
                  onValueChange={(value) => setValue("tipo_empresa", value as TipoEmpresa, { shouldValidate: true })} 
                  value={watch("tipo_empresa")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposEmpresa.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input type="hidden" {...register("tipo_empresa", { required: "El tipo es requerido" })} />
                {errors.tipo_empresa && (
                  <p className="text-sm text-destructive">{errors.tipo_empresa.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Región *</Label>
                <Select 
                  onValueChange={(value) => setValue("region", value as Region, { shouldValidate: true })} 
                  value={watch("region")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar región" />
                  </SelectTrigger>
                  <SelectContent>
                    {regiones.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input type="hidden" {...register("region", { required: "La región es requerida" })} />
                {errors.region && (
                  <p className="text-sm text-destructive">{errors.region.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pais">País *</Label>
              <Input
                id="pais"
                {...register("pais", { required: "El país es requerido" })}
                placeholder="México"
              />
              {errors.pais && (
                <p className="text-sm text-destructive">{errors.pais.message}</p>
              )}
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Descripción del Impacto</h3>
            
            <div className="space-y-2">
              <Label htmlFor="descripcion_impacto">Descripción del Impacto</Label>
              <Textarea
                id="descripcion_impacto"
                {...register("descripcion_impacto")}
                placeholder="Describe el impacto ambiental y social que genera la empresa..."
                className="min-h-[100px]"
              />
              <p className="text-sm text-muted-foreground">
                Opcional. Describe las iniciativas y el impacto de la empresa.
              </p>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[100px]"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  {mode === "create" ? "Creando..." : "Guardando..."}
                </div>
              ) : (
                mode === "create" ? "Crear Empresa" : "Guardar Cambios"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyModal;