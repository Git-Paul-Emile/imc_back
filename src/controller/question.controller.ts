import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { jsonResponse } from "../utils/index.js";
import { controllerWrapper } from "../utils/ControllerWrapper.js";
import { validateId } from "../middlewares/validateId.js";
import questionService from "../services/question.service.js";

class QuestionController {
  // Compter le nombre de questions
  count = controllerWrapper(async (req: Request, res: Response) => {
    const count = await questionService.countQuestions();
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Nombre de questions récupéré avec succès",
        data: count,
      }),
    );
  });

  // Créer une nouvelle question
  create = controllerWrapper(async (req: Request, res: Response) => {
    const newQuestion = await questionService.createQuestion(req.body);
    res.status(StatusCodes.CREATED).json(
      jsonResponse({
        status: "success",
        message: "Question créée avec succès",
        data: newQuestion,
      }),
    );
  });

  // Récupérer toutes les questions
  getAll = controllerWrapper(async (req: Request, res: Response) => {
    const questions = await questionService.getAllQuestions();
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Questions récupérées avec succès",
        data: questions,
      }),
    );
  });

  // Récupérer une question par ID
  getById = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    const question = await questionService.getQuestionById(req.params.id as string);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Question récupérée avec succès",
        data: question,
      }),
    );
  });

  // Récupérer les questions par catégorie ID
  getByCategorieId = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    const questions = await questionService.getQuestionsByCategorieId(req.params.id as string);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Questions récupérées avec succès",
        data: questions,
      }),
    );
  });

  // Mettre à jour une question
  update = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    const updatedQuestion = await questionService.updateQuestion(req.params.id as string, req.body);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Question mise à jour avec succès",
        data: updatedQuestion,
      }),
    );
  });

  // Supprimer une question
  delete = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    await questionService.deleteQuestion(req.params.id as string);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Question supprimée avec succès",
      }),
    );
  });
}

export default new QuestionController();
