const initialState = {
    books: [],
    loading: true, 
    error: null,
    cartItems: [],
    orderTotal: 220
}

const updateCartItem = ({cartItem = { } , book, upload})=>{
    const {
        id = book.id,
        title = book.title,
        count = 0,
        total = 0
    } = cartItem 
    return{
        id,
        title,
        count: count+upload,
        total: total+upload*book.price
    }
}

const updateCartItems = ({cartItems, newCartItem, idx}) =>{
    const {
        count
    } = newCartItem
    if (count===0)
        return[
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx+1)
        ]
    if(idx===-1)
        return[
            ...cartItems,
            newCartItem
        ]
    return[
        ...cartItems.slice(0, idx),
        newCartItem,
        ...cartItems.slice(idx+1)
    ]
}

const reducer = (state = initialState, { type, payload }) => {
    console.log(type)
    switch ( type ) {
        case 'LOADING': 
            return{
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
        case 'BOOK_ADDED_TO_CART':
        case 'BOOK_REMOVED_FROM_CART':
        case 'ALL_BOOKS_REMOVED_FROM_CART':
            const bookId = payload
            const {cartItems} = state
            const book = state.books.find(book=>book.id===bookId)
            const cartItemBookIdx = cartItems.findIndex(book=>book.id===bookId)
            // если cartItemBookIdx===-1, то ошибки не будет, cartItem будет равен undefined
            const cartItem = cartItems[cartItemBookIdx]
            const upload = type==='BOOK_ADDED_TO_CART'? 1:
                type==='BOOK_REMOVED_FROM_CART'? -1: -cartItem.count
            const newCartItem = updateCartItem({cartItem, book, upload})
            const newCartItems = updateCartItems({cartItems, newCartItem, idx: cartItemBookIdx})
            return{
                ...state,
                cartItems: newCartItems
            }
        default:
            return state
    }
}

export default reducer