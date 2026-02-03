import React from "react";
import "./UI.css";

/**
 * PUBLIC_INTERFACE
 * Simple card container.
 */
export function Card({ title, subtitle, children, actions }) {
  return (
    <section className="Card">
      {(title || subtitle || actions) && (
        <header className="CardHeader">
          <div className="CardHeadText">
            {title && <h3 className="CardTitle">{title}</h3>}
            {subtitle && <p className="CardSubtitle">{subtitle}</p>}
          </div>
          {actions && <div className="CardActions">{actions}</div>}
        </header>
      )}
      <div className="CardBody">{children}</div>
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * Small status pill.
 */
export function StatusPill({ tone = "info", children }) {
  return <span className={`Pill Pill-${tone}`}>{children}</span>;
}

/**
 * PUBLIC_INTERFACE
 * Text input field with label and help/error text.
 */
export function Field({ label, help, error, ...inputProps }) {
  const id = inputProps.id || inputProps.name;
  return (
    <div className="Field">
      {label && (
        <label className="FieldLabel" htmlFor={id}>
          {label}
        </label>
      )}
      <input className="FieldInput" {...inputProps} />
      {error ? <div className="FieldError">{error}</div> : help ? <div className="FieldHelp">{help}</div> : null}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Loading skeleton / indicator.
 */
export function Loading({ label = "Loading..." }) {
  return (
    <div className="Loading" role="status" aria-live="polite">
      <div className="LoadingSpinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Error banner component.
 */
export function ErrorBanner({ title = "Something went wrong", error, onRetry }) {
  const details = error?.details ? JSON.stringify(error.details) : error?.message;
  return (
    <div className="ErrorBanner" role="alert">
      <div className="ErrorBannerTitle">{title}</div>
      {details && <pre className="ErrorBannerDetails">{details}</pre>}
      {onRetry && (
        <button className="Btn BtnPrimary" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
