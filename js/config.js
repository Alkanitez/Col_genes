/**
 * Configuración Global del Frontend - Colegio Genes
 * 
 * Si deseas conectar el formulario a tu Google Sheet institucional:
 * 1. Implementa el script de backend/GoogleAppsScript_Genes.js en Google Apps Script.
 * 2. Pega la URL generada (/exec) en la propiedad 'googleAppsScriptUrl'.
 */
window.GENES_CONFIG = {
    // URL del Webhook de Google Apps Script (si está vacío, opera en modo local + WhatsApp directo)
    googleAppsScriptUrl: '',
    
    // Teléfono oficial de WhatsApp de admisiones (con código de país 51)
    whatsappPhone: '51933840074',
    
    // Correo de admisiones para envíos de contingencia
    adminEmail: 'admisiones@colegiogenes.edu.pe'
};
