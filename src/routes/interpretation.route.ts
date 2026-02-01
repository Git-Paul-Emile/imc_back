import { Router } from "express";
import interpretationController from "../controller/interpretation.controller.js";

const router: Router = Router();

router.get("/count", interpretationController.count);
router.post("/", interpretationController.create);
router.get("/", interpretationController.getAll);
router.get("/:id", interpretationController.getById);
router.get("/theme/:id", interpretationController.getByThemeId);
router.get("/score", interpretationController.getByScore);
router.put("/:id", interpretationController.update);
router.delete("/:id", interpretationController.delete);

export default router;
