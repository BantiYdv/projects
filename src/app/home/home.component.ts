import { Component, ElementRef, HostListener, OnInit  } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../service/api-service.service';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NavbarComponent, AppComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  constructor(
    private router: Router,
    private activatedRoute :ActivatedRoute,
    public apiService: ApiServiceService
  ) {}
  ngOnInit(){
      const currentRoutePath = this.router.url;
      // Use currentRoutePath as needed
      console.log(currentRoutePath)
      this.scrollToSection(currentRoutePath.replace('/',''));
    
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementOffset = element.getBoundingClientRect().top;
      const bodyRect = document.body.getBoundingClientRect().top;
      const offset = elementOffset - bodyRect;
      const middleOfPage = offset - window.innerHeight / 90; // Adjust as needed
      window.scrollTo({ top: middleOfPage, behavior: 'smooth' });
    }
  }
  items = new Array(30);
  
  cardsArray = [
    {
    name: "Lorem Ipsum is simply dummy text",
    profession: "Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since",
    imageUrl: "../../assets/images/slider_1.jpg",
    stars: 4,
    userName: "Max Deni",
    userPosition: "Frontend Developer"
  },
    {
    name: "Lorem Ipsum is simply dummy text",
    profession: "Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since",
    imageUrl: "../../assets/images/slider_2.jpg",
    stars: 1,
    userName: "Raj Kumar",
    userPosition: "Frontend Developer"
  },
    {
    name: "Lorem Ipsum is simply dummy text",
    profession: "Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since",
    imageUrl: "../../assets/images/slider_3.jpg",
    stars: 3,
    userName: "Sohan Yadav",
    userPosition: "Backend Developer"
  },
    {
    name: "Lorem Ipsum is simply dummy text",
    profession: "Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since",
    imageUrl: "../../assets/images/slider_4.jpg",
    stars: 5,
    userName: "Ban Ydv",
    userPosition: "Frontend Developer"
  },
]; // Replace this with your actual array

getStars(starCount: number): boolean[] {
  const stars = new Array(5).fill(false); // Initialize an array of 5 elements with false values

  for (let i = 0; i < starCount; i++) {
    stars[i] = true; // Set the first `starCount` elements to true to represent gold stars
  }

  return stars;
}
  vCards(): any[] {
    return this.cardsArray;
  }
  
}

