import { useEffect } from "react";
import Layout from "@/components/layout/Layout";

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <section className="section-padding-lg">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Términos y Condiciones de Uso
            </h1>
            <p className="text-muted-foreground mb-8">
              Última actualización: 07/01/2026
            </p>

            <div className="prose prose-gray max-w-none space-y-8">
              {/* Section 1 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  1. Aceptación de los términos
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Al acceder, navegar o utilizar el sitio web greenhug.com (en adelante, el "Sitio"), usted acepta quedar obligado por los presentes Términos y Condiciones, así como por el Aviso de Privacidad correspondiente.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Si no está de acuerdo con estos términos, le recomendamos no utilizar el Sitio.
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  2. Identidad del titular del sitio
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  El Sitio es operado por GREEN HUG-INDUSTRIES, S.A. de C.V. (en adelante, "Greenhug"), empresa constituida conforme a las leyes de los Estados Unidos Mexicanos.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Greenhug es una empresa dedicada al diseño, ejecución y medición de proyectos de impacto ambiental corporativo, incluyendo, de manera enunciativa mas no limitativa:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Reforestaciones corporativas (Experience – EXP)</li>
                  <li>Merch ecológica (Lifestyle – LIFE)</li>
                  <li>Economía circular y upcycling (UPC)</li>
                  <li>Plataforma digital de medición y evidencia ESG</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  3. Uso permitido del sitio
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  El usuario se obliga a utilizar el Sitio de forma:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>Lícita</li>
                  <li>Ética</li>
                  <li>Conforme a estos Términos y a la legislación aplicable</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Queda estrictamente prohibido:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>Usar el Sitio con fines ilegales o fraudulentos</li>
                  <li>Copiar, reproducir o explotar el contenido sin autorización</li>
                  <li>Introducir virus, malware o cualquier código dañino</li>
                  <li>Suplantar la identidad de terceros</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  Greenhug se reserva el derecho de restringir o suspender el acceso al Sitio en caso de uso indebido.
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  4. Información y contenidos
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  La información contenida en el Sitio tiene un carácter informativo, comercial y referencial.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Greenhug realiza esfuerzos razonables para que la información sea precisa y actualizada; sin embargo:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>No garantiza que el contenido esté libre de errores</li>
                  <li>Los resultados, impactos y métricas mostradas pueden variar según el proyecto, condiciones ambientales, participación y otros factores</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  El contenido no constituye una oferta vinculante hasta que exista un acuerdo formal firmado entre las partes.
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  5. Contratación de servicios
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  La contratación de cualquier proyecto o servicio de Greenhug:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>Requiere contacto previo</li>
                  <li>Puede implicar propuestas personalizadas</li>
                  <li>Está sujeta a la firma de contratos específicos</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  La información presentada en el Sitio no sustituye dichos contratos ni genera obligaciones automáticas.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  6. Propiedad intelectual
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Todos los derechos de propiedad intelectual del Sitio, incluyendo textos, imágenes, logotipos, gráficos, diseños, software, código y demás contenidos, son propiedad exclusiva de Greenhug o de sus licenciantes.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Queda prohibida cualquier reproducción, distribución, transformación o comunicación pública sin autorización previa y por escrito de Greenhug.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  7. Uso de marca y reconocimiento de proyectos
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Greenhug podrá utilizar el nombre, logotipo y referencias generales de las empresas con las que haya colaborado únicamente para fines informativos, de portafolio, ranking de impacto y comunicación de resultados, siempre respetando:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>La veracidad de la información</li>
                  <li>La naturaleza del proyecto ejecutado</li>
                  <li>La confidencialidad pactada contractualmente</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  El ranking de impacto de Greenhug no establece comparaciones de cumplimiento ambiental general, sino que refleja únicamente proyectos realizados dentro de Greenhug.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  8. Enlaces a sitios de terceros
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  El Sitio puede contener enlaces a sitios web de terceros.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Greenhug:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>No controla dichos sitios</li>
                  <li>No es responsable de su contenido, políticas o prácticas</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  El acceso a sitios de terceros es bajo su propia responsabilidad.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  9. Limitación de responsabilidad
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Greenhug no será responsable por:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>Daños derivados del uso o imposibilidad de uso del Sitio</li>
                  <li>Decisiones tomadas con base en la información publicada</li>
                  <li>Fallas técnicas, interrupciones o mantenimiento</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  En ningún caso la responsabilidad de Greenhug excederá lo establecido en la legislación aplicable.
                </p>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  10. Protección de datos personales
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  El tratamiento de los datos personales se rige por el <a href="/aviso-de-privacidad" className="text-primary hover:underline">Aviso de Privacidad</a> publicado en el Sitio, el cual forma parte integral de estos Términos y Condiciones.
                </p>
              </section>

              {/* Section 11 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  11. Modificaciones a los términos
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Greenhug se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  Las modificaciones entrarán en vigor a partir de su publicación en: <a href="https://greenhug.com" className="text-primary hover:underline">https://greenhug.com</a>
                </p>
              </section>

              {/* Section 12 */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  12. Legislación aplicable y jurisdicción
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Estos Términos y Condiciones se rigen por las leyes de los Estados Unidos Mexicanos.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  Para la interpretación y cumplimiento de los mismos, las partes se someten a la jurisdicción de los tribunales competentes en México, renunciando a cualquier otro fuero que pudiera corresponderles.
                </p>
              </section>

              {/* Section 13 - Contact */}
              <section className="border-t border-border pt-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  13. Contacto
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Para cualquier duda relacionada con estos Términos y Condiciones:
                </p>
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

export default Terms;
