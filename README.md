# 🏥 Centro de Rehabilitación "La Luz y La Esperanza Que Necesito"

![Estado](https://img.shields.io/badge/Estado-Producción-success?style=for-the-badge&logo=statuspage)
![Versión](https://img.shields.io/badge/Versión-4.0_Modular-blue?style=for-the-badge&logo=git)
![Licencia](https://img.shields.io/badge/Licencia-Proprietaria-red?style=for-the-badge)

> **Sitio web institucional de alto rendimiento** desarrollado para el Centro de Rehabilitación en Tres Valles, Veracruz.
>
> Este proyecto implementa una **Arquitectura de Componentes (Client-Side Includes)** para garantizar escalabilidad, mantenimiento modular y una experiencia de usuario fluida sin depender de frameworks pesados.

🌐 **[Visitar Sitio Web en Vivo](https://www.laluzylaesperanzaquenecesito.me/)**

---

## 🚀 Características Técnicas Destacadas

Este proyecto va más allá de un sitio estático tradicional. Hemos implementado ingeniería de software moderna:

### 🏗️ Arquitectura & Diseño
* **Diseño Atómico Modular:** El sitio no es un solo bloque HTML. Está dividido en **componentes reutilizables** (`header`, `footer`, `secciones`) cargados dinámicamente.
* **CSS Modular:** Estilos separados por responsabilidad (`layout`, `components`, `sections`) para un mantenimiento quirúrgico.
* **Responsive & Adaptable:** Interfaz "Medical Luxury" totalmente fluida desde móviles (Galaxy Fold) hasta pantallas 4K.

### 🔍 SEO & Rendimiento (Nivel Experto)
* **Schema.org JSON-LD:** Implementación avanzada de datos estructurados para `MedicalOrganization`, `FAQPage` y `Breadcrumbs`.
* **Open Graph & Twitter Cards:** Previsualizaciones ricas para redes sociales.
* **Optimización de Carga:** Uso de `preload`, `preconnect` y carga diferida (`lazy loading`) de imágenes.
* **PWA Ready:** Incluye Manifiesto Web y configuración para instalación en dispositivos móviles.

### ⚙️ Funcionalidad
* **Inyección Asíncrona:** Sistema de carga de HTML vía `fetch API` con promesas paralelas (`Promise.all`) para velocidad extrema.
* **Formulario Serverless:** Integración con **Formspree** para gestión de contactos sin backend propio.
* **Efectos Estacionales:** Motor de partículas (Nieve) activable para temporadas festivas.

---

## 📂 Estructura del Proyecto (Arquitectura MVC-Like)

El proyecto sigue una estricta separación de responsabilidades:

```text
/
├── index.html             # 🟢 Punto de entrada (Shell de la aplicación)
├── public/                # 🌍 Archivos públicos y de identidad
│   ├── img/               # Favicons e iconos de aplicación
│   ├── manifest/          # Manifiesto de Aplicación Web (PWA)
│   └── verification/      # Archivos de verificación (Google, Robots, Sitemap)
│
└── src/                   # 🛠️ Código Fuente
    ├── assets/            # Recursos Multimedia
    │   ├── img/           # Imágenes organizadas por sección
    │   └── video/         # Video institucional
    ├── components/        # Fragmentos HTML (Vistas Parciales)
    ├── scripts/           # Lógica JavaScript Modular
    └── styles/            # Hojas de estilo CSS Modulares