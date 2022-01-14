export const WalletInvoiceFactory = (walletId: WalletId): WalletInvoiceFactory => {
  const createForSelf =
    (registeredInvoice: RegisteredInvoice) =>
    (fiat: FiatAmount | null): WalletInvoice => ({
      paymentHash: registeredInvoice.invoice.paymentHash,
      walletId,
      selfGenerated: true,
      pubkey: registeredInvoice.pubkey,
      paid: false,
      fiat,
    })

  const createForRecipient =
    (registeredInvoice: RegisteredInvoice) =>
    (fiat: FiatAmount | null): WalletInvoice => ({
      paymentHash: registeredInvoice.invoice.paymentHash,
      walletId,
      selfGenerated: false,
      pubkey: registeredInvoice.pubkey,
      paid: false,
      fiat,
    })

  return {
    createForSelf,
    createForRecipient,
  }
}
