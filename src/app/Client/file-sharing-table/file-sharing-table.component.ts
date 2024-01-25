import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';

interface TableData {
  name: string;
  fileNo: string;
 
}
@Component({
  selector: 'app-file-sharing-table',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './file-sharing-table.component.html',
  styleUrl: './file-sharing-table.component.css'
})
export class FileSharingTableComponent {
  id:any;
  creativeAssetsTable: TableData[] = [
    {name:'AVX Media 1', fileNo:'1'},
    {name:'AVX Media 4', fileNo:'4'},
    {name:'AVX Media 2', fileNo:'2'}
  ];
  constructor(private route:ActivatedRoute, private apiService:ApiServiceService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(r => {
      this.id = r['id'];
    })

    this.getProjectById(this.id)
  }

  getProjectById(id:any){
    this.apiService.getProjectById(id).subscribe(
      (r: any) => {
        this.creativeAssetsTable = r.data.project_resourses;
        console.log('Get employee Project List', this.creativeAssetsTable);
      },
      (e) => {
        console.error(e);
      }
    )
}
}