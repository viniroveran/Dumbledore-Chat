import {Request, Response} from 'express';
import {getUserById, createUser} from "../services/user";

async function getUser(req: Request, res: Response) {
  const id: number = parseInt(req.params.id);
  let hasError: boolean = id === undefined;
  let foundProfile: any = null;

  if (!hasError) {
    try {
      getUserById(id).then((user) => {
        console.log(user)
        res.status(200).json({
          status_code: 200,
          user: user
        })
      })
    } catch (error) {
      /* istanbul ignore next */
      hasError = true;
    }
  }

  if (hasError) {
    res.status(404).json({
      status_code: "404",
      message: "Perfil nao encontrado"
    });
  }
}

async function postUser(req: Request, res: Response) {
  const name = req.body.name
  const email = req.body.email
  const avatar = req.body.avatar

  let hasError = (name === undefined || email === undefined || avatar === undefined);

  if (!hasError) {
    try {
      createUser(name, email, avatar).then(() => {
        res.status(200).json({
          status_code: "200",
          message: "User created"
        });
      })
    } catch (error) {
      /* istanbul ignore next */
      hasError = true;
    }
  }

  if (hasError) {
    res.status(400).json({
      status_code: "400",
      message: "Faltam parametros"
    });
  }
}

export default {
  getUser,
  postUser
}