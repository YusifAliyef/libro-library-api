import { plainToInstance } from "class-transformer";
import { validate, Validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validationMiddleware(type: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(type, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const errorMessages = errors
        .map((err) => Object.values(err.constraints || {}))
        .flat();

      return res
        .status(400)
        .json({
          status: 400,
          error: "Validasiya xətası",
          messages: errorMessages,
        });
    }

    req.body = dtoInstance;
    next();
  };
}
