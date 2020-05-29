import React, { useState } from 'react'
import PageHeader from '../component/pageheader'
import { InputList, KeysInputList } from '../../../component/inputList'
import { Button } from 'antd';

const Account: React.SFC<any> = () =>
{
    const [ appid, setappid ] = useState('');
    const [ appSecret, setappSecret ] = useState('');
    const [ keys, setkeys ] = useState('');
    return (
        <div className='account-page'>
            <PageHeader title='开发者账号' checked={1}></PageHeader>
            <div className='nav-page-content'>
                <InputList
                    text='APPID'
                    setvalue={setappid}
                    value={appid} ></InputList>
                <InputList
                    text='APPSECRET'
                    setvalue={setappSecret}
                    value={appSecret} ></InputList>
                <KeysInputList
                    setvalue={setkeys}
                    value={keys}
                ></KeysInputList>
                <div className="button-row">
                    <Button
                        type='primary'
                    >保存更改</Button>
                    <Button
                        type='default'
                    >还原更改</Button>
                </div>
            </div>
        </div>
    )
}

export default Account
