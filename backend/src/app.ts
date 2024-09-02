import express, {Request, Response} from 'express';
import 'express-async-errors';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from "./routes";

const app = express();

/* Middlewares */
app.use(morgan(':method :url :status :res[content-length], took: :response-time ms to load'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());

/* Routes */
app.use('/', routes);

app.use('/', (req: Request, res: Response) => {
  res.send("Para acessar a documentação (tema claro), navegue para: /api/docs/v1 <br>" +
    "Para acessar a documentação (tema escuro), navegue para: /api/docs/v2");
});

export default app;