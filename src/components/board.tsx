import * as React from 'react';

import Row from './row';

function Board() {
    let rows = [];
    for (let i = 0; i <= 5; i++) {
        rows.push(<Row/>);
    }
    let style = {margin: 'auto', width: '30%'};
    return (
        
        <div style={style}>
            {rows}
        </div>
    );
}

export default Board;