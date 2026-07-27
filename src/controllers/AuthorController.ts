import { Request, Response, NextFunction } from "express";
import { AuthorService } from "../services/AuthorService";

export class AuthorController {
  private authorService = new AuthorService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authorService.createAuthor(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authorService.getAllAuthors();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await this.authorService.getAuthorById(id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await this.authorService.updateAuthor(id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.authorService.deleteAuthor(id);
      return res.status(200).send({ message: "Yazıçı uğurla silindi" });
    } catch (error) {
      next(error);
    }
  };
}
