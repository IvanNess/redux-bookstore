const fetchBooks =  (bookstoreService) => async (dispatch) => {
    dispatch(booksRequested())
    try {
        const books = await bookstoreService.getBooks()
        dispatch(booksLoaded(books))
    } catch (err) {
        dispatch(booksError('Books fetch error!!!'))
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

const onLogin = ({name, password, serverService, order}) =>async (dispatch)=>{
    dispatch(userRequest())
    try {
        let user = await serverService.getUser({name, password})
        if(order!==null)
            user = await serverService.addOrder({userId: user.id, order})
        dispatch(userLoaded({user}))
    } catch (err) {
        dispatch(userError('login error!!!'))
    }   
}

const onSignup = ({name, password, email, bookstoreService: serverService, order})=>async dispatch=>{
    dispatch(createUserRequest())
    try{
        const user = await serverService.createUser({name, email, password, order})
        console.log('on signup user', user)
        dispatch(userCreated(user))
    } catch(err){
        console.log('err', err)
        dispatch(createUserError(err))
    }
}

const makeOrder = ({userId, serverService, order}) =>async (dispatch)=>{
    dispatch(userRequest())
    try {
        console.log('make order', userId)
        const user = await serverService.addOrder({userId, order})
        dispatch(userLoaded({user}))
    } catch (err) {
        dispatch(userError('login error!!!'))
    }   
}

const userRequest = () =>{
    return {type: 'FETCH_USER_REQUEST'}
}

const userLoaded = ({user}) =>{
    return {type: 'FETCH_USER_SUCCESS', payload: user}
}

const userError = (message) =>{
    return {type: 'FETCH_USER_FAILURE', payload: message}
}

const createUserRequest = ()=>{
    return {type: 'CREATE_USER_REQUEST'}
}

const userCreated = (user) =>{
    return {type: 'CREATE_USER_SUCCESS', payload: user}
}

const createUserError = (message) =>{
    return {type: 'CREATE_USER_FAILURE'}
}

const setPathname = (pathname)=>{
    return {type: 'SET_PATHNAME', payload: pathname}
}

const logout = ()=>{
    return {type: 'LOGOUT'}
}

export {
    fetchBooks,
    booksRequested,
    onAddedToCart,
    onIncrease,
    onDecrease,
    onDelete,
    unmountBook,
    onLogin,
    onSignup,
    setPathname,
    logout,
    makeOrder
}