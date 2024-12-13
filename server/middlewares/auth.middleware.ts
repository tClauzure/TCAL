import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '../models/Utilisateur';

export interface AuthRequest extends Request {
  userId?: string;
  role?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction):void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'Accès refusé' });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token invalide' });
  }
};

// Middleware pour vérifier le rôle
export const roleMiddleware = (roles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction):void => {
    if (!roles.includes(req.role as Role)) {
      res.status(403).json({ message: 'Accès interdit' });
      return;
    }
    next();
  };
};
