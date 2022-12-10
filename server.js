const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const dbCon = require('./config/db');


app.use(express.json());
app.use(cors());
dbCon;

app.use('/items', require('./routes/items'));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
