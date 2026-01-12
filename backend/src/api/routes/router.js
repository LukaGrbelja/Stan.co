import { Router } from "express";
import userRouter from "./user.route.js";
import appRouter from "./apartment.route.js";
import commsRouter from "./communication.route.js";

const router = Router();

router.use("/auth", userRouter);
router.use("/apt", appRouter);
router.use("/comms", commsRouter);

export default router;