const Calculator = require('../src/lib/calculator')

describe('Calculator', () => {
  it('Will calculate shop cart items with discount correctly', async () => {
    const calculated = Calculator([{
      item: { name: 'Apple', price: 40 },
      offers: [{ size: 3, specialPrice: 99 }],
      size: 4
    }])

    expect(calculated).toEqual({
      items: [{
        name: 'Apple',
        price: 160,
        size: 4,
        discount: 21,
        priceAfterDiscount: 139
      }],
      total: 139
    })
  })
})
