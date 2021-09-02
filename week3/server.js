/* ----- Modules -------*/
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { User } = require('./schemas/schemas');

const dotenv = require('dotenv');
dotenv.config();

/* ----- Config/Init -------*/
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?authSource=admin`
  );
}

mongoose.connection.on('error', (err) => {
  console.log('err', err);
});

mongoose.connection.on('connected', (err, res) => {
  console.log('mongoose is connected');
});

const port = 5000;

/* ----- Middlewares -------*/
app.use(express.json());

/* ----- Routes -------*/
// Home
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// User Routes
app.get('/users', async (req, res) => {
  const users = await User.find({}).select('_id name email');

  res.json({
    success: true,
    users,
  });
});

app.get('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('_id name email');

    res.json({
      success: true,
      user,
    });
  } catch (e) {
    // TODO implement http 400 responses
    // if (/*not found*/) {
    //   res.status(404).send();
    //   return
    // }
    console.log(e);
    res.status(500).send();
  }
});

app.post('/users', async (req, res) => {
  // get data
  const data = req.body;

  // validate the data
  if (!data.name || !data.email) {
    res.status(422).send();
    return;
  }

  if (existingRecord) {
    res.status(409).send();
    return;
  }

  // take action on the data
  // save to the database/persistent storage
  // saveUserToDatabase(data)`

  let returnData = {
    id: 3,
    ...data,
  };

  res.status(201).send(returnData);
});

app.put('/users', async (req, res) => {});
app.patch('/users', async (req, res) => {});
app.delete('/users', async (req, res) => {});

/* ----- Run Server -------*/
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
