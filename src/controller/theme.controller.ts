import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { jsonResponse } from "../utils/index.js";
import { controllerWrapper } from "../utils/ControllerWrapper.js";
import { validateId } from "../middlewares/validateId.js";
import themeService from "../services/theme.service.js";

class ThemeController {
  // Compter le nombre de thèmes
  count = controllerWrapper(async (req: Request, res: Response) => {
    const count = await themeService.countTheme();
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Nombre de thèmes récupéré avec succès",
        data: count,
      }),
    );
  });

  // Créer un nouveau thème
  create = controllerWrapper(async (req: Request, res: Response) => {
    const newTheme = await themeService.createTheme(req.body);
    res.status(StatusCodes.CREATED).json(
      jsonResponse({
        status: "success",
        message: "Thème créé avec succès",
        data: newTheme,
      }),
    );
  });

  // Récupérer tous les thèmes
  getAll = controllerWrapper(async (req: Request, res: Response) => {
    const themes = await themeService.getAllThemes();
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Thèmes récupérés avec succès",
        data: themes,
      }),
    );
  });

  // Récupérer un thème par ID
  getById = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    const theme = await themeService.getThemeById(req.params.id as string);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Thème récupéré avec succès",
        data: theme,
      }),
    );
  });

  // Mettre à jour un thème
  update = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    const updatedTheme = await themeService.updateTheme(req.params.id as string, req.body);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Thème mis à jour avec succès",
        data: updatedTheme,
      }),
    );
  });

  // Supprimer un thème
  delete = controllerWrapper(async (req: Request, res: Response) => {
    validateId(req, res, () => {});
    await themeService.deleteTheme(req.params.id as string);
    res.status(StatusCodes.OK).json(
      jsonResponse({
        status: "success",
        message: "Thème supprimé avec succès",
      }),
    );
  });
}

export default new ThemeController();
