import * as React from 'react';

import Board from './board';
import { CellState } from './cell_state';

class Game extends React.Component<any, any> {
    readonly numRows = 6;
    readonly numCols = 7;

    constructor(props: any) {
        super(props);
        this.state = {cells: this.getInitialCells(), isRedTurn: false, winner: CellState.Empty};
        this.handleClick = this.handleClick.bind(this);
    }

    getInitialCells() {
        let cells: Array<Array<CellState>> = [];
        for (let i = 0; i < this.numRows; i++) {
            cells.push(new Array(this.numCols).fill(CellState.Empty));
        }
        return cells;
    }

    render() {
        return (
            <div>
                <h1>{this.header()}</h1>
                <Board
                    cells={this.state.cells}
                    handleClick={this.handleClick}
                />
                <button style={{marginTop: '1em'}} onClick={() => this.restartGame()}>Restart</button>
            </div>
        );
    }

    header() {
        if (this.state.winner !== CellState.Empty) {
            return this.state.winner === CellState.Red ? 'Red wins' : 'Black wins';
        } else {
            return this.state.isRedTurn ? 'Red\'s turn' : 'Black\'s turn';
        }
    }

    handleClick(row: number, column: number) {
        if (this.state.winner !== CellState.Empty) {
            return;
        }

        let rowToBeUsed: number = this.availableCellInColumn(column);
        if (rowToBeUsed !== -1) {
            const newCells = this.updateCellOnClick(rowToBeUsed, column);
            if (this.checkVictory(rowToBeUsed, column, newCells)) {
                this.setState({cells: newCells, winner: (this.state.isRedTurn) ? CellState.Red : CellState.Black});
            } else {
                this.setState({cells: newCells, isRedTurn: !this.state.isRedTurn});
            }
        } else {
            this.setState({isRedTurn: !this.state.isRedTurn});
        }
    }

    restartGame() {
        this.setState({cells: this.getInitialCells(), isRedTurn: false, winner: CellState.Empty});
    }

    updateCellOnClick(row: number, column: number): Array<Array<CellState>> {
        let tempCells: Array<Array<CellState>> = [];
        for (let i = 0; i < 6; i++) {
            tempCells.push(this.state.cells[i].slice());
        }
        tempCells[row][column] =
            (this.state.isRedTurn ? CellState.Red : CellState.Black);
        return tempCells;
    }

    availableCellInColumn(column: number): number {
        for (let i = this.numRows - 1; i >= 0; i--) {
            if (this.state.cells[i][column] === CellState.Empty) {
                return i;
            }
        }

        return -1;
    }

    checkVictory(row: number, column: number, cells: Array<Array<CellState>>): boolean {
        return this.checkVerticalVictory(column, cells) ||
            this.checkHorizontalVictory(row, cells) ||
            this.checkDiagonalVictory(cells);
    }

    checkHorizontalVictory(row: number, cells: Array<Array<CellState>>): boolean {
        const playerToBeChecked = this.state.isRedTurn ? CellState.Red : CellState.Black;
        const maxColumnToStartThe4 = 3;
        for (let j = 0; j <= maxColumnToStartThe4; j++) {
            if (cells[row][j] === playerToBeChecked &&
                cells[row][j + 1] === playerToBeChecked &&
                cells[row][j + 2] === playerToBeChecked &&
                cells[row][j + 3] === playerToBeChecked) {
                    return true;
            }
        }
        return false;
    }

    checkVerticalVictory(column: number, cells: Array<Array<CellState>>): boolean {
        const playerToBeChecked = this.state.isRedTurn ? CellState.Red : CellState.Black;
        const maxRowToStartThe4 = 2;
        for (let i = 0; i <= maxRowToStartThe4; i++) {
            if (cells[i][column] === playerToBeChecked &&
                cells[i + 1][column] === playerToBeChecked &&
                cells[i + 2][column] === playerToBeChecked &&
                cells[i + 3][column] === playerToBeChecked) {
                    return true;
            }
        }
        return false;
    }

    // TODO: diagonal check should be refactored.
    checkDiagonalVictory(cells: Array<Array<CellState>>): boolean {
        const player = this.state.isRedTurn ? CellState.Red : CellState.Black;
        return this.checkTopLeftBottomRightDiagonal(player, cells) ||
            this.checkBottomLeftTopRightDiagonal(player, cells);
    }

    checkTopLeftBottomRightDiagonal(player: CellState, cells: Array<Array<CellState>>): boolean {
        let rowIndex = 0, colIndex = 0;
        const maxRowToStartDiagonal = 2;
        const maxColumnToStartDiagonal = 3;

        while (rowIndex <= maxRowToStartDiagonal) {
            while (colIndex <= maxColumnToStartDiagonal) {
                if (rowIndex + 3 < this.numRows && colIndex + 3 < this.numCols) {
                    if (cells[rowIndex][colIndex] === player &&
                        cells[rowIndex + 1][colIndex + 1] === player &&
                        cells[rowIndex + 2][colIndex + 2] === player &&
                        cells[rowIndex + 3][colIndex + 3] === player) {
                            return true;
                    }
                }
                colIndex++;
            }
            rowIndex++;
            colIndex = 0;
        }
        return false;
    }

    checkBottomLeftTopRightDiagonal(player: CellState, cells: Array<Array<CellState>>): boolean {
        let rowIndex = this.numRows - 1, colIndex = 0;
        const minRowToStartDiagonal = 3;
        const maxColumnToStartDiagonal = 3;

        while (rowIndex >= minRowToStartDiagonal) {
            while (colIndex <= maxColumnToStartDiagonal) {
                if (rowIndex - 3 >= 0 && colIndex + 3 < this.numCols) {
                    if (cells[rowIndex][colIndex] === player &&
                        cells[rowIndex - 1][colIndex + 1] === player &&
                        cells[rowIndex - 2][colIndex + 2] === player &&
                        cells[rowIndex - 3][colIndex + 3] === player) {
                            return true;
                    }
                }
                colIndex++;
            }
            rowIndex--;
            colIndex = 0;
        }
        return false;
    }
}

export default Game;