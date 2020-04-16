import React, { useEffect, useState } from 'react'
import { Link, NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { withBookstoreService } from '../hoc'
import { fetchBooks, logout } from '../../actions'

import './shop-header.css'

const ShopHeader = (props) => {
    const { numItems, total, user, fetchBooks, bookstoreService, logout } = props

    const [showMenu, setShowMenu] = useState(false)

    const [redirect, setRedirect] = useState('')

    useEffect(()=>{
        console.log('useeffect shopheader')
        setShowMenu(false)
        setRedirect('')
    }, [redirect, user])

    // if(redirect==='/profile'){
    //     console.log('redirect to /profile')
    //     return <Redirect to='/profile'/>
    // }
    switch(redirect){
        case '/profile':
        case '/cart':
        case '/':
            return <Redirect to={redirect}/>
        default:

    return (
        <header className='shop-header row d-flex justify-content-between'>
            <div className='d-flex flex-column justify-content-center'>
                <div className='logo text-dark text-decoration-none pointer' onClick={() => {
                    console.log('restore')
                    if(document.location.pathname==='/')
                        fetchBooks(bookstoreService)
                    setShowMenu(false)
                    setRedirect('/')
                }}>
                    {/* <button onClick={() => { fetchBooks(bookstoreService) }}>Restore</button> */}
                    Restore
                </div>
            </div>

            {user.name && <div className='align-self-center col-6 row justify-content-between'>
                <div className='col-6 d-flex flex-column'>
                    <div className='text-center'>
                        <div
                            className='logo text-blue text-decoration-none pointer'
                            onClick={(e) => {
                                e.preventDefault()
                                console.log('menu clicked')
                                setShowMenu(showMenu => { return !showMenu })
                            }}>
                            {user.name}
                        </div>
                        {showMenu && <div className='position-absolute menu '>
                            {/* <Link className='text-dark text-decoration-none' to={function(location){
                                //fetchBooks(bookstoreService)
                                console.log('profile')
                                return '/profile'
                            }}>
                                Profile
                            </Link> */}
                            <div className='pointer' onClick={() => {
                                setShowMenu(false)
                                setRedirect('/profile')
                            }}>
                                Profile
                            </div>
                            <div className='pointer' onClick={() => {
                                logout()
                            }}>
                                Logout
                            </div>
                        </div>}
                    </div>

                    {/* {isProfilePage && <small className='text-center' onClick={() => { console.log('logout') }}>
                        (Logout)
                    </small>} */}
                </div>

                <Link className='text-decoration-none align-self-center' to='/cart'>
                    <i className='cart-icon fa fa-shopping-cart' />
                    {numItems} items $({total})
                </Link>
            </div>}

            {
                !user.name && <div className='align-self-center col-3 row justify-content-between'>
                    <Link className='text-decoration-none' to='/login'>
                        Log in
                    </Link>
                    <Link className='text-decoration-none' to='/signup'>
                        Sign up
                </Link>
                </div>
            }
        </header >
    )
}}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        total: state.shoppingCart.orderTotal,
        numItems: state.shoppingCart.cartItems.length,
    }
}

const mapDispatchToProps = {
    fetchBooks,
    logout
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(ShopHeader)