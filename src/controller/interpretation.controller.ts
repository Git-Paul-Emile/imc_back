import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { jsonResponse } from "../utils/index.js";
import { controllerWrapper } from "../utils/ControllerWrapper.js";
import { validateId } from "../middlewares/validateId.js";
import interpretationService from "../services/interpretation.service.js";

class InterpretationController {
  // Compter le nombre d'interprétations
  count = controllerWrapper(async (req: Request, res: Response) => {
    const count = await interpretationService.countInterpretation();
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Nombre d'interprétations récupéré avec succès",
        data: count,
      }),
    );
  });

  // Créer une nouvelle interprétation
  create = controllerWrapper(async (req: Request, res: Response) => {
    const newInterpretation = await interpretationService.createInterpretation(req.body);
    res.status(StatusCodes.CREATED).json(
      jsonResponse({
        status: "success",
        message: "Interprétation créée avec succès",
        data: newInterpretation,
      }),
    );
  });

  // Récupérer toutes les interprétations
  getAll = controllerWrapper(async (req: Request, res: Response) => {
    const interpretations = await interpretationService.getAllInterpretations();
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Interprétations récupérées avec succès",
        data: interpretations,
      }),
    );
  });

  // Récupérer une interprétation par ID
  getById = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    const interpretation = await interpretationService.getInterpretationById(req.params.id as string);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Interprétation récupérée avec succès",
        data: interpretation,
      }),
    );
  });

  // Récupérer les interprétations par thème
  getByThemeId = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    const interpretations = await interpretationService.getInterpretationsByThemeId(req.params.id as string);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Interprétations du thème récupérées avec succès",
        data: interpretations,
      }),
    );
  });

  // Récupérer l'interprétation par score (pour un thème donné)
  getByScore = controllerWrapper(async (req: Request, res: Response) => {
    const { themeId, score } = req.query;
    if (!themeId || !score) {
      res.status(StatusCodes.BAD_REQUEST).json(
        jsonResponse({
          status: "error",
          message: "Les paramètres themeId et score sont requis",
        }),
      );
      return;
    }
    const interpretation = await interpretationService.getInterpretationByScore(
      themeId as string,
      parseInt(score as string)
    );
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Interprétation récupérée avec succès",
        data: interpretation,
      }),
    );
  });

  // Mettre à jour une interprétation
  update = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    const updatedInterpretation = await interpretationService.updateInterpretation(req.params.id as string, req.body);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Interprétation mise à jour avec succès",
        data: updatedInterpretation,
      }),
    );
  });

  // Supprimer une interprétation
  delete = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    await interpretationService.deleteInterpretation(req.params.id as string);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Interprétation supprimée avec succès",
      }),
    );
  });
}

export default new InterpretationController();
