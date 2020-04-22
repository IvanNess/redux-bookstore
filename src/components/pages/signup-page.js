import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link, Redirect } from 'react-router-dom'

import { withBookstoreService } from '../hoc/'
import {onSignup} from '../../actions'
import './signup-page.css'

const SignupPage = ({ bookstoreService, onSignup, shoppingCart, user }) => {

    useEffect(()=>{
        if(user.error){
            console.log('signup page useeffect', user)
        }
    },[user])

    if (user.id)
    return <Redirect to='/profile' />

    return (
        <div className='row vh-100 justify-content-center signup-page'>
            <div className='col-5 h-75 flex-column justify-content-center d-flex'>
                <p className='px-3 h3 text-center'>Sign up page</p>
                <Formik
                    initialValues={{ email: '', password: '', repeat: '', name: ''}}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.password || values.password.length <7 )
                            errors.password = 'At least 8 symbols'
                        if (values.password !== values.repeat)
                            errors.repeat = 'You should repeat your password'
                        if (!values.name)
                            errors.name = 'Required'
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        const isConfirmed = document.location.search==="?redirect=confirm"
                        const order = isConfirmed? shoppingCart: null
                        
                        onSignup({name: values.name, email:values.email, 
                            password:values.password, bookstoreService, order})

                        // setTimeout(() => {
                        //     alert(JSON.stringify(values, null, 2));
                        //     setSubmitting(false);
                        // }, 400);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className='col'>
                                <ErrorMessage name="name" render={msg => <div className='error-message text-danger'>{msg}</div>} />
                            </div>

                            <div className='col'>
                                Name
                            </div>

                            <div className='col field-div'>
                                <Field type="text" name="name" className='form-control' placeholder='name' />
                            </div>

                            <div className='col'>
                                <ErrorMessage name="email" render={msg => <div className='error-message text-danger'>{msg}</div>} />
                            </div>

                            <div className='col'>
                                Email
                            </div>

                            <div className='col field-div'>
                                <Field type="text" name="email" className='form-control' placeholder='email' />
                            </div>

                            <div className='col'>
                                <ErrorMessage name="password" render={msg => <div className='error-message text-danger'>{msg}</div>} />
                            </div>

                            <div className='col'>
                                Password
                            </div>

                            <div className='col field-div'>
                                <Field type="password" name="password" className='form-control' placeholder='password' />
                            </div>

                            <div className='col'>
                                <ErrorMessage name="repeat" render={msg => <div className='error-message text-danger'>{msg}</div>} />
                            </div>

                            <div className='col'>
                                Repeat the password
                                </div>

                            <div className='col'>
                                <Field type="password" name="repeat" placeholder='repeat the password' className='form-control' />
                            </div>

                            <div className='col'>
                                <button className='btn btn-primary btn-block mt-3' type="submit" disabled={user.loading}>
                                    Submit
                                </button>
                            </div>

                            <div className='col'>
                                <Link to={document.location.search==='?redirect=confirm'?'/login?redirect=confirm':'/login'}>
                                    <p className='mt-2 mx-0 text-right'><u>...or log in with existing account</u></p>
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    shoppingCart: state.shoppingCart,
    user: state.user
})

const mapDispatchToProps = {
    onSignup
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(SignupPage)
