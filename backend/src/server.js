import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; 
import notesRoutes from './routes/notesRoutes.js'; 
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import path from 'path';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();


app.use(express.json());

if(process.env.NODE_ENV !== 'production') {
  app.use(cors
  ({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));
  app.use(rateLimiter);
}


// app.use((req, res, next) => {
//   console.log("We got a new request!");
//   next();
// });

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', "dist", "index.html"));
  });
}


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Database connection failed:", error);
});
<<<<<<< HEAD
=======

>>>>>>> dac1e2e43053b73358308c881018221cd45e8f71
