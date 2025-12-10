import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Book } from "./entity/Book"
import { Bookmark } from "./entity/Bookmark"
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "45.8.112.141",
    port: 3306,
    username: "iloveread",
    password: "TnSKALS35nir3Jpk",
    database: "iloveread",
    synchronize: true, // Auto-create tables for now
    logging: false,
    entities: [User, Book, Bookmark],
    migrations: [],
    subscribers: [],
})
