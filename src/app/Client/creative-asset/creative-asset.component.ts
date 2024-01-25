import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiServiceService } from '../../service/api-service.service';
import Swal from 'sweetalert2';
import { MultiSelectModule } from 'primeng/multiselect';

interface TableData {
  creativeInfo:{
    title:'',
    createdAt:''
    original_name:''
    url:''
  };
 
}

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-creative-asset',
  standalone: true,
  imports: [CommonModule,FormsModule,MultiSelectModule],
  templateUrl: './creative-asset.component.html',
  styleUrl: './creative-asset.component.css'
})
export class CreativeAssetsUserComponent {
  currentDate: string = new Date().toISOString().split('T')[0]; 
  projects:any =[
    {_id:''}
  ];
  assetsSave: any = {
    title:'',
    project_id:'',
    created_date:'',
    creative_attach: File,
  };
  id:any;
  creativeAssetsTable: TableData[] = [];
  constructor(private route:ActivatedRoute, private apiService:ApiServiceService){}


  ngOnInit(): void {

    this.assetsSave.created_date = this.currentDate;
    console.log('dfghjkl ==>',this.assetsSave.created_date)
    this.route.queryParams.subscribe(r => {
      this.id = r['id'];
    })
    const user_id = localStorage.getItem('userId');
    this.getClientProjectList(user_id);

    this.getAllCreativeAssetsOfClient()
  }


  getClientProjectList(id:any){
    this.apiService.getClientProjectList(id).subscribe(
      (r:any) => {
        this.projects = r.data;
      },
      (e) => {
        console.error(e);
      }
    )
  }
  onChangeProjectSave(event:any){
    this.assetsSave.creative_attach = event.target.files[0];
    console.log(this.assetsSave.creative_attach)
  }

//   getProjectById(id:any){
//     this.apiService.getProjectById(id).subscribe(
//       (r: any) => {
//         this.creativeAssetsTable = r.data.project_resourses;
//         console.log('Get employee Project List', this.creativeAssetsTable);
//       },
//       (e) => {
//         console.error(e);
//       }
//     )
// }
getAllCreativeAssetsOfClient(){
    this.apiService.getAllCreativeAssetsOfClient().subscribe(
      (r: any) => {
        this.creativeAssetsTable = r.data;
        console.log('getAllCreativeAssetsOfClient', r);
      },
      (e) => {
        console.error(e);
      }
    )
}

addCreativeAssets(data:any){
  const formData = new FormData();

  formData.append('title', this.assetsSave.title);
  formData.append('project_id', this.assetsSave.project_id);
  formData.append('created_date', this.assetsSave.created_date);
  formData.append('creative_attach', this.assetsSave.creative_attach);
  
  this.apiService.addCreativeAssets(formData).subscribe(
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
          
         
          this.getAllCreativeAssetsOfClient();
          // this.projectSave = {};
          this.assetsSave = {};
        }
      });
    },
    (e: any) => {
      console.log("Error => ",e)
      Swal.fire('Error', e.error.message, 'error');
    }
  );
}
}
