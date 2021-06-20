import React from 'react';

import {Link} from 'react-router-dom';
import { ReactComponent as Logo} from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';

import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';


import './header.style.scss';

const Header = ({ currentUser, hidden }) => {
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
                <CartIcon />
            </div>
            {
                hidden ? null :
                <CartDropdown />
            }   
        </div>
    )
}

const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({ // destructuring all these values from state, state = {user:{currentUser} ...}
    //currentUser: state.user.currentUser,
    //currentUser: currentUser => next line is the short form of this same thing
    currentUser,
    hidden
})

export default connect(mapStateToProps)(Header);