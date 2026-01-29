import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "524443348043"; // Número de WhatsApp de Greenhug
const WHATSAPP_MESSAGE = "Hola, me gustaría hablar con un asesor sobre los proyectos de Greenhug.";

const ContactForm = () => {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="text-center py-4">
      <p className="text-muted-foreground mb-6">
        Nuestro equipo está listo para ayudarte a diseñar el proyecto ideal para tu organización.
      </p>
      <Button
        variant="hero"
        size="lg"
        className="w-full"
        onClick={handleWhatsAppClick}
      >
        <MessageCircle className="w-5 h-5" />
        Hablar con un asesor
      </Button>
    </div>
  );
};

export default ContactForm;