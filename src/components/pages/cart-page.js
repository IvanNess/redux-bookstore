import React from 'react'
import {connect} from 'react-redux'

import {setPathname} from '../../actions'

const CartPage = ({match, setPathname})=>{
    
    // useEffect(()=>{
    //     setPathname(match.path)
    // })

    return(
        <div>
            Cart Page
        </div>
    )
}

const mapDispatchToProps = {
    setPathname
}

export default connect(null, mapDispatchToProps)(CartPage)