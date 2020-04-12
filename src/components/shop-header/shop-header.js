import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import './shop-header.css'

const ShopHeader = ({ numItems, total, user }) => {
    console.log(user)
    return (
        <header className='shop-header row d-flex justify-content-between'>
            {user.name && <NavLink className='logo text-blue text-decoration-none' to='/profile'>
                {user.name}
            </NavLink>}
            <NavLink className='logo text-dark text-decoration-none' to='/'>
                Restore
            </NavLink>
            {user.name && <Link className='text-decoration-none align-self-center' to='/cart'>
                <i className='cart-icon fa fa-shopping-cart' />
                {numItems} items $({total})
            </Link>}
            <div className='align-self-center col-3 row justify-content-between'>
                {!user.name && <Link className='text-decoration-none' to='/login'>
                    Log in
                </Link>}
                {!user.name && <Link className='text-decoration-none' to='/signup'>
                    Sign up
                </Link>}
            </div>
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(ShopHeader)