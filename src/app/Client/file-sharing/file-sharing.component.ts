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
  selector: 'app-file-sharing',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterLink],
  templateUrl: './file-sharing.component.html',
  styleUrl: './file-sharing.component.css'
})
export class FileSharingUserComponent {


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
