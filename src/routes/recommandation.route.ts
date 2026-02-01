import { Router } from "express";
import recommandationController from "../controller/recommandation.controller.js";

const router: Router = Router();

router.get("/count", recommandationController.count);
router.post("/", recommandationController.create);
router.get("/", recommandationController.getAll);
router.get("/:id", recommandationController.getById);
router.put("/:id", recommandationController.update);
router.delete("/:id", recommandationController.delete);

export default router;