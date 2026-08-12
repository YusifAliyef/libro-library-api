import cron from "node-cron";
import fs from "fs";
import path from "path";



export const initScheduledTasks = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      console.log(
        "[CRON TASK] Gündəlik avtomatik təmizləmə və yoxlama işə düşdü...",
      );

      const uploadDir = path.join(__dirname, "../../uploads");
      if (fs.existsSync(uploadDir)) {
        const files = fs.readdirSync(uploadDir);
        console.log(
          `[CRON TASK] Serverdəki fayllar yoxlanıldı. İndi ${files.length} fayl var.`,
        );
      }
    } catch (error) {
      console.error("[CRON TASK] Xəta:", error);
    }
  });

  console.log("Cron Job mexanizmi aktivləşdirildi.");
};
