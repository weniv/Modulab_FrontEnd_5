import { useEffect, useRef, useState } from "react";

export function useScroll() {
    const [isBottom, setIsBottom] = useState(false);
    const bottomLineRef = useRef();

    useEffect(() => {
        const bottomLine = document.createElement('div');
        bottomLine.style.height = '10px';
        bottomLine.style.backgroundColor = 'blue';

        document.body.append(bottomLine);
        bottomLineRef.current = bottomLine;

        const observer = new IntersectionObserver(
            (entry) => {
                setIsBottom(entry[0].isIntersecting);
            },
            {
                root: null,
                threshold: 1,
                rootMargin: '120px'
            }
        );

        observer.observe(bottomLine);

        // 클린업
        return () => {
            observer.unobserve(bottomLine);
            document.body.removeChild(bottomLineRef.current);
        };
    }, []);


    return isBottom;

}