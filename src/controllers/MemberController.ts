import { Request, Response } from "express";
import { MemberService } from "../services/MemberService";

export class MemberController {
  private memberService = new MemberService();

  create = async (req: Request, res: Response) => {
    try {
      const result = await this.memberService.createMember(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const result = await this.memberService.getAllMembers();
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}