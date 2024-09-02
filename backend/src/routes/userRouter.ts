import Router from "express-promise-router";
import userController from "../controllers/userController";

const router = Router();

router.post('/',
  // #swagger.tags = ['User']
  userController.postUser);

export default router;