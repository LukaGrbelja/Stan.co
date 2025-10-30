import { Router } from "express";
import userRouter from "./user.route.js";
import appRouter from "./apartment.route.js";

const router = Router();

router.use("/auth", userRouter);

router.use("/apt", appRouter);

export default router;