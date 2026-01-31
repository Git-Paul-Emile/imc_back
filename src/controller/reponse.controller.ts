import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { jsonResponse } from "../utils/index.js";
import { controllerWrapper } from "../utils/ControllerWrapper.js";
import { validateId } from "../middlewares/validateId.js";
import reponseService from "../services/reponse.service.js";

class ReponseController {
  // Compter le nombre de réponses
  count = controllerWrapper(async (req: Request, res: Response) => {
    const count = await reponseService.countReponse();
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Nombre de réponses récupéré avec succès",
        data: count,
      }),
    );
  });

  // Créer une nouvelle réponse
  create = controllerWrapper(async (req: Request, res: Response) => {
    const newReponse = await reponseService.createReponse(req.body);
    res.status(StatusCodes.CREATED).json(
      jsonResponse({
        status: "success",
        message: "Réponse créée avec succès",
        data: newReponse,
      }),
    );
  });

  // Récupérer toutes les réponses
  getAll = controllerWrapper(async (req: Request, res: Response) => {
    const reponses = await reponseService.getAllReponses();
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Réponses récupérées avec succès",
        data: reponses,
      }),
    );
  });

  // Récupérer une réponse par ID
  getById = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    const reponse = await reponseService.getReponseById(req.params.id as string);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Réponse récupérée avec succès",
        data: reponse,
      }),
    );
  });

  // Mettre à jour une réponse
  update = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    const updatedReponse = await reponseService.updateReponse(req.params.id as string, req.body);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Réponse mise à jour avec succès",
        data: updatedReponse,
      }),
    );
  });

  // Supprimer une réponse
  delete = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    await reponseService.deleteReponse(req.params.id as string);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Réponse supprimée avec succès",
      }),
    );
  });

  // Récupérer les réponses avec un point supérieur à une valeur
  getByPointGreaterThan = controllerWrapper(async (req: Request, res: Response) => {
    const point = parseInt(req.params.point as string);
    if (isNaN(point)) {
      throw new Error('Le point doit être un nombre');
    }
    const reponses = await reponseService.getReponsesByPointGreaterThan(point);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Réponses récupérées avec succès",
        data: reponses,
      }),
    );
  });

  // Récupérer les réponses avec un point inférieur à une valeur
  getByPointLessThan = controllerWrapper(async (req: Request, res: Response) => {
    const point = parseInt(req.params.point as string);
    if (isNaN(point)) {
      throw new Error('Le point doit être un nombre');
    }
    const reponses = await reponseService.getReponsesByPointLessThan(point);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Réponses récupérées avec succès",
        data: reponses,
      }),
    );
  });
}

export default new ReponseController();
