import React, { Component } from 'react'
import PageHeader from '../component/pageheader'

export default class Crm extends Component<any> {
    render()
    {
        return (
            <div className='crm-page'>
                <PageHeader title='设置标签'
                    text="你可以根据实际使用需要，对 CRM 基本标签设置展示顺序" ></PageHeader>
                <div className='nav-page-content'>
                    
                </div>
            </div>
        )
    }
}
