import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; 
import notesRoutes from './routes/notesRoutes.js'; 
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors
({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(rateLimiter);


// app.use((req, res, next) => {
//   console.log("We got a new request!");
//   next();
// });

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Database connection failed:", error);
});


//password: LtbX02zpfJvWwJPZ