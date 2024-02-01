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

  // creativeAssetFolder: Folder[] = [];
  FileSharingClientFolder: Folder[] = [];
  FileSharingClientData: any;

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
    this.apiService.getClientFileSharingProjects(id).subscribe(
      (r: any) => {
        // this.creativeAssetFolder = r.data;
        this.FileSharingClientData = r.data;
        this.FileSharingClientFolder = r.data;
        console.log('Get employee Project List', this.FileSharingClientFolder);
        // console.log('Get employee Project List', this.creativeAssetFolder);
      },
      (e) => {
        console.error(e);
      }
    )
  }




  searchFileSharingClient: string = '';
  FileSharingClientPageperPage: number = 12;
  currentFileSharingClientPage: number = 1;
 
  FilterFileSharingClient() {
   this.FileSharingClientFolder = this.FileSharingClientData.filter((folder: { short_name: string; }) =>
   folder.short_name.toLowerCase().includes(this.searchFileSharingClient.toLowerCase()) 
    );
  }
  

  getPaginatedFileSharingClientData(): any[] {
    const startIndex = (this.currentFileSharingClientPage - 1) * this.FileSharingClientPageperPage;
    const endIndex = startIndex + this.FileSharingClientPageperPage;
    return this.FileSharingClientFolder.slice(startIndex, endIndex);
  }

  previousFileSharingClientPage(): void {
    if (this.currentFileSharingClientPage > 1) {
      this.currentFileSharingClientPage--;
    }
  }

  changePageFileSharingClient(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.getTotalPagesFileSharingClient()) {
      this.currentFileSharingClientPage = pageNumber;
    }
  }
  
  
  nextPageFileSharingClient(): void {
    const totalPages = Math.ceil(
      this.FileSharingClientFolder.length / this.FileSharingClientPageperPage
    );
    if (this.currentFileSharingClientPage < totalPages) {
      this.currentFileSharingClientPage++;
    }
  }

  getPageNumbersFileSharingClient(): number[] {
    const totalPages = Math.ceil(
      this.FileSharingClientFolder.length / this.FileSharingClientPageperPage
    );
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  getTotalPagesFileSharingClient(): number {
    return Math.ceil(
      this.FileSharingClientFolder.length / this.FileSharingClientPageperPage
    );
  }
}
