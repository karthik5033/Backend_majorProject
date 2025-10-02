import { Router } from "express";
import { logoutUser } from "../controllers/auth.controllers.js";
import { registerUser } from "../controllers/auth.controllers.js";
import { validate } from "../middleware/validator.middleware.js";
import { userLoginvalidator, userRegisterValidator } from "../validators/validators.js";
import { login} from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginvalidator(),validate,login);
router.route("/logout").post(verifyJWT,logoutUser);


export default router;
