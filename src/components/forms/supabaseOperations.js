import { supabase } from '@/lib/supabaseClient';

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