import * as React from 'react';
import { CircleProps } from './interfaces';
import { CellState } from './cell_state';

function Circle(props: CircleProps) {
    let circleColor = 'white';
    if (props.cell === CellState.Black) {
        circleColor = 'black';
    } else if (props.cell === CellState.Red) {
        circleColor = 'red';
    }

    const style = {
        backgroundColor: circleColor,
        border: '1px solid black',
        borderRadius: '100%',
        paddingTop: '98%'
    };
    return (
       <div style={style}/>
    );
}

export default Circle;