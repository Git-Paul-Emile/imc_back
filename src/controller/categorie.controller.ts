import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { jsonResponse } from "../utils/index.js";
import { controllerWrapper } from "../utils/ControllerWrapper.js";
import { validateId } from "../middlewares/validateId.js";
import themeService from "../services/theme.service.js";
import categorieService from "../services/categorie.service.js";

class CategorieController {
    // Créer une nouvelle catégorie
    create = controllerWrapper(async (req: Request, res: Response) => {
        const newCategorie = await categorieService.createCategorie(req.body);
        res.status(StatusCodes.CREATED).json(
            jsonResponse({
                status: "success",
                message: "Catégorie créée avec succès",
                data: newCategorie,
            }),
        );
    });

    // Récupérer toutes les catégories
    getAll = controllerWrapper(async (req: Request, res: Response) => {
        const categories = await categorieService.getAllCategories();
        res.status(StatusCodes.OK).json(
            jsonResponse({
                status: "success",
                message: "Catégories récupérées avec succès",
                data: categories,
            }),
        );
    });

    // Récupérer une catégorie par ID
    getById = controllerWrapper(async (req: Request, res: Response) => {
        validateId(req, res, () => {});
        const categorie = await categorieService.getCategorieById(req.params.id as string);
        res.status(StatusCodes.OK).json(
            jsonResponse({
                status: "success",
                message: "Catégorie récupérée avec succès",
                data: categorie,
            }),
        );
    });

    // Mettre à jour une catégorie
    update = controllerWrapper(async (req: Request, res: Response) => {
        validateId(req, res, () => {});
        const updatedCategorie = await categorieService.updateCategorie(req.params.id as string, req.body);
        res.status(StatusCodes.OK).json(
            jsonResponse({
                status: "success",
                message: "Catégorie mise à jour avec succès",
                data: updatedCategorie,
            }),
        );
    });

    // Supprimer une catégorie
    delete = controllerWrapper(async (req: Request, res: Response) => {
        validateId(req, res, () => {});
        await categorieService.deleteCategorie(req.params.id as string);
        res.status(StatusCodes.OK).json(
            jsonResponse({
                status: "success",
                message: "Catégorie supprimée avec succès",
                data: null,
            })
        );
    });
}

export default new CategorieController();












