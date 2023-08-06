import { NextFunction, Request, Response } from 'express';
// import { container } from 'tsyringe';
import { verify } from 'jsonwebtoken';
import { AppError } from '@utils/AppError';
import { token as tokenConfig } from '@config/auth';
// import { FindWorkshopByIdService } from '@services/FindWorkshopById/FindWorkshopByIdService';

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError(
      'Chave de acesso não encontrada! Por favor, realize o login novamente',
      404,
    );
  }

  const token = authHeader.split(' ')[1];

  let decoded;

  try {
    decoded = verify(token, tokenConfig.accessToken.secret);
    //   if (token.startsWith('auto_')) {
    //     const cleanedToken = token.replace('auto_', '');

    //     decoded = verify(cleanedToken, tokenConfig.apiKey.secret) as {
    //       workshopId: string;
    //     };

    //     const workshopService = container.resolve(FindWorkshopByIdService);

    //     const workshop = await workshopService.execute(decoded.workshopId);

    //     if (!workshop) {
    //       throw new AppError('Oficina não encontrada!', 404);
    //     }

    //     if (workshop.api_key !== token) {
    //       throw new AppError('Chave da API inválida.', 404);
    //     }
    //   } else {
    //     decoded = verify(token, tokenConfig.accessToken.secret);
    //   }
  } catch (error) {
    throw new AppError(
      'Sessão Expirada! Por favor, realize o login novamente',
      401,
    );
  }

  const { sub, role } = decoded as {
    sub: string;
    role: RoleOptions;
  };

  // const { sub, role, permissions, workshopId } = decoded as {
  //   sub: string;
  //   role: RoleOptions;
  //   permissions: number[];
  //   workshopId: string;
  // };

  req.user = {
    id: sub,
    role,
  };

  return next();
}
