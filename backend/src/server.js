import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import auth from './routes/auth.js';
import book from './routes/book.js';
import cors from 'cors';

// Load environment variables
dotenv.config({
    path: './.env'
});

// Initialize express
const app = express();

// CORS configuration
const allowedOrigins = [
    "http://localhost:5173",
    "https://collage-hall-portal-g5x7.vercel.app/login"  // Your Vercel URL
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
});

// API Routes
app.use("/api/auth", auth);
app.use("/api", book);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'success',
        message: 'Server is healthy',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        status: 'error',
        message: 'Route not found',
        path: req.originalUrl,
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {},
        timestamp: new Date().toISOString()
    });

    // Handle CORS errors
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            status: 'error',
            message: 'Not allowed by CORS',
            timestamp: new Date().toISOString()
        });
    }

    // Handle other errors
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        timestamp: new Date().toISOString()
    });
});

// Start the server
const startServer = async () => {
    try {
        // Wait for the database connection
        await connectDB();
        
        const PORT = process.env.PORT || 5000;
        
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
        });

        // Handle server errors
        server.on('error', (error) => {
            console.error('Server error:', error);
            process.exit(1);
        });

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (err) => {
            console.error('Unhandled Rejection:', err);
            server.close(() => process.exit(1));
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Start the server
startServer();