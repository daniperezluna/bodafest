import { saveToSupabase } from './supabaseOperations';

/**
 * Crea los manejadores de eventos para el formulario
 * @param {Object} params - Parámetros y funciones necesarios
 * @returns {Object} - Objeto con todos los manejadores
 */
export const createFormHandlers = ({
  formData,
  setFormData,
  setErrors,
  setIsSubmitting,
  handleNextStep,
  STEPS,
  currentAttendeeIndex,
  setCurrentAttendeeIndex,
  validateEmail
}) => {
  // Validación de email con regex
  const validateEmailField = (email) => {
    if (!email) return true;
    return validateEmail ? validateEmail(email) : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  /**
   * Manejo del primer paso
   */
  const handleInitialSubmit = (e) => {
    e.preventDefault()
    const isAttending = e.target.isAttending.value
    
    if (!isAttending) {
      setErrors({ isAttending: "Por favor selecciona una opción" })
      return
    }
    
    handleNextStep(
      isAttending === "yes" ? STEPS.ATTENDANCE_TYPE : STEPS.NOT_COMING, 
      { isAttending }
    )
  }

  /**
   * Manejo del paso de tipo de asistencia
   */
  const handleAttendanceTypeSubmit = (e) => {
    e.preventDefault()
    const attendanceType = e.target.attendanceType.value
    
    if (!attendanceType) {
      setErrors({ attendanceType: "Por favor selecciona una opción" })
      return
    }
    
    handleNextStep(
      attendanceType === "solo" ? STEPS.COMING_ALONE : STEPS.COMING_WITH_OTHERS, 
      { attendanceType }
    )
  }

  /**
   * Manejo del paso de "no asistencia"
   */
  const handleNotComingSubmit = (e) => {
    e.preventDefault()
    const nameValue = e.target.name.value
  
    if (!nameValue.trim()) {
      setErrors({ name: "Por favor ingresa tu nombre" })
      return
    }
  
    setIsSubmitting(true)
    
    const finalData = {
      ...formData,
      notComing: { name: nameValue }
    }
    
    // Guardar en Supabase
    saveToSupabase(finalData)
      .then(() => {
        handleNextStep(STEPS.COMPLETE, { notComing: { name: nameValue } })
      })
      .catch(error => {
        console.error("Error al guardar datos:", error)
        setErrors({ submit: "Hubo un error al enviar tus datos. Por favor intenta nuevamente." })
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  /**
   * Manejo del formulario cuando va solo
   */
  const handleComingAloneSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      allergies: e.target.allergies.value,
      favoriteSong: e.target.favoriteSong.value,
    }
    
    const newErrors = {}
    
    if (!data.name.trim()) newErrors.name = "Por favor ingresa tu nombre"
    
    if (!data.email && !validateEmailField(data.email)) {
      newErrors.email = "Por favor ingresa un email válido"
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    const finalData = {
      ...formData,
      mainAttendee: data
    }
    
    // Guardar en Supabase
    saveToSupabase(finalData)
      .then(() => {
        handleNextStep(STEPS.COMPLETE, { mainAttendee: data })
      })
      .catch(error => {
          setErrors({ submit: "Hubo un error al enviar tus datos. Por favor intenta nuevamente." })
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  /**
   * Manejo del paso de selección de número de acompañantes
   */
  const handleAttendeeCountSubmit = (e) => {
    e.preventDefault()
    const attendeeCount = parseInt(e.target.attendeeCount.value, 10)
    
    if (isNaN(attendeeCount) || attendeeCount < 2) {
      setErrors({ attendeeCount: "Por favor ingresa un número válido (mínimo 2)" })
      return
    }
    
    const emptyAttendees = Array(attendeeCount - 1).fill(null).map(() => ({
      name: "",
      isUnder12: false,
      allergies: "",
      favoriteSong: "",
    }))
    
    handleNextStep(STEPS.ATTENDEE_INFO, { 
      attendeeCount, 
      additionalAttendees: emptyAttendees 
    })
  }

  /**
   * Manejo del formulario cuando va acompañado
   */
  const handleAttendeeInfoSubmit = (e) => {
    e.preventDefault()
    
    // Datos del formulario
    const data = currentAttendeeIndex === 0 
      ? {
          name: e.target.name.value,
          email: e.target.email.value,
          allergies: e.target.allergies.value,
          favoriteSong: e.target.favoriteSong.value,
        }
      : {
          name: e.target.name.value,
          isUnder12: e.target.isUnder12.checked,
          allergies: e.target.allergies.value,
          favoriteSong: e.target.favoriteSong.value,
        }
    
    // Validar campos
    const newErrors = {}
    
    if (!data.name.trim()) {
      newErrors.name = "Por favor ingresa el nombre"
    }
    
    if (currentAttendeeIndex === 0 && !validateEmailField(data.email)) {
      newErrors.email = "Por favor ingresa un email válido"
    }
     
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    // Actualizar datos según el índice
    let updatedFormData = { ...formData }
    
    if (currentAttendeeIndex === 0) {
      updatedFormData.mainAttendee = data
    } else {
      const updatedAttendees = [...formData.additionalAttendees]
      updatedAttendees[currentAttendeeIndex - 1] = data
      updatedFormData.additionalAttendees = updatedAttendees
    }
    
    setFormData(updatedFormData)
    setErrors({})
    
    // Manejar navegación
    const totalAttendees = formData.attendeeCount
    const isLastAttendee = currentAttendeeIndex === totalAttendees - 1
    
    if (isLastAttendee) {
      setIsSubmitting(true)
      
      // Guardar en Supabase
      saveToSupabase(updatedFormData)
        .then(() => {
          handleNextStep(STEPS.COMPLETE)
        })
        .catch(error => {
          // Manejar específicamente el error de email duplicado
          if (error.code === '23505') {
            setErrors({ email: "Este email ya está registrado" })
          } else {
            setErrors({ submit: "Hubo un error al enviar tus datos. Por favor intenta nuevamente." })
          }
          window.scrollTo(0, 0) // Scroll al inicio para mostrar el error
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    } else {
      setCurrentAttendeeIndex(currentAttendeeIndex + 1)
      e.target.reset()
    }
  }

  return {
    handleInitialSubmit,
    handleAttendanceTypeSubmit,
    handleNotComingSubmit,
    handleComingAloneSubmit,
    handleAttendeeCountSubmit,
    handleAttendeeInfoSubmit
  }
}