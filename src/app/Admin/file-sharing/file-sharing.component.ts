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
  fileUpdate:any;
  project_id_data:any;
  filsharing_id_data:any;
  filsharing_name_data:any;
  file_sharing:any;
  

  


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
      },
      (e) => {
        console.error(e);
      }
    )
  }

  

  onChangeFileSharing(event:any){
    this.FileSharing.file_sharing = event.target.files[0];
  }
  onChangeFileSharingUpdate(event:any){
    this.file_sharing = event.target.files[0];
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
  deleteFileSharing(fileshareing_id:any,is_deleted:boolean){

    if(is_deleted == true){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          // If confirmed, proceed with the deletion
          this.apiService.deleteFileSharing(fileshareing_id,is_deleted).subscribe(
            (r:any) => {
              console.log(r)
              Swal.fire(
                'Deleted!',
                r.message,
                'success'
              );
              this.getFileSharing();
              // this.get_client_id();
            },
            (e) => {
              console.error(e)
              Swal.fire('Error!', e.error.message, 'error');
            }
          );
        }
      });
    }

    if(is_deleted == false){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, undo it!',
      }).then((result) => {
        if (result.isConfirmed) {
          // If confirmed, proceed with the deletion
          this.apiService.deleteFileSharing(fileshareing_id,is_deleted).subscribe(
            (r:any) => {
              Swal.fire(
                'Undo!',
                'file undo',
                'success'
              );
              this.getFileSharing();
              // this.get_client_id();
            },
            (e) => {
              console.error(e)
              Swal.fire('Error!', e.error.message, 'error');
            }
          );
        }
      });
    }
    }
   
    

    updateFileData(project_id:any,fileshareing_id:any,fileshareing_name:any){
this.project_id_data = project_id;
this.filsharing_id_data = fileshareing_id;
this.filsharing_name_data = fileshareing_name;
    }

    updateFileSharing(){
      const formData = new FormData();

      formData.append('project_id', this.project_id_data);
      formData.append('fileshareing_id', this.filsharing_id_data);
      formData.append('file_sharing', this.file_sharing);

   
      this.apiService.updateFileSharing(formData).subscribe(
        (r: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: r.data.message,
            showConfirmButton: false,
            timer: 3000,
          }).then((result) => {
            if (result) {
              this.getFileSharing();
            }
          });
        },
        (e: any) => {
          Swal.fire('Error', e.error.message, 'error');
        }
      );
    }
   
}
