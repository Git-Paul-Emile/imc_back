import { Router } from "express";
import themeController from "../controller/theme.controller.js";

const router: Router = Router();

router.get("/count", themeController.count);
router.post("/", themeController.create);
router.get("/", themeController.getAll);
router.get("/:id", themeController.getById);
router.put("/:id", themeController.update);
router.delete("/:id", themeController.delete);

export default router;