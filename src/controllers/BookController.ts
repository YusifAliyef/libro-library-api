import { Request, Response } from "express";
import { BookService } from "../services/BookService";

export class BookController {
  private bookService = new BookService();

  create = async (req: Request, res: Response) => {
    try {
      const result = await this.bookService.createBook(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const result = await this.bookService.getAllBooks();
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}