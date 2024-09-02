import Router from "express-promise-router";
import userRouter from './userRouter';
import messagesRouter from "./messagesRouter";
import swaggerRouter from './swagger-ui';

const router = Router();

router.use('/api/user', userRouter);
router.use('/api/messages', messagesRouter);
router.use('/api/docs', swaggerRouter);

export default router;
