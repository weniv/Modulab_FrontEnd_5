import { useEffect, useState } from "react";

export function useScroll() {
    const [isBottom, setIsBottom] = useState(false);

    console.log(isBottom);

    // 뷰포트의 높이: window.innerHeight
    // 스크롤된 길이: document.documentElement.scrollTop
    // 페이지의 전체 높이: document.documentElement.offsetHeight
    // useEffect(() => {
    //     window.addEventListener('scroll', (event) => {
    //         console.log(event);
    //         setIsBottom(window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight);
    //     });
    // }, []);

    useEffect(() => {
        // 쓰로틀링 함수 (수정된 버전)
        function throttling(callback, delay) {
            let timer = null;

            return () => {

                if (timer === null) {
                    console.log('호출!');
                    timer = setTimeout(() => {
                        callback(); // 콜백 함수 실행
                        timer = null;
                    }, delay);
                }
            };
        }

        // 스크롤 핸들러 함수
        const handleScroll = () => {
            // 바닥 도달 확인
            const isAtBottom =
                window.innerHeight + document.documentElement.scrollTop + 20 >=
                document.documentElement.offsetHeight;

            setIsBottom(isAtBottom);
        };

        // 쓰로틀된 스크롤 핸들러 생성 (100ms 지연)
        const throttledScrollHandler = throttling(handleScroll, 100);

        // 이벤트 리스너 등록
        window.addEventListener("scroll", throttledScrollHandler);

        // 클린업
        return () => {
            window.removeEventListener("scroll", throttledScrollHandler);
        };
    }, []);


    return isBottom;

}