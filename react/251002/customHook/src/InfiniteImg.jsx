import React, { useEffect, useState } from 'react'
import ImageList from './ImageList';
import { useScroll } from './Hook/useScroll';
import Loading from './Loading';

export default function InfiniteImg() {
    const [imageList, setImageList] = useState([]);
    const [pageToFetch, setPageToFetch] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const isBottom = useScroll();

    async function fetchImages() {
        setIsLoading(true);
        try {
            const response = await fetch(`https://picsum.photos/v2/list?page=${pageToFetch}&limit=5`);

            if (!response.ok) {
                throw new Error('네트워크에 문제가 있습니다!');
            }

            const data = await response.json();
            // setImageList((prevImg) => [...prevImg, ...data]);

            setImageList((prevImg) => {
                if (pageToFetch === 1) return [...data];
                else return [...prevImg, ...data];
            });

            setPageToFetch((prev) => prev + 1);

            setIsLoading(false);
        } catch (error) {
            console.error(error.message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        console.log(isBottom, pageToFetch);
        if (isBottom || pageToFetch === 1) {
            fetchImages();
        }

    }, [isBottom]);


    return (
        <div>
            <h1>이미지 무한 스크롤!</h1>
            <ImageList imageList={imageList} />
            {isLoading && <Loading />}
        </div>
    )
}
