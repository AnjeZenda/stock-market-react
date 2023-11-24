import React from "react";

export  function Modal({ children, title, onClose, className}) {
    return (
        <>
            <div className={className}>
                <div className='popup'>
                <button type="button" className="close" onClick={onClose}>X</button>
                    <h1 className="popup__title">{ title }</h1>
                    { children }
                </div>
            </div>
        </>
    )
}