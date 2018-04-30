import {CellState} from './cell_state';

export interface BoardProps {
    cells: Array<Array<CellState>>;
    handleClick: (row: number, column: number) => any;
}

export interface RowProps {
    cells: Array<CellState>;
    handleClick: (row: number, column: number) => any;
    rowId: number;
}

export interface CellProps {
    cell: CellState;
    handleClick: (row: number, column: number) => any;
    rowId: number;
    columnId: number;
}

export interface CircleProps {
    cell: CellState;
}