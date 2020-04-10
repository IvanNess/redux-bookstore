const booklistReducer = (state, {type, payload}) => {
    if (state === undefined)
        return {
            books: [],
            loading: true,
            error: null,
        }
    switch (type) {
        case 'LOADING':
            return {
                ...state,
                books: [],
                loading: true,
                error: null
            }
        case 'BOOKS_LOADED':
            return {
                ...state,
                books: payload,
                loading: false,
                error: null
            }
        case 'BOOKS_ERROR':
            return {
                ...state,
                books: [],
                loading: false,
                error: payload
            }
        default:
            return state.booklist
    }
}

export default booklistReducer