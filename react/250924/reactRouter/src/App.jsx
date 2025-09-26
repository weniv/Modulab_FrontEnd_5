import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }) {
    return (
        <div>
            <h1>예기치 않은 에러가 발생했습니다!</h1>
            <details>
                <summary>에러 정보</summary>
                {error.message}
                {error.stack}
            </details>
            <Link to='/'>홈으로 돌아가기</Link>
        </div>
    );
}


function App() {
    return (

        <BrowserRouter>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
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
                    {/* 와일드카드 라우트 */}
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>

    );
}
function NotFound() {
    return <div>
        <h3>요청하신 페이지를 찾을 수 없습니다!</h3>
        <Link to='/'>홈으로 돌아가기</Link>
    </div>
}
function Index() {
    return <h1>hello world0</h1>
}

function One({ name }) {
    return <h1>{name} world1</h1>
}

function Two() {
    throw new Error('Two 로 이동하는 과정에 문제가 발생했습니다!!');
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