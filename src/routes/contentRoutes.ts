// src/routes/contentRoutes.ts
import { Router } from "express";
import { contentController } from "../controllers/contentController";
import { verify } from "../utils/authUtils";

const router = Router();

router.get("/conteudo", verify, contentController.getContent);
router.post("/conteudo/action", verify, contentController.handleAction);

export default router;
