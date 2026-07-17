import { Request, Response } from "express";
import { AuthorService } from "../services/AuthorService";

export class AuthorController {
  private authorService = new AuthorService();

  create = async (req: Request, res: Response) => {
    try {
      const result = await this.authorService.createAuthor(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const result = await this.authorService.getAllAuthors();
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}