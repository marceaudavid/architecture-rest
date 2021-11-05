import { Router } from 'express';
import { CartsService } from '../services/carts.service';
const cartsRouter = Router();
const cartsService = new CartsService();

/**
 * @openapi
 * /cart:
 *   get:
 *     summary: Get all items in the cart
 */
 cartsRouter.get('/', (req: any, res) => {
  const items = cartsService.getCartItems(req.user.id);
  res.status(200).send(items);
})

/**
 * @openapi
 * /cart:
 *   put:
 *     summary: Add an item in the cart
 */
 cartsRouter.put('/', (req: any, res) => {
  try {
    const item = cartsService.addCartItem(req.user.id, req.body);
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

/**
 * @openapi
 * /cart/{cartItemID}:
 *   delete:
 *     summary: Delete an item from the cart
 */
 cartsRouter.delete('/:cartItemID', (req: any, res) => {
  try {
    const item = cartsService.removeCartItem(req.user.id, req.params.cartItemID);
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

export default cartsRouter;