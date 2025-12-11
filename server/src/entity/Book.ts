import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ nullable: true })
    author: string

    @Column()
    file_path: string

    @Column()
    file_type: string // 'pdf', 'md', 'epub', etc.

    @Column({ nullable: true })
    cover_image: string

    @Column()
    uploader_id: number

    @CreateDateColumn()
    created_at: Date
}
