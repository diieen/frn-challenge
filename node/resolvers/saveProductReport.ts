import { json } from "co-body"

const DATA_ENTITY = "PR"

export const saveProductReport = async (ctx: Context) => {
  try {
    const body = await json(ctx.req)
    const fields = body ?? {}

    const requiredFields = ["clientName", "email", "orderId", "skuId", "message"]
    const missing = requiredFields.filter((field) => !fields[field]?.toString().trim())

    if (missing.length > 0) {
      ctx.status = 400
      ctx.body = { error: `Campos obrigatórios faltando: ${missing.join(", ")}` }
      return
    }

    const document = await ctx.clients.masterdata.createDocument({
      dataEntity: DATA_ENTITY,
      fields: {
        clientName: fields.clientName?.toString(),
        email: fields.email?.toString(),
        phone: fields.phone?.toString() || null,
        orderId: fields.orderId?.toString(),
        skuId: fields.skuId?.toString(),
        productName: fields.productName?.toString() || null,
        message: fields.message?.toString(),
      },
    })

    const documentId = document.DocumentId ?? document.Id

    if (!documentId) {
      ctx.status = 500
      ctx.body = { error: "Não foi possível criar o documento no Master Data." }
      return
    }

    ctx.status = 201
    ctx.body = { id: documentId }
  } catch (error) {
    ctx.status = 500
    ctx.body = {
      error:
        error instanceof Error
          ? error.message
          : "Erro inesperado ao processar o formulário.",
    }
  }
}
