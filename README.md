# 🎨 Aramacao Art - Sitio Web

¡Bienvenido al sitio web de Aramacao Art! Una plataforma completa para mostrar y vender tus artesanías únicas.

## ✨ Características

### 🛍️ Tienda Online
- Catálogo de productos con diseño atractivo y único
- Visualización de stock en tiempo real
- Categorización de productos (Aretes, Pines, Funko Pop, etc.)
- Diseño responsive (se adapta a móvil, tablet y escritorio)

### 🔐 Panel de Administración
- Protección por contraseña
- Agregar nuevos productos fácilmente
- Editar productos existentes
- Eliminar productos
- Gestión de inventario (stock)
- Categorización flexible

### 💳 Integración con MercadoPago
- Sistema preparado para pagos en línea
- Compatible con el mercado colombiano

## 🚀 Cómo Usar

### Contraseña de Admin
**Contraseña actual:** `aramacao2024`

⚠️ **IMPORTANTE:** Cambia esta contraseña en el código por seguridad. Busca la línea:
```javascript
const ADMIN_PASSWORD = 'aramacao2024';
```

### Agregar Productos
1. Ve a la pestaña "🔐 Admin"
2. Ingresa la contraseña
3. Completa el formulario:
   - Nombre del producto
   - Descripción detallada
   - Precio en pesos colombianos (COP)
   - Stock disponible
   - Categoría
   - Emoji para visualización

### Editar/Eliminar Productos
- Haz clic en "✏️ Editar" para modificar un producto
- Haz clic en "🗑️ Eliminar" para quitar un producto del catálogo

## 💰 Configuración de MercadoPago

Para activar los pagos reales con MercadoPago, necesitas:

### Paso 1: Crear Cuenta en MercadoPago
1. Ve a https://www.mercadopago.com.co/
2. Crea tu cuenta de vendedor
3. Completa la verificación de identidad

### Paso 2: Obtener Credenciales
1. Entra a tu panel de MercadoPago
2. Ve a "Credenciales" en el menú
3. Copia tu **Public Key** (para el frontend)
4. Copia tu **Access Token** (para el backend)

### Paso 3: Actualizar el Código
Reemplaza esta línea en el archivo HTML:
```javascript
const mp = new MercadoPago('TEST-tu-public-key-aqui', {
```

Por:
```javascript
const mp = new MercadoPago('TU_PUBLIC_KEY_REAL', {
```

### Paso 4: Backend Necesario
Para procesar pagos reales, necesitas un servidor backend. Opciones:

#### Opción A: Backend Simple con Node.js
```javascript
// server.js
const express = require('express');
const mercadopago = require('mercadopago');

const app = express();
app.use(express.json());

mercadopago.configure({
    access_token: 'TU_ACCESS_TOKEN'
});

app.post('/api/create-preference', async (req, res) => {
    const { title, price, quantity } = req.body;
    
    const preference = {
        items: [{
            title: title,
            unit_price: price,
            quantity: quantity,
        }],
        back_urls: {
            success: 'https://tu-sitio.com/success',
            failure: 'https://tu-sitio.com/failure',
            pending: 'https://tu-sitio.com/pending'
        },
        auto_return: 'approved',
    };

    try {
        const response = await mercadopago.preferences.create(preference);
        res.json({ id: response.body.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear preferencia' });
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});
```

#### Opción B: Servicios sin servidor
- **Netlify Functions**
- **Vercel Serverless Functions**
- **AWS Lambda**

## 🌐 Despliegue del Sitio

### Opción 1: GitHub Pages (GRATIS)
1. Crea una cuenta en GitHub
2. Crea un nuevo repositorio
3. Sube el archivo `aramacao-art.html`
4. Ve a Settings > Pages
5. Activa GitHub Pages
6. Tu sitio estará en: `https://tu-usuario.github.io/nombre-repo/`

### Opción 2: Netlify (GRATIS)
1. Crea cuenta en https://netlify.com
2. Arrastra y suelta el archivo HTML
3. Tu sitio estará online en minutos

### Opción 3: Vercel (GRATIS)
1. Crea cuenta en https://vercel.com
2. Conecta tu repositorio de GitHub
3. Deploy automático

## 🎨 Personalización

### Cambiar Colores
Busca la sección `:root` en el CSS y modifica las variables:
```css
:root {
    --coral: #FF6B6B;      /* Color principal */
    --sunshine: #FFD93D;   /* Color secundario */
    --mint: #6BCB77;       /* Color de acento */
    --sky: #4D96FF;        /* Color de botones */
    --purple: #9D4EDD;     /* Color admin */
}
```

### Cambiar Fuentes
Las fuentes actuales son:
- **Logo:** Permanent Marker (estilo artesanal)
- **Texto:** Quicksand (moderna y legible)

Puedes cambiarlas en Google Fonts y actualizar el enlace.

### Agregar Redes Sociales
Actualiza los enlaces en la sección "Sobre Mí":
```html
<a href="https://instagram.com/aramacao_art" target="_blank" class="social-btn">
```

## 📱 Funcionalidades Futuras Recomendadas

1. **Base de Datos Real**
   - Firebase (gratis hasta cierto límite)
   - Supabase (alternativa open-source)
   - MongoDB Atlas

2. **Carrito de Compras**
   - Permitir comprar múltiples productos
   - Aplicar descuentos y cupones

3. **Sistema de Usuarios**
   - Registro de clientes
   - Historial de compras
   - Lista de deseos

4. **Galería de Imágenes**
   - Subir fotos reales de productos
   - Múltiples imágenes por producto

5. **Notificaciones**
   - Email cuando se haga una venta
   - Confirmación de compra al cliente

6. **Búsqueda y Filtros**
   - Buscar por nombre
   - Filtrar por categoría
   - Ordenar por precio

## 🛠️ Tecnologías Usadas

- **HTML5** - Estructura
- **CSS3** - Diseño y animaciones
- **JavaScript** - Interactividad
- **MercadoPago SDK** - Pagos
- **Google Fonts** - Tipografías

## 📞 Soporte

Si necesitas ayuda con:
- Configuración del sitio
- Integración de MercadoPago
- Personalización del diseño
- Agregar nuevas funcionalidades

No dudes en contactar y te ayudaré a implementarlo.

## 📋 Checklist de Implementación

- [ ] Cambiar contraseña de admin
- [ ] Crear cuenta en MercadoPago
- [ ] Obtener credenciales de MercadoPago
- [ ] Configurar backend para pagos
- [ ] Subir sitio a hosting
- [ ] Agregar productos reales
- [ ] Subir fotos de productos
- [ ] Probar proceso de compra
- [ ] Compartir en redes sociales

## 🎉 ¡Listo!

Tu sitio web está completo y listo para usar. Solo necesitas:
1. Publicarlo en línea
2. Configurar MercadoPago para pagos reales
3. Agregar tus productos
4. ¡Empezar a vender! 🚀

---

**Aramacao Art** - ✨Creer para crear✨
💖 Hecho con amor artesanal 💖
