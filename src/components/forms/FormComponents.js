export const Card = ({ children, title, description }) => (
  <div className="form-card">
    {title && (
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        {description && <p className="card-description">{description}</p>}
      </div>
    )}
    {children}
  </div>
)

export const FormField = ({ label, name, type = "text", placeholder, error, defaultValue = "", ...rest }) => (
  <div className="form-field mb-4">
    <label htmlFor={name}>{label}</label>
    {type === "textarea" ? (
      <textarea 
        id={name}
        name={name}
        className="form-control"
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...rest}
      />
    ) : (
      <input 
        id={name}
        name={name}
        type={type}
        className="form-control"
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...rest}
      />
    )}
    {error && <p className="error-message">{error}</p>}
  </div>
)

export const ButtonGroup = ({ onBack, onSubmit, submitText = "Continuar", submitting = false }) => (
  <div className="button-group d-flex py-20 gap-20">
    {onBack && (
      <button 
        type="button" 
        onClick={onBack} 
        className="btn d-inline-flex align-items-center btn-secondary btn-custom-dark gap-1"
        disabled={submitting}
      >
        Atrás
      </button>
    )}
    <button 
      type="submit" 
      className="btn d-inline-flex align-items-center btn-primary btn-custom-light gap-1" 
      disabled={submitting}
    >
      {submitting ? "Enviando..." : submitText}
    </button>
  </div>
)