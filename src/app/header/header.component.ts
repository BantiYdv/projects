import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../shared/models/cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cart!: Cart;
  constructor(private cartService:CartService) {}

ngOnInit(): void {
  this.cart = this.cartService.getCart();
}

}
