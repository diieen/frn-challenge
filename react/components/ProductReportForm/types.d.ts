type FormState = {
  clientName: string
  email: string
  phone: string
  orderId: string
  skuId: string
  productName: string
  message: string
  file: File | null
}

type Status = 'idle' | 'loading' | 'success' | 'error'

type SubmitState = {
  status: Status
  errorMessage: string
}

type SubmitAction = {
  form: FormState
}