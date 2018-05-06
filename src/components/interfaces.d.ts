import {CellPlayer} from './cell_player';

export interface BoardProps {
    cells: Array<Array<CellPlayer>>;
    handleClick: (row: number, column: number) => any;
}

export interface RowProps {
    cells: Array<CellPlayer>;
    handleClick: (row: number, column: number) => any;
    rowId: number;
}

export interface CellProps {
    cell: CellPlayer;
    handleClick: (row: number, column: number) => any;
    rowId: number;
    columnId: number;
}

export interface CircleProps {
    cell: CellPlayer;
}