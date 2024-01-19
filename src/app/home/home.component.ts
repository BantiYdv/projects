import { Component, ElementRef, HostListener, OnInit  } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../service/api-service.service';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NavbarComponent, AppComponent, CommonModule, CarouselModule, TagModule ,ButtonModule],
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

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  items = new Array(30);
  
  cardsArray = [
    { imageUrl: '../../assets/images/jazz_img.svg', title: 'Portfolio Item 01', description: 'Description and Details Here 01' },
    { imageUrl: '../../assets/images/card_img_1.svg', title: 'Portfolio Item 02', description: 'Description and Details Here 02' },
    { imageUrl: '../../assets/images/card_img_2.svg', title: 'Portfolio Item 03', description: 'Description and Details Here 03' },
    { imageUrl: '../../assets/images/card_img_1.svg', title: 'Portfolio Item 04', description: 'Description and Details Here 04' },
    { imageUrl: '../../assets/images/card_img_2.svg', title: 'Portfolio Item 05', description: 'Description and Details Here 05' },
    // Add more items as needed
  ];
  cardsArrayData = [
    {
    name: "Lorem Ipsum is simply dummy text",
    profession: "Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since",
    imageUrl: "../../assets/images/man_pro.jpg",
    stars: 4,
    userName: "Max Deni",
    userPosition: "Frontend Developer"
  },
    {
    name: "Lorem Ipsum is simply dummy text",
    profession: "Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since",
    imageUrl: "../../assets/images/man_pro.jpg",
    stars: 4,
    userName: "Max Deni",
    userPosition: "Frontend Developer"
  },
    {
    name: "Lorem Ipsum is simply dummy text",
    profession: "Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since",
    imageUrl: "../../assets/images/man_pro.jpg",
    stars: 1,
    userName: "Raj Kumar",
    userPosition: "Frontend Developer"
  },
    {
    name: "Lorem Ipsum is simply dummy text",
    profession: "Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since",
    imageUrl: "../../assets/images/man_pro.jpg",
    stars: 3,
    userName: "Sohan Yadav",
    userPosition: "Backend Developer"
  },
    {
    name: "Lorem Ipsum is simply dummy text",
    profession: "Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since Lorem Ipsum has been the industry's standard dummy text ever since",
    imageUrl: "../../assets/images/man_pro.jpg",
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
  playVideo(video: HTMLVideoElement) {
    video.play();
  }

  pauseVideo(video: HTMLVideoElement) {
    video.pause();
    video.currentTime = 0;
  }
  
}

