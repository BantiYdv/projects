import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Foods } from '../shared/models/food';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods:Foods[]= [];
  constructor(private fs:FoodService, private route: ActivatedRoute) {}


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if(params['searchItem']){
        this.foods = this.fs.getAll().filter(food => food.name.toLowerCase().includes(params['searchItem'].toLowerCase()))
      } 
      else if(params['tag']){
        this.foods = this.fs.getAllFoodByTag(params['tag'])
      }
      else{
        this.foods = this.fs.getAll();
      }
      
    })
    // this.foods = this.fs.getAll();
    console.log(this.foods)
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
