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
  assetsFolderClientData: any;
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
        this.assetsFolderClientData = r.data;
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

searchcreativeAssetClient: string = '';
  creativeAssetClientPageperPage: number = 12;
  currentcreativeAssetClientPage: number = 1;
 
  FiltercreativeAssetClient() {
   this.creativeAssetsTable = this.assetsFolderClientData.filter((folder: { creativeInfo: {title:string}; }) =>
   folder.creativeInfo.title.toLowerCase().includes(this.searchcreativeAssetClient.toLowerCase()) 
    );
  }
  

  getPaginatedcreativeAssetClientData(): any[] {
    const startIndex = (this.currentcreativeAssetClientPage - 1) * this.creativeAssetClientPageperPage;
    const endIndex = startIndex + this.creativeAssetClientPageperPage;
    return this.creativeAssetsTable.slice(startIndex, endIndex);
  }

  previouscreativeAssetClientPage(): void {
    if (this.currentcreativeAssetClientPage > 1) {
      this.currentcreativeAssetClientPage--;
    }
  }

  changePagecreativeAssetClient(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.getTotalPagescreativeAssetClient()) {
      this.currentcreativeAssetClientPage = pageNumber;
    }
  }
  
  
  nextPagecreativeAssetClient(): void {
    const totalPages = Math.ceil(
      this.creativeAssetsTable.length / this.creativeAssetClientPageperPage
    );
    if (this.currentcreativeAssetClientPage < totalPages) {
      this.currentcreativeAssetClientPage++;
    }
  }

  getPageNumberscreativeAssetClient(): number[] {
    const totalPages = Math.ceil(
      this.creativeAssetsTable.length / this.creativeAssetClientPageperPage
    );
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  getTotalPagescreativeAssetClient(): number {
    return Math.ceil(
      this.creativeAssetsTable.length / this.creativeAssetClientPageperPage
    );
  }

}
