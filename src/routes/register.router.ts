import { Router } from 'express';
import { UnknownUserError } from '../errors/unknown-user.error';
import { UsersService } from '../services/users.service';

const registerRouter = Router();

const usersService = new UsersService();

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Create a new user
 */
registerRouter.post('/', (req, res) => {
  try {
    const user = usersService.register(req.body)
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

export default registerRouter;