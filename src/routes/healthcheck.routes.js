import { Router } from "express"; // ✅ named import, not default
import { healthcheck } from "../controllers/healthcheck.controllers.js"; // ✅ add .js if using ES modules

const router = Router();

router.route("/").get(healthcheck);

export default router;
