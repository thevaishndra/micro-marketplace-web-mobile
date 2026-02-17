import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

dotenv.config({
    path: './.env'
})

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is running");
})

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection err:", err);
  });

//create express app
//connect to mongodb
//start server
//load dotenv
//add cors