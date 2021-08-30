const mongoose = require('mongoose');
const { User } = require('./schemas/schemas');
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.DB_URI);

/* ----- Config/Init -------*/
main()
  .then(() => {
    const devon = new User({
      name: 'Devon Mobley',
      email: 'devon.mobley@gmail.com',
    });
    return devon.save();
  })
  .then((res) => {
    console.log('Result: ', res);
  })
  .catch((err) => {
    console.log('Error: ', err);
    process.exit(1);
  });

async function main() {
  await mongoose.connect();
}
