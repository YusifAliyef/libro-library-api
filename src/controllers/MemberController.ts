import { Request, Response, NextFunction } from "express";
import { MemberService } from "../services/MemberService";

export class MemberController {
  private memberService = new MemberService();

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.memberService.createMember(req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.memberService.getAllMembers();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await this.memberService.getMemberById(id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const result = await this.memberService.updateMember(id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await this.memberService.deleteMember(id);
      return res.status(200).send({ message: "Üzv uğurla silindi" });
    } catch (error) {
      next(error);
    }
  };
}
