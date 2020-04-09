
const booksLoaded = (newBooks)=>{
    return {type: 'BOOKS_LOADED', payload: newBooks}
}

const setLoading = ()=>{
    return {type: 'LOADING'}
}

const booksError = (error)=>{
    return {type: 'BOOKS_ERROR', payload: error}
}

const onAddedToCart = (id)=>{
    return {type: 'BOOK_ADDED_TO_CART', payload: id}
}

const onIncrease = (id)=>{
    return {type: 'BOOK_ADDED_TO_CART', payload: id}
}

const onDecrease = (id)=>{
    return {type: 'BOOK_REMOVED_FROM_CART', payload: id}
}

const onDelete = (id)=>{
    return {type: 'ALL_BOOKS_REMOVED_FROM_CART', payload: id}
}

export {
    booksLoaded,
    setLoading,
    booksError,
    onAddedToCart,
    onIncrease,
    onDecrease,
    onDelete
}