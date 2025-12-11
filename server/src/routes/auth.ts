import { Router, Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_change_me';

router.post('/register', async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: "Username and password required" });
            return;
        }

        const userRepository = AppDataSource.getRepository(User);
        const existingUser = await userRepository.findOneBy({ username });

        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const password_hash = await bcrypt.hash(password, 10);
        const user = new User();
        user.username = username;
        user.password_hash = password_hash;

        await userRepository.save(user);

        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ username });

        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user.id, username: user.username } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
