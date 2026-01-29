import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { 
  Calendar,
  MapPin,
  Trash2,
  TreePine,
  Droplets,
  Users,
  Recycle,
  Zap
} from "lucide-react"
import { Empresa, Proyecto } from "@/types/backend"

interface CompanyProjectsModalProps {
  isOpen: boolean
  onClose: () => void
  company: Empresa | null
  onDeleteProject: (proyecto: Proyecto) => void
}

export function CompanyProjectsModal({
  isOpen,
  onClose,
  company,
  onDeleteProject
}: CompanyProjectsModalProps) {
  if (!company) return null

  const getMetricIcon = (metrica: string) => {
    const lowerMetrica = metrica.toLowerCase()
    if (lowerMetrica.includes('árbol') || lowerMetrica.includes('plantados')) {
      return <TreePine className="w-4 h-4 text-green-600" />
    } else if (lowerMetrica.includes('agua')) {
      return <Droplets className="w-4 h-4 text-blue-600" />
    } else if (lowerMetrica.includes('voluntarios')) {
      return <Users className="w-4 h-4 text-purple-600" />
    } else if (lowerMetrica.includes('reciclad')) {
      return <Recycle className="w-4 h-4 text-orange-600" />
    } else if (lowerMetrica.includes('co2')) {
      return <Zap className="w-4 h-4 text-gray-600" />
    }
    return <Zap className="w-4 h-4 text-gray-600" />
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Proyectos de {company.nombre}
          </DialogTitle>
          <p className="text-muted-foreground">
            {company.proyectos?.length || 0} proyecto(s) registrado(s)
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {company.proyectos && company.proyectos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {company.proyectos.map((proyecto) => (
                <Card key={proyecto.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">
                        {proyecto.nombre}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {proyecto.descripcion}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 ml-2"
                      onClick={() => onDeleteProject(proyecto)}
                      title="Eliminar proyecto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {new Date(proyecto.fecha).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {proyecto.ubicacion}
                      </span>
                    </div>

                    {/* Impactos del proyecto */}
                    {proyecto.impactos_proyecto && proyecto.impactos_proyecto.length > 0 && (
                      <div className="border-t pt-3">
                        <p className="text-sm font-medium mb-2">Impactos:</p>
                        <div className="space-y-2">
                          {proyecto.impactos_proyecto.map((impacto, index) => (
                            <div key={index} className="flex items-center justify-between bg-muted/30 rounded-md p-2">
                              <div className="flex items-center gap-2">
                                {getMetricIcon(impacto.metrica)}
                                <span className="text-sm font-medium">
                                  {impacto.metrica}
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-sm font-semibold">
                                  {parseFloat(impacto.valor).toLocaleString()}
                                </span>
                                <span className="text-xs text-muted-foreground ml-1">
                                  {impacto.unidad}
                                </span>
                                <div className="flex items-center gap-1">
                                  <Badge variant="outline" className="text-xs">
                                    {impacto.tipo_impacto}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <TreePine className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Esta empresa aún no tiene proyectos registrados
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}