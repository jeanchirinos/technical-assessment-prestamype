export function fromDollarsToSoles(args: {
  amount: {
    type: 'input' | 'output'
    value: number
  }
  purchasePrice: number
}): {
  amount: number
  text: string
} {
  const { amount, purchasePrice } = args

  let result = 0

  if (amount.type === 'input') {
    result = amount.value * purchasePrice
  } else {
    result = amount.value / purchasePrice
  }

  return {
    amount: result,
    text: result.toFixed(2),
  }
}

export function fromSolesToDollars(args: {
  amount: {
    type: 'input' | 'output'
    value: number
  }
  salePrice: number
}): {
  amount: number
  text: string
} {
  const { amount, salePrice } = args

  let result = 0

  if (amount.type === 'input') {
    result = amount.value / salePrice
  } else {
    result = amount.value * salePrice
  }

  return {
    amount: result,
    text: result.toFixed(2),
  }
}
