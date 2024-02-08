import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CelebrationComponent } from '../celebration/celebration.component';
import { WellcomeComponent } from '../wellcome/wellcome.component';
import { RouterLink, Router } from '@angular/router';
// import { Router } from 'express';


@Component({
  selector: 'app-ox-game',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule, CelebrationComponent,WellcomeComponent],
  providers: [MessageService],
  templateUrl: './ox-game.component.html',
  styleUrl: './ox-game.component.css',
})
export class OxGameComponent implements OnInit {
  celebration:boolean = false;
  showOX: any = true;
  // currentPlayer: string = 'X';
  player1:any;
  player2:any;

  constructor(private messageService: MessageService, private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.showOX = false;
    }, 6000);
  }

  // board: string[][] = [
  //   ['', '', ''],
  //   ['', '', ''],
  //   ['', '', ''],
  // ];

  // switchPlayer(): void {
  //   this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  // }
  savePlayers() {
    localStorage.setItem('player1',this.player1)
    localStorage.setItem('player2',this.player2)
    this.celebration= true;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Players saved successfully.',
    });
    setTimeout(() => {
      this.celebration= false;
      this.player1 = '';
      this.player2 = '';
      this.router.navigate(['/play-game']);
    }, 3000);
  }
  showInfo() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Message Content',
    });
  }
  showWarn() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: 'Message Content',
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Message Content',
    });
  }

  // makeMove(row: number, col: number): void {
  //   if (this.board[row][col] === '') {
  //     this.board[row][col] = this.currentPlayer;
  //     this.switchPlayer();
  //   }  
  // }

  // getCellValue(row: number, col: number): string {
  //   return this.board[row][col];
  // }
}
