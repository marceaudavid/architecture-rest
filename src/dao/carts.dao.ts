import { CartModel } from '../models/cart.model'
import { BookModel } from '../models/book.model'
import { DatabaseConnection } from './database-connection'
import { JsonDB } from 'node-json-db';

export class CartDao {

    private databaseConnection: JsonDB

    constructor() {
        this.databaseConnection = DatabaseConnection.getConnection();
    }

    public createCart(cart: CartModel): CartModel {
      const index = this.getCartIndexByID(cart.id);
      if (index > -1) {
        this.databaseConnection.push(`/carts[${index}]`, cart, true);
      } else {
        this.databaseConnection.push(`/carts[]`, cart);
      }
      return cart;
    }

    public getCartByID(cartID: string): CartModel {
      return this.databaseConnection.find('/carts', (cart) => cart.id === cartID);
    }

    public getCartIndexByID(cartID: string): number {
      return this.databaseConnection.getIndex('/carts', cartID, 'id');
    }

    public getItemIndexByID(cartIndex: number, itemID: string): number {
      return this.databaseConnection.getIndex(`/carts[${cartIndex}]/items`, itemID, 'id');
    }

    public getCartItems(cartID: string) {
      const index = this.getCartIndexByID(cartID);
      if (index > -1) {
          return this.databaseConnection.getData(`/carts[${index}]`)
      }
    }

    public addCartItem(cartID: string, item: BookModel) {
      const index = this.getCartIndexByID(cartID);
      if (index > -1) {
          this.databaseConnection.push(`/carts[${index}]/items[]`, item, true)
          return item;
      }
    }

    public removeCartItem(cartID: string, cartItemID: string) {
      const cartIndex = this.getCartIndexByID(cartID);
      const itemIndex = this.getItemIndexByID(cartIndex, cartItemID);
      if (cartIndex > -1 && itemIndex  > -1) {
          this.databaseConnection.delete(`/carts[${cartIndex}]/items[${itemIndex}]`)
          return cartItemID;
      }
    }
}