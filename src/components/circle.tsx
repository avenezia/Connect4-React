import * as React from 'react';

function Circle() {
    var style = {
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '100%',
        paddingTop: '98%'
    };
    return (
       <div style={style}/>
    );
}

export default Circle;