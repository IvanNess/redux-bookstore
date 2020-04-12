import React, { useState } from 'react'
import {connect} from 'react-redux'

import {login} from '../../actions'

const LoginPage = ({login}) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='row'>
            <div className='col-6 col-md-4 mx-auto vh-100'>
                <div className='h-50 d-flex flex-column justify-content-center'>
                    <p className='h6 text-center'>Login Page</p>
                    username:
                        <input
                            type='text'
                            placeholder='username'
                            className='mb-2 w-100 font-italic small'
                            onChange={(e)=>setName(e.target.value)}
                            value={name}
                        />
                    password:
                        <input 
                            type='password' 
                            placeholder='password' 
                            className='mb-2 w-100 font-italic small'
                            onChange={(e)=>{setPassword(e.target.value)}}
                            value={password}
                        />
                    <button
                        className='btn btn-primary w-100 btn-sm'
                        onClick={()=>login({name, password})}
                    >
                        Sign in
                    </button>
                </div>

            </div>
        </div>
    )
}

const mapDispatchToProps = {
    login
}

export default connect(null, mapDispatchToProps)(LoginPage)