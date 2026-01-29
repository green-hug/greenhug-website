import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import greenhugLogotipo from "@/assets/greenhug-logotipo.png";
import greenhugIsotipo from "@/assets/greenhug-isotipo.png";
import { openWhatsApp } from "@/lib/whatsapp";

const navLinks = [
  { name: "Nosotros", href: "/#nosotros" },
  { name: "Proyectos", href: "/#proyectos" },
  { name: "Impacto", href: "/#impacto" },
  { name: "Ranking", href: "/ranking" },
  { name: "Contacto", href: "/#contacto" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth"
      });
    }
  };

  // Handle scroll after navigation from another page
  useEffect(() => {
    if (pendingScroll && location.pathname === "/") {
      const timer = setTimeout(() => {
        scrollToElement(pendingScroll);
        setPendingScroll(null);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, pendingScroll]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setMobileMenuOpen(false);
    
    if (href.startsWith("/#")) {
      const sectionId = href.substring(2);
      e.preventDefault();
      
      if (location.pathname === "/") {
        // Already on home, just scroll
        setTimeout(() => scrollToElement(sectionId), 100);
      } else {
        // Navigate to home first, then scroll
        setPendingScroll(sectionId);
        navigate("/");
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      setMobileMenuOpen(false);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border/50">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2"
            onClick={handleLogoClick}
          >
            <img 
              src={greenhugIsotipo} 
              alt="Greenhug isotipo" 
              className="h-8 md:h-10 w-auto object-contain"
            />
            <img 
              src={greenhugLogotipo} 
              alt="Greenhug" 
              className="h-8 md:h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Button variant="hero" size="default" onClick={() => openWhatsApp()}>
              Hablar con un asesor
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-2"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 px-2">
                <Button variant="hero" size="lg" className="w-full" onClick={() => openWhatsApp()}>
                  Hablar con un asesor
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
