import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TableData {
  name: string;
  date: string;
 
}

@Component({
  selector: 'app-creative-asset-table',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './creative-asset-table.component.html',
  styleUrl: './creative-asset-table.component.css'
})
export class CreativeAssetTableComponent {
  
  creativeAssetsTable: TableData[] = [
    { name: 'AVX Website', date: '2024-01-01', },
    { name: 'AVX Website', date: '2024-01-01', },
    { name: 'AVX Website', date: '2024-01-01', },
    { name: 'AVX Website', date: '2024-01-01', },
    { name: 'AVX Website', date: '2024-01-01', },
    { name: 'AVX Website', date: '2024-01-01', },
   
  ];
}
