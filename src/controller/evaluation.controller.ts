import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { jsonResponse } from "../utils/index.js";
import { controllerWrapper } from "../utils/ControllerWrapper.js";
import { validateId } from "../middlewares/validateId.js";
import evaluationService from "../services/evaluation.service.js";
import { createEvaluationSchema, updateEvaluationSchema } from "../validators/EvaluationSchema.js";
import { submitEvaluationSchema } from "../validators/EvaluationSubmitSchema.js";

class EvaluationController {
    // Compter le nombre d'évaluations
    count = controllerWrapper(async (_req: Request, res: Response) => {
        const count = await evaluationService.countEvaluation();
        res.status(StatusCodes.OK).json(
            jsonResponse({
                status: "success",
                message: "Nombre d'évaluations récupéré avec succès",
                data: count,
            }),
        );
    });

    // Soumettre une évaluation complète en une fois
    submitEvaluation = controllerWrapper(async (req: Request, res: Response) => {
        const validatedData = submitEvaluationSchema.parse(req.body);
        const evaluation = await evaluationService.submitEvaluation(validatedData);
        res.status(StatusCodes.CREATED).json(
            jsonResponse({
                status: "success",
                message: "Évaluation soumise avec succès",
                data: evaluation,
            }),
        );
    });

    // Créer une nouvelle évaluation
    create = controllerWrapper(async (req: Request, res: Response) => {
        const validatedData = createEvaluationSchema.parse(req.body);
        const evaluation = await evaluationService.createEvaluation(validatedData);
        res.status(StatusCodes.CREATED).json(
            jsonResponse({
                status: "success",
                message: "Évaluation créée avec succès",
                data: evaluation,
            }),
        );
    });

    // Récupérer toutes les évaluations
    getAll = controllerWrapper(async (_req: Request, res: Response) => {
        const evaluations = await evaluationService.getAllEvaluations();
        res.status(StatusCodes.OK).json(
            jsonResponse({
                status: "success",
                message: "Évaluations récupérées avec succès",
                data: evaluations,
            }),
        );
    });

    // Récupérer une évaluation par ID
    getById = controllerWrapper(async (req: Request, res: Response) => {
        validateId(req, res, () => {});
        const evaluation = await evaluationService.getEvaluationById(req.params.id as string);
        res.status(StatusCodes.OK).json(
            jsonResponse({
                status: "success",
                message: "Évaluation récupérée avec succès",
                data: evaluation,
            }),
        );
    });

    // Récupérer les évaluations par entreprise
    getByEntreprise = controllerWrapper(async (req: Request, res: Response) => {
        validateId(req, res, () => {});
        const evaluations = await evaluationService.getEvaluationsByEntreprise(req.params.id as string);
        res.status(StatusCodes.OK).json(
            jsonResponse({
                status: "success",
                message: "Évaluations récupérées avec succès",
                data: evaluations,
            }),
        );
    });

    // Récupérer les évaluations par thème
    getByTheme = controllerWrapper(async (req: Request, res: Response) => {
        validateId(req, res, () => {});
        const evaluations = await evaluationService.getEvaluationsByTheme(req.params.id as string);
        res.status(StatusCodes.OK).json(
            jsonResponse({
                status: "success",
                message: "Évaluations récupérées avec succès",
                data: evaluations,
            }),
        );
    });

    // Mettre à jour une évaluation
    update = controllerWrapper(async (req: Request, res: Response) => {
        validateId(req, res, () => {});
        const validatedData = updateEvaluationSchema.parse(req.body);
        const evaluation = await evaluationService.updateEvaluation(req.params.id as string, validatedData);
        res.status(StatusCodes.OK).json(
            jsonResponse({
                status: "success",
                message: "Évaluation mise à jour avec succès",
                data: evaluation,
            }),
        );
    });

    // Mettre à jour le score d'une évaluation
    updateScore = controllerWrapper(async (req: Request, res: Response) => {
        validateId(req, res, () => {});
        const { scoreTotal } = req.body;
        const evaluation = await evaluationService.updateEvaluationScore(req.params.id as string, scoreTotal);
        res.status(StatusCodes.OK).json(
            jsonResponse({
                status: "success",
                message: "Score mis à jour avec succès",
                data: evaluation,
            }),
        );
    });

    // Définir l'interprétation d'une évaluation
    setInterpretation = controllerWrapper(async (req: Request, res: Response) => {
        validateId(req, res, () => {});
        const { interpretationId } = req.body;
        const evaluation = await evaluationService.setEvaluationInterpretation(req.params.id as string, interpretationId);
        res.status(StatusCodes.OK).json(
            jsonResponse({
                status: "success",
                message: "Interprétation mise à jour avec succès",
                data: evaluation,
            }),
        );
    });

    // Supprimer une évaluation
    delete = controllerWrapper(async (req: Request, res: Response) => {
        validateId(req, res, () => {});
        await evaluationService.deleteEvaluation(req.params.id as string);
        res.status(StatusCodes.OK).json(
            jsonResponse({
                status: "success",
                message: "Évaluation supprimée avec succès",
            }),
        );
    });

    // Ajouter une réponse à une évaluation
    addReponse = controllerWrapper(async (req: Request, res: Response) => {
        const { evaluationId, questionId, reponseId, pointObtenu } = req.body;
        const result = await evaluationService.addEvaluationReponse(evaluationId, questionId, reponseId, pointObtenu);
        res.status(StatusCodes.CREATED).json(
            jsonResponse({
                status: "success",
                message: "Réponse ajoutée avec succès",
                data: result,
            }),
        );
    });

    // Récupérer les réponses d'une évaluation
    getReponses = controllerWrapper(async (req: Request, res: Response) => {
        validateId(req, res, () => {});
        const reponses = await evaluationService.getEvaluationReponses(req.params.id as string);
        res.status(StatusCodes.OK).json(
            jsonResponse({
                status: "success",
                message: "Réponses récupérées avec succès",
                data: reponses,
            }),
        );
    });
}

export default new EvaluationController();
