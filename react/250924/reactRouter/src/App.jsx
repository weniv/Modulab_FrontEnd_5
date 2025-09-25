import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';

function App() {
    return (
        <BrowserRouter>
            {/* 라우트를 감싸줍니다. */}
            <Link to='/'>home</Link>
            <br />
            <Link to='/one'>one</Link>
            <br />
            <Link to='/two'>two</Link>
            <br />
            <Link to='/three'>three</Link>
            <br />
            {/* <Link to={{ pathname: '/productlist', search: '?category=electronics&sort=price' }}>product list</Link> */}
            <Link
                to={{ pathname: '/productlist', search: '?category=electronics&sort=price', hash: '#contact' }}
                state={{ productID: 123, fromPage: 'list', lostScrollPosition: 1500 }}
            >product list</Link>

            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/one" element={<One name='licat' />} />
                <Route path="/two" element={<Two />} />
                <Route path="/three" element={<Three />} />
                <Route path="/productlist" element={<ProductList />} />
            </Routes>
        </BrowserRouter>
    );
}

function Index() {
    return <h1>hello world0</h1>
}

function One({ name }) {
    return <h1>{name} world1</h1>
}

function Two() {
    return <h1>hello world2</h1>
}

function Three() {
    return <h1>hello world3</h1>
}

function ProductList() {
    const location = useLocation();
    // URLSearchParams는 URL의 문자열을 대상으로 작업할 수 있는 유틸리티 메서드를 제공합니다.
    // const searchParams = new URLSearchParams(location.search);
    // const category = searchParams.get('category');
    // const sort = searchParams.get('sort');
    const { productID, fromPage, lostScrollPosition } = location.state || {}

    return (
        <>
            <div style={{ height: '2000px', backgroundColor: 'teal' }}>
                {productID} & {fromPage} & {lostScrollPosition}
            </div>
            <div id="contact">헤쉬링크 테스트</div>
        </>
    )
}

export default App;