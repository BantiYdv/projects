import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../shared/models/cart';
import { CartItem } from '../shared/models/cartItem';
import { FoodService } from '../services/food/food.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit{
cart!: Cart;
  constructor(private cartService:CartService) {
    this.setCart();
   }

  ngOnInit(): void {
    console.log(this.cart)
  }
  setCart() {
    this.cart = this.cartService.getCart();
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
    this.setCart();
  }
  // changeQuantity(cartItem: CartItem, quantityInString:string) {
  //   const quantity = parseInt(quantityInString);
  //   this.cartService.changeQuantity(cartItem.food.id, quantity);
  //   this.setCart();
  // }
  changeQuantity(cartItem: CartItem): void {
    this.cartService.changeQuantity(cartItem.food.id, cartItem.quantity);
    this.setCart();
  }
  getTotalProductCount(): number {
    return this.cart.item.reduce((total, item) => total + parseInt(item.quantity), 0);
  }
  
}
