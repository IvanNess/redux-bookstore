import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

import { withBookstoreService } from '../hoc'
import { onIncrease, onDecrease, onDelete, makeOrder } from '../../actions'

import './shopping-cart-table.css'

const ShoppingCartTable = ({ items, total, onIncrease, onDecrease, onDelete, user, makeOrder, shoppingCart, bookstoreService }) => {
    const [redirect, setRedirect] = useState('')
    const [modal, setModal] = useState('')
    useEffect(() => {
        setRedirect('')
    }, [redirect])
    useEffect(() => {
        console.log('shopping cart table use effect', user, shoppingCart, !user.name && shoppingCart.cartItems.length > 0)
        if (!user.name && shoppingCart.cartItems.length > 0) {
            setModal('modal')
        } else {
            setModal('')
        }
    }, [modal, setModal, user, shoppingCart])

    switch (redirect) {
        case '/login?redirect=confirm':
        case '/signup?redirect=confirm':
        case '/':
            return <Redirect to={redirect} />
        default:

            return (
                <div className='shopping-cart-table'>
                    <p className='h3'>Your Order</p>
                    <div className='row border-top border-bottom border-secondary'>
                        <div className='col-1'>#</div>
                        <div className='col-3'>Item</div>
                        <div className='col-2'>Count</div>
                        <div className='col-2'>Price</div>
                        <div className='col-4'>Action</div>
                    </div>

                    {items.map(({ id, title, count, total }, idx) => {
                        return (
                            <div className='row' key={id}>
                                <div className='col-1'>{idx + 1}</div>
                                <div className='col-3'>{title}</div>
                                <div className='col-2'>{count}</div>
                                <div className='col-2'>{total}</div>
                                <div className='col-4'>
                                    <button
                                        className='btn btn-outline-danger'
                                        onClick={() => onDelete(id)}
                                    >
                                        <i className='fa fa-trash-o' />
                                    </button>
                                    <button
                                        className='btn btn-outline-success'
                                        onClick={() => onIncrease(id)}
                                    >
                                        <i className='fa fa-plus-circle' />
                                    </button>
                                    <button
                                        className='btn btn-outline-warning'
                                        onClick={() => onDecrease(id)}
                                    >
                                        <i className='fa fa-minus-circle' />
                                    </button>
                                </div>
                            </div>

                        )
                    })}
                    <div className='d-flex justify-content-end py-3'>
                        <button
                            type='button'
                            data-toggle={modal}
                            data-target='#orderConfirmation'
                            className='btn btn-primary'
                            onClick={() => {
                                if (modal !== 'modal') {
                                    console.log('confirm the order')
                                    if (user.name && shoppingCart.cartItems.length > 0) {
                                        console.log('confirm the order user', user)
                                        makeOrder({ userId: user.id, order: shoppingCart, serverService: bookstoreService })
                                    }
                                }
                            }}
                        >
                            Confirm the order
                </button>
                        <div className='px-3 text-center d-flex flex-column justify-content-center'>
                            Total: ${total}
                        </div>
                        <div
                            className="modal fade"
                            id="orderConfirmation"
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="orderConfirmation"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="orderConfirmation">Message</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        You should log in or sign up to make an order.
                            </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button
                                            type="button" className="btn btn-primary" data-dismiss="modal"
                                            onClick={() => {
                                                setRedirect('/login?redirect=confirm')
                                            }}
                                        >
                                            Log in
                                </button>
                                        <button
                                            type="button" className="btn btn-primary" data-dismiss="modal"
                                            onClick={() => {
                                                setRedirect('/signup?redirect=confirm')
                                            }}
                                        >
                                            Sign up
                                </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}

const mapStateToProps = ({ shoppingCart, user }) => {
    return {
        items: shoppingCart.cartItems,
        total: shoppingCart.orderTotal,
        user,
        shoppingCart
    }
}

const mapDispatchToProps = {
    onIncrease,
    onDecrease,
    onDelete,
    makeOrder
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)
    (ShoppingCartTable)