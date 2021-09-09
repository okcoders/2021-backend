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
  // default case
  const paramsObject = {};

  const { is_active, name } = req.query;
  const activeFlagIsDefined = is_active !== undefined;
  const nameParamIsDefined = name !== undefined;

  console.log('>>>>', is_active, '<<<<');
  console.log(name);

  // check query parameters case
  if (activeFlagIsDefined) {
    if (is_active === 'false') {
      paramsObject.isActive = false;
    } else {
      paramsObject.isActive = true;
    }
  }

  // go and try
  if (nameParamIsDefined) {
    paramsObject.name = { $regex: name, $options: 'i' };
  }
  // also try limit and sort

  // execute query
  const users = await User.find(paramsObject).select('_id name email isActive');

  res.json({
    success: true,
    users,
    query: paramsObject,
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
  try {
    // get data
    const data = req.body;

    // take action on the data
    // save to the database/persistent storage
    let returnData = await User.create(data);
    res.status(201).send(returnData);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      res.status(422).send();
      return;
    }

    // TODO implement duplicate record error
    // if (existingRecord) {
    //   res.status(409).send();
    //   return;
    // }

    res.status(500).json(e);
  }
});

// app.put('/users', async (req, res) => {});
app.patch('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // get data
    const data = req.body;

    // take action on the data
    // save to the database/persistent storage
    let returnData = await User.findByIdAndUpdate(userId, data);
    res.send(returnData);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

app.delete('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const returnData = await User.findByIdAndUpdate(userId, {
      isActive: false,
    });
    res.send(returnData);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

/* ----- Run Server -------*/
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
