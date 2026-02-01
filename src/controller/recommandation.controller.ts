import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { jsonResponse } from "../utils/index.js";
import { controllerWrapper } from "../utils/ControllerWrapper.js";
import { validateId } from "../middlewares/validateId.js";
import recommandationService from "../services/recommandation.service.js";

class RecommandationController {
  // Compter le nombre de recommandations
  count = controllerWrapper(async (req: Request, res: Response) => {
    const count = await recommandationService.countRecommandation();
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Nombre de recommandations récupéré avec succès",
        data: count,
      }),
    );
  });

  // Créer une nouvelle recommandation
  create = controllerWrapper(async (req: Request, res: Response) => {
    const newRecommandation = await recommandationService.createRecommandation(req.body);
    res.status(StatusCodes.CREATED).json(
      jsonResponse({
        status: "success",
        message: "Recommandation créée avec succès",
        data: newRecommandation,
      }),
    );
  });

  // Récupérer toutes les recommandations
  getAll = controllerWrapper(async (req: Request, res: Response) => {
    const recommandations = await recommandationService.getAllRecommandations();
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Recommandations récupérées avec succès",
        data: recommandations,
      }),
    );
  });

  // Récupérer une recommandation par ID
  getById = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    const recommandation = await recommandationService.getRecommandationById(req.params.id as string);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Recommandation récupérée avec succès",
        data: recommandation,
      }),
    );
  });

  // Mettre à jour une recommandation
  update = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    const updatedRecommandation = await recommandationService.updateRecommandation(req.params.id as string, req.body);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Recommandation mise à jour avec succès",
        data: updatedRecommandation,
      }),
    );
  });

  // Supprimer une recommandation
  delete = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    await recommandationService.deleteRecommandation(req.params.id as string);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Recommandation supprimée avec succès",
      }),
    );
  });
}

export default new RecommandationController();
