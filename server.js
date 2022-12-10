const express=require('express');
const app=express();
require('dotenv').config();
const dbCon = require('./config/db');
const itemsRouter = require('./routes/itemRoutes')

app.use(express.json());

dbCon;

app.use("/item", itemsRouter);

const port = process.env.PORT;
app.listen(port,()=> console.log(`Server is running on port ${port}`))