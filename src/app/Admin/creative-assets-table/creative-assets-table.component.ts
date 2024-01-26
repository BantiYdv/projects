import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';


interface TableData {
  title: string;
  date: string;
 
}

@Component({
  selector: 'app-creative-assets-table',
  standalone: true,
  imports: [CommonModule,FormsModule,MatSelectModule],
  templateUrl: './creative-assets-table.component.html',
  styleUrl: './creative-assets-table.component.css'
})
export class CreativeAssetsTableComponent {
  id:any;
  creativeAssetsTableIdData: any;
  assignTo : any;
  getTeamMemberList: any;
  creativeAssetsTable: any = [];
  constructor(private route:ActivatedRoute, private apiService:ApiServiceService){}

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(r => {
      this.id = r['id'];
    })

    this.cAGetAllCreativeAssets(this.id);
    this.assignTask();
  }

  sendId_Data(id:any){
this.creativeAssetsTableIdData = id;
  }

  cAGetAllCreativeAssets(id:any){
    this.apiService.cAGetAllCreativeAssets(id).subscribe(
      (r: any) => {
        this.creativeAssetsTable = r.data;
        console.log('Get ==>>>', this.creativeAssetsTable);
      },
      (e) => {
        console.error(e);
      }
    )
}
assignCreativeAssetsToTeamMember(member:any){
    this.apiService.assignCreativeAssetsToTeamMember(member,this.creativeAssetsTableIdData).subscribe(
      (r: any) => {
        console.log('done',r);
        Swal.fire({
          icon: 'success',
          title: 'Assets Assigned!',
          text: 'Creative assets have been successfully assigned to the team member.',
        });
        this.assignTo = '';
      },
      (e) => {
        console.error('eerorr',e);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'There was an error assigning creative assets.',
        });
      }
    )
}

assignTask() {
  this.apiService.assignTask(this.id).subscribe(
    (r: any) => {
      console.log('r-=-=->', r);
      this.getTeamMemberList = r.data.participants;
      console.warn(this.getTeamMemberList);
    },
    (e) => {
      console.error('error =--=-=>', e);
    }
  );
}

}
