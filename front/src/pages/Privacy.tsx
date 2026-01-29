import { useEffect } from "react";
import Layout from "@/components/layout/Layout";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <section className="section-padding-lg">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Aviso de Privacidad
            </h1>
            <p className="text-muted-foreground mb-8">
              Última actualización: 07/01/2026
            </p>

            <div className="prose prose-gray max-w-none space-y-8">
              {/* Section 1 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  1. Identidad y domicilio del responsable
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  GREEN HUG-INDUSTRIES, S.A. de C.V. (en adelante, "Greenhug"), con domicilio para oír y recibir notificaciones en México, es responsable del uso y protección de sus datos personales, y al respecto le informa lo siguiente:
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Este Aviso de Privacidad se aplica al tratamiento de los datos personales recabados a través del sitio web greenhug.com, formularios digitales, correo electrónico, contacto comercial, eventos, reuniones, y cualquier otro medio permitido por la ley.
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  2. Datos personales que recabamos
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Para las finalidades descritas en este Aviso de Privacidad, Greenhug podrá recabar las siguientes categorías de datos personales:
                </p>

                <h3 className="text-lg font-medium text-foreground mb-2">a) Datos de identificación y contacto</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>Nombre completo</li>
                  <li>Empresa u organización</li>
                  <li>Puesto o área</li>
                  <li>Correo electrónico</li>
                  <li>Número telefónico</li>
                  <li>Ciudad y país</li>
                </ul>

                <h3 className="text-lg font-medium text-foreground mb-2">b) Datos laborales y empresariales</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>Giro de la empresa</li>
                  <li>Interés en proyectos (Experience, Lifestyle, Upcycling, Plataforma)</li>
                  <li>Información relacionada con proyectos ambientales, ESG o de sostenibilidad</li>
                </ul>

                <h3 className="text-lg font-medium text-foreground mb-2">c) Datos de navegación (no sensibles)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Información recopilada automáticamente mediante cookies y tecnologías similares.
                </p>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  3. Finalidades del tratamiento de datos
                </h2>

                <h3 className="text-lg font-medium text-foreground mb-2">Finalidades primarias (necesarias)</h3>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Los datos personales que recabamos serán utilizados para:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>Contactarlo para atender solicitudes de información</li>
                  <li>Diseñar, cotizar y dar seguimiento a proyectos de impacto ambiental</li>
                  <li>Establecer comunicación comercial y operativa</li>
                  <li>Enviar propuestas, presentaciones o documentación relacionada con nuestros servicios</li>
                  <li>Cumplir obligaciones legales y contractuales</li>
                  <li>Gestionar relaciones comerciales y profesionales</li>
                </ul>

                <h3 className="text-lg font-medium text-foreground mb-2">Finalidades secundarias (opcionales)</h3>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  De manera adicional, y solo si usted no se opone, utilizaremos sus datos para:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>Envío de boletines informativos, novedades o contenidos de impacto ambiental</li>
                  <li>Invitaciones a eventos, webinars o actividades de Greenhug</li>
                  <li>Análisis interno de comportamiento del sitio para mejorar la experiencia de usuario</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Si no desea que sus datos sean utilizados para las finalidades secundarias, puede manifestarlo en cualquier momento escribiendo a: <a href="mailto:hola@greenhug.com" className="text-primary hover:underline">hola@greenhug.com</a>
                </p>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  La negativa para estas finalidades no será motivo para negarle nuestros servicios.
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  4. Transferencia de datos personales
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong className="text-foreground">Greenhug NO vende ni renta datos personales.</strong>
                </p>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Sus datos podrán ser compartidos únicamente en los siguientes casos:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>Con proveedores que apoyan la operación del sitio web, CRM, mailing o análisis (bajo contratos de confidencialidad)</li>
                  <li>Con autoridades competentes cuando sea legalmente requerido</li>
                  <li>Con aliados estratégicos únicamente cuando sea necesario para la ejecución de un proyecto y con su consentimiento</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  En todos los casos, Greenhug se asegura de que dichos terceros cumplan con las disposiciones de protección de datos personales.
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  5. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Usted tiene derecho a:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>Acceder a sus datos personales</li>
                  <li>Rectificarlos si son inexactos o incompletos</li>
                  <li>Cancelarlos cuando considere que no se requieren</li>
                  <li>Oponerse al tratamiento de los mismos</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Para ejercer cualquiera de los derechos ARCO, deberá enviar una solicitud al correo: <a href="mailto:hola@greenhug.com" className="text-primary hover:underline">hola@greenhug.com</a>
                </p>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  La solicitud deberá incluir:
                </p>
                <ol className="list-decimal list-inside text-muted-foreground space-y-1 mb-4">
                  <li>Nombre del titular</li>
                  <li>Medio para comunicar la respuesta</li>
                  <li>Descripción clara del derecho que desea ejercer</li>
                  <li>Copia de identificación oficial o documento que acredite su identidad</li>
                </ol>
                <p className="text-muted-foreground leading-relaxed">
                  Greenhug dará respuesta en los plazos establecidos por la ley.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  6. Uso de cookies y tecnologías similares
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  El sitio web greenhug.com utiliza cookies y tecnologías similares para mejorar la experiencia del usuario y analizar el uso del sitio.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Estas tecnologías permiten:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>Recordar preferencias del usuario</li>
                  <li>Medir tráfico y comportamiento de navegación</li>
                  <li>Optimizar contenido y rendimiento del sitio</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Usted puede deshabilitar las cookies desde la configuración de su navegador. Al continuar navegando en el sitio, se entiende que acepta su uso.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  7. Medidas de seguridad
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Greenhug ha implementado medidas de seguridad administrativas, técnicas y físicas necesarias para proteger sus datos personales contra daño, pérdida, alteración, destrucción o uso no autorizado.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  8. Cambios al Aviso de Privacidad
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Greenhug se reserva el derecho de modificar o actualizar este Aviso de Privacidad en cualquier momento para cumplir con cambios legales o mejoras internas.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  Cualquier modificación será publicada en: <a href="https://greenhug.com" className="text-primary hover:underline">https://greenhug.com</a>
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  9. Consentimiento
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Al proporcionar sus datos personales a través de greenhug.com, formularios, correo electrónico o cualquier otro medio, usted reconoce haber leído y aceptado el presente Aviso de Privacidad.
                </p>
              </section>

              {/* Contact */}
              <section className="border-t border-border pt-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Contacto
                </h2>
                <p className="text-muted-foreground">
                  <a href="mailto:hola@greenhug.com" className="text-primary hover:underline">hola@greenhug.com</a>
                </p>
                <p className="text-muted-foreground mt-2">
                  Sierra vista 135, Col. Lomas 4ta Secc. C.P. 78216, San Luis Potosí, San Luis Potosí, México.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;