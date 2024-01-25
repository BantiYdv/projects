import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiServiceService } from '../../service/api-service.service';
import { RouterLink } from '@angular/router';

interface Folder {
  _id: any;
  name: string;
  short_name: string;
}
@Component({
  selector: 'app-creative-assets',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterLink],
  templateUrl: './creative-assets.component.html',
  styleUrl: './creative-assets.component.css'
})
export class CreativeAssetsAdminComponent {


  creativeAssetFolder: Folder[] = [];


  constructor(private apiService:ApiServiceService){}

  ngOnInit(): void {
   
    this.getProject();
    
  }
  getProject(){
    this.apiService.getProject().subscribe(
      (r: any) => {
        this.creativeAssetFolder = r.data;
        console.log('Get employee Project List', this.creativeAssetFolder);
      },
      (e) => {
        console.error(e);
      }
    )
  }
}
