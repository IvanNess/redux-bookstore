import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { HomePage, CartPage, LoginPage } from '../pages'
import ShopHeader from '../shop-header'
import ShoppingCartTable from '../shopping-cart-table'

import './app.css'

const App = () => {
    return (
        <div className='container'>
            <Switch>
                <Route path='/login' component={LoginPage} />
                <Route>
                    <ShopHeader numItems={5} total={210} />
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
                    </Switch>
                    <ShoppingCartTable />
                </Route>
            </Switch>
        </div>

    )
}

export default App