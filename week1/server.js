// import modules
const express = require('express');
const app = express();

const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {
  res.json({
    success: true,
    data: [
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
    ],
  });
});

app.get('/users/:userId', (req, res) => {
  // 3 main ways - req.body, req.params, req.query
  let userData = null;
  const userId = req.params.userId;

  if (userId === '2') {
    userData = {
      name: 'Devon Mobley',
      id: 1,
      email: 'devon.mobley@gmail.com',
    };
  }
  console.log(typeof userId);
  if (userId === '2') {
    userData = {
      name: 'John doe',
      id: 2,
      email: 'john.doe@gmail.com',
    };
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

app.post('/', (req, res) => {
  // interact with request
  // ex. receive data
  // validate information
  // check auth
  // send back response
});

/*
 Create ~~ POST
 Read ~~ GET
 Update ~~ PUT/PATCH
 Delete ~~ DELETE
*/

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
// export OR start a server
