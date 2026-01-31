import { Router } from "express";
import questionController from "../controller/question.controller.js";

const router: Router = Router();

router.get("/count", questionController.count);
router.post("/", questionController.create);
router.get("/", questionController.getAll);
router.get("/categorie/:id", questionController.getByCategorieId);
router.get("/:id", questionController.getById);
router.put("/:id", questionController.update);
router.delete("/:id", questionController.delete);

export default router;