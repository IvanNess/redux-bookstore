import React, {useEffect} from 'react'

import BookList from '../book-list'

const HomePage = ()=>{

    useEffect(()=>{
        console.log('home page props')
    }, )

    return(
        <div>
            <BookList/>
        </div>
    )
}

export default HomePage