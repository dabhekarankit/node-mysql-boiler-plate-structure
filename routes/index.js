import { Router } from "express";
import usersRoutes from "../src/users/user.router";

const router = Router();

router.use("/users", usersRoutes);

export default router;
