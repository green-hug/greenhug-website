# Despliegue en Hostinger - Instrucciones

## 🚀 Cómo compilar y desplegar

### 1. Compilar para producción

```bash
npm install
npm run build:static
```

Esto generará todos los archivos estáticos en la carpeta `out/`.

### 2. Subir a Hostinger

1. **Accede a tu panel de Hostinger**
2. **Abre el File Manager** o conecta por FTP
3. **Ve a la carpeta public_html** de tu dominio
4. **Sube todo el contenido de la carpeta `out/`** directamente a public_html

**Estructura en Hostinger:**
```
public_html/
├── index.html
├── .htaccess
├── robots.txt
├── favicon.ico
├── placeholder.svg
└── assets/
    ├── *.css
    ├── *.js
    ├── *.png
    └── *.jpg
```

### 3. Configuración automática

El archivo `.htaccess` incluido configura automáticamente:
- ✅ Redirecciones para React Router
- ✅ Compresión GZIP
- ✅ Headers de seguridad
- ✅ Cache de navegador

### 4. Scripts disponibles

- `npm run dev` - Desarrollo local (puerto 8080)
- `npm run build:static` - Build para hosting estático
- `npm run preview` - Previsualizar build localmente
- `npm run lint` - Verificar código

### 5. Verificación

Después de subir los archivos, tu sitio estará disponible en:
- `https://tudominio.com`

## 📁 Archivos importantes

- **`out/`** - Carpeta con los archivos compilados
- **`out/.htaccess`** - Configuración del servidor Apache
- **`vite.config.ts`** - Configuración de build
- **`.env.production`** - Variables de entorno de producción

## 🔧 Solución de problemas

### Si las rutas no funcionan:
1. Verifica que `.htaccess` esté en la raíz de public_html
2. Asegúrate que el hosting soporte mod_rewrite

### Si los recursos no cargan:
1. Verifica que `base: './'` esté en vite.config.ts
2. Revisa que todos los archivos de assets/ se hayan subido

### Para actualizar el sitio:
1. Ejecuta `npm run build:static`
2. Reemplaza el contenido de public_html con el nuevo contenido de `out/`

## 🌟 Características del build

- ✅ Optimización automática de imágenes
- ✅ Minificación de CSS/JS
- ✅ Code splitting automático
- ✅ Compresión GZIP
- ✅ Compatible con hosting compartido
- ✅ SEO optimizado
- ✅ PWA ready