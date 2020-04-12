import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import BookListItem from '../book-list-item'
import { withBookstoreService } from '../hoc'
import { fetchBooks, unmountBook, onAddedToCart } from '../../actions'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'

const BookList = ({ books, bookstoreService, loading, error, onAddedToCart, fetchBooks, unmountBook }) => {

    useEffect(() => {
        fetchBooks(bookstoreService)
            return ()=>{
                unmountBook()
            }
    }, [bookstoreService, fetchBooks, unmountBook])

    if (loading)
        return <Spinner />

    if (error)
        return <ErrorIndicator />

    return (
        <div className='row'>
            {books.map(book => {
                return (
                    <BookListItem
                        book={book}
                        key={book.id}
                        onAddedToCart={() => { onAddedToCart(book.id) }}
                    />
                )
            })}
        </div>
    )
}

const mapStateToProps = ({ booklist: { books, loading, error } }) => {
    return {
        books,
        loading,
        error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBooks: (bookstoreService)=>{
            fetchBooks(bookstoreService, dispatch)
        },
        onAddedToCart: (id)=>{dispatch(onAddedToCart(id))},
        unmountBook:()=>{dispatch(unmountBook())}
    }
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList)
