import React from 'react'
import { Switch } from 'antd'
import './index.less'
interface Props
{
    title: string,
    checked?: number,
    url?: any,
    text?: string
}
const PageHeader: React.SFC<Props> = ({ ...Props }) =>
{
    let {
        title,
        url,
        checked,
        text
    } = Props
    return (
        <React.Fragment>
            <header className='appdock-page-header'>
                <span className='title'>{title}</span>
                {url}
                {
                    checked &&
                    <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked></Switch>
                }
            </header>
            <p className='text'>{text}</p>
        </React.Fragment>
    )
}

export default PageHeader
