export function calculateSolesExchange(args: { amount: number; purchasePrice: number }): number {
  const { amount, purchasePrice } = args

  const result = amount * purchasePrice

  return Number(result.toFixed(2))
}

export function calculateDollarExchange(args: { amount: number; salePrice: number }): number {
  const { amount, salePrice } = args

  const result = amount / salePrice

  return Number(result.toFixed(2))
}
