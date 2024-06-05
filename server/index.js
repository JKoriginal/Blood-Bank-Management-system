import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import bloodCampRouter from './routes/bloodCampRoutes.js'
import bloodRequestRouter from './routes/bloodRequestRoutes.js'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import bloodStockRouter from './routes/bloodStockRoutes.js'
import sendMail from './routes/sendMailRoutes.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const port = process.env.PORT;


// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
  
app.use(cookieParser());

// Routes
app.use('/bloodCamp', bloodCampRouter);
app.use('/bloodRequest', bloodRequestRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/bloodStock', bloodStockRouter);
app.use('/mail', sendMail);

// Start server
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
