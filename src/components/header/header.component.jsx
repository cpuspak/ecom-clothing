import React from 'react';

import {Link} from 'react-router-dom';
import { ReactComponent as Logo} from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';


import './header.style.scss';

const Header = ({ currentUser }) => {
    return(
        <div className="header">
            <Link to="/">
                < Logo className='logo' />
            </Link>
            <div className='options'>
                <Link to="/shop" className="option">
                    SHOP
                </Link>
                <Link to="/shop" className="option">
                    CONTACT
                </Link>
                {
                    currentUser ?
                    <div className="option" onClick={()=> auth.signOut()}>Sign Out</div> :
                    <Link className="option" to="/signin">Sign In</Link>
                }
            </div>
        </div>
    )
}

export default Header;