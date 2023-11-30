import { Foods } from "./food";

export class CartItem{

    constructor(food:Foods){
        this.food = food;
        // this.price;
    }

    food:Foods;
    quantity:string = '1';

    get price(): number{
        return this.food.price * parseInt(this.quantity);
    }
}