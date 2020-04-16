const booklistReducer = (state, {type, payload}) => {
    if (state === undefined)
        return {
            books: [],
            loading: true,
            error: null,
        }
    switch (type) {
        case 'FETCH_BOOKS_REQUEST':
            return {
                books: state.booklist.books,
                loading: true,
                error: null
            }
        case 'UNMOUNT_BOOK':
            return {
                books: [],
                loading: false,
                error: null
            }
        case 'FETCH_BOOKS_SUCCESS':
            return {
                books: payload,
                loading: false,
                error: null
            }
        case 'FETCH_BOOKS_FAILURE':
            return {
                books: [],
                loading: false,
                error: payload
            }
        default:
            return state.booklist
    }
}

export default booklistReducer