import React from 'react';
import './index.less'

import { HomeOutlined, UserOutlined, PoweroffOutlined } from '@ant-design/icons';
import { message } from 'antd';
const Header: React.SFC<any> = () =>
{
    return (
        <header className='header'>
            <div className="logo">
                <img src="img/53kf-logo.svg" alt="" />
            </div>
            <ul className='menu-row'>
                <li><a href={window.base_url}><HomeOutlined /><span>网站首页</span></a> </li>
                <li className='user-name'><UserOutlined /><span>{window.account}</span></li>
                <li className='back' >
                    <a href=""
                        onClick={(e) =>
                        {
                            e.preventDefault()
                            window.$http.get('out')
                                .then((res: any) =>
                                {
                                    window.location.href = `${window.base_url}`;
                                })
                                .catch((err: any) =>
                                {
                                    message.error('退出账号失败')
                                })
                        }}
                    ><PoweroffOutlined /><span>退出</span></a>
                </li>
            </ul>
        </header>
    );
};


Header.propTypes = {

};


export default Header;

