import React from 'react'
import { Alert } from 'vtex.styleguide'

type FormAlertProps = {
  status: Status
  message: string
  onClose: () => void
}

export const FormAlert = ({ status, message, onClose }: FormAlertProps) => {
  if (status === 'success') {
    return (
      <Alert type="success" onClose={onClose}>
        Enviado com sucesso! Recebemos seu relato.
      </Alert>
    )
  }

  if (status === 'error' && message) {
    return (
      <Alert type="error" onClose={onClose}>
        {message}
      </Alert>
    )
  }

  return null
}