import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from "typeorm";
import { Author } from "./Author";
import { Category } from "./Category";

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

  @ManyToMany(() => Category, (category) => category.books, { cascade: true })
  @JoinTable({
    name: "book_categories",
    joinColumn: { name: "book_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "category_id", referencedColumnName: "id" },
  })
  categories!: Category[];
}
