import React, { useEffect } from 'react'

import './spinner.css'

const Spinner = ()=>{
    useEffect(()=>{
        console.log('spinner useeefect')
    })
    return(
        <div className='spinner vh-100 vw-100 bg-transparent position-absolute row'>
            <div className='h-50 col-3  mx-auto row'>
                <div className='h-50 col-12 bg-light my-auto d-flex flex-column justify-content-around'>
                    <p className='text-center'>loading...</p>
                </div>
                
            </div>
            
        </div>
    )
}

export default Spinner