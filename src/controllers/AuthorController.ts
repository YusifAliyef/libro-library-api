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

  findOne = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await this.authorService.getAuthorById(id);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await this.authorService.updateAuthor(id, req.body);
      return res.status(200).json(result); 
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.authorService.deleteAuthor(id);
      return res.status(200).send({ message: "Yazıçı uğurla silindi" });
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  };
}
