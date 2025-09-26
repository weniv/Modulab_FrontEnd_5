import React, { useState } from 'react';
import Dialog from './Dialog';

export default function App3() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)}>열림</button>

            <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h1>리액트 모달입니다!</h1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sunt deleniti omnis in accusamus totam, earum doloribus assumenda cupiditate labore repellendus expedita a dignissimos architecto suscipit modi, enim ut? Tempore.
            </Dialog>
        </>
    )
}
