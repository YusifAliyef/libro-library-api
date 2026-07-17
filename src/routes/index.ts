import { Router } from "express";
import authorRoutes from "./authorRoutes";
import bookRoutes from "./bookRoutes";
import memberRoutes from "./memberRoutes";

const apiRouter = Router();

apiRouter.use("/authors", authorRoutes);
apiRouter.use("/books", bookRoutes);
apiRouter.use("/members", memberRoutes);

export default apiRouter;
