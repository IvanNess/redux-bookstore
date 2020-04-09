import React from 'react'
import {Link} from 'react-router-dom'

import './shop-header.css'

const ShopHeader = ({numItems, total}) =>{
    return(
        <header className='shop-header row d-flex justify-content-between'>
            <Link className='logo text-dark text-decoration-none' to='/'>
                Restore
            </Link>
            <Link className='text-decoration-none align-self-center' to='/cart'>
                <i className='cart-icon fa fa-shopping-cart'/>
                {numItems} items $({total})
            </Link>
        </header>
    )
}

export default ShopHeader