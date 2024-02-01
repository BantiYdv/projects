import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';

interface TableData {
  name: string;
  date: string;
 
}

@Component({
  selector: 'app-creative-asset-table',
  standalone: true,
  imports: [CommonModule,FormsModule,],
  templateUrl: './creative-asset-table.component.html',
  styleUrl: './creative-asset-table.component.css'
})
export class CreativeAssetTableComponent {
  id:any;
  creativeAssetsTable: TableData[] = [];
  assetsFolderTableData: any;
  constructor(private route:ActivatedRoute, private apiService:ApiServiceService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(r => {
      this.id = r['id'];
    })
if(this.id){
  this.getCreativeAssetsOfMember(this.id)
}
  }

  getCreativeAssetsOfMember(id:any){
    this.apiService.getCreativeAssetsOfMember(id).subscribe(
      (r: any) => {
        this.creativeAssetsTable = r.data;
        this.assetsFolderTableData = r.data
        console.log('getProjectById =>', this.creativeAssetsTable);
      },
      (e) => {
        console.error(e);
      }
    )
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
