import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class Bookmark {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    book_id: number

    @Column({ nullable: true })
    page_number: number // For PDF

    @Column({ nullable: true })
    position: string // For MD/HTML (scroll percentage or DOM path)

    @Column({ type: "text", nullable: true })
    note: string

    @CreateDateColumn()
    created_at: Date
}
