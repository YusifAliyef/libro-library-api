import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Author } from "./Author";

@Entity({ name: "books" })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 150 })
  title: string;

  @Column({ type: "varchar", length: 20, unique: true })
  isbn: string;

  
  @ManyToOne(() => Author, (author) => author.books, { onDelete: "CASCADE" })
  @JoinColumn({ name: "author_id" })
  author: Author;
}