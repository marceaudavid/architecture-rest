import { BookModel } from "./book.model"

export interface CartModel {
  id: string;
  items: BookModel[];
}
