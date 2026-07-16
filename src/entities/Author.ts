import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Book } from "./Book";

@Entity({ name: "authors" })
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "text", nullable: true })
  biography: string;

  @OneToMany(() => Book, (book) => book.author, { cascade: true })
  books: Book[];
}
