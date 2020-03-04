const {green, red} = require('chalk')
const db = require('../server/db/db')
const {User, Slime, Cart} = require('../server/db/models')
const faker = require('faker')

function generateSlimes() {
  let slimes = []
  for (let i = 0; i < 100; i++) {
    slimes.push({
      name: faker.commerce.productName(),
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
      password: 'password',
      admin: faker.random.boolean(10)
    })
  }
  return users
}

let usersArray = generateUsers()

const seed = async () => {
  try {
    await db.sync({force: true})

    let createdSlimes = await Promise.all(
      slimesArray.map(slime => {
        return Slime.create(slime)
      })
    )

    let createdUsers = await Promise.all(
      usersArray.map(user => {
        return User.create(user)
      })
    )

    for (let i = 0; i < 20; i++) {
      // await createdUsers[i].addSlime(faker.random.arrayElement(createdSlimes))
      let randomUser = faker.random.arrayElement(createdUsers)
      let randomSlime = faker.random.arrayElement(createdSlimes)

      await randomUser.addSlime(randomSlime)
    }

    // if the cart table already contains a row that has createdUsers[i] and the randomly
    // chosen createdSlimes from the array, up the quantity at that row
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

// const {green, red} = require('chalk')
// const db = require('../server/db/db')
// const {User, Slime, Cart} = require('../server/db/models')

// const slimes = [
//   {
//     name: 'Rose Whip',
//     color: 'pink',
//     texture: 'butter',
//     price: 13.99,
//     quantity: 60,
//     imgURL:
//       'https://cdn.shopify.com/s/files/1/0023/9514/4236/products/Facetune_28-02-2020-16-48-38_grande.jpg?v=1582979807'
//   },
//   {
//     name: 'Blue Moon Crunch',
//     color: 'blue',
//     texture: 'foam',
//     price: 13.99,
//     quantity: 150,
//     imgURL:
//       'https://cdn.shopify.com/s/files/1/0023/9514/4236/products/Facetune_17-01-2020-09-20-07_1024x1024.jpg?v=1579954887'
//   },
//   {
//     name: 'Space Cat',
//     color: 'purple',
//     texture: 'cloud',
//     price: 14.99,
//     quantity: 60,
//     imgURL:
//       'https://cdn.shopify.com/s/files/1/0023/9514/4236/products/Space_Cat_Cloud_grande.jpg?v=1576931153'
//   },
//   {
//     name: 'Baja Jelly',
//     color: 'blue',
//     texture: 'jelly',
//     price: 13.99,
//     quantity: 200,
//     imgURL:
//       'https://cdn.shopify.com/s/files/1/0023/9514/4236/products/image_271f18bd-d651-4f97-bf58-50f3ef1c4c46_grande.jpg?v=1582978918'
//   }
// ]

// const slimeMomma = (name, color, texture, price, number) => {
//   let slimeArray = []
//   let i = 0
//   while (i < number) {
//     i++
//     slimeArray = [
//       ...slimeArray,
//       {name: name, color: color, texture: texture, price: price}
//     ]
//   }
//   return slimeArray
// }

// const slimeArray = slimeMomma('ultraviolet', 'purple', 'jelly', 5.5, 10)

// const userCreator = (email, password, number) => {
//   let userArray = []
//   let i = 0
//   while (i < number) {
//     i++
//     userArray = [
//       ...userArray,
//       {email: `${email}${i}@slime.org`, password: password}
//     ]
//   }
//   return userArray
// }

// const userArray = userCreator('notAdmin', 'password', 10)

// const adminArray = [
//   {email: 'admin@slime.org', password: 'password', admin: 'true'}
// ]

// const carts = [
//   {userId: 1, slimeId: 2, quantity: 3},
//   {userId: 1, slimeId: 4, quantity: 2},
//   {userId: 1, slimeId: 1, quantity: 1},
//   {userId: 2, slimeId: 1, quantity: 1},
//   {userId: 4, slimeId: 4, quantity: 4},
//   {userId: 4, slimeId: 2, quantity: 4},
//   {userId: 4, slimeId: 1, quantity: 4}
// ]

// const seed = async () => {
//   try {
//     await db.sync({force: true})

//     await Promise.all(
//       slimes.map(slime => {
//         return Slime.create(slime)
//       })
//     )

//     await Promise.all(
//       slimeArray.map(slime => {
//         return Slime.create(slime)
//       })
//     )

//     await Promise.all(
//       userArray.map(user => {
//         return User.create(user)
//       })
//     )

//     await Promise.all(
//       adminArray.map(admin => {
//         return User.create(admin)
//       })
//     )

//     await Promise.all(
//       carts.map(cart => {
//         return Cart.create(cart)
//       })
//     )
//   } catch (err) {
//     console.log(red(err))
//   }
// }

// module.exports = seed
// // If this module is being required from another module, then we just export the
// // function, to be used as necessary. But it will run right away if the module
// // is executed directly (e.g. `node seed.js` or `npm run seed`)
// if (require.main === module) {
//   seed()
//     .then(() => {
//       console.log(green('Seeding success!'))
//       db.close()
//     })
//     .catch(err => {
//       console.error(red('Oh noes! Something went wrong!'))
//       console.error(err)
//       db.close()
//     })
// }
