# Centro de Rehabilitación La Luz y La Esperanza Que Necesito

[![Estado](https://img.shields.io/badge/Estado-Producción-success?style=for-the-badge)](https://www.laluzylaesperanzaquenecesito.me/)
![Versión](https://img.shields.io/badge/Versión-5.0_Medical_Luxury-0F2C59?style=for-the-badge)
![Licencia](https://img.shields.io/badge/Licencia-Proprietaria-D4AF37?style=for-the-badge)

Sitio institucional del Centro de Rehabilitación **La Luz y La Esperanza Que Necesito**, ubicado en Tres Valles, Veracruz, México.

El proyecto presenta los servicios clínicos, psicológicos, terapéuticos, espirituales y educativos del centro mediante una experiencia responsiva con identidad visual **Medical Luxury**.

Sitio oficial: [www.laluzylaesperanzaquenecesito.me](https://www.laluzylaesperanzaquenecesito.me/)

## Versión actual

**5.0 — Actualización del 14 de julio de 2026**

Esta versión incorpora:

- Sección de especialidades clínicas y terapéuticas con diseño editorial responsivo.
- Podcast **El Origen De La Luz Y La Esperanza Que Necesito**.
- Episodio 2: **El Precio de la Curiosidad**, con Fernando Acevedo y David Vidal.
- Reproductor de transmisión de YouTube integrado.
- Temporizador para emisiones programadas y acciones para compartir y suscribirse.
- Optimización de imágenes de alta resolución sin alterar los archivos originales.
- Carga diferida de recursos, video bajo demanda y renderizado diferido de secciones.
- Metadatos SEO, Open Graph, Twitter Cards y datos estructurados Schema.org.
- Eventos de conversión preparados para llamadas, WhatsApp, formularios y podcast, sin recopilar datos personales por defecto.
- Manifiesto web, sitemap, robots y archivos de verificación actualizados.

## Arquitectura

El sitio utiliza una arquitectura modular basada en **Client-Side Includes**. Los fragmentos HTML se cargan mediante `fetch` y los módulos JavaScript se inicializan después de completar la composición de la página.

```text
/
├── index.html
├── sitemap.xml
├── robots.txt
├── CNAME
├── googled12c5739ef345a25.html
├── public/
│   ├── img/
│   ├── manifest/
│   │   └── site.webmanifest
│   └── verification/
└── src/
    ├── assets/
    │   ├── img/
    │   └── video/
    ├── components/
    │   ├── part-header.html
    │   ├── part-footer.html
    │   ├── podcast.html
    │   └── seccion-*.html
    ├── scripts/
    │   ├── script.js
    │   └── js-*.js
    └── styles/
        ├── styles.css
        └── css-*.css
```

## SEO y descubrimiento

- URL canónica única con idioma `es-MX`.
- Metadatos Open Graph y Twitter con imagen social de 1200×630.
- Schema.org para organización médica, negocio local, sitio web, página, podcast, episodio y video.
- Sitemap XML con fecha de modificación verificable.
- `robots.txt` abierto a rastreadores y enlazado al sitemap.
- Verificación de Google mediante archivo y etiqueta meta.
- Información local consistente: Tres Valles, Veracruz, teléfono y coordenadas.

El posicionamiento orgánico también depende de factores externos al código, como Google Business Profile, Search Console, reseñas legítimas, autoridad temática, enlaces y publicación constante de contenido útil.

## Rendimiento

Las copias optimizadas reducen aproximadamente un 93.8 % el peso combinado de las imágenes de mayor tamaño utilizadas por la interfaz. Los originales se conservan para archivo y futuras ediciones.

El video institucional utiliza `preload="none"`, las imágenes fuera de pantalla emplean carga diferida y las secciones no visibles usan `content-visibility` cuando el navegador lo admite.

## Desarrollo local

Debido al uso de `fetch`, el proyecto debe ejecutarse desde un servidor HTTP local y no abriendo directamente `index.html` mediante `file://`.

Ejemplos de servidores locales compatibles:

```text
npx serve .
php -S localhost:8000
```

## Publicación

El proyecto está preparado para GitHub Pages:

- `CNAME` define el dominio personalizado.
- `.nojekyll` en la raíz desactiva el procesamiento de Jekyll.
- Los verificadores y archivos públicos se conservan en rutas estables.

Después de cada publicación importante se recomienda:

1. Validar la URL en Google Search Console.
2. Enviar nuevamente el sitemap.
3. Probar los datos estructurados con Rich Results Test.
4. Revisar Core Web Vitals y eventos de conversión.

## Licencia y privacidad

El código, la marca y el material multimedia están sujetos a los términos descritos en [LICENSE](LICENSE). Las fotografías del personal, pacientes, instalaciones y actividades no deben reutilizarse fuera de este proyecto sin autorización expresa.

Contacto técnico: `David650991@gmail.com`
