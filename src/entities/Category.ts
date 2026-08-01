import { Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import { Book } from "./Book";

@Entity({name: "categories"})
export class Category{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type:"varchar", length:100, unique:true})
    name!: string;
    

    @ManyToMany(()=>Book, (book)=>book.categories)
    books!: Book[];
}