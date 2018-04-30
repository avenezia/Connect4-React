import * as React from 'react';

import Cell from './cell';
import { RowProps } from './interfaces';

function Row(props: RowProps) {
    let style = {
          display: 'flex'
    };

    let cells = [];
    for (let i = 0; i < props.cells.length; i++) {
        cells.push(
            <Cell
                key={i}
                rowId={props.rowId}
                columnId={i}
                cell={props.cells[i]}
                handleClick={props.handleClick}
            />);
    }
    return (
        <div style={style}>
            {cells}
        </div>
    );
}

export default Row;