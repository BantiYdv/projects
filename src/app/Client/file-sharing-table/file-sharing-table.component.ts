import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import Swal from 'sweetalert2';

interface TableData {
  _id:any;
  original_name: string;
  file_number: string;
  url:string;
  
}
@Component({
  selector: 'app-file-sharing-table',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './file-sharing-table.component.html',
  styleUrl: './file-sharing-table.component.css'
})
export class FileSharingTableComponent {
  
  is_accepted: boolean | any;
  review_comment: string | any;
  fileshareing_id:any;

  id:any;
  // creativeAssetsTable: TableData[] = [];
  FileSharingTable: TableData[] = [];
  FileSharingTableData: any;
  constructor(private route:ActivatedRoute, private apiService:ApiServiceService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(r => {
      this.id = r['id'];
    })

    this.getProjectById(this.id)
  }

  getProjectById(id:any){
    this.apiService.getFileSharingForReview(id).subscribe(
      (r: any) => {
        this.FileSharingTableData = r.data;
        this.FileSharingTable = r.data;
        console.log('Get employee Project List', this.FileSharingTable);
        // this.creativeAssetsTable = r.data;
        // console.log('Get employee Project List', this.creativeAssetsTable);
      },
      (e) => {
        console.error(e);
      }
    )
}
sendId(id:any){
  this.fileshareing_id = id;
}

accept() {
  this.is_accepted = true;
  this.saveReviewData();
}

decline() {
  this.is_accepted = false;
}

saveReviewData(){
  this.apiService.shareReviewForFiles(this.fileshareing_id,this.is_accepted,this.review_comment).subscribe(
    (r)=> {
console.log('shareReviewForFiles =>',r)
Swal.fire({
  icon: 'success',
  title: 'Review Saved',
  text: 'Your review has been saved successfully!',
});

this.is_accepted = '';
this.review_comment = '';

    },
    (e) => {
console.error('shareReviewForFiles',e)
Swal.fire({
  icon: 'error',
  title: 'Error',
  text: 'An error occurred while saving the review. Please try again.',
});
    }
  )
}
searchFileSharingTable: string = '';
  FileSharingTablePageperPage: number = 12;
  currentFileSharingTablePage: number = 1;
 
  FilterFileSharingTable() {
   this.FileSharingTable = this.FileSharingTableData.filter((folder: { original_name: string; }) =>
   folder.original_name.toLowerCase().includes(this.searchFileSharingTable.toLowerCase()) 
    );
  }
  

  getPaginatedFileSharingTableData(): any[] {
    const startIndex = (this.currentFileSharingTablePage - 1) * this.FileSharingTablePageperPage;
    const endIndex = startIndex + this.FileSharingTablePageperPage;
    return this.FileSharingTable.slice(startIndex, endIndex);
  }

  previousFileSharingTablePage(): void {
    if (this.currentFileSharingTablePage > 1) {
      this.currentFileSharingTablePage--;
    }
  }

  changePageFileSharingTable(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.getTotalPagesFileSharingTable()) {
      this.currentFileSharingTablePage = pageNumber;
    }
  }
  
  
  nextPageFileSharingTable(): void {
    const totalPages = Math.ceil(
      this.FileSharingTable.length / this.FileSharingTablePageperPage
    );
    if (this.currentFileSharingTablePage < totalPages) {
      this.currentFileSharingTablePage++;
    }
  }

  getPageNumbersFileSharingTable(): number[] {
    const totalPages = Math.ceil(
      this.FileSharingTable.length / this.FileSharingTablePageperPage
    );
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  getTotalPagesFileSharingTable(): number {
    return Math.ceil(
      this.FileSharingTable.length / this.FileSharingTablePageperPage
    );
  }
}