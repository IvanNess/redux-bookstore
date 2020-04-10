import booklistReducer from './booklist-reducer'
import shoppingCartReducer from './shopping-cart-reducer'

const reducer = (state, action) => {
    console.log(action.type)
    return {
        booklist: booklistReducer(state, action),
        shoppingCart: shoppingCartReducer(state, action)
    }
}

export default reducer