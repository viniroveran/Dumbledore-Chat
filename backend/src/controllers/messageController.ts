import {Request, Response} from 'express';
import {getMessagesWithOffset} from "../services/messages";

async function getMessages(req: Request, res: Response) {
  const offset: number = parseInt(req.params.offset);
  const limit: number = parseInt(req.params.limit);
  let hasError: boolean = offset === undefined || limit === undefined;

  if (!hasError) {
    try {
      getMessagesWithOffset(offset, limit).then((messages) => {
        res.status(200).json({
          status_code: 200,
          messages: messages
        })
      })
    } catch (error) {
      /* istanbul ignore next */
      hasError = true;
    }
  }

  if (hasError) {
    res.status(400).json({
      status_code: "400",
      message: "Bad Request"
    });
  }
}

export default {
  getMessages
}
