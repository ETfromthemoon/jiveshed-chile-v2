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

## Mantenimiento

Los casos se guardan en `src/i18n/cases.ts`, expuestos por `translations.ts`, y se renderizan con `CasesView.astro` en `/cases/`, `/es/cases/` y `/pt/cases/`. Añadir futuros casos en los tres idiomas con el mismo ID y URL verificada; el índice y las pestañas se generan a partir de los datos. No se muestran casos vacíos ni clientes ficticios.

Se reutilizan Layout, Nav, Footer e InteractiveSection, incluyendo SEO, fondo, scroll y CTA a auditoría. No se añade CMS ni blog. La navegación móvil se alinea al inicio para mantener accesibles todos los enlaces cuando desborda.
