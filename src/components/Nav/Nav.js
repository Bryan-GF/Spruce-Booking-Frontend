import React from 'react';
import './Nav.scss';
import logo from '../../assets/logo.png';

export const Nav = (props) => {
    return (
        <div className='navigation'>
            <img src={logo} alt='apartmentButler'/>
        </div>
    )
}