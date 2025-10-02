import React from 'react';
import loadingImg from './images/loading.gif';
import './Loading.css';

export default function Loading() {
    return (
        <img src={loadingImg} alt="" className='imgLoading' />
    )
}
