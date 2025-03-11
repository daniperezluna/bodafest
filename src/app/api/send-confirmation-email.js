// pages/api/send-confirmation-email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, vaEnBus, isMainAttendee } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Faltan datos necesarios' });
    }

    const { data, error } = await resend.emails.send({
      from: 'BodaFest <info@bodafesteliydani.es>',
      to: email,
      subject: '¡Gracias por confirmar tu asistencia a nuestro BodaFest!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #FCA311;;">¡Hola ${name}!</h2>
          
          <p>¡Estamos muy emocionados de que te unas a nuestra celebración! Tu asistencia ha sido confirmada correctamente.</p>
          
          ${vaEnBus ? `
            <div style="background-color: #f8f4ff; border-left: 4px solid #FCA311;; padding: 15px; margin: 20px 0;">
              <strong>Has confirmado que utilizarás el servicio de bus.</strong><br>
              Te enviaremos los horarios y puntos de recogida por correo electrónico unos días antes del evento.
            </div>
          ` : ''}
          
          <h3 style="color: #FCA311; margin-top: 30px;">Detalles del evento</h3>
          <p>
            <strong>Fecha:</strong> 3 de Mayo de 2025<br>
            <strong>Lugar Ceremonia:</strong> Iglesia San Juan Bautista del Cerro<br>
            <strong>Hora:</strong> 12:30h
            <strong>Lugar Banquete:</strong> Iglesia San Juan Bautista del Cerro<br>
            <strong>Hora:</strong> 14:00h
          </p>
          
          ${isMainAttendee ? `
            <p>Has confirmado la asistencia como invitado principal ${vaEnBus ? 'con servicio de bus' : 'sin servicio de bus'}.</p>
          ` : ''}
          
          <p>Si tienes cualquier pregunta o necesitas hacer algún cambio en tu RSVP, no dudes en contactarnos.</p>
          
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
      return res.status(500).json({ error: 'Error sending email' });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error in send-confirmation-email:', error);
    return res.status(500).json({ error: error.message });
  }
}