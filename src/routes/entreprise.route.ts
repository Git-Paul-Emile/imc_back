import { Router } from "express";
import entrepriseController from "../controller/entreprise.controller.js";

const router: Router = Router();

router.get("/count", entrepriseController.count);
router.post("/", entrepriseController.create);
router.get("/", entrepriseController.getAll);
router.get("/:id", entrepriseController.getById);
router.put("/:id", entrepriseController.update);
router.delete("/:id", entrepriseController.delete);
router.get("/:id/evaluations", entrepriseController.getEvaluations);
router.post("/find-or-create", entrepriseController.createOrFind);
export default router;
