
const express = require("express");
const bodyParser = require('body-parser')
const v1Router = require('./src/routes/routerIndex.js')

const app = express();

global.__basedir = __dirname;

//dotenv.config();

app.use(bodyParser.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + 'public'));
app.use('/images', express.static(__dirname + '/images'));
app.use("/", v1Router)



let port = 3000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});