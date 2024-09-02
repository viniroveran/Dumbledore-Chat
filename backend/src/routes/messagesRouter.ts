import Router from "express-promise-router";
import messageController from "../controllers/messageController";

const router = Router();

router.get('/:offset/:limit',
  // #swagger.tags = ['Messages']
  messageController.getMessages);

export default router;