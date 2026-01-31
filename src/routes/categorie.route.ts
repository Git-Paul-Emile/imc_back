import {Router} from "express";
import categorieController from "../controller/categorie.controller.js";

const router: Router = Router();

router.post("/", categorieController.create);
router.get("/", categorieController.getAll);
router.get("/:id", categorieController.getById);
router.put("/:id", categorieController.update);
router.delete("/:id", categorieController.delete);

export default router;