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
  assetsFolderTableData: any;
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
        this.assetsFolderTableData = r.data
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


searchcreativeAssetTable: string = '';
  creativeAssetTablePageperPage: number = 12;
  currentcreativeAssetTablePage: number = 1;
 
  FiltercreativeAssetTable() {
   this.creativeAssetsTable = this.assetsFolderTableData.filter((folder: { title: string; }) =>
   folder.title.toLowerCase().includes(this.searchcreativeAssetTable.toLowerCase()) 
    );
  }
  

  getPaginatedcreativeAssetTableData(): any[] {
    const startIndex = (this.currentcreativeAssetTablePage - 1) * this.creativeAssetTablePageperPage;
    const endIndex = startIndex + this.creativeAssetTablePageperPage;
    return this.creativeAssetsTable.slice(startIndex, endIndex);
  }

  previouscreativeAssetTablePage(): void {
    if (this.currentcreativeAssetTablePage > 1) {
      this.currentcreativeAssetTablePage--;
    }
  }

  changePagecreativeAssetTable(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.getTotalPagescreativeAssetTable()) {
      this.currentcreativeAssetTablePage = pageNumber;
    }
  }
  
  
  nextPagecreativeAssetTable(): void {
    const totalPages = Math.ceil(
      this.creativeAssetsTable.length / this.creativeAssetTablePageperPage
    );
    if (this.currentcreativeAssetTablePage < totalPages) {
      this.currentcreativeAssetTablePage++;
    }
  }

  getPageNumberscreativeAssetTable(): number[] {
    const totalPages = Math.ceil(
      this.creativeAssetsTable.length / this.creativeAssetTablePageperPage
    );
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  getTotalPagescreativeAssetTable(): number {
    return Math.ceil(
      this.creativeAssetsTable.length / this.creativeAssetTablePageperPage
    );
  }


}
