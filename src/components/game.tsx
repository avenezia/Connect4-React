import * as React from 'react';

import Board from './board';
import { CellState } from './cell_state';

class Game extends React.Component<any, any> {
    readonly numRows = 6;
    readonly numCols = 7;

    constructor(props: any) {
        super(props);    

        let cells: Array<Array<CellState>> = [];
        for (let i = 0; i < this.numRows; i++) {
            cells.push(new Array(this.numCols).fill(CellState.Empty));
        }

        this.state = {cells: cells, isRedTurn: false};
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div>
                <h1>{this.state.isRedTurn ? 'Red\'s turn' : 'Black\'s turn'}</h1>
                <Board 
                    cells={this.state.cells}
                    handleClick={this.handleClick}
                />
                <button style={{marginTop: '1em'}}>Restart</button>
            </div>
        );
    }

    handleClick(row: number, column: number) {
        console.log('Click received ' + row + ' ' + column);
        let rowToBeUsed: number = this.availableCellInColumn(column);
        if (rowToBeUsed !== -1) {
            const newCells = this.updateCellsOnClick(rowToBeUsed, column);
            console.log(this.checkVerticalVictory(column, newCells));
            console.log(this.checkHorizontalVictory(rowToBeUsed, newCells));
            this.setState({cells: newCells, isRedTurn: !this.state.isRedTurn});
        } else {
            this.setState({isRedTurn: !this.state.isRedTurn});
        }
    }

    updateCellsOnClick(row: number, column: number): Array<Array<CellState>> {
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

    checkHorizontalVictory(row: number, cells: Array<Array<CellState>>): boolean {
        const playerToBeChecked = this.state.isRedTurn ? CellState.Red : CellState.Black;
        for (let j = 0; j < 4; j++) {
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
        for (let i = 0; i < 3; i++) {
            if (cells[i][column] === playerToBeChecked &&
                cells[i + 1][column] === playerToBeChecked &&
                cells[i + 2][column] === playerToBeChecked &&
                cells[i + 3][column] === playerToBeChecked) {
                    return true;
            }
        }
        return false;
    }
}

export default Game;