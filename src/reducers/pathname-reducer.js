const pathnameReducer = (state, {type, payload})=>{
    if(state===undefined)
        return null
    switch(type){
        case 'SET_PATHNAME':
            return payload
        default:
            return state.pathname
    }
}

export default pathnameReducer