import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { HomePage, CartPage, LoginPage, SignupPage } from '../pages'
import ShopHeader from '../shop-header'
import ShoppingCartTable from '../shopping-cart-table'

import './app.css'

const App = () => {
    return (
        <div className='container'>
            <ShopHeader pathname={document.location.pathname}/>
            <Switch>
                <Route path='/login' component={LoginPage} />
                <Route path='/signup' component={SignupPage} />
                <Route>
                    <Switch>
                        <Route
                            path='/'
                            component={HomePage}
                            exact
                        />
                        <Route
                            path='/cart'
                            component={CartPage}
                        />
                        <Route
                            path='/profile'
                            component={CartPage}
                        />
                    </Switch>
                    <ShoppingCartTable />
                </Route>
            </Switch>
        </div>

    )
}

export default App