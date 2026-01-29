import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, Info } from "lucide-react";
import { 
  Proyecto, 
  ProyectoFormData, 
  TipoImpacto,
  Tipo,
  ImpactoProyectoFormData
} from "@/types/backend";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProyectoFormData) => void;
  initialData?: Proyecto | null;
  mode: "create" | "edit";
}

const tiposImpacto = Object.values(TipoImpacto);
const tipos = Object.values(Tipo);

// Métricas predefinidas que reconoce el backend para cálculo automático de puntos
const metricasPredefinidas = [
  { 
    value: 'árboles plantados', 
    label: 'Árboles plantados', 
    unidadDefault: 'unidades',
    puntos: '3 puntos por árbol',
    tipo: 'ambiental'
  },
  { 
    value: 'agua infiltrada', 
    label: 'Agua infiltrada', 
    unidadDefault: 'litros',
    puntos: '1 punto por 2,000 litros',
    tipo: 'ambiental'
  },
  { 
    value: 'voluntarios', 
    label: 'Voluntarios', 
    unidadDefault: 'personas',
    puntos: '3 puntos por voluntario',
    tipo: 'social'
  },
  { 
    value: 'co2 capturado', 
    label: 'CO₂ capturado', 
    unidadDefault: 'kg',
    puntos: '1 punto por 3 kg',
    tipo: 'ambiental'
  },
  { 
    value: 'botellas recicladas', 
    label: 'Botellas recicladas', 
    unidadDefault: 'unidades',
    puntos: '1 punto por 8 botellas',
    tipo: 'ambiental'
  },
  { 
    value: 'uniformes reciclados', 
    label: 'Uniformes reciclados', 
    unidadDefault: 'unidades',
    puntos: '1 punto por 2 uniformes',
    tipo: 'social'
  }
];

const unidadesPorMetrica = {
  'árboles plantados': ['unidades', 'piezas'],
  'agua infiltrada': ['litros', 'metros cúbicos'],
  'voluntarios': ['personas'],
  'co2 capturado': ['kg', 'toneladas'],
  'botellas recicladas': ['unidades', 'piezas'],
  'uniformes reciclados': ['unidades', 'piezas']
};

const ProjectModal = ({ isOpen, onClose, onSubmit, initialData, mode }: ProjectModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    watch,
    setValue,
  } = useForm<ProyectoFormData>({
    defaultValues: {
      nombre: "",
      tipo: Tipo.PRO,
      fecha: new Date().toISOString().split('T')[0],
      descripcion_proyecto: "",
      resultados_concretos: "",
      impactos: [
        {
          tipo_impacto: TipoImpacto.ambiental,
          metrica: metricasPredefinidas[0].value, // Default: árboles plantados
          valor: "",
          unidad: metricasPredefinidas[0].unidadDefault,
          descripcion_adicional: "",
        }
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "impactos",
  });

  // Watch para obtener los valores actuales de las métricas
  const watchedImpactos = watch("impactos");

  // Reinicializar formulario cuando cambian los datos iniciales
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        const mappedData: ProyectoFormData = {
          nombre: initialData.nombre || "",
          tipo: initialData.tipo || Tipo.PRO,
          fecha: initialData.fecha?.split('T')[0] || new Date().toISOString().split('T')[0],
          descripcion_proyecto: initialData.descripcion_proyecto || "",
          resultados_concretos: initialData.resultados_concretos || "",
          impactos: initialData.impactos_proyecto?.map(imp => ({
            tipo_impacto: imp.tipo_impacto,
            metrica: imp.metrica,
            valor: imp.valor,
            unidad: imp.unidad || "",
            descripcion_adicional: imp.descripcion_adicional || "",
          })) || [
            {
              tipo_impacto: TipoImpacto.ambiental,
              metrica: "",
              valor: "",
              unidad: "",
              descripcion_adicional: "",
            }
          ],
        };
        reset(mappedData);
      } else if (mode === "create") {
        reset({
          nombre: "",
          tipo: Tipo.PRO,
          fecha: new Date().toISOString().split('T')[0],
          descripcion_proyecto: "",
          resultados_concretos: "",
          impactos: [
            {
              tipo_impacto: TipoImpacto.ambiental,
              metrica: "",
              valor: "",
              unidad: "",
              descripcion_adicional: "",
            }
          ],
        });
      }
    }
  }, [isOpen, initialData, mode, reset]);

  const addImpacto = () => {
    const defaultMetrica = metricasPredefinidas[0]; // árboles plantados
    append({
      tipo_impacto: defaultMetrica.tipo as TipoImpacto,
      metrica: defaultMetrica.value,
      valor: "",
      unidad: defaultMetrica.unidadDefault,
      descripcion_adicional: "",
    });
  };

  const onFormSubmit = (data: ProyectoFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {mode === "create" ? "Nuevo Proyecto" : "Editar Proyecto"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" 
              ? "Registra un nuevo proyecto para la empresa." 
              : "Actualiza la información del proyecto."
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Información del Proyecto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Información del Proyecto</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Proyecto *</Label>
                <Input
                  id="nombre"
                  {...register("nombre", { required: "El nombre es requerido" })}
                  placeholder="Ej: Programa de Reciclaje de Botellas"
                />
                {errors.nombre && (
                  <p className="text-sm text-destructive">{errors.nombre.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Proyecto *</Label>
                <Select 
                  onValueChange={(value) => setValue("tipo", value as Tipo)} 
                  value={watch("tipo")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tipos.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo === Tipo.EXP ? "Experience" : 
                         tipo === Tipo.LIFE ? "Lifestyle" :
                         tipo === Tipo.UPC ? "Upcycling" : "Proyecto"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.tipo && (
                  <p className="text-sm text-destructive">{errors.tipo.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha del Proyecto *</Label>
                <Input
                  id="fecha"
                  type="date"
                  {...register("fecha", { required: "La fecha es requerida" })}
                />
                {errors.fecha && (
                  <p className="text-sm text-destructive">{errors.fecha.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion_proyecto">Descripción del Proyecto</Label>
              <Textarea
                id="descripcion_proyecto"
                {...register("descripcion_proyecto")}
                placeholder="Describe el proyecto y sus objetivos..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resultados_concretos">Resultados Concretos</Label>
              <Textarea
                id="resultados_concretos"
                {...register("resultados_concretos")}
                placeholder="Describe los resultados específicos obtenidos..."
                className="min-h-[80px]"
              />
            </div>
          </div>

          {/* Impactos del Proyecto */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Impactos del Proyecto</h3>
                <p className="text-sm text-muted-foreground">
                  Las métricas predefinidas se calculan automáticamente para el ranking Greenhug
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addImpacto}
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Impacto
              </Button>
            </div>

            {fields.map((field, index) => (
              <Card key={field.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm">Impacto {index + 1}</CardTitle>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label>Tipo de Impacto *</Label>
                      <Select 
                        onValueChange={(value) => {
                          setValue(`impactos.${index}.tipo_impacto`, value as TipoImpacto);
                        }}
                        value={watchedImpactos[index]?.tipo_impacto || field.tipo_impacto}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {tiposImpacto.map((tipo) => (
                            <SelectItem key={tipo} value={tipo}>
                              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Métrica * 
                        <Info className="w-3 h-3 inline ml-1" />
                      </Label>
                      <Select
                        onValueChange={(value) => {
                          const metrica = metricasPredefinidas.find(m => m.value === value);
                          setValue(`impactos.${index}.metrica`, value);
                          if (metrica) {
                            // Actualizar tipo de impacto automáticamente
                            setValue(`impactos.${index}.tipo_impacto`, metrica.tipo as TipoImpacto);
                            // Actualizar unidad por defecto
                            setValue(`impactos.${index}.unidad`, metrica.unidadDefault);
                          }
                        }}
                        value={watchedImpactos[index]?.metrica || field.metrica}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar métrica" />
                        </SelectTrigger>
                        <SelectContent>
                          {metricasPredefinidas.map((metrica) => (
                            <SelectItem key={metrica.value} value={metrica.value}>
                              <div className="flex flex-col">
                                <span>{metrica.label}</span>
                                <span className="text-xs text-muted-foreground">
                                  {metrica.puntos}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Valor *</Label>
                      <Input
                        {...register(`impactos.${index}.valor`, {
                          required: "El valor es requerido"
                        })}
                        placeholder="Ej: 1000"
                        type="number"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Unidad *</Label>
                      <Select
                        onValueChange={(value) => {
                          setValue(`impactos.${index}.unidad`, value);
                        }}
                        value={watchedImpactos[index]?.unidad || field.unidad}
                        key={`unidad-${field.id}-${watchedImpactos[index]?.metrica}`} // Force re-render when metric changes
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar unidad" />
                        </SelectTrigger>
                        <SelectContent>
                          {(() => {
                            const metricaActual = watchedImpactos[index]?.metrica || field.metrica;
                            const unidadesDisponibles = unidadesPorMetrica[metricaActual] || ['unidades', 'kg', 'litros', 'personas', 'piezas', 'toneladas'];
                            return unidadesDisponibles.map((unidad) => (
                              <SelectItem key={unidad} value={unidad}>
                                {unidad}
                              </SelectItem>
                            ));
                          })()}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Descripción Adicional</Label>
                      <Input
                        {...register(`impactos.${index}.descripcion_adicional`)}
                        placeholder="Información adicional sobre el impacto"
                      />
                    </div>
                  </div>

                  {/* Información de puntos calculados */}
                  {(() => {
                    const metricaActual = watchedImpactos[index]?.metrica || field.metrica;
                    const infoMetrica = metricasPredefinidas.find(m => m.value === metricaActual);
                    return infoMetrica ? (
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2">
                          <Info className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">Sistema de Puntos Greenhug</span>
                        </div>
                        <p className="text-sm text-blue-600 mt-1">
                          {infoMetrica.puntos}
                        </p>
                      </div>
                    ) : null;
                  })()}
                </CardContent>
              </Card>
            ))}
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
                mode === "create" ? "Crear Proyecto" : "Guardar Cambios"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;