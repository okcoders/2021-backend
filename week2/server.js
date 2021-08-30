/* ----- Modules -------*/
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { User } = require('./schemas/schemas');

/* ----- Config/Init -------*/
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/okcoders');
}

const testRecords = [
  {
    name: 'Devon Mobley',
    id: 1,
    email: 'devon.mobley@gmail.com',
  },
  {
    name: 'John doe',
    id: 2,
    email: 'john.doe@gmail.com',
  },
];

const port = 5000;

/* ----- Middlewares -------*/
app.use(express.json());

/* ----- Routes -------*/
// Home
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// User Routes
app.get('/users', (req, res) => {
  res.json({
    success: true,
    data: testRecords,
  });
});

app.get('/users/:userId', (req, res) => {
  // 3 main ways - req.body, req.params, req.query
  let userData = null;
  const userId = req.params.userId;

  if (userId === '1') {
    userData = testRecords[0];
  }

  if (userId === '2') {
    userData = testRecords[1];
  }

  if (userData === null) {
    res.status(404).send();
    return;
  }

  res.json({
    success: true,
    data: userData,
    request: req.params,
  });
});

app.post('/users', (req, res) => {
  // get data
  const data = req.body;

  // validate the data
  if (!data.name || !data.email) {
    res.status(422).send();
    return;
  }

  const existingRecord = testRecords.find(
    (record) => record.email === data.email
  );
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

/* ----- Run Server -------*/
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
