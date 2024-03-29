import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express();
const cors=require('cors');

app.use(cors({
  origin:"https://memorizan.netlify.app",
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
}
));

dotenv.config();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))


app.use('/posts', postRoutes);
app.use('/user',userRoutes);

app.get('/',(req,res)=>{
  res.send('Welcome to Memorieskb API');
});
const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
