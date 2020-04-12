const userReducer = (state, { type, payload }) => {
    if (state === undefined) {
        return {
            name: null,
            email: null,
            loading: true,
            error: null,
        }
    }
    switch (type) {
        case 'FETCH_USER_SUCCESS':
            return{
                ...payload,
                loading: false,
                error: null
            }
        case 'FETCH_USER_FAILURE':
            return{
                name: null,
                email: null,
                loading: true,
                error: payload,
            }
        case 'FETCH_USER_REQUEST':
            return{
                name: null,
                email: null,
                loading: true,
                error: null,
            }
        default: 
            return state.user
    }
}

export default userReducer