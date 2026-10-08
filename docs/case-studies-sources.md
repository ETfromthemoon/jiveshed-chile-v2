# Casos: fuentes y límites editoriales

Revisión: 2026-10-02. Pedido: incorporar Globo Science y Rexpert al sitio de JiveShed. El blog sigue en pausa.

## GloboScience

- Proyecto Vercel: `globoscience-next`, confirmado con `vercel project inspect`.
- Fuentes públicas consultadas:
  - https://globoscience-next.vercel.app/
  - https://globoscience-next.vercel.app/services
  - https://globoscience-next.vercel.app/contact
- Evidencia: propuesta de consultoría científica/regulatoria, navegación por servicios y especialidades, red internacional, acceso a briefing por área de interés y correo.
- El texto interpreta el recorrido visible como un caso de comunicación y diseño digital. No asegura una mejora frente al sitio anterior, ni un resultado comercial medido.
- No se atribuyen a la web las cifras corporativas sobre aprobaciones FDA, mercados u oficinas. No se probó el envío del briefing ni se enviaron datos.

## Rexpert / REGSPERTS

- Proyecto Vercel: `rexpert`, confirmado con `vercel project inspect`; URL de producción listada: https://regsperts.vercel.app/.
- El nombre visible es REGSPERTS. `rexpert-v2-preview` y `regsperts` son otros proyectos de la cuenta; no se confunden con el seleccionado.
- Fuente pública consultada: https://regsperts.vercel.app/.
- Evidencia: dos audiencias (empresas/candidatos), ocho especialidades regulatorias, método de cuatro etapas y formulario de contacto.
- La fuente declara explícitamente “Demonstration concept” y que el formulario abre el correo sin almacenar datos. La página de casos conserva este límite.
- No se afirman contrataciones, porcentajes de conversión, ROI, testimonios ni integraciones de CRM/IA no verificadas.

## Escenarios ficticios de clínicas (2026-10-08)

- Fuente de inspiración: `C:/Users/sergio/Downloads/20261007 - Jiveshed Markets.docx`, provisto por el usuario. Describe nichos prioritarios, zonas de Chile y paquetes de campaña propuestos. No contiene clientes atendidos ni resultados medidos.
- Autorización expresa del usuario: crear nombres y clientes ficticios para implantes dentales, medicina estética y dermatología y publicarlos en la página.
- Los nombres **Clínica Nébula Dental**, **Clínica Marea Lila** y **Centro Dermatológico Bosque Azul** son inventados para estos ejemplos. Una búsqueda web no encontró coincidencias exactas; esto no es una verificación de disponibilidad de marcas. No se les atribuye relación real con JiveShed.
- Los tres escenarios se guardan en `src/i18n/fictional-cases.ts`, con etiquetas visibles de ficción en tarjetas y detalles, sin URLs de clientes ni métricas de conversión, salud o ventas.
- La selección de zonas refleja el documento: Santiago/Las Condes, Viña del Mar y Concepción. Los flujos de contenido, anuncios, Google y WhatsApp son hipótesis editoriales derivadas de sus propuestas, no campañas ejecutadas.

## Mantenimiento

Los casos se guardan en `src/i18n/cases.ts` y los ejemplos hipotéticos en `src/i18n/fictional-cases.ts`, expuestos por `translations.ts` y renderizados con `CasesView.astro` en `/cases/`, `/es/cases/` y `/pt/cases/`. Añadir futuros casos en los tres idiomas con el mismo ID. Los casos reales necesitan URL y fuentes verificadas; los ficticios requieren una etiqueta explícita y no enlazan a webs de clientes. El índice y las pestañas se generan a partir de los datos.

Se reutilizan Layout, Nav, Footer e InteractiveSection, incluyendo SEO, fondo, scroll y CTA a auditoría. No se añade CMS ni blog. La navegación móvil se alinea al inicio para mantener accesibles todos los enlaces cuando desborda.
