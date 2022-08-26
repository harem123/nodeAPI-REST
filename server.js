const express = require("express");
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true }));





let port = 3000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});