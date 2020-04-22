const updateCartItem = ({ cartItem = {}, book, upload }) => {
    const {
        id = book.id,
        title = book.title,
        count = 0,
        total = 0
    } = cartItem
    return {
        id,
        title,
        count: count + upload,
        total: total + upload * book.price
    }
}

const updateCartItems = ({ cartItems, newCartItem, idx }) => {
    const {
        count
    } = newCartItem
    if (count === 0)
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx + 1)
        ]
    if (idx === -1)
        return [
            ...cartItems,
            newCartItem
        ]
    return [
        ...cartItems.slice(0, idx),
        newCartItem,
        ...cartItems.slice(idx + 1)
    ]
}

const updateOrderTotal = ({orderTotal, upload, book})=>{
    return orderTotal + upload * book.price
}

const shoppingCartReducer = (state, {type, payload})=>{
    if(state===undefined){
        return{
            cartItems: [],
            orderTotal: 0
        }
    }
    switch (type) {
        case 'BOOK_ADDED_TO_CART':
        case 'BOOK_REMOVED_FROM_CART':
        case 'ALL_BOOKS_REMOVED_FROM_CART':
            const bookId = payload
            const { cartItems, orderTotal } = state.shoppingCart
            const book = state.booklist.books.find(book => book.id === bookId)
            const cartItemBookIdx = cartItems.findIndex(book => book.id === bookId)
            // если cartItemBookIdx===-1, то ошибки не будет, cartItem будет равен undefined
            const cartItem = cartItems[cartItemBookIdx]
            const upload = type === 'BOOK_ADDED_TO_CART' ? 1 :
                type === 'BOOK_REMOVED_FROM_CART' ? -1 : -cartItem.count
            const newCartItem = updateCartItem({ cartItem, book, upload })
            const newCartItems = updateCartItems({ cartItems, newCartItem, idx: cartItemBookIdx })
            const newOrderTotal = updateOrderTotal({orderTotal, upload, book})
            return {
                orderTotal: newOrderTotal,
                cartItems: newCartItems
            }
        case 'CREATE_USER_SUCCESS':
        case 'FETCH_USER_SUCCESS':
            return{
                // если при создании юзера отправляется массив с заказами, то это значит, что
                // это отправляется заказ и нужно освободить корзину.
                cartItems: payload.orders ? []: state.shoppingCart.cartItems,
                orderTotal: payload.orders ? 0: state.shoppingCart.orderTotal,
            }
        default:
            return state.shoppingCart
    }
}

export default shoppingCartReducer