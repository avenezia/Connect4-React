import * as React from 'react';

import Cell from './cell';

function Row() {
    let style = {
          display: 'flex'
    };
    const numberOfColumns = 7;
    let cells = [];
    for (let i = 0; i < numberOfColumns; i++) {
        cells.push(<Cell/>);
    }
    return (
        <div style={style}>
            {cells}
        </div>
    );
}

export default Row;