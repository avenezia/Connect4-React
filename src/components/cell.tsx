import * as React from 'react';

import Circle from './circle';
import { CellProps } from './interfaces';

function Cell(props: CellProps) {
    const style = {
        height: 50,
        width: 50,
        border: '1px solid black',
        backgroundColor: 'yellow'
    };

    return (
        <div style={style} onClick={() => props.handleClick(props.rowId, props.columnId)}>
            <Circle cell={props.cell}/>
        </div>
    );
}

export default Cell;