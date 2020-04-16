import booklistReducer from './booklist-reducer'
import shoppingCartReducer from './shopping-cart-reducer'
import userReducer from './user-reducer'
import pathnameReducer from './pathname-reducer'

const reducer = (state, action) => {
    console.log(action.type, state)
    return {
        booklist: booklistReducer(state, action),
        shoppingCart: shoppingCartReducer(state, action),
        user: userReducer(state, action),
        pathname: pathnameReducer(state, action)
    }
}

export default reducer