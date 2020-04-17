import React from 'react'
import { connect } from 'react-redux'

const CartItem = ({ idx, title, count, total }) => {
    return (
        <div className='cart-item row'>
            <div className='col-2'>{idx+1}</div>
            <div className='col-6'>{title}</div>
            <div className='col-2'>{count}</div>
            <div className='col-2'>{total}$</div>
        </div>
    )
}

const OrderHeader = () => {
    return (
        <div className='cart-item row border-top border-bottom'>
            <div className='col-2'>#</div>
            <div className='col-6'>Title</div>
            <div className='col-2'>Quantity</div>
            <div className='col-2'>Total</div>
        </div>
    )
}

const Order = ({ cartItems, orderTotal, idx }) => {
    return (
        <div className='order border-top border-bottom'>
            {cartItems.map((item, idx) => <CartItem key={item.id} {...item} idx={idx} />)}
            <div className='row justify-content-end'>
                <div className='col-2'>Order: {idx+1}</div>
                <div className='col-2'>{`$(${orderTotal})`}</div>
            </div>
        </div>
    )
}

const Orders = ({ orders }) => {
    return (
        <div className='orders'>
            <p>Orders:</p>
            <OrderHeader/>
            {orders.map((order, idx) => <Order key={idx} {...order} idx={idx} />)}
        </div>
    )
}

const mapStatetToProps = (state) => ({
    orders: state.user.orders
})

export default connect(mapStatetToProps)(Orders)