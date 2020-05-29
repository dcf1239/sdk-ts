import React, { useState } from 'react'
import './index.less'
import { NavLink } from 'react-router-dom';
import { DockingRoutes } from '../../router/router';
let nav: Array<{
    name: string,
    value: string,
    link: string
}> = [
        {
            name: '开发者账号',
            value: '1',
            link: '/deve/app-docking/account'
        },
        {
            name: '自定义CRM',
            value: '2',
            link: '/deve/app-docking/crm'
        },
        {
            name: '推送配置',
            value: '3',
            link: '/deve/app-docking/page-3'
        },
        {
            name: '图文链接',
            value: '4',
            link: '/deve/app-docking/page-4'
        },
    ]
const Index: React.SFC<any> = () =>
{
    const [ selectNav, setselectNav ] = useState('1');
    return (
        <div className='page-app-dock'>
            <header className='page-header'>应用对接开发</header>
            <article className='content'>
                <ul className="nav">
                    {
                        nav.map((ele) =>
                        {
                            return <li value={ele.value}
                                key={ele.value}
                                onClick={() => setselectNav(ele.value)}
                            >
                                <NavLink to={ele.link}
                                    activeStyle={
                                        {
                                            color: '#00B1FF',
                                            borderBottom: ' 2px solid #2F87F9',
                                        }
                                    }
                                >{ele.name}</NavLink>
                            </li>
                        })
                    }

                </ul>
                <div className='nav-page'>
                    <DockingRoutes ></DockingRoutes>
                </div>
            </article>
        </div>
    )
}
export default Index;