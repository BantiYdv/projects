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
  constructor(private route:ActivatedRoute, private apiService:ApiServiceService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(r => {
      this.id = r['id'];
    })

    this.getCreativeAssetsOfMember(this.id)
  }

  getCreativeAssetsOfMember(id:any){
    this.apiService.getCreativeAssetsOfMember(id).subscribe(
      (r: any) => {
        this.creativeAssetsTable = r.data;
        console.log('getProjectById =>', this.creativeAssetsTable);
      },
      (e) => {
        console.error(e);
      }
    )
}


}
