import { SendEmailDto } from "../dtos/SendEmailDto";

export class EmailService {
  static async sendNotificationEmail(data: SendEmailDto): Promise<void> {
    setTimeout(() => {
      console.log(` [ASYNC EMAIL] ${data.email} ünvanına e-poçt göndərilir...`);
      console.log(` Mövzu: ${data.subject}`);
      console.log(` Məzmun: ${data.message}`);
      console.log(` [ASYNC EMAIL] ${data.email} ünvanına e-poçt uğurla çatdırıldı!`);
    }, 3000);
  }
}