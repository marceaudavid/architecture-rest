import * as express from 'express';

export default (role: string[]) => {
  return (req: any, res: express.Response, next: any) => {
    const { user } = req;
    if (user.roles.some((e: string) => role.includes(e))) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  };
};