# JiveShed — sitio web v2

Sitio de marketing de JiveShed ("From attention to action"), en inglés, español y portugués.
Astro 6 + Tailwind 4 + React (solo para el fondo animado). Es un sitio estático.

## Comandos

| Comando           | Acción                                        |
| :---------------- | :-------------------------------------------- |
| `npm install`     | Instala dependencias (Node ≥ 22.12)           |
| `npm run dev`     | Servidor local en `http://localhost:4322`     |
| `npm run build`   | Genera el sitio en `./dist/`                  |
| `npm run preview` | Sirve el build localmente                     |

## Rutas

| EN (raíz)     | ES / PT                       | Contenido                              |
| :------------ | :---------------------------- | :------------------------------------- |
| `/`           | `/es/`, `/pt/`                | Home (hero, resumen, paquetes, CTA)    |
| `/system/`    | `/es/system/`, `/pt/system/`  | El sistema JiveShed                    |
| `/packages/`  | `/es/packages/`, …            | Los 5 paquetes (Starter → Diamond)     |
| `/contacto/`  | `/es/contacto/`, …            | Contacto + formulario de Growth Audit  |
| `/cases/`     | `/es/cases/`, `/pt/cases/`    | Casos y escenarios ficticios de clínicas |

## Estructura

```text
src/
├── config/site.ts          # correo, número de WhatsApp y helpers de enlaces
├── i18n/
│   ├── translations.ts     # TODOS los textos (en / es / pt)
│   └── utils.ts            # rutas localizadas, hreflang, formato de precios
├── views/                  # una vista por página, compartida por los 3 idiomas
├── pages/                  # rutas finas: solo eligen vista + idioma
├── components/             # Nav, Hero, Footer, AuditForm, InteractiveSection
├── layouts/Layout.astro    # <head> (SEO, hreflang, OG), cursor, sistema de paneles
└── styles/global.css       # tokens de marca y sistema de paneles
```

## Cómo hacer cambios habituales

- **Cambiar un texto:** edítalo en `src/i18n/translations.ts`, en los tres idiomas.
  Las páginas no llevan texto escrito directo.
- **Cambiar un precio:** `price` es un número (`1_500_000`); se formatea solo
  según el idioma (`1,500,000` en EN y `1.500.000` en ES/PT).
- **Cambiar correo o WhatsApp:** `src/config/site.ts`.
- **Cambiar el dominio:** `site` en `astro.config.mjs`. El canonical, hreflang,
  la imagen OG, el sitemap y `robots.txt` salen de ahí.

## Casos de éxito

Los casos se editan en `src/i18n/cases.ts` y los ejemplos ficticios de clínicas
en `src/i18n/fictional-cases.ts`, incorporados a `translations.ts`.
`CasesView.astro` genera las tarjetas y pestañas a partir de esa lista en cada idioma.
Para añadir un caso, completar EN/ES/PT con el mismo ID y documentar sus fuentes en
`docs/case-studies-sources.md`. REGSPERTS se presenta como concepto demostrativo;
los escenarios de clínicas se identifican como ficticios y no llevan enlaces de cliente
ni métricas comerciales no verificadas. El blog permanece en pausa.

## Formulario de Growth Audit

`src/components/AuditForm.astro` no necesita backend: arma un mensaje con los datos
y abre WhatsApp (o el correo, como alternativa). Los botones "Elegir <paquete>"
enlazan a `/contacto/?paquete=<id>#auditoria` y preseleccionan el paquete.
Los leads **no se guardan** en ningún servidor: llegan como un mensaje de WhatsApp o un correo.

## Navegación por paneles

Cada página es una serie de paneles a pantalla completa. En escritorio la rueda
del mouse recorre primero el contenido del panel activo y, al llegar al borde,
pasa al siguiente. En móvil se cambia de panel con las tabs y el contenido
se desplaza normalmente.

## Deploy (Vercel)

El hosting es **Vercel**, conectado al repo de GitHub:

- Cada push a una rama o PR genera una **URL de preview**.
- Un merge a `master` publica en **producción**.
- Las cabeceras de caché y seguridad están en `vercel.json`. Vercel sirve
  `404.html` automáticamente, así que no hace falta configurar redirecciones.
