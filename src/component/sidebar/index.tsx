import React, { Component } from 'react';
import './index.less'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
let menu: Array<
    {
        title: string,
        children: Array<
            {
                title: string,
                routeName: string
            }
        >
    }
> = [
        {
            title: "开发者管理",
            children: [
                // {
                //     title: "应用对接开发",
                //     routeName: "/development"
                // },
                // {
                //     title: "应用管理",
                //     routeName: "/management"
                // },
                {
                    title: "SDK 注册",
                    routeName: "/deve/sdk"
                },
                // {
                //     title: "账号认证",
                //     routeName: "/certification"
                // }
            ]
        },
        // {
        //     title: "财务管理",
        //     children: [
        //         {
        //             title: "我的账单",
        //             routeName: "/bill"
        //         }
        //     ]
        // }
    ];
class Sidebar extends Component<any> {


    render()
    {
        return (
            <div className="page-sidebar">

                {
                    menu.map((ele, index) =>
                    {
                        return <ul key={index} className="menu-submenu">
                            <li className="menu-submenu-title">{ele.title}</li>
                            {
                                ele.children.map((item: any, idx: number) =>
                                {
                                    return <li
                                        key={idx}
                                        className='menu-list'>
                                        <NavLink 
                                            to={item.routeName}
                                            activeStyle={
                                                {
                                                    color: '#00B1FF'
                                                }
                                            }
                                        >
                                            {item.title}
                                        </NavLink>
                                    </li>

                                })
                            }
                        </ul>
                    })
                }
            </div >
        );
    }
}

export default Sidebar;
