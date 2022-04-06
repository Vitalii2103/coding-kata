const autofill = require('./autofiller')
const ShoppingCart = require('./src/lib/shoppingCart')

autofill().then(async () => {
  const cart = new ShoppingCart
  await cart.add('Apple', 4)
  await cart.add('Banana', 4)
  await cart.add('Peach', 1)
  await cart.add('Kiwi', 4)

  const calculated = cart.calculate()
  console.log(calculated)
}).catch(console.log)
