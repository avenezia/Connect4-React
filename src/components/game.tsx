import * as React from 'react';

import Board from './board';

class Game extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Blacks Turn</h1>
                <Board/>
                <button style={{marginTop: '1em'}}>Restart</button>
            </div>
        );
    }
}

export default Game;