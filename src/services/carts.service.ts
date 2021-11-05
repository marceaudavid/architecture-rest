import { BookModel } from '../models/book.model';
import { CartDao } from '../dao/carts.dao';

export class CartsService {
  private cartDAO: CartDao = new CartDao()

  public getCartItems(cartID: string) {
    return this.cartDAO.getCartItems(cartID)
  }

  public addCartItem(cartID: string, item: BookModel) {
    return this.cartDAO.addCartItem(cartID, item)
  }

  public removeCartItem(cartID: string, cartItemID: string) {
    return this.cartDAO.removeCartItem(cartID, cartItemID)
  }
}