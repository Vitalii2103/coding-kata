import { ShoppingCartEntry } from "./shoppingCart"
import { OfferProps } from "../../models/offers";

export interface CalculatorResultItem {
  name: string,
  price: number,
  size: number,
  discount?: number,
  priceAfterDiscount?: number
}

export interface CalculatorResult {
  items: Array<CalculatorResultItem>,
  total: number
}

const Calculator = (entries: Array<ShoppingCartEntry>): CalculatorResult => {
  const result: CalculatorResult = {
    items: [], total: 0
  }

  entries.forEach((entry: ShoppingCartEntry) => {
    const { item: { name, price }, offers, size } = entry
    let record: CalculatorResultItem = { name, price: (price * size), size }
    let discount = 0
    let sizeToOffer = size

    offers.sort((a: OfferProps, b: OfferProps) => {
      if (a.size > b.size) {
        return -1
      } else if (a.size < b.size) {
        return 1
      }
      return 0
    }).forEach((offer: OfferProps) => {
      while (sizeToOffer >= offer.size) {
        sizeToOffer -= offer.size
        discount += (price * offer.size) - offer.specialPrice
      }
    })

    if (discount > 0) {
      const priceAfterDiscount = (record.price - discount)
      record['discount'] = discount
      record['priceAfterDiscount'] = priceAfterDiscount
      result['total'] += priceAfterDiscount
    } else {
      result['total'] += record.price
    }

    result.items.push(record)
  })

  return result
}

module.exports = Calculator
