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
        this.setState({cells: this.updateCellsOnClick(column), isRedTurn: !this.state.isRedTurn});        
    }

    updateCellsOnClick(column: number): Array<Array<CellState>> {
        let rowToBeFilled: number = this.availableCellInColumn(column);
        if (rowToBeFilled !== -1) {
            let tempCells: Array<Array<CellState>> = [];
            for (let i = 0; i < 6; i++) {
                tempCells.push(this.state.cells[i].slice());
            }
            tempCells[rowToBeFilled][column] =
                (this.state.isRedTurn ? CellState.Red : CellState.Black);
            return tempCells;
        } else {
            return this.state.cells;
        }
    }

    availableCellInColumn(column: number): number {
        for (let i = this.numRows - 1; i >= 0; i--) {
            if (this.state.cells[i][column] === CellState.Empty) {
                return i;
            }
        }

        return -1;
    }
}

export default Game;