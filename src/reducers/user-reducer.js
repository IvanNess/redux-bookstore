const userReducer = (state, { type, payload }) => {
    if (state === undefined) {
        return {
            id: null,
            name: null,
            email: null,
            loading: true,
            error: null,
            orders: []
            // id: '4o',
            // name: 'test',
            // email: 'test@bk.ru',
            // loading: false,
            // error: null,
            // orders: []
        }
    }
    switch (type) {
        case 'FETCH_USER_SUCCESS':
        case 'CREATE_USER_SUCCESS':
            return{
                id: payload.id,
                name: payload.name,
                email: payload.email,
                loading: false,
                error: null,
                orders: payload.orders
            }
        case 'FETCH_USER_FAILURE':
        case 'CREATE_USER_FAILURE':
            return{
                id: null,
                name: null,
                email: null,
                loading: true,
                error: payload,
                orders: []
            }
        case 'FETCH_USER_REQUEST':
        case 'CREATE_USER_REQUEST':
            return{
                id: state.user.id,
                name: state.user.name,
                email: state.user.email,
                loading: true,
                error: null,
                orders: state.user.orders
            }
        case 'LOGOUT':
            return{
                id: null,
                name: null,
                email: null,
                loading: false,
                error: null,
                orders: []
            }
        default: 
            return state.user
    }
}

export default userReducer