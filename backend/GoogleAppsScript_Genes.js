/**
 * ============================================================================
 * BACKEND INSTITUCIONAL COLEGIO GENES - GOOGLE APPS SCRIPT WEBHOOK
 * ============================================================================
 * Este script convierte un Google Sheet en un CRM en tiempo real para el
 * equipo de admisiones del Colegio Genes.
 * 
 * CAPACIDADES:
 * 1. Registra prospectos en la hoja "Prospectos 2026".
 * 2. Envía notificación por correo al equipo de admisiones con tarjeta HTML.
 * 3. Envía acuse de recibo institucional a la familia (si ingresó email).
 * 4. Soporta solicitudes POST con CORS abierto para integraciones web directas.
 * 
 * GUÍA RÁPIDA DE INSTALACIÓN:
 * 1. Crea una Hoja de Cálculo en Google Sheets (ej: "Leads Colegio Genes 2026").
 * 2. En el menú superior: Extensiones > Apps Script.
 * 3. Pega todo este código reemplazando el contenido existente.
 * 4. Configura el correo de destino en la variable ADMIN_EMAIL (línea 26).
 * 5. Haz clic en "Implementar" > "Nueva implementación".
 * 6. Tipo: "Aplicación web".
 *    - Ejecutar como: "Yo" (tu cuenta).
 *    - Quién tiene acceso: "Cualquier persona" (Anyone).
 * 7. Copia la URL generada (termina en /exec) y pégala en js/config.js
 *    o en window.GENES_GOOGLE_APPS_SCRIPT_URL.
 * ============================================================================
 */

// Correo donde el equipo de admisiones recibirá la alerta inmediata
const ADMIN_EMAIL = 'admisiones@colegiogenes.edu.pe';
const NOMBRE_HOJA = 'Prospectos';

function doPost(e) {
  try {
    let data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter || {};
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(NOMBRE_HOJA);

    // Si la hoja no existe, se crea con los encabezados correspondientes
    if (!sheet) {
      sheet = ss.insertSheet(NOMBRE_HOJA);
      const headers = [
        'Fecha y Hora',
        'Campaña / Formulario',
        'Apoderado',
        'DNI Apoderado',
        'Teléfono / WhatsApp',
        'Correo Electrónico',
        'Estudiante (Hijo/a)',
        'Colegio de Procedencia',
        'Sede de Interés',
        'Nivel',
        'Grado',
        'Mensaje / Consulta',
        'Estado de Atención'
      ];
      sheet.appendRow(headers);
      
      // Formato visual de encabezados
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#202682');
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const fechaHora = Utilities.formatDate(new Date(), 'America/Lima', 'dd/MM/yyyy HH:mm:ss');
    const apoderado = data.nombres || data.apoderado || 'No especificado';
    const dni = data.dni || 'Sin DNI';
    const telefono = data.telefono || data.celular || 'No especificado';
    const correo = data.correo || data.email || 'No especificado';
    const estudiante = data.estudiante || data.alumno || '-';
    const colegioOrigen = data.colegio_origen || data.colegio || '-';
    const sede = data.sede || '-';
    const nivel = data.nivel || '-';
    const grado = data.grado || '-';
    const mensaje = data.mensaje || data.consulta || '-';
    const origen = data.origen || data.formulario || 'Web Oficial';

    // Insertar fila en Google Sheets
    sheet.appendRow([
      fechaHora,
      origen,
      apoderado,
      dni,
      telefono,
      correo,
      estudiante,
      colegioOrigen,
      sede,
      nivel,
      grado,
      mensaje,
      'Pendiente de Contacto'
    ]);

    // Enviar alerta al equipo de admisiones
    enviarNotificacionAdmin({
      fechaHora,
      origen,
      apoderado,
      dni,
      telefono,
      correo,
      estudiante,
      colegioOrigen,
      sede,
      nivel,
      grado,
      mensaje
    });

    // Enviar confirmación al apoderado si proporcionó un correo válido
    if (correo && correo.includes('@') && correo !== 'No especificado') {
      enviarConfirmacionPadre(correo, apoderado, sede);
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Lead registrado exitosamente en Google Sheets y correos despachados.',
        timestamp: fechaHora
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function enviarNotificacionAdmin(d) {
  try {
    const asunto = `🚨 Nuevo Prospecto: ${d.apoderado} (${d.sede} - ${d.grado})`;
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #202682; padding: 20px; text-align: center; color: #FFFFFF;">
          <h2 style="margin: 0; font-size: 20px;">Colegio Genes - Nuevo Prospecto Web</h2>
          <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.9;">Fecha: ${d.fechaHora} · Formulario: ${d.origen}</p>
        </div>
        <div style="padding: 24px; color: #1E293B; line-height: 1.6;">
          <h3 style="color: #202682; border-bottom: 2px solid #F1F5F9; padding-bottom: 8px; margin-top: 0;">Datos del Apoderado</h3>
          <p><strong>Nombres:</strong> ${d.apoderado}</p>
          <p><strong>DNI:</strong> ${d.dni}</p>
          <p><strong>Teléfono:</strong> <a href="https://wa.me/51${d.telefono.replace(/\\D/g, '')}" target="_blank" style="color: #10B981; font-weight: bold;">${d.telefono} (Clic para WhatsApp)</a></p>
          <p><strong>Correo:</strong> ${d.correo}</p>

          <h3 style="color: #202682; border-bottom: 2px solid #F1F5F9; padding-bottom: 8px; margin-top: 20px;">Datos del Postulante</h3>
          <p><strong>Estudiante:</strong> ${d.estudiante}</p>
          <p><strong>Colegio de Origen:</strong> ${d.colegioOrigen}</p>
          <p><strong>Sede de Interés:</strong> ${d.sede}</p>
          <p><strong>Nivel / Grado:</strong> ${d.nivel} - ${d.grado}</p>

          ${d.mensaje !== '-' ? `
            <div style="margin-top: 20px; background: #F8FAFC; padding: 14px; border-left: 4px solid #202682; border-radius: 4px;">
              <strong>Mensaje o Consulta:</strong><br>${d.mensaje}
            </div>
          ` : ''}
        </div>
        <div style="background: #F1F5F9; padding: 12px 24px; text-align: center; font-size: 12px; color: #64748B;">
          Sistema Web Colegio Genes · Atención Inmediata en menos de 15 minutos
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: asunto,
      htmlBody: htmlBody
    });
  } catch (err) {
    Logger.log('Error enviando correo a admin: ' + err.toString());
  }
}

function enviarConfirmacionPadre(correoPadre, nombrePadre, sede) {
  try {
    const asunto = '¡Gracias por contactar a Colegio Genes! Hemos recibido tu solicitud';
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #202682; padding: 22px; text-align: center; color: #FFFFFF;">
          <h2 style="margin: 0;">Colegio Genes</h2>
          <p style="margin: 6px 0 0; font-size: 14px;">Exigencia y Alto Desempeño Preuniversitario</p>
        </div>
        <div style="padding: 24px; color: #1E293B; line-height: 1.6;">
          <p>Estimado(a) <strong>${nombrePadre}</strong>,</p>
          <p>Hemos recibido satisfactoriamente su solicitud de información para la <strong>Sede ${sede || 'elegida'}</strong> para el <strong>Proceso de Admisión y Vacaciones Útiles</strong>.</p>
          <p>Una tutora del área de admisiones se comunicará con usted a la brevedad vía WhatsApp o llamada telefónica para brindarle información sobre vacantes disponibles, costos transparentes y agendar la evaluación diagnóstica sin costo.</p>
          <div style="text-align: center; margin: 25px 0;">
            <a href="https://wa.me/51933840074?text=Hola%20Colegio%20Genes,%20acabo%20de%20dejar%20mis%20datos%20en%20su%20web" style="background-color: #25D366; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block;">
              Contactar Directamente por WhatsApp
            </a>
          </div>
          <p style="font-size: 13px; color: #64748B;">Atentamente,<br><strong>Equipo de Admisiones Colegio Genes</strong></p>
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: correoPadre,
      subject: asunto,
      htmlBody: htmlBody
    });
  } catch (err) {
    Logger.log('Error enviando correo a apoderado: ' + err.toString());
  }
}

// Soporte para solicitudes GET de verificación de estado
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'online',
      service: 'Colegio Genes Apps Script Backend',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
