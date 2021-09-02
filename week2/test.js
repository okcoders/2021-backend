const mongoose = require('mongoose');
const { User } = require('./schemas/schemas');
const dotenv = require('dotenv');
dotenv.config();
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
  `mongodb://myDBReader:D1fficultP%40ssw0rd@mongodb0.example.com:27017/?authSource=admin`;
  await mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?authSource=admin`
  );
}
