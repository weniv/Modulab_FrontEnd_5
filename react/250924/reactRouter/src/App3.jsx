import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// - **Home Page :** /
// - **Product Detail Page** : /products/:id
//     - ex) /products/1 , /products/2, /products/3, /products/4
// - **Product Detail Notice Page :** /products/:id/notice
//     - ex) /products/1/notice , /products/2/notice…
// - **Cart Page :** /cart
// - **Coupon Page :** /users/coupon
// - **Question Page :** /users/question
// - **Notice Page :** /users/notice
// - **User Page :** /users
export default function App3() {
    return (
        <BrowserRouter>
            <Link to='/'>Home</Link>
            <Link to='/products/1'>ProductDetail1</Link>
            <Link to='/products/2'>ProductDetail2</Link>
            <Link to='/products/2/notice'>ProductDetail2 공지</Link>
            <Link to='/cart'>cart</Link>
            <Link to='/users'>users</Link>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/products/:id' element={<ProductDetail />} />
                <Route path='/products/:id/notice' element={<ProductDetailNotice />} />
                <Route path='/cart' element={<Cart />} />

                <Route path='/users' element={<Users />}>
                    <Route index element={<UsersNotice />}></Route>
                    <Route path='coupon' element={<UsersCoupon />}></Route>
                    <Route path='question' element={<UsersQuestion />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
