import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  X, 
  Home,
  Building,
  Users,
  TreePine,
  BarChart3,
  Settings,
  Award,
  FileText,
  LogOut
} from "lucide-react";
import greenhugLogotipo from "@/assets/greenhug-logotipo.png";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    // {
    //   name: "Dashboard",
    //   href: "/admin/dashboard",
    //   icon: Home
    // },
    {
      name: "Empresas",
      href: "/admin/companies",
      icon: Building
    },
    {
      name: "Usuarios",
      href: "/admin/users",
      icon: Users
    }
    // {
    //   name: "Proyectos",
    //   href: "/admin/projects",
    //   icon: TreePine
    // },
    // {
    //   name: "Reportes",
    //   href: "/admin/reports",
    //   icon: BarChart3
    // },
    // {
    //   name: "Certificaciones",
    //   href: "/admin/certifications",
    //   icon: Award
    // },
    // {
    //   name: "Documentos",
    //   href: "/admin/documents",
    //   icon: FileText
    // },
    // {
    //   name: "Configuración",
    //   href: "/admin/settings",
    //   icon: Settings
    // }
  ];

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <>
      {/* Sidebar móvil overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl border-r border-border/60 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border/60">
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img src={greenhugLogotipo} alt="Greenhug" className="h-8" />
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover:bg-accent"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-primary text-primary-foreground shadow-sm' 
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-border/60">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;