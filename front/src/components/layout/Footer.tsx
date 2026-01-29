import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Instagram, Linkedin, Youtube } from "lucide-react";
import greenhugIsotipo from "@/assets/greenhug-isotipo-white.png";
import greenhugLogotipo from "@/assets/greenhug-logotipo-white.png";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={greenhugIsotipo} alt="Greenhug" className="w-10 h-10 object-contain" />
              <img src={greenhugLogotipo} alt="Greenhug" className="h-6 object-contain" />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Convertimos organizaciones en ambientalistas imperfectos. Proyectos ambientales medibles, verificables y con impacto real.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/greenhugmx/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/greenhug" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@greenhugmx_" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Projects Column */}
          <div>
            <h4 className="font-semibold mb-4">Proyectos</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/experience" className="text-white/70 hover:text-white text-sm transition-colors">
                  Experience (EXP)
                </Link>
              </li>
              <li>
                <Link to="/lifestyle" className="text-white/70 hover:text-white text-sm transition-colors">
                  Lifestyle (LIFE)
                </Link>
              </li>
              <li>
                <Link to="/upcycling" className="text-white/70 hover:text-white text-sm transition-colors">
                  Upcycling (UPC)
                </Link>
              </li>
              <li>
                <Link to="/greenhug-app" className="text-white/70 hover:text-white text-sm transition-colors">
                  Greenhug.app
                </Link>
              </li>
              <li>
                <Link to="/ranking" className="text-white/70 hover:text-white text-sm transition-colors">
                  Ranking de Impacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                hola@greenhug.com
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                +52 444 334 8043
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                En todo México
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-white/70 text-sm mb-4">
              Recibe novedades sobre impacto ambiental corporativo.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Tu correo"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button variant="white" size="default">
                Suscribir
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © 2026 Greenhug. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link to="/aviso-de-privacidad" className="text-white/50 hover:text-white text-sm transition-colors">
              Aviso de Privacidad
            </Link>
            <Link to="/terminos-y-condiciones" className="text-white/50 hover:text-white text-sm transition-colors">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
