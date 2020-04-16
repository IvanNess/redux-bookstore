import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect, NavLink } from 'react-router-dom'

import { onLogin } from '../../actions'
import ErrorIndicator from '../error-indicator'
import { withBookstoreService } from '../hoc'

const LoginPage = ({ onLogin, user, bookstoreService: serverService, shoppingCart }) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const { error, id } = user

    if (id)
        return <Redirect to='/profile' />

    if (error)
        return <ErrorIndicator />

    return (
        <div className='row'>
            <div className='col-6 col-md-4 mx-auto vh-100'>
                <div className='h-50 d-flex flex-column justify-content-center'>
                    <p className='h6 text-center'>Login Page</p>
                    username:
                        <input
                        type='text'
                        placeholder='username'
                        className='mb-2 w-100 font-italic small form-control'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    password:
                        <input
                        type='password'
                        placeholder='password'
                        className='mb-2 w-100 font-italic small form-control'
                        onChange={(e) => { setPassword(e.target.value) }}
                        value={password}
                    />
                    <button
                        className='btn btn-primary w-100 btn-sm'
                        onClick={() => {
                            const isConfirmed = document.location.search==='?redirect=confirm'
                            const order = isConfirmed? shoppingCart: null
                            onLogin({ name, password, serverService, order })
                        }}
                    >
                        Log in
                    </button>
                    <NavLink className='text-right pt-2' to={document.location.search==='?redirect=confirm'?'/signup?redirect=confirm':'/signup'}>
                        <u>...or create an account</u>
                    </NavLink>
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = ({ user, shoppingCart }) => ({
    user,
    shoppingCart
})

const mapDispatchToProps = {
    onLogin
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(LoginPage)