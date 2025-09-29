import React, { useEffect, useMemo, useState } from 'react';
import './Shop.css';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const handleList = (e) => {
        // const curretCategory = e.currentTarget.value;
        setSelectedCategory(e);
    }

    const [isSortByRating, setIsSortByRating] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5173/products.json');

                if (!response.ok) {
                    throw new Error('네트워크에 문제가 있습니다!!');
                }

                const json = await response.json();

                setProducts(json.products);

            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();

    }, []);

    // 셀렉트 박스로 선택한 카테고리 상품만 모으기
    const filteredByCategory = useMemo(() => {

        console.log('카테고리 분류 실행');

        if (selectedCategory === 'all') {
            return products
        }

        return products.filter((product) => product.category === selectedCategory)
    }, [products, selectedCategory]);


    // 정렬 처리
    const sortedProducts = useMemo(() => {
        const productToSort = [...filteredByCategory];

        if (isSortByRating) {
            // 평점 정렬 수행
            console.log('평점 정렬 수행');
            return productToSort.sort((a, b) => b.rating - a.rating);
        }

        return productToSort;

    }, [isSortByRating, filteredByCategory]);



    return (
        <section className='product-container'>
            <h1>상품목록</h1>
            <div className='product-controls'>
                <select name="" id="" className='product-select' value={selectedCategory} onChange={(event) => handleList(event.target.value)}>
                    <option value="all">전체 카테고리</option>
                    <option value="전자기기">전자기기</option>
                    <option value="의류">의류</option>
                    <option value="식품">식품</option>
                    <option value="도서">도서</option>
                </select>
                <label className='rating-toggle'>
                    <input type="checkbox" checked={isSortByRating} onChange={(event) => setIsSortByRating(event.target.checked)} />
                    평점순 정렬
                </label>
            </div>
            <ul className='product-list'>
                {sortedProducts.map((item) => {
                    return (
                        <li className='product-item' key={item.id}>
                            <div className='product-info'>
                                <h3>{item.name}</h3>
                                <p>{item.category}</p>
                            </div>
                            <div className='product-price'>
                                <p>{item.price.toLocaleString()} 원</p>
                                <p className='product-rating'>★ {item.rating}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
