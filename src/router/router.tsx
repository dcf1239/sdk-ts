import React, { PureComponent } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from '../component/sidebar';
import SDK from '../page/sdk'
import AppDock from '../page/appDocking'
import Account from '../page/appDocking/page/Account';
import Crm from '../page/appDocking/page/Crm';
import SdkPage from './../page/sdk/component/SdkPage';
import SdkTablePage from './../page/sdk/component/TablePage';  

class Router extends PureComponent
{
    render()
    {
        return (
            <React.Fragment>
                <Sidebar></Sidebar>
                <div className='page-content'>
                    <Switch>
                        <Route path="/deve/sdk" component={SDK} />
                        <Route path="/deve/app-docking" component={AppDock} />
                        <Redirect exact from='/deve' to='/deve/sdk' />
                    </Switch>
                </div>
            </React.Fragment>
        )
    }
}
class DockingRoutes extends PureComponent
{
    render()
    {
        return (
            <Switch>
                <Route path='/deve/app-docking/account' component={Account}></Route>
                <Route path='/deve/app-docking/crm' component={Crm}></Route>
                <Redirect exact from='/deve/app-docking' to='/deve/app-docking/account'></Redirect>
            </Switch>
        )
    }
}
const SDKRoutes: React.SFC<any> = (props) =>
{    
    // 向组件传参params，有时间可以使用redux改进
    return (
        <Switch>
            <SdkPage params={props} path='/deve/sdk/registered'></SdkPage>
            <SdkTablePage params={props} path='/deve/sdk/products' component={SdkTablePage}></SdkTablePage>
            <Redirect exact from='/deve/sdk' to='/deve/sdk/products'></Redirect>
        </Switch>
    )
}


export
{
    Router,
    DockingRoutes,
    SDKRoutes
}