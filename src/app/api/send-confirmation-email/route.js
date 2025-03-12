import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { 
      name, 
      email, 
      vaEnBus, 
      allergies,
      favoriteSong,
      additionalAttendees
    } = await request.json();
    
    if (!name || !email) {
      return NextResponse.json({ error: 'Faltan datos necesarios' }, { status: 400 });
    }

    const mainAttendeeSummary = `
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <ul style="list-style-type: none; padding-left: 0;">
          <li><strong>Nombre:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Servicio de bus:</strong> ${vaEnBus ? 'Sí' : 'No'}</li>
          <li><strong>Alergias/Restricciones:</strong> ${allergies || 'No especificado'}</li>
          <li><strong>Canción favorita:</strong> ${favoriteSong || 'No especificado'}</li>
        </ul>
      </div>
    `;

    // Generar sección de resumen para acompañantes si existen
    let additionalAttendeesSummary = '';
    if (additionalAttendees && additionalAttendees.length > 0) {
      additionalAttendeesSummary = `
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #FCA311; margin-top: 0;">Información de acompañantes</h4>
          ${additionalAttendees.map((attendee, index) => `
            <div style="margin-bottom: ${index < additionalAttendees.length - 1 ? '15px' : '0'}; padding-bottom: ${index < additionalAttendees.length - 1 ? '15px' : '0'}; ${index < additionalAttendees.length - 1 ? 'border-bottom: 1px solid #eee;' : ''}">
              <p style="font-weight: bold; margin-bottom: 5px;">Acompañante ${index + 1}</p>
              <ul style="list-style-type: none; padding-left: 0; margin-top: 5px;">
                <li><strong>Nombre:</strong> ${attendee.name}</li>
                <li><strong>Menor de 12 años:</strong> ${attendee.isUnder12 ? 'Sí' : 'No'}</li>
                <li><strong>Alergias/Restricciones:</strong> ${attendee.allergies || 'No especificado'}</li>
                <li><strong>Canción favorita:</strong> ${attendee.favoriteSong || 'No especificado'}</li>
              </ul>
            </div>
          `).join('')}
        </div>
      `;
    }

    const { data, error } = await resend.emails.send({
      from: 'BodaFest <info@bodafesteliydani.es>',
      to: email,
      subject: '¡Gracias por confirmar tu asistencia a nuestro BodaFest!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #FCA311;">¡Hola ${name}!</h2>
          
          <p>¡Estamos muy emocionados de que te unas a nuestra celebración! Tu asistencia ha sido confirmada correctamente.</p>
          
          ${vaEnBus ? `
            <div style="background-color: #f8f4ff; border-left: 4px solid #FCA311; padding: 15px; margin: 20px 0;">
              <strong>Has confirmado que utilizarás el servicio de bus.</strong><br>
              Te enviaremos los horarios y puntos de recogida por correo electrónico unos días antes del evento.
            </div>
          ` : ''}
          
          <h3 style="color: #FCA311; margin-top: 30px;">Detalles del evento</h3>
          <p>
            <strong>Fecha:</strong> 3 de Mayo de 2025<br>
            <strong>Lugar Ceremonia:</strong> Iglesia San Juan Bautista del Cerro - Cabra<br>
            <strong>Hora:</strong> 12:30h<br>
            <strong>Lugar Banquete:</strong> Bodegas Los Ángeles - Aguilar de la Frontera<br>
            <strong>Hora:</strong> 14:00h
          </p>
          
          <h3 style="color: #FCA311; margin-top: 30px;">Resumen de tu registro</h3>
          
          ${mainAttendeeSummary}
          ${additionalAttendeesSummary}
          
          <p style="background-color: #fffaf0; padding: 10px; border-left: 4px solid #ffc107; margin-top: 20px;">
            Si necesitas corregir algún dato, por favor contáctanos lo antes posible en los siguientes teléfonos 692492741 (Eli) o 655098956 (Dani).
            También por correo a
            <a href="mailto:daniperezluna@gmail.com">daniperezluna@gmail.com</a>
            o a
            <a href="mailto:elisabethosunar@gmail.com">elisabethosunar@gmail.com</a>
          </p>
                    
          <p style="margin-top: 40px;">
            Con cariño,<br>
            <strong>Eli y Dani</strong>
          </p>
          
          <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
            <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in send-confirmation-email:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}