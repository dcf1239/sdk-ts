import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from '../component/sidebar';
import SDK from '../page/sdk'


export default class Router extends Component
{
    render()
    {
        return (
            <React.Fragment>
                <Sidebar></Sidebar>
                <div className='page-content'>
                    <Switch>
                        <Route path="/deve/sdk" component={SDK} />
                        <Redirect from='*' to='/deve/sdk' />
                    </Switch>
                </div>
            </React.Fragment>
        )
    }
}
