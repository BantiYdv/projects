import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatSelectModule } from '@angular/material/select';


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
  addParticipantData : any;
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

assignTask(){
  this.apiService.assignTask(this.id).subscribe(
    (r:any)=> {
      console.log('r-=-=->',r)
this.getTeamMemberList = r.data.handel_by;
console.warn(this.getTeamMemberList)
    },
    (e)=> {
console.error('error =--=-=>',e)
    }
  )
}
}
