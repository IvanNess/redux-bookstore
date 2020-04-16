import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import BookListItem from '../book-list-item'
import { withBookstoreService } from '../hoc'
import { fetchBooks, unmountBook, onAddedToCart } from '../../actions'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'

const BookList = ({
    books, bookstoreService, loading, error, onAddedToCart, fetchBooks, unmountBook
}) => {

    useEffect(() => {
        console.log('booklist useeffect')
    })

    useEffect(() => {
        console.log('booklist')

        fetchBooks(bookstoreService)
        return () => {
            //unmountBook()
        }
    }, [unmountBook, fetchBooks, bookstoreService])


    return (
        <div className='row'>
            {error && <ErrorIndicator />}
            {loading && <Spinner />}
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

const mapDispatchToProps = {
    fetchBooks,
    onAddedToCart,
    unmountBook
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList)
