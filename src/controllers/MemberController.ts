import { Request, Response } from "express";
import { MemberService } from "../services/MemberService";

export class MemberController {
  private memberService = new MemberService();

  create = async (req: Request, res: Response) => {
    try {
      const result = await this.memberService.createMember(req.body);
      return res.status(201).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const result = await this.memberService.getAllMembers();
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  findOne = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await this.memberService.getMemberById(id);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await this.memberService.updateMember(id, req.body);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.memberService.deleteMember(id);
      return res.status(200).send({ message: "Üzv uğurla silindi" });
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  };
}
