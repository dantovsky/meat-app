import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { RadioOption } from "../shared/radio/radio-option.model";
import { OrderService } from "./order.service";
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model'
import { Order, OrderItem } from "./order.model";

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  delivery: number = 8

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' }
  ]

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
  }

  // o valor dos itens, já temos isso implementado no "carrinho de compras"
  // então precisamos criar uma funcao e tambem criar um método no OrderService
  // que repassa para o CartService
  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  // expor os itens do carrinho
  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  // precisamos ter também o método de aumentar e diminuir
  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  checkOrder(order: Order) {
    // transformar os itens que sao cartItems para orderItems
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order)
      .subscribe((orderId: string) => {

        // navegação programática via Router :: import Router, instanciar no constructor e usar o método navigate()
        this.router.navigate(['/order-summary'])

        console.log(`Compra concluída: ${orderId}`)
        console.log(orderId)
        this.orderService.clear()
      })
    console.log(order)
  }

}
