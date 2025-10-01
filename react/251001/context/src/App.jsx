import { useContext, createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);
    console.log(cart);
    // 카트에 상품 추가하기
    const addToCart = (product) => {

        setCart((prevCart) => {

            // 카트에 이미 상품이 있는지 확인
            const existing = prevCart.find((item) => item.id === product.id);

            // 만약 같은 상품이 이미 있다면
            if (existing) {
                return prevCart.map((item) => (item.id === product.id) ? { ...item, count: item.count + 1 } : item)
            }

            // 만약 처음 카트에 추가하는 상품이라면
            return [...prevCart, { ...product, count: 1 }];
        }
        );
    };

    // 카트에서 상품 제거하기
    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    }


    // 카트 상품 갯수의 총합
    const getTotal = () => {
        return cart.reduce((acc, item) => {
            return acc + item.count
        }, 0);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, getTotal, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext);


const ProductList = () => {
    const products = [
        { id: 1, name: "노트북", price: 1000 },
        { id: 2, name: "스마트폰", price: 500 },
        { id: 3, name: "태블릿", price: 300 },
    ];

    const { addToCart } = useCart();

    return (
        <div>
            <h2>상품목록</h2>
            <ul>
                {products.map((product) => {
                    return <li key={product.id}>{product.name} - ₩{product.price}<button onClick={() => addToCart(product)}>카트에 추가</button></li>
                })}
            </ul>
        </div>
    )
}

const Cart = () => {

    const { cart, removeFromCart } = useCart();

    return (
        <div>
            <h2>장바구니</h2>
            {!cart.length ? <p>장바구니가 비었습니다.</p> : <ul>
                {cart.map((item) => {
                    return <li key={item.id}>{item.name} - 수량: {item.count} <button onClick={() => removeFromCart(item.id)}>삭제</button> </li>
                })}
            </ul>}
        </div>
    );
}

const Header = () => {

    const { getTotal } = useCart();

    return (
        <header>
            <h1>쇼핑몰</h1>
            <p>카트에 있는 상품의 총량: {getTotal()}</p>
        </header>
    )
}

const App = () => {
    return (
        <CartProvider>
            <Header />
            <ProductList />
            <Cart />
        </CartProvider>
    );
};

export default App;