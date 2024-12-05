import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.css'
})
export class TicTacToeComponent {
  WIDTH = 3;
  HEIGHT = 3;
  X_SYMBOL = '❌';
  O_SYMBOL = '⭕';

  currentPlayer: string = this.X_SYMBOL;
  board: string[][] = Array.from({ length: this.HEIGHT }, () => Array(this.WIDTH).fill(''));
  cells: HTMLDivElement[][] = [];
  message: string = '';

  constructor() {
    this.initializeBoard();
  }

  initializeBoard(): void {
    const boardElement = document.getElementById('board');
    for (let y = 0; y < this.HEIGHT; y++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let x = 0; x < this.WIDTH; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.addEventListener('click', () => this.handleCellClick(x, y));
            cell.addEventListener('contextmenu', (event) => {
                event.preventDefault();
            });
            row.appendChild(cell);
        }
        if (boardElement) {
          boardElement.appendChild(row);
        }
    }

  }

  handleCellClick(x: number, y: number): void {
    if (this.board[y][x] !== '' || this.message) {
      return;
    }

    this.board[y][x] = this.currentPlayer;
    const winner = this.checkWinner();

    if (winner) {
      this.message = `${winner} wins!`;
    } else {
      this.currentPlayer = this.currentPlayer === this.X_SYMBOL ? this.O_SYMBOL : this.X_SYMBOL;
    }
  }

  checkWinner(): string | null {
    for (let y = 0; y < this.HEIGHT; y++) {
      if (this.board[y][0] && this.board[y][0] === this.board[y][1] && this.board[y][1] === this.board[y][2]) {
        return this.board[y][0];
      }
    }

    for (let x = 0; x < this.WIDTH; x++) {
      if (this.board[0][x] && this.board[0][x] === this.board[1][x] && this.board[1][x] === this.board[2][x]) {
        return this.board[0][x];
      }
    }

    if (this.board[0][0] && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
      return this.board[0][0];
    }

    if (this.board[0][2] && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
      return this.board[0][2];
    }

    return null;
  }

  resetGame(): void {
    this.board = Array.from({ length: this.HEIGHT }, () => Array(this.WIDTH).fill(''));
    this.currentPlayer = this.X_SYMBOL;
    this.message = '';
  }
}
