import { Router, Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';

const router = Router();
const uploadDir = path.join(process.cwd(), 'books');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
      // Keep original name but prepend timestamp to avoid collisions
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_change_me';

// Middleware to check auth
const authenticate = (req: any, res: Response, next: any) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

router.post('/upload', authenticate, upload.single('file'), async (req: any, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }

        const { title, author } = req.body;
        const fileType = path.extname(req.file.originalname).replace('.', '').toLowerCase();

        const book = new Book();
        book.title = title || req.file.originalname;
        book.author = author || 'Unknown';
        book.file_path = req.file.filename; // Store only filename, relative to books dir
        book.file_type = fileType;
        book.uploader_id = req.user.userId;

        await AppDataSource.getRepository(Book).save(book);

        res.status(201).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error uploading book" });
    }
});

router.get('/', authenticate, async (req: Request, res: Response) => {
    try {
        const books = await AppDataSource.getRepository(Book).find({
            order: { created_at: "DESC" }
        });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// Serve file content
router.get('/:id/content', authenticate, async (req: Request, res: Response): Promise<void> => {
    try {
        const bookId = parseInt(req.params.id);
        const book = await AppDataSource.getRepository(Book).findOneBy({ id: bookId });

        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }

        const absolutePath = path.join(uploadDir, book.file_path);

        if (!fs.existsSync(absolutePath)) {
            res.status(404).json({ message: "File not found on server" });
            return;
        }

        res.sendFile(absolutePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error serving file" });
    }
});


export default router;
