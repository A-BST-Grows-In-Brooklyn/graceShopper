const {green, red} = require('chalk')
const db = require('../server/db/db')
const {User, Slime, Cart} = require('../server/db/models')
const faker = require('faker')

function generateSlimes() {
  let slimes = []
  for (let i = 0; i < 100; i++) {
    slimes.push({
      name: faker.commerce.productName(), // or faker.commerce.productName()
      color: faker.random.arrayElement([
        'red',
        'orange',
        'yellow',
        'purple',
        'blue',
        'pink'
      ]),
      texture: faker.random.arrayElement(['cloud', 'jelly', 'foam', 'butter']),
      price: faker.commerce.price(1.0, 100.0, 2),
      quantity: faker.random.number(100),
      //imgURL: faker.random.image()
      imgURL: faker.random.arrayElement([
        'https://www.thesprucecrafts.com/thmb/7OZW2YwWnMAud9M1faNCk3oGhmk=/736x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Item1FluffySlime-5b2eef9aff1b780037e47490.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/61LKtry2iOL._AC_SL1200_.jpg',
        'https://i.pinimg.com/originals/fc/e2/d9/fce2d9b96bddb3a3038f51da9556559d.jpg',
        'https://www.stuckonyou.media/blog/wp-content/uploads/2017/09/Plain-slime.jpg',
        'https://www.thesprucecrafts.com/thmb/wLz6UVgDbXpjy4x7kzAGMlFOZmc=/650x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Item7ChocolateSlime-5b2ef2a843a1030036b8f9d7.jpg',
        'https://www.thesprucecrafts.com/thmb/-lXv6X6PWxG-FAiDk3Ih8M_gZe0=/650x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Item5UnicornSlime-5b2ef17f3de42300364746d4.jpg',
        'https://www.thesprucecrafts.com/thmb/PKfuszB55JwSjL4l-v3gqzDZPC4=/700x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Item2GlitterGlueSlime-5b2ef02ea474be0036d31558.jpg',
        'https://www.somewhatsimple.com/wp-content/uploads/2018/06/diy-homemade-how-to-make-blue-and-pink-glitter-slime-easy-tutorial-for-kids.png'
      ])
    })
  }
  return slimes
}

let slimesArray = generateSlimes()

function generateUsers() {
  let users = []
  for (let i = 0; i < 100; i++) {
    users.push({
      email: faker.internet.email(),
      password: faker.internet.password(),
      admin: faker.random.boolean(10)
    })
  }
  return users
}

let usersArray = generateUsers()

function generateCarts() {
  let carts = []
  for (let i = 0; i < 100; i++) {
    carts.push({
      userId: faker.random.number(100),
      slimeId: faker.random.number(100),
      quantity: faker.random.number(5)
    })
  }
  return carts
}

let cartsArray = generateCarts()

const seed = async () => {
  try {
    await db.sync({force: true})

    await Promise.all(
      slimesArray.map(slime => {
        return Slime.create(slime)
      })
    )

    await Promise.all(
      usersArray.map(user => {
        return User.create(user)
      })
    )

    await Promise.all(
      cartsArray.map(cart => {
        return Cart.create(cart)
      })
    )
  } catch (error) {
    console.log(red(error))
  }
}

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
