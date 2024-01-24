import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Folder {
  name: string;
  img: string;
}

@Component({
  selector: 'app-creative-asset',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './creative-asset.component.html',
  styleUrl: './creative-asset.component.css'
})



export class CreativeAssetComponent {


  creativeAssetFolder: Folder[] = [
    { name: 'AVX Website', img: '../../../assets/images/creativeAssetsFolder.svg', },
    { name: 'AVX Website', img: '../../../assets/images/creativeAssetsFolder.svg', },
    { name: 'AVX Website', img: '../../../assets/images/creativeAssetsFolder.svg', },
    { name: 'AVX Website', img: '../../../assets/images/creativeAssetsFolder.svg', },
    { name: 'AVX Website', img: '../../../assets/images/creativeAssetsFolder.svg', },
    { name: 'AVX Website', img: '../../../assets/images/creativeAssetsFolder.svg', },
    { name: 'AVX Website', img: '../../../assets/images/creativeAssetsFolder.svg', },
    { name: 'AVX Website', img: '../../../assets/images/creativeAssetsFolder.svg', },
    { name: 'AVX Website', img: '../../../assets/images/creativeAssetsFolder.svg', },
    { name: 'AVX Website', img: '../../../assets/images/creativeAssetsFolder.svg', },
    { name: 'AVX Website', img: '../../../assets/images/creativeAssetsFolder.svg', },
    { name: 'AVX Website', img: '../../../assets/images/creativeAssetsFolder.svg', },
    { name: 'AVX Website', img: '../../../assets/images/creativeAssetsFolder.svg', },
    { name: 'AVX Website', img: '../../../assets/images/creativeAssetsFolder.svg', },
    { name: 'AVX Website', img: '../../../assets/images/creativeAssetsFolder.svg', },
    { name: 'AVX Website', img: '../../../assets/images/creativeAssetsFolder.svg', },
   
  ];
}
