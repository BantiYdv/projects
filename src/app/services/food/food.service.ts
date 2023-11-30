import { Injectable } from '@angular/core';
import { Foods } from 'src/app/shared/models/food';
import { Tag } from 'src/app/shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getFoodById(id:number): Foods{
    return this.getAll().find(food => food.id == id)!;
  }

  getAllFoodByTag(tag:string): Foods[]{
    return tag == "All"?
       this.getAll() : this.getAll().filter(food => food.tags?.includes(tag))
  }

  getAllTag():Tag[]{
    return[
      {name: 'All', count: 12},
      {name: 'FastFood', count: 2},
      {name: 'Pizza', count: 1},
      {name: 'Lunch', count: 7},
      {name: 'SlowFood', count: 8},
      {name: 'Hamburger', count: 2},
      {name: 'Fry', count: 2},
      {name: 'Soup', count: 1},
    ]
  }

  getAll():Foods[]{
    return [
      {
        id:1,
        name:"Paneer",
        price:5,
        cookTime:"15-30",
        favorite:true,
        origins:['persia', 'middle east', 'china'],
        star: 1.5,
        imageUrl:'./assets/img/food-1.avif',
        tags:['FastFood', 'SlowFood','china'],
      },
      {
        id:2,
        name:"Vegetarian Thali",
        price:8,
        cookTime:"20-30",
        favorite:false,
        origins:['persia', 'middle east', 'china'],
        star: 5,
        imageUrl:'./assets/img/food-2.avif',
        tags:['Lunch', 'SlowFood'],
      },
      {
        id:3,
        name:"Loves Pasta",
        price:2,
        cookTime:"10-20",
        favorite:false,
        origins:['persia', 'middle east', 'china'],
        star: 3.5,
        imageUrl:'./assets/img/food-3.avif',
        tags:['FastFood', 'SlowFood'],
      },
      {
        id:4,
        name:"Manchurian",
        price:4,
        cookTime:"20-30",
        favorite:true,
        origins:['persia', 'middle east', 'china'],
        star: 4,
        imageUrl:'./assets/img/food-4.avif',
        tags:['Lunch', 'SlowFood'],
      },
      {
        id:5,
        name:"Burger",
        price:15,
        cookTime:"20-30",
        favorite:true,
        origins:['persia', 'middle east', 'china'],
        star: 4,
        imageUrl:'./assets/img/food-5.avif',
        tags:['Lunch', 'Hamburger'],
      },
      {
        id:6,
        name:"Penne Pasta",
        price:25,
        cookTime:"20-30",
        favorite:true,
        origins:['persia', 'middle east', 'china'],
        star: 4,
        imageUrl:'./assets/img/food-6.avif',
        tags:['Lunch', 'SlowFood'],
      },
      {
        id:7,
        name:"Soup",
        price:4,
        cookTime:"20-30",
        favorite:false,
        origins:['persia', 'middle east', 'china'],
        star: 4,
        imageUrl:'./assets/img/food-7.avif',
        tags:['Soup'],
      },
      {
        id:8,
        name:"pizza",
        price:6,
        cookTime:"20-30",
        favorite:true,
        origins:['persia', 'middle east', 'china'],
        star: 4,
        imageUrl:'./assets/img/food-8.avif',
        tags:['Lunch', 'Pizza'],
      },
      {
        id:9,
        name:"Burger",
        price:2,
        cookTime:"20-30",
        favorite:false,
        origins:['persia', 'middle east', 'china'],
        star: 4,
        imageUrl:'./assets/img/food-9.avif',
        tags:['Hamburger', 'Fry'],
      },
      {
        id:10,
        name:"Chicken Tikka",
        price:5,
        cookTime:"20-30",
        favorite:true,
        origins:['persia', 'middle east', 'china'],
        star: 4,
        imageUrl:'./assets/img/food-10.avif',
        tags:['Lunch', 'SlowFood'],
      },
      {
        id:11,
        name:"Biryani",
        price:4,
        cookTime:"20-30",
        favorite:true,
        origins:['persia', 'middle east', 'china'],
        star: 4,
        imageUrl:'./assets/img/food-11.avif',
        tags:['Lunch', 'SlowFood'],
      },
      {
        id:12,
        name:"Paccheri With Peppers",
        price:3,
        cookTime:"20-30",
        favorite:false,
        origins:['persia', 'middle east', 'china'],
        star: 4,
        imageUrl:'./assets/img/food-12.avif',
        tags:['Fry', 'SlowFood'],
      },
    ]
  }
}
