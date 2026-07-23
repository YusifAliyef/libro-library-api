import { Router } from "express";
import authorRoutes from "./authorRoutes";
import bookRoutes from "./bookRoutes";
import memberRoutes from "./memberRoutes";
import authRoutes from "./authRoutes";

const apiRouter = Router();

apiRouter.use("/authors", authorRoutes);
apiRouter.use("/books", bookRoutes);
apiRouter.use("/members", memberRoutes);
apiRouter.use("/auth", authRoutes);

export default apiRouter;
