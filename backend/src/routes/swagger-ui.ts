import {Router, Request, Response} from 'express';
import swaggerUi from "swagger-ui-express";
import {SwaggerTheme, SwaggerThemeNameEnum} from 'swagger-themes';

const router = Router();
const theme = new SwaggerTheme();

router.get('/swagger.json', (req: Request, res: Response) => {
  // #swagger.ignore = true
  res.sendFile('./src/swagger_output.json', {root: '.'});
});

router.use('/v1', swaggerUi.serve, swaggerUi.setup(undefined, {
  // #swagger.ignore = true
  customSiteTitle: 'Dumbledore Chat API - Docs',
  swaggerOptions: {
    url: '/api/docs/swagger.json',
    displayRequestDuration: true
  },
}));

router.use('/v2', swaggerUi.serve, swaggerUi.setup(undefined, {
  // #swagger.ignore = true
  customSiteTitle: 'Dumbledore Chat API - Docs',
  customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
  swaggerOptions: {
    url: '/api/docs/swagger.json',
    displayRequestDuration: true,
  },
}));

export default router;