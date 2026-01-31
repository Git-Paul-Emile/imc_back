import { Router } from "express";
import reponseController from "../controller/reponse.controller.js";

const router: Router = Router();

router.get("/count", reponseController.count);
router.post("/", reponseController.create);
router.get("/", reponseController.getAll);
router.get("/:id", reponseController.getById);
router.put("/:id", reponseController.update);
router.delete("/:id", reponseController.delete);
router.get("/point/greater-than/:point", reponseController.getByPointGreaterThan);
router.get("/point/less-than/:point", reponseController.getByPointLessThan);

export default router;
