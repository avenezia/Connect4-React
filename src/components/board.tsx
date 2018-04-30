import * as React from 'react';

import { BoardProps } from './interfaces';
import Row from './row';

function Board(props: BoardProps) {
    let rows = [];

    for (let i = 0; i < props.cells.length; i++) {
        rows.push(
            <Row 
                key={i}
                rowId={i}
                cells={props.cells[i]}
                handleClick={props.handleClick}
            />);
    }
    let style = {margin: 'auto', width: '25%'};
    return (
        
        <div style={style}>
            {rows}
        </div>
    );
}

export default Board;