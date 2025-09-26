import React, { useRef } from 'react'
import { useEffect } from 'react';

export default function Dialog({ isOpen, onClose, children }) {

    const dialogRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={dialogRef}>
            {children}
            <button onClick={onClose}>닫기</button>
        </dialog>
    )
}
