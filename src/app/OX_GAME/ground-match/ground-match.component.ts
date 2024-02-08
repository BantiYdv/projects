import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CelebrationComponent } from '../celebration/celebration.component';
import { PopService } from '../../service/pop.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-ground-match',
  standalone: true,
  imports: [CommonModule,CelebrationComponent,PopupComponent],
  templateUrl: './ground-match.component.html',
  styleUrl: './ground-match.component.css'
})
export class GroundMatchComponent implements OnInit {
  celebration:boolean = false;
  currentPlayer: string = 'X';
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];


  constructor(private popup : PopService){}
  ngOnInit(): void {
  }
  
  

  showPopup(): void {
    const popupData = { message: 'Hello from sender component!' };
    this.popup.setPopupData(popupData);
    this.popup.setPopupVisibility(true);
  }
  switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }
  // makeMove(row: number, col: number): void {
  //   if (this.board[row][col] === '') {
  //     this.board[row][col] = this.currentPlayer;
  //     this.switchPlayer();
  //   }
  // }
  makeMove(row: number, col: number): void {
    
    if (this.board[row][col] === '') {
      this.board[row][col] = this.currentPlayer;
    
      setTimeout(() => {
        var winner = this.checkWinner();
        if (winner) {
          this.celebration= true;
          setTimeout(() => {
            this.celebration= false;
          }, 3000);
          if(winner == 'X'){
            console.warn(`Player ${localStorage.getItem('player1')} wins!`)
            alert(`Player ${localStorage.getItem('player1')} wins!`);  
          }else{
            console.warn(`Player ${localStorage.getItem('player2')} wins!`)
            alert(`Player ${localStorage.getItem('player2')} wins!`);  
          }
          setTimeout(() => {
            this.resetGame();
          }, 3000);
        } else {
          this.switchPlayer();
        }
      }, 10);
      
    }
  }
  
  resetGame(): void {
    this.currentPlayer = 'X';
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
  }
  

  getCellValue(row: number, col: number): string {
    return this.board[row][col];
  }



  checkWinner(): string | null {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2] &&
        this.board[i][0] !== ''
      ) {
        return this.board[i][0];
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        this.board[0][i] === this.board[1][i] &&
        this.board[1][i] === this.board[2][i] &&
        this.board[0][i] !== ''
      ) {
        return this.board[0][i];
      }
    }

    // Check diagonals
    if (
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2] &&
      this.board[0][0] !== ''
    ) {
      return this.board[0][0];
    }

    if (
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0] &&
      this.board[0][2] !== ''
    ) {
      return this.board[0][2];
    }

    // No winner yet
    return null;
  }

}
