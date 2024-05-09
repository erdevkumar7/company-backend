const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const port = process.env.PORT || 8080
const userRouter = require('./routes/user.router');


// build-in middlewares
app.use(bodyParser.json())
app.use(cors());

// Include routes
app.use(userRouter);

app.listen(port, (err) => {
  if (err) {
    console.log("Server Unavailable");
  } else {
    console.log(`Server Connected at ${port}....`);
  }
});