import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { jsonResponse } from "../utils/index.js";
import { controllerWrapper } from "../utils/ControllerWrapper.js";
import { validateId } from "../middlewares/validateId.js";
import entrepriseService from "../services/entreprise.service.js";

class EntrepriseController {
  // Compter le nombre d'entreprises
  count = controllerWrapper(async (req: Request, res: Response) => {
    const count = await entrepriseService.countEntreprise();
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Nombre d'entreprises récupéré avec succès",
        data: count,
      }),
    );
  });

  // Créer une nouvelle entreprise
  create = controllerWrapper(async (req: Request, res: Response) => {
    const newEntreprise = await entrepriseService.createEntreprise(req.body);
    res.status(StatusCodes.CREATED).json(
      jsonResponse({
        status: "success",
        message: "Entreprise créée avec succès",
        data: newEntreprise,
      }),
    );
  });

  // Récupérer toutes les entreprises
  getAll = controllerWrapper(async (req: Request, res: Response) => {
    const entreprises = await entrepriseService.getAllEntreprises();
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Entreprises récupérées avec succès",
        data: entreprises,
      }),
    );
  });

  // Récupérer une entreprise par ID
  getById = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    const entreprise = await entrepriseService.getEntrepriseById(req.params.id as string);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Entreprise récupérée avec succès",
        data: entreprise,
      }),
    );
  });

  // Mettre à jour une entreprise
  update = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    const updatedEntreprise = await entrepriseService.updateEntreprise(req.params.id as string, req.body);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Entreprise mise à jour avec succès",
        data: updatedEntreprise,
      }),
    );
  });

  // Supprimer une entreprise
  delete = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    await entrepriseService.deleteEntreprise(req.params.id as string);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Entreprise supprimée avec succès",
      }),
    );
  });

  // Récupérer les évaluations d'une entreprise
  getEvaluations = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    const evaluations = await entrepriseService.getEvaluations(req.params.id as string);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Évaluations de l'entreprise récupérées avec succès",
        data: evaluations,
      }),
    );
  });

  // Créer ou récupérer une entreprise
  createOrFind = controllerWrapper(async (req: Request, res: Response) => {
    const result = await entrepriseService.createOrFind(req.body);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: result.isNew ? 'Entreprise créée avec succès' : 'Entreprise existante récupérée',
        data: result,
      }),
    );
  });
}

export default new EntrepriseController();
