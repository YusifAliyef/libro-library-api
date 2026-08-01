import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/CategoryService";

export class CategoryController {
  private categoryService = new CategoryService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.categoryService.createCategory(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.categoryService.getAllCategories();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await this.categoryService.getCategoryById(id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await this.categoryService.updateCategory(id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.categoryService.deleteCategory(id);
      return res.status(200).send({ message: "Kateqoriya uğurla silindi" });
    } catch (error) {
      next(error);
    }
  };
}