import React from 'react'
import {connect} from 'react-redux'

import {onIncrease, onDecrease, onDelete} from '../../actions'

import './shopping-cart-table.css'

const ShoppingCartTable = ({ items, total, onIncrease, onDecrease, onDelete }) => {
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
                        <div className='col-1'>{idx+1}</div>
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
            <div className='py-3 d-flex justify-content-end'>
                Total: ${total}
            </div>
        </div>
    )
}

const mapStateToProps = ({ cartItems, orderTotal }) => {
    return {
        items: cartItems,
        total: orderTotal
    }
}

const mapDispatchToProps = {
    onIncrease,
    onDecrease,
    onDelete
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable)