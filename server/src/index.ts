import express from 'express';
import cors from 'cors';
import { AppDataSource } from "./data-source"
import authRoutes from "./routes/auth"
import bookRoutes from "./routes/books"
import path from 'path';

const app = express();
const PORT = process.env.PORT || 39301;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Static serve for covers if needed, but we are using an API for content
// app.use('/books', express.static(path.join(__dirname, '../books')));

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
