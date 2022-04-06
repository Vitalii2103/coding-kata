import { ItemProps } from "../../models/items"
import { OfferProps } from "../../models/offers"
const { getItemByName } = require('../../models/items')
const { getItemOffers } = require('../../models/offers')

interface ShoppingCartEntry {
  item: ItemProps,
  offers: Array<OfferProps>,
  size: number
}

class ShoppingCart {
  private entries: Array<ShoppingCartEntry> = []

  private findEntry(name: string): ShoppingCartEntry|undefined {
    return this.entries.find(entry => (entry as any)['name'] === name)
  }

  async add(name: string, size: number): Promise<boolean> {
    if (size > 0) {
      const entry: ShoppingCartEntry|undefined = this.findEntry(name)

      if (entry) {
        entry.size += size
        return true
      } else {
        const item: ItemProps|undefined = await getItemByName(name)

        if (item) {
          const offers: Array<OfferProps> = await getItemOffers(item['id'])
          this.entries.push({ item, offers, size })
          return true
        }
      }
    }

    return false
  }

  async remove(name: string, size: number): Promise<boolean> {
    if (size > 0) {
      const entry: ShoppingCartEntry|undefined = this.findEntry(name)

      if (entry) {
        entry.size -= size

        if (entry.size < 1) {
          return await this.deletePosition(name)
        }

        return true
      }
    }

    return false
  }

  async deletePosition(name: string): Promise<boolean> {
    this.entries = this.entries.filter(entry => (entry as any)['name'] !== name)
    return !this.findEntry(name)
  }
}

module.exports = ShoppingCart
