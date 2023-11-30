import { Component, OnInit } from '@angular/core';
import { Foods } from '../shared/models/food';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../services/food/food.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit{
food!:Foods;
  constructor(private route:ActivatedRoute, private fs:FoodService, private cartService:CartService, private router:Router) { 
    route.params.subscribe((params) => {
      if(params['id']){
        this.food = fs.getFoodById(params['id'])
      }
    })
  }

  ngOnInit(): void {
    
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }

  getStars(starRating: number): number[] {
    const roundedRating = Math.round(starRating * 2) / 2; // Round to nearest half
    const filledStars = Math.floor(roundedRating);
    const halfStars = roundedRating - filledStars;
    
    const stars = Array(filledStars).fill(1); // Filled stars
    if (halfStars > 0) {
      stars.push(0.5); // Half-filled star
    }
    const remainingStars = 5 - filledStars - (halfStars > 0 ? 1 : 0);
    stars.push(...Array(remainingStars).fill(0)); // Unfilled stars

    return stars;
  }

}
