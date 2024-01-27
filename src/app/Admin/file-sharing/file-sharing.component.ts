import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import Swal from 'sweetalert2';


interface ProjectResource {
  url: string;
  type: string;
  _id: string;
}
interface Project {
  _id: any;
  name: string;
  is_enabled: boolean;
  client_id: string;
  start_date: Date;
  deadline: Date;
  handel_by: { name: string };
  current_status: string;
  project_resourses: ProjectResource[];
}
@Component({
  selector: 'app-file-sharing',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './file-sharing.component.html',
  styleUrl: './file-sharing.component.css'
})
export class FileSharingAdminComponent {


  is_accpeted:boolean|any;
  is_viewed_by_client:boolean|any;
  review_comment:string|any;

  
  FileSharingTable: any = [];
  FileSharingTableData: any;
  projectsName: any;
  FileSharing: any = {
    project_id:'',
    file_sharing: File,
  };


  constructor(private apiService:ApiServiceService,private router: Router, public route: ActivatedRoute) {}

  ngOnInit(): void{
    this.getProject();
    this.getFileSharing();
  }

  getProject(){
    this.projectsName = {};
    this.apiService.getProject().subscribe(
      (r:any) => {
        this.projectsName = r.data;
        console.log('==> ==>',r.data)
        console.log('projects Name',this.projectsName)
      },
      (e) => {
        console.error(e);
      }
    )
  }

  getFileSharing(){
    this.FileSharingTable = {};
    this.apiService.getFileSharing().subscribe(
      (r:any) => {
        this.FileSharingTableData = r.data;
        this.FileSharingTable = r.data;
        console.log('==> ==>',r.data)
        console.log('get file sharing',this.FileSharingTable)
      },
      (e) => {
        console.error(e);
      }
    )
  }

  

  onChangeFileSharing(event:any){
    this.FileSharing.file_sharing = event.target.files[0];
    console.log(this.FileSharing.file_sharing)
  }

  saveFileSharing(project:any){
    this.FileSharing.user_id = localStorage.getItem('userId')
    const formData = new FormData();

    formData.append('project_id', this.FileSharing.project_id);
    formData.append('file_sharing', this.FileSharing.file_sharing);
    this.apiService.saveFileSharing(formData).subscribe(
      (r: any) => {
        console.log(r);
        Swal.fire({
          icon: 'success',
          title: 'Successful',
          text: r.data.message,
          showConfirmButton: false,
          timer: 3000,
        }).then((result) => {
          if (result) {
            
           
            this.getFileSharing();
            this.FileSharing = {};
          }
        });
      },
      (e: any) => {
        console.log("Error => ",e)
        Swal.fire('Error', e.error.message, 'error');
      }
    );
  }



  sendData(accpet:any,comment:any,viewed:any){
this.is_accpeted = accpet;
this.review_comment = comment;
this.is_viewed_by_client = viewed;
  }


  searchFileSharingTable: string = '';
  FileSharingTablePageperPage: number = 12;
  currentFileSharingTablePage: number = 1;
 
  FilterFileSharingTable() {
   this.FileSharingTable = this.FileSharingTableData.filter((projectData: { project_id: {name:string}; }) =>
   projectData.project_id.name.toLowerCase().includes(this.searchFileSharingTable.toLowerCase()) 
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
