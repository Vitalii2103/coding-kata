const ItemModel = require('./models/items')
const OfferModel = require('./models/offers')

const fillItems = async () => {
  const apple = {name: 'Apple', price: 30, size: 2, specialPrice: 45}
  const banana = {name: 'Banana', price: 50, size: 3, specialPrice: 130}
  const peach = {name: 'Peach', price: 60}
  const kiwi = {name: 'Kiwi', price: 20}

  for (const item of [ apple, banana, peach, kiwi ]) {
    // @ts-ignore
    const { name, price, size, specialPrice } = item
    const fruit = await ItemModel.getItemByName(name)

    if (!fruit) {
      const createdApple = await ItemModel.storeItem({ name, price })

      if (size && specialPrice) {
        await OfferModel.createOffer({ itemId: createdApple['id'], size, specialPrice })
      }
    }
  }
}

module.exports = fillItems
