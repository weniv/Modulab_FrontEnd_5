import React from 'react'
import useMouseLocation from './Hook/useMouseLocation';

export default function TestComp() {

    const mouseLocation = useMouseLocation({ x: 0, y: 0 });

    return (
        <div style={{ height: 100, width: 100, backgroundColor: mouseLocation.x > 100 ? 'royalblue' : 'hotpink' }}>TestComp</div>
    )
}
