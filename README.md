# 🚀 Mercart - Marketplace Tecnológico Premium Chile 2025

## 🌟 Descripción

**Mercart** es una plataforma de ecommerce tecnológico premium diseñada específicamente para el mercado chileno con lanzamiento programado para **Agosto 2025**. Con un diseño moderno y minimalista, efectos glassmorphism sutiles y una **optimización móvil brutal** que supera a la competencia actual.

## ✨ Características Principales

### 🎨 Diseño Moderno y Minimalista
- **Paleta de colores unificada** con azules y cianes para consistencia visual
- **Efectos glassmorphism sutiles** sin sobrecargar visualmente
- **Animaciones fluidas** optimizadas para móviles
- **Optimización móvil brutal** que supera a sitios como MercadoLibre, Falabella y Ripley
- **Diseño responsivo perfecto** para todos los dispositivos

### 🛍️ Funcionalidades Ecommerce
- **Catálogo completo** con categorías especializadas
- **Carrito de compras** con persistencia local
- **Sistema de autenticación** con Firebase
- **Búsqueda avanzada** con sugerencias inteligentes
- **Sistema de ofertas** y promociones dinámicas
- **Configurador de PC** paso a paso con timeline interactivo
- **Chatbot IA funcional** con respuestas inteligentes

### 🔧 Configurador de PC "Arma tu PC"
- **Timeline interactivo** que guía paso a paso
- **Selección inteligente** de componentes compatibles
- **Verificación de compatibilidad** automática
- **Cálculo de precio** en tiempo real
- **Diferentes tipos de build**: Gaming, Workstation, Office, Budget
- **Agregar build completo** al carrito de una vez

### 🤖 Chatbot Mejorado
- **IA conversacional** con respuestas contextuales
- **Sugerencias rápidas** para mejor UX
- **Soporte 24/7** simulado
- **Integración con productos** y ofertas
- **Diseño adaptativo** para móvil y desktop

### 🔗 Redes Sociales Flotantes
- **Solo Instagram y WhatsApp** con colores de marca
- **Animación flotante sutil** sin molestar
- **Ocultos en móvil** para mejor UX
- **Efectos de partículas** sutiles

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Cuenta de Firebase
- Cuenta de Shopify (opcional)

### Instalación Local

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/mercart-chile-2025.git
cd mercart-chile-2025
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=tu_measurement_id

# Shopify Configuration (Opcional)
NEXT_PUBLIC_SHOPIFY_DOMAIN=tu-tienda.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=tu_access_token
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
# o
yarn dev
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

## 🚀 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Ejecutar en modo desarrollo
npm run build        # Construir para producción
npm run start        # Ejecutar build de producción
npm run lint         # Ejecutar linter
```

## 📦 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Netlify
1. Ejecuta `npm run build`
2. Sube la carpeta `.next/` a Netlify
3. Configura las variables de entorno

## 🔧 Configuración Avanzada

### Firebase Setup
1. Crea un proyecto en Firebase Console
2. Habilita Authentication (Email/Password y Google)
3. Configura Firestore Database
4. Copia las credenciales a `.env.local`

### Shopify Setup (Opcional)
1. Crea una Shopify Partner account
2. Crea una Development Store
3. Genera Storefront Access Token
4. Configura productos de prueba

## 🏗️ Estructura del Proyecto

```
mercart-chile-2025/
├── app/                          # App Router de Next.js
│   ├── globals.css              # Estilos globales optimizados móvil
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página de inicio
│   ├── carrito/                 # Página del carrito
│   ├── categoria/               # Páginas de categorías
│   ├── ofertas/                 # Página de ofertas
│   ├── perfil/                  # Página de perfil de usuario
│   ├── smartphones/             # Página específica de smartphones
│   └── arma-tu-pc/              # Configurador de PC
├── components/                   # Componentes React
│   ├── 3d/                      # Componentes 3D optimizados
│   ├── auth/                    # Componentes de autenticación
│   ├── layout/                  # Componentes de layout responsivo
│   ├── pages/                   # Componentes de páginas móvil-first
│   ├── providers/               # Providers de contexto
│   ├── sections/                # Secciones optimizadas
│   └── ui/                      # Componentes UI base móvil-optimizados
├── lib/                         # Utilidades y configuraciones
│   ├── firebase.ts             # Configuración de Firebase
│   ├── shopify.ts              # Integración con Shopify
│   └── utils.ts                # Utilidades generales
├── public/                      # Archivos estáticos optimizados
└── README.md                    # Este archivo
```

## 🎯 Características Técnicas

### Rendimiento Móvil
- **First Contentful Paint** < 1.5s
- **Largest Contentful Paint** < 2.5s
- **Cumulative Layout Shift** < 0.1
- **First Input Delay** < 100ms
- **Time to Interactive** < 3.5s

### SEO Móvil
- **Meta tags** optimizados para móvil
- **Open Graph** completo
- **Schema markup** para productos
- **Sitemap** automático
- **Core Web Vitals** optimizados

### Accesibilidad Móvil
- **ARIA labels** completos
- **Navegación por gestos**
- **Contraste de colores** AA compliant
- **Touch targets** 44px mínimo
- **Screen readers** compatibles

## 🇨🇱 Información del Proyecto

#### Lanzamiento
- **Fecha de lanzamiento**: Agosto 2025
- **Mercado objetivo**: Chile
- **Moneda**: Peso Chileno (CLP)
- **Idioma**: Español (Chile)
- **Ubicación**: Santiago, Chile

#### Paleta de Colores Unificada
- **Azul Principal**: `#3b82f6` (blue-500) - Color primario corporativo
- **Azul Secundario**: `#1d4ed8` (blue-700) - Color de acentos
- **Cian**: `#06b6d4` (cyan-500) - Color secundario vibrante  
- **Azul Claro**: `#60a5fa` (blue-400) - Color de highlights

### 🔧 Tecnologías Utilizadas
- **Next.js 14** - Framework React de última generación
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS** - Estilos utilitarios con paleta personalizada
- **Framer Motion** - Animaciones optimizadas para móvil
- **Firebase** - Autenticación y base de datos
- **Shopify** - Integración de ecommerce
- **Lucide React** - Iconografía moderna

## 📞 Soporte

Para soporte técnico o preguntas:
- 📧 Email: soporte@mercart.cl
- 💬 WhatsApp: +56 2 2800-0000
- 📱 Instagram: @mercartchile

---

**Hecho con ❤️ en Chile para el mercado chileno** 🇨🇱

*Mercart - Lanzamiento Agosto 2025 - La revolución tecnológica llega a Chile*

### 🏆 Optimización Móvil que Supera la Competencia

Mercart ha sido diseñado desde cero con un enfoque **mobile-first** que supera a:

- **MercadoLibre**: Navegación más fluida y rápida
- **Falabella**: Mejor experiencia de producto
- **Ripley**: Checkout más simple y efectivo
- **Paris**: Diseño más moderno y atractivo
- **Linio**: Performance superior en móvil

**¡Prepárate para la revolución del ecommerce tecnológico en Chile!** 🚀

## 📋 Lista de Verificación para Despliegue

### ✅ Funcionalidades Implementadas
- [x] Header con navegación responsive
- [x] Búsqueda funcional con sugerencias
- [x] Sistema de autenticación completo
- [x] Carrito de compras funcional
- [x] Páginas de categorías con filtros
- [x] Configurador de PC "Arma tu PC"
- [x] Sistema de notificaciones
- [x] Chatbot IA funcional
- [x] Botones sociales flotantes
- [x] Diseño responsive optimizado
- [x] Integración con Firebase
- [x] Integración con Shopify
- [x] Optimización de performance

### ✅ Listo para Producción
- [x] Código optimizado y limpio
- [x] Manejo de errores implementado
- [x] Variables de entorno configuradas
- [x] Build de producción funcional
- [x] SEO optimizado
- [x] Accesibilidad implementada
- [x] Performance optimizado
- [x] Responsive design completo

### 🚀 Próximos Pasos
1. Configurar Firebase en producción
2. Configurar Shopify (opcional)
3. Desplegar en Vercel/Netlify
4. Configurar dominio personalizado
5. Configurar analytics
6. Configurar monitoreo de errores