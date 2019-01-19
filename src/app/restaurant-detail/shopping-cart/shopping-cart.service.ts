import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";

export class ShoppingCartService {
  items: CartItem[] = []

  clear(){
    this.items = []
  }

  addItem(item: MenuItem){
    let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id)
    if(foundItem) {
      foundItem.quantity = foundItem.quantity + 1
    } else {
      // add o novo item (a quantidade efault = 1)
      this.items.push(new CartItem(item))
    }
  }

  removeItem(item: CartItem){
    // remove 1 elemento do array (informa indice que quer começar e a quantidade que quer remover)
    this.items.splice(this.items.indexOf(item), 1)
  }

  total(): number{
    // Implementação do total com MAP REDUCE
    // map => mapeia os items trocando o array e itens por um array ne números
    // reduce =>
    return this.items
      .map(item => item.value())
      .reduce((prev, value) => prev + value, 0)
  }
}