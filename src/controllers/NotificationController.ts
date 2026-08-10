import { Request, Response, NextFunction } from "express";
import { EmailService } from "../utils/emailService";
import { SendEmailDto } from "../dtos/SendEmailDto";

export class NotificationController {
  sendEmailNotification = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, subject, message }: SendEmailDto = req.body;

      if (!email || !subject || !message) {
        return res
          .status(400)
          .json({ message: "Email, subject və message xanaları məcburidir!" });
      }

      EmailService.sendNotificationEmail({ email, subject, message });

      return res.status(200).json({
        message:
          "E-poçt bildirişi arxa fonda asinxron olaraq göndərilməyə başlandı.",
        status: "processing",
      });
    } catch (error) {
      next(error);
    }
  };
}
