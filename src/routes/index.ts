import { Router } from "express";
import authorRoutes from "./authorRoutes";
import bookRoutes from "./bookRoutes";
import memberRoutes from "./memberRoutes";
import authRoutes from "./authRoutes";
import categoryRoutes from "./categoryRoutes";

const apiRouter = Router();

apiRouter.use("/authors", authorRoutes);
apiRouter.use("/books", bookRoutes);
apiRouter.use("/members", memberRoutes);
apiRouter.use("/auth", authRoutes);
apiRouter.use("/categories", categoryRoutes);

export default apiRouter;
