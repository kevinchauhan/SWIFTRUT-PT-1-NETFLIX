import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import auth from './routes/auth.js';
import movie from './routes/movie.js';
import tv from './routes/tv.js';
import search from './routes/search.js';
import db from './config/db.js';
import authenticate from './middlewares/authenticate.js';

const app = express();

db()
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    credentials: true, // Allows cookies to be sent and received
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(helmet());
app.use(cookieParser());

app.use("/api/auth", auth);
app.use("/api/movie", movie);
app.use("/api/tv", authenticate, tv);
app.use("/api/search", authenticate, search);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

export default app;
