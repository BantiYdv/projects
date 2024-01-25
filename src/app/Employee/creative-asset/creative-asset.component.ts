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
  selector: 'app-creative-asset',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterLink],
  templateUrl: './creative-asset.component.html',
  styleUrl: './creative-asset.component.css'
})



export class CreativeAssetsEmployeeComponent {


  creativeAssetFolder: Folder[] = [];


  constructor(private apiService:ApiServiceService){}

  ngOnInit(): void {
   
    this.getTeamMemberProjects();
    
  }
  getTeamMemberProjects(){
    const team_member_id = localStorage.getItem('userId')
    this.apiService.getTeamMemberProjects(team_member_id).subscribe(
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
