const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { accountController } = require('./controllers/accountController');
const { quizController } = require('./controllers/quizController');

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cors());

const uri = "mongodb://localhost:27017"; //"mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";
const dbName = "quizifyDB";

mongoose.connect(`${uri}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Endpoints
accountController(app);
quizController(app);

app.listen(4000, () => {
  console.log('[Api Startup] Api started on port 4000');
});