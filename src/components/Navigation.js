import React from "react";
import {Link} from 'react-router-dom'
export function Navigation() {
    return (
        <div className="container">
        <nav className='navigation'>
            <span style={{opacity: 0.3}}>Securities Exchange</span>
            <span>
                <Link to="/" className={'navigation__link'}>Brokers</Link>
                <Link to="/stocks" className={'navigation__link'}>Stocks</Link>
                <Link to="/trading" className={'navigation__link'}>Trading</Link>
            </span>
        </nav>
        </div>
    )
}