import { supabase } from '@/lib/supabaseClient';

async function sendConfirmationEmail(userData) {
 if (!userData.email) {
   console.log('No email provided for', userData.name);
   return;
 }

  try {
    const response = await fetch('/api/send-confirmation-email', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      vaEnBus: userData.vaEnBus || false,
      isMainAttendee: true,
      allergies: userData.allergies || 'No especificado',
      favoriteSong: userData.favoriteSong || 'No especificado',
      additionalAttendees: userData.additionalAttendees || [] // Pasar acompañantes si existen
    }),
   });

   if (!response.ok) {
     const error = await response.json();
     throw new Error(error.message || 'Error sending confirmation email');
   }

   console.log('Confirmation email sent to', userData.email);
 } catch (error) {
   console.error('Failed to send confirmation email:', error);
 }
}

export const saveToSupabase = async (formData) => {
  try {
    if (formData.isAttending === "no") {
      const { data, error } = await supabase
        .from('asistentes')
        .insert([{
          nombre: formData.notComing.name,
          email: null,
          alergias: null,
          cancion: null,
          asistencia: 'NO',
          asistente_principal: null
        }])
        .select()
      
      if (error) throw error
      return { success: true, data }
    }
    
    if (formData.attendanceType === "solo") {
      const { data, error } = await supabase
        .from('asistentes')
        .insert([{
          nombre: formData.mainAttendee.name,
          email: formData.mainAttendee.email,
          alergias: formData.mainAttendee.allergies || null,
          cancion: formData.mainAttendee.favoriteSong,
          asistencia: 'SI',
          es_menor: false,
          asistente_principal: null,
          va_en_bus: formData.mainAttendee.vaEnBus || false,
        }])
        .select()
          
      if (error) throw error

      if (formData.mainAttendee.email) {
        await sendConfirmationEmail({
          name: formData.mainAttendee.name,
          email: formData.mainAttendee.email,
          vaEnBus: formData.mainAttendee.vaEnBus,
          allergies: formData.mainAttendee.allergies,
          favoriteSong: formData.mainAttendee.favoriteSong
        });
      }

      return { success: true, data }
    }
    
    // Caso 3: Asiste con acompañantes
    // Primero insertamos al asistente principal
    const { data: principalData, error: principalError } = await supabase
      .from('asistentes')
      .insert([{
        nombre: formData.mainAttendee.name,
        email: formData.mainAttendee.email,
        alergias: formData.mainAttendee.allergies || null,
        cancion: formData.mainAttendee.favoriteSong,
        asistencia: 'SI',
        es_menor: false,
        asistente_principal: null,
        va_en_bus: formData.mainAttendee.vaEnBus || false,
      }])
      .select()
    
    if (principalError) throw principalError

    // Si hay acompañantes, los insertamos referenciando al principal
    if (formData.additionalAttendees && formData.additionalAttendees.length > 0) {
      const acompanantes = formData.additionalAttendees.map(att => ({
        nombre: att.name,
        email: null,
        alergias: att.allergies || null,
        cancion: att.favoriteSong,
        asistencia: 'SI',
        es_menor: att.isUnder12 || false,
        asistente_principal: formData.mainAttendee.name
      }));
      
      const { data: acompanantesData, error: acompanantesError } = await supabase
        .from('asistentes')
        .insert(acompanantes)
        .select()
      
      if (acompanantesError) throw acompanantesError
      
      if (formData.mainAttendee.email) {
        await sendConfirmationEmail({
          name: formData.mainAttendee.name,
          email: formData.mainAttendee.email,
          vaEnBus: formData.mainAttendee.vaEnBus,
          allergies: formData.mainAttendee.allergies,
          favoriteSong: formData.mainAttendee.favoriteSong,
          additionalAttendees: formData.additionalAttendees
        });
      }
      
      // Combinar datos solo si ambos son arrays
      return { 
        success: true, 
        data: {
          principal: principalData,
          acompanantes: acompanantesData || []
        }
      }
    }
    
    // Si no hay acompañantes, solo devolvemos el principal
    return { success: true, data: { principal: principalData, acompanantes: [] } }
    
  } catch (error) {
    console.error('Error guardando en Supabase:', error)
    throw error
  }
}