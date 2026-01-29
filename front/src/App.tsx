import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Experience from "./pages/Experience";
import Upcycling from "./pages/Upcycling";
import Lifestyle from "./pages/Lifestyle";
//import Ranking from "./pages/Ranking";
import RankingT from "./pages/RankingOriginal";
import CompanyDetail from "./pages/CompanyDetail";
import ProjectDetail from "./pages/ProjectDetail";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import GreenhugApp from "./pages/GreenhugApp";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCompanies from "./pages/AdminCompanies";
import AdminUsers from "./pages/AdminUsers";
import { AuthProvider } from "./contexts/AuthContext";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/upcycling" element={<Upcycling />} />
            <Route path="/lifestyle" element={<Lifestyle />} />
            <Route path="/ranking" element={<RankingT />} />
            <Route path="/ranking/empresa/:slug" element={<CompanyDetail />} />
            <Route path="/ranking/empresa/:empresaSlug/proyecto/:proyectoSlug" element={<ProjectDetail />} />
            <Route path="/greenhug-app" element={<GreenhugApp />} />
            <Route path="/aviso-de-privacidad" element={<Privacy />} />
            <Route path="/terminos-y-condiciones" element={<Terms />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/companies" element={<AdminCompanies />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
