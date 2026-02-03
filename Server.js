
1770089112697_image.png
necesito crear una pagina web para mi emprendimiento se llama aramacao art, adjunto imagenes donde esta el instagram para guiarte de ahi, quisiera que se pudiera manejar una opción para el inventario de lo que voy a mostrar y que se pueda hacer pagos por mercado pago.

10:26 p.m.
Voy a ayudarte a crear una página web profesional para Aramacao Art. Primero, déjame revisar las mejores prácticas para desarrollo web frontend.


Vio 2 archivos
Perfecto! Voy a crear una página web completa para Aramacao Art con:

Diseño único y atractivo inspirado en el estilo artesanal de tus productos
Sistema de inventario dinámico para mostrar tus productos
Integración con Mercado Pago para procesar pagos
Responsive design que se vea bien en móvil y escritorio
Basándome en tu Instagram, veo que vendes artesanías hechas a mano como aretes, pines, Funko Pop personalizados, y decoraciones. Voy a crear un sitio con una estética colorida y artesanal que refleje tu marca.


Creating the main HTML file for Aramacao Art website with inventory management and Mercado Pago integration
Ahora voy a crear un archivo README con las instrucciones de configuración y uso:


Creating README file with instructions for setting up the website and MercadoPago integration
Ahora voy a crear un ejemplo de servidor backend para MercadoPago:


Se crearon 4 archivos
Ahora voy a crear una guía de inicio rápido:


Creating quick start guide for setting up the entire system
Ahora voy a copiar todos los archivos al directorio de outputs para que puedas descargarlos:


Copying all files to the outputs directory for user download
Perfecto! Ahora voy a presentarte los archivos:


Presented 7 files
¡Listo! 🎉 He creado tu sitio web completo para Aramacao Art. Aquí está todo lo que incluye:

🎨 Lo que creé para ti:
✨ Sitio Web Principal (aramacao-art.html)
Diseño único y colorido inspirado en el estilo artesanal de tus productos
3 secciones principales:
🛍️ Tienda con catálogo de productos
💖 Sobre Mí con enlaces a redes sociales
🔐 Panel de Administración protegido por contraseña
🔑 Características principales:
Panel de Admin: Agregar/editar/eliminar productos fácilmente
Gestión de inventario: Control de stock en tiempo real
Integración MercadoPago: Preparado para pagos online
Diseño responsive: Se ve perfecto en móvil, tablet y escritorio
Animaciones suaves: Efectos visuales modernos y atractivos
📦 Backend incluido:
Servidor Node.js para procesar pagos con MercadoPago
Sistema de webhooks para notificaciones de pago
Ejemplos de configuración completos
🚀 Para empezar ahora mismo:
Descarga el archivo aramacao-art.html
Ábrelo en tu navegador (doble clic)
Cambia la contraseña de admin (actual: aramacao2024)
Agrega tus productos desde el panel de admin
Lee la guía INICIO-RAPIDO.md para publicarlo online
🌟 Próximos pasos:
Para pagos reales con MercadoPago, sigue las instrucciones en README.md - es muy sencillo y te guiaré paso a paso.

¿Quieres que te ayude con alguna personalización adicional o tienes alguna duda sobre cómo usar el sitio?

Aramacao art
Código · HTML 
Inicio rapido
Documento · MD 
Readme
Documento · MD 
Server
JS 
Package
Código · JSON 
.env
EXAMPLE 
.gitignore
GITIGNORE 





Claude es IA y puede cometer errores. Por favor, verifica las respuestas.
Server · JS
Copiar

// ========================================
// SERVIDOR BACKEND PARA MERCADOPAGO
// ========================================

// Instalación de dependencias:
// npm install express mercadopago cors dotenv

const express = require('express');
const mercadopago = require('mercadopago');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Configurar MercadoPago con tu Access Token
mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

// Endpoint para crear preferencia de pago
app.post('/api/create-preference', async (req, res) => {
    try {
        const { title, price, quantity, description } = req.body;

        // Validar datos
        if (!title || !price || !quantity) {
            return res.status(400).json({ 
                error: 'Faltan datos requeridos' 
            });
        }

        // Crear preferencia de pago
        const preference = {
            items: [
                {
                    title: title,
                    unit_price: parseFloat(price),
                    quantity: parseInt(quantity),
                    description: description || '',
                    currency_id: 'COP' // Peso colombiano
                }
            ],
            back_urls: {
                success: `${process.env.FRONTEND_URL}/success`,
                failure: `${process.env.FRONTEND_URL}/failure`,
                pending: `${process.env.FRONTEND_URL}/pending`
            },
            auto_return: 'approved',
            payment_methods: {
                excluded_payment_types: [],
                installments: 1 // Número de cuotas permitidas
            },
            notification_url: `${process.env.BACKEND_URL}/api/webhook`,
            statement_descriptor: 'ARAMACAO ART',
            external_reference: `order_${Date.now()}`,
        };

        const response = await mercadopago.preferences.create(preference);

        res.json({
            id: response.body.id,
            init_point: response.body.init_point, // URL de pago
            sandbox_init_point: response.body.sandbox_init_point // URL de prueba
        });

    } catch (error) {
        console.error('Error al crear preferencia:', error);
        res.status(500).json({ 
            error: 'Error al procesar la solicitud',
            details: error.message 
        });
    }
});

// Webhook para recibir notificaciones de pago
app.post('/api/webhook', async (req, res) => {
    try {
        const { type, data } = req.body;

        console.log('Webhook recibido:', { type, data });

        if (type === 'payment') {
            const paymentId = data.id;

            // Obtener información del pago
            const payment = await mercadopago.payment.findById(paymentId);

            console.log('Estado del pago:', payment.body.status);
            console.log('Monto:', payment.body.transaction_amount);

            // Aquí puedes:
            // 1. Actualizar el estado del pedido en tu base de datos
            // 2. Reducir el stock del producto
            // 3. Enviar email de confirmación al cliente
            // 4. Generar factura

            switch (payment.body.status) {
                case 'approved':
                    // Pago aprobado
                    console.log('✅ Pago aprobado');
                    // await updateOrderStatus(payment.body.external_reference, 'paid');
                    // await sendConfirmationEmail(payment.body.payer.email);
                    break;

                case 'pending':
                    // Pago pendiente
                    console.log('⏳ Pago pendiente');
                    // await updateOrderStatus(payment.body.external_reference, 'pending');
                    break;

                case 'rejected':
                    // Pago rechazado
                    console.log('❌ Pago rechazado');
                    // await updateOrderStatus(payment.body.external_reference, 'rejected');
                    break;
            }
        }

        res.sendStatus(200);

    } catch (error) {
        console.error('Error en webhook:', error);
        res.sendStatus(500);
    }
});

// Endpoint para verificar estado de un pago
app.get('/api/payment/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await mercadopago.payment.findById(id);

        res.json({
            status: payment.body.status,
            status_detail: payment.body.status_detail,
            amount: payment.body.transaction_amount,
            payer: payment.body.payer
        });

    } catch (error) {
        console.error('Error al consultar pago:', error);
        res.status(500).json({ error: 'Error al consultar pago' });
    }
});

// Endpoint de prueba
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Servidor funcionando correctamente' 
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📝 Endpoints disponibles:`);
    console.log(`   POST /api/create-preference - Crear preferencia de pago`);
    console.log(`   POST /api/webhook - Recibir notificaciones`);
    console.log(`   GET /api/payment/:id - Consultar estado de pago`);
    console.log(`   GET /api/health - Estado del servidor`);
});

module.exports = app;
