import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';

interface TableData {
  original_name: string;
  file_number: string;
  
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
  creativeAssetsTable: TableData[] = [];
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
        this.creativeAssetsTable = r.data;
        console.log('Get employee Project List', this.creativeAssetsTable);
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
    },
    (e) => {
console.error('shareReviewForFiles',e)
    }
  )
}
}