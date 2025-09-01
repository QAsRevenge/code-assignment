import {NextFunction, Request, Response} from 'express';

function controllerWrapper(handler: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await handler(req, res, next);
      if (result && !res.headersSent) {
        res.status(result.status || 200).json(result.body);
      }
    } catch (err) {
      next(err);
    }
  };
}

export {controllerWrapper};
