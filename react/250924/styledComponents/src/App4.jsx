import React from 'react'


function ContCard({ children }) {
    return (
        <div>
            {children}
        </div>
    )
}

const ProductImage = ({ src, alt }) => { return <img src={src} alt={alt} /> }

const ProductTitle = ({ children }) => { return <h2>{children}</h2> }

const SubTitle = ({ children }) => { return <h3>{children}</h3> }

const ProductDescription = ({ children }) => { return <p>{children}</p> }

const currencyConfig = {
    USD: { locale: 'en-US', currency: 'USD', symbol: '$' },
    EUR: { locale: 'de-DE', currency: 'EUR', symbol: '€' },
    GBP: { locale: 'en-GB', currency: 'GBP', symbol: '£' },
    JPY: { locale: 'ja-JP', currency: 'JPY', symbol: '¥' },
    KRW: { locale: 'ko-KR', currency: 'KRW', symbol: '₩' },
    CNY: { locale: 'zh-CN', currency: 'CNY', symbol: '¥' },
};

const formatPrice = (price, currencyCode) => {
    const config = currencyConfig[currencyCode];

    return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
}

const PriceFormatter = ({ price, currencyCode }) => {
    const formattedPrice = formatPrice(price, currencyCode);

    return (
        <data value={price} >{formattedPrice}</data>
    )
}

const ProductPrice = ({ price, currencyCode }) => {
    return (
        <PriceFormatter price={price} currencyCode={currencyCode} />
    )
}


export default function App4() {
    return (
        <ContCard>
            <ProductImage src={'https://picsum.photos/id/237/200/300'} alt={'검은강아지'} />
            <ProductTitle>검은 강아지를 입양하세요</ProductTitle>
            <SubTitle>엄청 얌전하답니다.</SubTitle>
            <ProductDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam laudantium, tempore aut iure error dolores dicta nesciunt aspernatur consequuntur omnis animi nam suscipit itaque, eligendi amet quia, ratione vero! Veritatis!</ProductDescription>
            <ProductPrice price={30000} currencyCode={'EUR'} />
        </ContCard>
    )
}
