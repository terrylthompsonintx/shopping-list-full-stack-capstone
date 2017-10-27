const express = require('express');
//const morgan = require('morgan');
//const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 8080);