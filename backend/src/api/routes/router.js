import { Router } from "express";
import userRouter from "./user.route.js";
import appRouter from "./apartment.route.js";
import commsRouter from "./communication.route.js";
import reportRouter from "./report.route.js";

const router = Router();

router.use("/auth", userRouter);
router.use("/apt", appRouter);
router.use("/comms", commsRouter);
router.use("/report", reportRouter);

export default router;