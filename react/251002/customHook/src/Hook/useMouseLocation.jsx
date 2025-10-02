import { useEffect, useState } from "react";

function useMouseLocation(initVal) {
    const [mouseLocation, setMouseLocation] = useState(initVal || { x: null, y: null });

    useEffect(() => {
        window.addEventListener('mousemove', (event) => {

            console.log(event);

            setMouseLocation({ x: event.x, y: event.y });
        });
    }, []);

    return mouseLocation;

}

export default useMouseLocation;