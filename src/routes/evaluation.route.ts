import { Router } from "express";
import evaluationController from "../controller/evaluation.controller.js";

const router: Router = Router();

// Routes de base
router.get("/count", evaluationController.count);
router.post("/", evaluationController.create);
router.get("/", evaluationController.getAll);
router.get("/:id", evaluationController.getById);
router.put("/:id", evaluationController.update);
router.delete("/:id", evaluationController.delete);

// Routes spécifiques
router.get("/entreprise/:id", evaluationController.getByEntreprise);
router.get("/theme/:id", evaluationController.getByTheme);
router.put("/:id/score", evaluationController.updateScore);
router.put("/:id/interpretation", evaluationController.setInterpretation);

// Routes pour les réponses
router.post("/reponse", evaluationController.addReponse);
router.get("/:id/reponses", evaluationController.getReponses);

// Route de soumission complète en une fois
router.post("/submit", evaluationController.submitEvaluation);

export default router;
