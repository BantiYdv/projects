import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiServiceService } from '../../service/api-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

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
id:any;

  creativeAssetFolder: Folder[] = [];


  constructor(private apiService:ApiServiceService,private route:ActivatedRoute){}

  ngOnInit(): void {
   
    // this.route.queryParams.subscribe(r => {
    //   this.id = r['id'];
    // })
    const id = localStorage.getItem('userId')
    this.getClientProjectList(id);
  }
  getClientProjectList(id:any){
    // const team_member_id = localStorage.getItem('userId')
    this.apiService.getClientProjectList(id).subscribe(
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
