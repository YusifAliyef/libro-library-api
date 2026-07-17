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
  findOne = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await this.bookService.getBookById(id);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await this.bookService.updateBook(id, req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.bookService.deleteBook(id);
      return res.status(200).send({ message: "Kitab uğurla silindi" });
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  };
}
