import { FALLBACK_PURCHASE_PRICE, FALLBACK_SALE_PRICE } from '@/constants/values'
import { fromDollarsToSoles, fromSolesToDollars } from '../../src/services/calculateExchange'

describe('calculateExchange service', () => {
  describe('fromDollarsToSoles', () => {
    it('should convert input dollars to soles correctly', () => {
      const result = fromDollarsToSoles({
        amount: { type: 'input', value: 1000 },
        purchasePrice: FALLBACK_PURCHASE_PRICE,
      })

      expect(result).toEqual({
        amount: 3768,
        text: '3768.00',
      })
    })

    it('should convert output dollars to soles correctly', () => {
      const result = fromDollarsToSoles({
        amount: { type: 'output', value: 3768 },
        purchasePrice: FALLBACK_PURCHASE_PRICE,
      })
      expect(result).toEqual({
        amount: 1000,
        text: '1000.00',
      })
    })
  })

  describe('fromSolesToDollars', () => {
    it('should convert input soles to dollars correctly', () => {
      const result = fromSolesToDollars({
        amount: { type: 'input', value: 1000 },
        salePrice: FALLBACK_SALE_PRICE,
      })
      expect(result).toEqual({
        amount: 263.9218791237794,
        text: '263.92',
      })
    })

    it('should convert output soles to dollars correctly', () => {
      const result = fromSolesToDollars({
        amount: { type: 'output', value: 263.92 },
        salePrice: FALLBACK_SALE_PRICE,
      })
      expect(result).toEqual({
        amount: 999.9928800000001,
        text: '999.99',
      })
    })
  })
})
