export const WHATSAPP_NUMBER = "524443348043";
export const WHATSAPP_MESSAGE = "Hola, me gustaría hablar con un asesor sobre los proyectos de Greenhug.";

export const getWhatsAppUrl = (customMessage?: string) => {
  const message = customMessage || WHATSAPP_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const openWhatsApp = (customMessage?: string) => {
  window.open(getWhatsAppUrl(customMessage), "_blank");
};