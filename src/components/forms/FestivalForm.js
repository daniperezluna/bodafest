"use client"

import { useState, useEffect } from "react"
import { createFormHandlers } from "./submitHandlers"
import { Card, FormField, ButtonGroup } from "./FormComponents"

function FestivalForm() {
  // Constantes para los nombres de los pasos
  const STEPS = {
    INITIAL: "initial",
    ATTENDANCE_TYPE: "attendance-type",
    NOT_COMING: "not-coming",
    COMING_ALONE: "coming-alone",
    COMING_WITH_OTHERS: "coming-with-others",
    ATTENDEE_INFO: "attendee-info",
    COMPLETE: "complete"
  }

  const [step, setStep] = useState(STEPS.INITIAL)
  const [currentAttendeeIndex, setCurrentAttendeeIndex] = useState(0)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const initialFormData = {
    isAttending: "",
    attendanceType: "",
    attendeeCount: 2,
    mainAttendee: {
      name: "",
      email: "",
      allergies: "",
      favoriteSong: "",
    },
    additionalAttendees: [],
    notComing: {
      name: "",
    },
  }

  const [formData, setFormData] = useState(initialFormData)

  // Cargar datos guardados al iniciar
  useEffect(() => {
    const savedFormData = localStorage.getItem('festivalFormData')
    const savedStep = localStorage.getItem('festivalFormStep')
    const savedAttendeeIndex = localStorage.getItem('festivalFormAttendeeIndex')
    
    if (savedFormData) {
      try {
        setFormData(JSON.parse(savedFormData))
      } catch (e) {
        console.error("Error parsing saved form data:", e)
      }
    }
    
    if (savedStep) setStep(savedStep)
    if (savedAttendeeIndex) setCurrentAttendeeIndex(Number(savedAttendeeIndex))
  }, [])

  // Guardar datos cuando cambien
  useEffect(() => {
    localStorage.setItem('festivalFormData', JSON.stringify(formData))
    localStorage.setItem('festivalFormStep', step)
    localStorage.setItem('festivalFormAttendeeIndex', currentAttendeeIndex.toString())
  }, [formData, step, currentAttendeeIndex])

  // Validación de email con regex
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Generar un objeto vacío para cada nuevo acompañante
  const getEmptyAttendee = () => ({
    name: "",
    isUnder12: false,
    allergies: "",
    favoriteSong: "",
  })

  // Función para actualizar el estado y avanzar al siguiente paso
  const handleNextStep = (nextStep, updatedData = {}) => {
    setErrors({}) // Limpiar errores al cambiar de paso
    setFormData(prev => ({ ...prev, ...updatedData }))
    setStep(nextStep)
  }

  // Función para retroceder al paso anterior
  const handlePreviousStep = () => {
    setErrors({}) // Limpiar errores
    
    switch(step) {
      case STEPS.ATTENDANCE_TYPE:
        setStep(STEPS.INITIAL)
        break
      case STEPS.NOT_COMING:
        setStep(STEPS.INITIAL)
        break
      case STEPS.COMING_ALONE:
        setStep(STEPS.ATTENDANCE_TYPE)
        break
      case STEPS.COMING_WITH_OTHERS:
        setStep(STEPS.ATTENDANCE_TYPE)
        break
      case STEPS.ATTENDEE_INFO:
        if (currentAttendeeIndex === 0) {
          setStep(STEPS.COMING_WITH_OTHERS)
        } else {
          setCurrentAttendeeIndex(currentAttendeeIndex - 1)
        }
        break
      default:
        setStep(STEPS.INITIAL)
    }
  }

  const {
    handleInitialSubmit,
    handleAttendanceTypeSubmit,
    handleNotComingSubmit,
    handleComingAloneSubmit,
    handleAttendeeCountSubmit,
    handleAttendeeInfoSubmit
  } = createFormHandlers({
    formData, 
    setFormData, 
    setErrors,
    setIsSubmitting,
    handleNextStep,
    STEPS,
    currentAttendeeIndex,
    setCurrentAttendeeIndex,
    validateEmail
  })

  // Reiniciar formulario
  const resetForm = () => {
    localStorage.removeItem('festivalFormData')
    localStorage.removeItem('festivalFormStep')
    localStorage.removeItem('festivalFormAttendeeIndex')
    
    setFormData(initialFormData)
    setStep(STEPS.INITIAL)
    setCurrentAttendeeIndex(0)
    setErrors({})
  }

  const renderGeneralError = () => {
    if (errors.submit) {
      return <div className="error-banner">{errors.submit}</div>
    }
    return null
  }

  const ProgressStepper = () => {
    let currentStepIndex = 0
    let totalSteps = 2
    
    if (step === STEPS.INITIAL) {
      currentStepIndex = 0
      totalSteps = formData.isAttending === "yes" ? 3 : 2
    } else if (step === STEPS.ATTENDANCE_TYPE) {
      currentStepIndex = 1
      totalSteps = formData.attendanceType === "solo" ? 3 : 4
    } else if (step === STEPS.NOT_COMING) {
      currentStepIndex = 1
      totalSteps = 2
    } else if (step === STEPS.COMING_ALONE) {
      currentStepIndex = 2
      totalSteps = 3
    } else if (step === STEPS.COMING_WITH_OTHERS) {
      currentStepIndex = 2
      totalSteps = 4
    } else if (step === STEPS.ATTENDEE_INFO) {
      currentStepIndex = 3
      totalSteps = 4
    }
    
    return (
      <div className="progress-stepper">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{width: `${Math.max(5, (currentStepIndex / (totalSteps - 1)) * 100)}%`}} 
          />
        </div>
      </div>
    )
  }

  // Renderizado según el paso actual
  return (
    <div className={`about-section about-3`}>
      {renderGeneralError()}
      {step !== STEPS.COMPLETE && <ProgressStepper />}
      
      {step === STEPS.INITIAL && (
        <Card 
          title="Nos encantaría contar con tu presencia en nuestro bodafest"
          description=""
        >
          <form onSubmit={handleInitialSubmit}>
            <div className="radio-group">
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="isAttending" 
                  value="yes" 
                  defaultChecked={formData.isAttending === "yes"}
                />
                <span>Sí, asistiré al festival</span>
              </label>
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="isAttending" 
                  value="no" 
                  defaultChecked={formData.isAttending === "no"}
                />
                <span>No, no podré asistir</span>
              </label>
            </div>
            {errors.isAttending && <p className="error-message">{errors.isAttending}</p>}
            
            <ButtonGroup submitText="Continuar" />
          </form>
        </Card>
      )}
      
      {step === STEPS.ATTENDANCE_TYPE && (
        <Card 
          title="¡Genial que puedas venir!"
          description="¿Vienes solo o acompañado?"
        >
          <form onSubmit={handleAttendanceTypeSubmit}>
            <div className="radio-group">
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="attendanceType" 
                  value="solo" 
                  defaultChecked={formData.attendanceType === "solo"}
                />
                <span>Vengo solo</span>
              </label>
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="attendanceType" 
                  value="acompanado"
                  defaultChecked={formData.attendanceType === "acompanado"}
                />
                <span>Vengo acompañado</span>
              </label>
            </div>
            {errors.attendanceType && <p className="error-message">{errors.attendanceType}</p>}
            
            <ButtonGroup onBack={handlePreviousStep} submitText="Continuar" />
          </form>
        </Card>
      )}
      
      {step === STEPS.NOT_COMING && (
        <Card 
          title="¡Qué pena que no puedas venir!"
          description="Nos gustaría saber quién eres para registrar tu respuesta"
        >
          <form onSubmit={handleNotComingSubmit}>
            <FormField
              label="Nombre"
              name="name"
              placeholder="Tu nombre completo"
              error={errors.name}
              defaultValue={formData.notComing.name}
              required
            />
            
            <ButtonGroup 
              onBack={handlePreviousStep} 
              submitText="Enviar"
              submitting={isSubmitting}
            />
          </form>
        </Card>
      )}
      
      {step === STEPS.COMING_ALONE && (
        <Card 
          title="Información personal"
          description="Por favor completa tus datos"
        >
          <form onSubmit={handleComingAloneSubmit}>
            <FormField
              label="Nombre"
              name="name"
              placeholder="Tu nombre completo"
              error={errors.name}
              defaultValue={formData.mainAttendee.name}
              required
            />
            
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="mail@email.com"
              error={errors.email}
              defaultValue={formData.mainAttendee.email}
            />
            
            <FormField
              label="Alergias o restricciones alimentarias"
              name="allergies"
              type="textarea"
              placeholder="Indica si tienes alguna alergia o restricción alimentaria"
              defaultValue={formData.mainAttendee.allergies}
            />
            
            <FormField
              label="Canción que no puede faltar en el festival"
              name="favoriteSong"
              placeholder="Tu canción favorita"
              error={errors.favoriteSong}
              defaultValue={formData.mainAttendee.favoriteSong}
            />
            
            <ButtonGroup 
              onBack={handlePreviousStep} 
              submitText="Enviar"
              submitting={isSubmitting}
            />
          </form>
        </Card>
      )}
      
      {step === STEPS.COMING_WITH_OTHERS && (
        <Card 
          title="Número de asistentes"
          description="¿Cuántas personas asistirán incluyéndote a ti?"
        >
          <form onSubmit={handleAttendeeCountSubmit}>
            <FormField
              label="Número de asistentes"
              name="attendeeCount"
              type="number"
              min="2"
              defaultValue={formData.attendeeCount.toString()}
              error={errors.attendeeCount}
              required
            />
            
            <ButtonGroup onBack={handlePreviousStep} submitText="Continuar" />
          </form>
        </Card>
      )}
      
      {step === STEPS.ATTENDEE_INFO && (
        <Card 
          title={currentAttendeeIndex === 0 
            ? "Información del asistente principal" 
            : `Información del acompañante ${currentAttendeeIndex}`}
          description={currentAttendeeIndex === 0
            ? "Por favor completa tus datos"
            : "Por favor completa los datos de tu acompañante"}
        >
          <form onSubmit={handleAttendeeInfoSubmit}>
            <FormField
              label="Nombre"
              name="name"
              placeholder="Nombre completo"
              error={errors.name}
              defaultValue={currentAttendeeIndex === 0 
                ? formData.mainAttendee.name 
                : (formData.additionalAttendees[currentAttendeeIndex - 1]?.name || '')}
              required
            />
            
            {currentAttendeeIndex === 0 ? (
              <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="mail@email.com"
                error={errors.email}
                defaultValue={formData.mainAttendee.email}
              />
            ) : (
              <label className="checkbox-field">
                <input 
                  type="checkbox" 
                  name="isUnder12"
                  defaultChecked={
                    formData.additionalAttendees[currentAttendeeIndex - 1]?.isUnder12
                  } 
                />
                <span>Es menor de 12 años</span>
              </label>
            )}
            
            <FormField
              label="Alergias o restricciones alimentarias"
              name="allergies"
              type="textarea"
              placeholder="Indica si hay alguna alergia o restricción alimentaria"
              defaultValue={currentAttendeeIndex === 0 
                ? formData.mainAttendee.allergies 
                : (formData.additionalAttendees[currentAttendeeIndex - 1]?.allergies || '')}
            />
            
            <FormField
              label="Canción que no puede faltar en el festival"
              name="favoriteSong"
              placeholder="Canción favorita"
              error={errors.favoriteSong}
              defaultValue={currentAttendeeIndex === 0 
                ? formData.mainAttendee.favoriteSong 
                : (formData.additionalAttendees[currentAttendeeIndex - 1]?.favoriteSong || '')}
            />
            
            <ButtonGroup 
              onBack={handlePreviousStep} 
              submitText={currentAttendeeIndex < formData.attendeeCount - 1 
                ? "Siguiente acompañante" 
                : "Finalizar"}
              submitting={isSubmitting}
            />
          </form>
        </Card>
      )}
      
      {step === STEPS.COMPLETE && (
        <Card 
          title="¡Gracias por tu respuesta!"
          description={formData.isAttending === "yes"
            ? "Estamos emocionados de verte en nuestro festival"
            : "Lamentamos que no puedas asistir"}
        >
          <div className="completion-message">
            <p>Hemos registrado tu información correctamente.</p>
            {formData.isAttending === "yes" && (
              <p>Te enviaremos un recordatorio por email antes del evento.</p>
            )}
          </div>
          
          <div className="card-actions">
            <button className="btn d-inline-flex align-items-center btn-primary btn-custom-light gap-1" onClick={resetForm}>
              Volver al inicio
            </button>
          </div>
        </Card>
      )}
      
      <style jsx>{`
        .error-banner {
          background-color: #fed7d7;
          color: #c53030;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 16px;
          text-align: center;
        }

        .festival-form-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        .form-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          margin-bottom: 20px;
        }
        
        .card-header {
          padding: 1.5rem 1.5rem 0.5rem;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .card-title {
          font-size: 1.5rem;
          margin: 0 0 0.5rem;
          color: #333;
        }
        
        .card-description {
          color: #666;
          margin: 0 0 1rem;
        }
        
        form {
          padding: 1.5rem;
        }
        
        .form-field {
          margin-bottom: 1.25rem;
        }
        
        .form-field label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #333;
        }
        
        .form-field input,
        .form-field textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          transition: border 0.2s;
        }
        
        .form-field input:focus,
        .form-field textarea:focus {
          border-color: #4a2c8f;
          outline: none;
          box-shadow: 0 0 0 2px rgba(74, 44, 143, 0.2);
        }
        
        .form-field textarea {
          min-height: 100px;
          resize: vertical;
        }
        
        .radio-group {
          margin-bottom: 1.5rem;
        }
        
        .radio-option {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
          cursor: pointer;
        }
        
        .radio-option input {
          margin-right: 10px;
        }
        
        .checkbox-field {
          display: flex;
          align-items: center;
          margin-bottom: 1.25rem;
          cursor: pointer;
        }
        
        .checkbox-field input {
          margin-right: 10px;
        }
        
        .button-group {
          display: flex;
          justify-content: space-between;
          margin-top: 1.5rem;
        }
        
        .button {
          padding: 10px 16px;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: background 0.2s, transform 0.1s;
        }
        
        .button:active {
          transform: translateY(1px);
        }
        
        .button.primary {
          background: #4a2c8f;
          color: white;
          flex-grow: 1;
          margin-left: 10px;
        }
        
        .button.primary:hover {
          background: #3a2273;
        }
        
        .button.secondary {
          background: #f0f0f0;
          color: #333;
        }
        
        .button.secondary:hover {
          background: #e0e0e0;
        }
        
        .button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .error-message {
          color: #e53e3e;
          font-size: 0.875rem;
          margin-top: 0.5rem;
          margin-bottom: 0;
        }
        
        .completion-message {
          padding: 1.5rem 1.5rem 0.5rem;
          text-align: center;
        }
        
        .card-actions {
          padding: 1rem 1.5rem 1.5rem;
          display: flex;
          justify-content: center;
        }
        
        .card-actions .button {
          min-width: 140px;
        }
        
        .progress-stepper {
          margin-bottom: 1.5rem;
        }
        
        .progress-bar {
          height: 6px;
          background: #f0f0f0;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 6px;
        }
        
        .progress-fill {
          height: 100%;
          background: #4a2c8f;
          border-radius: 3px;
          transition: width 0.3s;
        }
        
        .step-count {
          font-size: 0.875rem;
          color: #666;
          text-align: right;
        }
      `}</style>
    </div>
  )
}

export default FestivalForm