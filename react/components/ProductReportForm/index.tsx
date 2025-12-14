import React, { ChangeEvent, useState } from 'react'
import { Button, Input, Textarea } from 'vtex.styleguide'
import { FormAlert } from './components/FormAlert'
import { FormHeader } from './components/FormHeader'
import { formatPhone } from './utils/formatPhone'

import styles from './style.css'

const initialFormState: FormState = {
  clientName: '',
  email: '',
  phone: '',
  orderId: '',
  skuId: '',
  productName: '',
  message: '',
  file: null,
}

const ProductReportForm: StorefrontFunctionComponent = () => {
  const [form, setForm] = useState<FormState>(initialFormState)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (field: keyof FormState) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value

    if (field === 'phone') {
      return setForm((prev) => ({
        ...prev,
        phone: formatPhone(value),
      }))
    }

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setErrorMessage('')

    try {
      setStatus('loading')

      const payload = {
        clientName: form.clientName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        orderId: form.orderId.trim(),
        skuId: form.skuId.trim(),
        productName: form.productName.trim(),
        message: form.message.trim(),
      }

      const response = await fetch('/_v/save-product-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorJson = await response.json().catch(() => null)
        const errorMessage = errorJson?.error || 'Ocorreu um erro ao enviar o formulário.'
        throw new Error(errorMessage)
      }

      setStatus('success')
      setForm(initialFormState)
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao enviar o formulário. Tente novamente.'
      )
    }
  }

  const handleAlertClose = () => {
    setStatus('idle')
    setErrorMessage('')
  }

  return (
    <section className="w-100 mb10">
      <div className={`${styles.card} bg-base pa8 br3`}>
        <FormHeader />

        <FormAlert status={status} message={errorMessage} onClose={handleAlertClose} />

        <form className="mt4" onSubmit={handleSubmit}>
          <div className="flex-ns flex-wrap">
            <div className="w-100 w-50-ns pr0 pr4-ns">
              <div className="mb4">
                <Input
                  label="Nome completo *"
                  value={form.clientName}
                  placeholder="Digite seu nome"
                  onChange={handleInputChange('clientName')}
                  required
                />
              </div>

              <div className="mb4">
                <Input
                  type="email"
                  label="E-mail *"
                  value={form.email}
                  placeholder="voce@email.com"
                  onChange={handleInputChange('email')}
                  required
                />
              </div>

              <div className="mb4">
                <Input
                  label="Telefone"
                  value={form.phone}
                  placeholder="(11) 99999-9999"
                  onChange={handleInputChange('phone')}
                  maxLength={15}
                />
              </div>

              <div className="mb4">
                <Input
                  label="Número do pedido (orderId) *"
                  value={form.orderId}
                  placeholder="Ex: 123456789"
                  onChange={handleInputChange('orderId')}
                  required
                />
              </div>

              <div className="mb4">
                <Input
                  label="SKU / EAN *"
                  value={form.skuId}
                  placeholder="Ex: 12345"
                  onChange={handleInputChange('skuId')}
                  required
                />
              </div>

              <div className="mb4">
                <Input
                  label="Nome do produto"
                  value={form.productName}
                  placeholder="Opcional"
                  onChange={handleInputChange('productName')}
                />
              </div>
            </div>

            <div className="w-100 w-50-ns pl0 pl4-ns">
              <div className="mb4">
                <Textarea
                  label="Mensagem *"
                  value={form.message}
                  placeholder="Explique o problema encontrado"
                  onChange={handleInputChange('message')}
                  required
                  rows={6}
                />
              </div>
            </div>
          </div>

          <div className="mt5 flex items-center">
            <Button type="submit" variation="primary" isLoading={status === 'loading'}>
              {status === 'loading' ? 'Enviando...' : 'Enviar'}
            </Button>
            <span className="t-small c-muted-1 ml3">
              Todos os campos marcados com * são obrigatórios.
            </span>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ProductReportForm
