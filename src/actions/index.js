const fetchBooks = async (bookstoreService, dispatch) => {
    try {
        const books = await bookstoreService.getBooks()
        return dispatch(booksLoaded(books))
    } catch (err) {
        return dispatch(booksError('Books fetch error!!!'))
    }
}

const booksLoaded = (books) => {
    return { type: 'FETCH_BOOKS_SUCCESS', payload: books }
}

const booksRequested = () => {
    return { type: 'FETCH_BOOKS_REQUEST' }
}

const unmountBook = () => {
    return { type: 'UNMOUNT_BOOK' }
}

const booksError = (error) => {
    return { type: 'FETCH_BOOKS_FAILURE', payload: error }
}

const onAddedToCart = (id) => {
    return { type: 'BOOK_ADDED_TO_CART', payload: id }
}

const onIncrease = (id) => {
    return { type: 'BOOK_ADDED_TO_CART', payload: id }
}

const onDecrease = (id) => {
    return { type: 'BOOK_REMOVED_FROM_CART', payload: id }
}

const onDelete = (id) => {
    return { type: 'ALL_BOOKS_REMOVED_FROM_CART', payload: id }
}

const login = ({name, password}) =>{

}

export {
    fetchBooks,
    booksRequested,
    onAddedToCart,
    onIncrease,
    onDecrease,
    onDelete,
    unmountBook,
    login
}