import React from 'react'

import './book-list-item.css'

const BookListItem = ({ book, onAddedToCart }) => {
    const { author, title, price, coverImage } = book
    return (
        <div className='book-list-item col-md-6 col-lg-4 py-3'>
            <div className='row'>
                <div className='col-6 img-wrapper'>
                    <img src={coverImage} alt='Cover' />
                </div>
                <div className='col-6 d-flex flex-column justify-content-between'>
                    <div>
                        <p className='h5 title'>{title}</p>
                    </div>
                    <div>
                        <p className='h6'>{author}</p>
                    </div>
                    <div>
                        <p className='h4'>${price}</p>
                    </div>
                    <button
                        type='button'
                        className='btn btn-info'
                        onClick={onAddedToCart}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookListItem