import { useState } from "react";
import { 
  AdminLayout, 
  ProtectedRoute, 
  AdminMetricCard 
} from "@/components/admin";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Badge from "@/components/shared/Badge";
import { 
  Users, 
  Recycle, 
  TreePine, 
  TrendingUp, 
  Building, 
  Calendar,
  BarChart3,
  Settings,
  UserPlus,
  FileText,
  Award,
  Activity
} from "lucide-react";

const AdminDashboard = () => {
  const [adminUser] = useState(() => {
    const user = localStorage.getItem("adminUser");
    return user ? JSON.parse(user) : null;
  });

  // Datos simulados - en producción vendrían de la API
  const stats = [
    {
      title: "Empresas Registradas",
      value: "248",
      change: "+12%",
      trend: "up",
      icon: Building,
      color: "primary"
    },
    {
      title: "Usuarios Activos",
      value: "1,429",
      change: "+23%",
      trend: "up",
      icon: Users,
      color: "success"
    },
    {
      title: "Proyectos Completados",
      value: "89",
      change: "+8%",
      trend: "up",
      icon: TreePine,
      color: "project-exp"
    },
    {
      title: "Impacto Total (kg CO2)",
      value: "45.2k",
      change: "+15%",
      trend: "up",
      icon: Recycle,
      color: "project-upc"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "Nueva empresa",
      description: "EcoTech Solutions se registró en la plataforma",
      time: "Hace 2 horas",
      icon: Building,
      color: "primary"
    },
    {
      id: 2,
      type: "Proyecto completado",
      description: "Reforestación Urbana México finalizó con éxito",
      time: "Hace 4 horas",
      icon: TreePine,
      color: "success"
    },
    {
      id: 3,
      type: "Nuevo usuario",
      description: "María González se unió como coordinadora",
      time: "Hace 6 horas",
      icon: UserPlus,
      color: "muted"
    },
    {
      id: 4,
      type: "Reporte generado",
      description: "Informe mensual de impacto ambiental",
      time: "Hace 1 día",
      icon: FileText,
      color: "warning"
    }
  ];

  const quickActions = [
    {
      title: "Gestionar Empresas",
      description: "Ver y editar empresas registradas",
      icon: Building,
      color: "primary",
      action: () => console.log("Gestionar empresas")
    },
    {
      title: "Administrar Usuarios",
      description: "Controlar accesos y permisos",
      icon: Users,
      color: "success",
      action: () => console.log("Administrar usuarios")
    },
    {
      title: "Ver Proyectos",
      description: "Revisar estado de proyectos",
      icon: TreePine,
      color: "project-exp",
      action: () => console.log("Ver proyectos")
    },
    {
      title: "Generar Reportes",
      description: "Crear informes de impacto",
      icon: BarChart3,
      color: "project-upc",
      action: () => console.log("Generar reportes")
    },
    {
      title: "Configuración",
      description: "Ajustes del sistema",
      icon: Settings,
      color: "muted",
      action: () => console.log("Configuración")
    },
    {
      title: "Certificaciones",
      description: "Gestionar badges y logros",
      icon: Award,
      color: "warning",
      action: () => console.log("Certificaciones")
    }
  ];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Dashboard de Administrador
            </h1>
            <p className="text-muted-foreground text-base">
              Bienvenido de vuelta, {adminUser?.username}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Badge variant="success" className="w-fit">
              <Activity className="w-3 h-3 mr-1" />
              Sistema Activo
            </Badge>
            <span className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <AdminMetricCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              trend={stat.trend as "up" | "down"}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Actividad reciente */}
          <div className="xl:col-span-2">
            <Card className="p-6 h-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h2 className="text-xl font-semibold">Actividad Reciente</h2>
                <Button variant="outline" size="sm">
                  Ver todas
                </Button>
              </div>
              
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border/50 hover:border-border hover:shadow-sm transition-all">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.color === 'primary' ? 'bg-primary/10 text-primary' :
                      activity.color === 'success' ? 'bg-success/10 text-success' :
                      activity.color === 'warning' ? 'bg-warning/10 text-warning' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      <activity.icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <Badge variant="muted" className="text-xs w-fit">
                          {activity.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Acciones rápidas */}
          <div>
            <Card className="p-6 h-full">
              <h2 className="text-xl font-semibold mb-6">Acciones Rápidas</h2>
              
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="w-full p-4 text-left rounded-lg border border-border hover:bg-accent/30 hover:border-accent/60 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                        action.color === 'primary' ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground' :
                        action.color === 'success' ? 'bg-success/10 text-success group-hover:bg-success group-hover:text-success-foreground' :
                        action.color === 'project-exp' ? 'bg-project-exp/10 text-project-exp group-hover:bg-project-exp group-hover:text-white' :
                        action.color === 'project-upc' ? 'bg-project-upc/10 text-project-upc group-hover:bg-project-upc group-hover:text-white' :
                        action.color === 'warning' ? 'bg-warning/10 text-warning group-hover:bg-warning group-hover:text-warning-foreground' :
                        'bg-muted text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground'
                      }`}>
                        <action.icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 text-left">
                        <h3 className="font-medium text-foreground group-hover:text-accent-foreground text-sm">
                          {action.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Gráficos de rendimiento - placeholder para futuras implementaciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Crecimiento de Empresas</h2>
            <div className="h-64 lg:h-72 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-3" />
                <p className="text-sm">Gráfico en desarrollo</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Impacto Ambiental</h2>
            <div className="h-64 lg:h-72 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <TrendingUp className="w-12 h-12 mx-auto mb-3" />
                <p className="text-sm">Gráfico en desarrollo</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminDashboard;