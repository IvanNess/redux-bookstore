import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import BookListItem from '../book-list-item'
import { withBookstoreService } from '../hoc'
import { booksLoaded, setLoading, booksError, onAddedToCart } from '../../actions'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'

const BookList = ({ books, bookstoreService, booksLoaded, setLoading, loading, booksError, error, onAddedToCart }) => {

    useEffect(() => {
        const getBooks = async () => {
            try {
                const data = await bookstoreService.getBooks()
                booksLoaded(data)
            } catch (err) {
                booksError('Books Loading Error')
            }
        }

        getBooks()

        return () => {
            setLoading()
        }
    }, [booksLoaded, bookstoreService, setLoading, booksError])

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

const mapStateToProps = ({ books, loading, error }) => {
    return {
        books,
        loading,
        error
    }
}

const mapDispatchToProps = {
    booksLoaded,
    setLoading,
    booksError,
    onAddedToCart
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookList)
