import React, { useState } from 'react'
import { Input, Button } from 'antd';
import './index.less'
interface Props
{
    text?: string,
    value?: string,
    setvalue?: any,
    placeholder?: string,
    size?: any,
}
const InputList: React.SFC<Props> = ({ text, value, setvalue, placeholder = '请输入内容', size }) =>
{
    return (
        <div className="com-input-list">
            <span className="text"> {text}</span>
            <Input
                value={value}
                size={size}
                placeholder={placeholder}
                onChange={(e: any) => setvalue(e.target.value)}
            ></Input>
        </div>
    )
}

const KeysInputList: React.SFC<Props> = ({ text = '密钥', size, placeholder = '' }) =>
{
    const [ keys, setkeys ] = useState('');
    const [ value, setvalue ] = useState('');
    return (
        <div className="com-input-list com-keys-row">
            <span className="text">{text}</span>
            <Input
                value={value}
                size={size}
                disabled={true}
                placeholder={placeholder}
            ></Input>
            <Button
                size='large'
                type='primary'>随机生成</Button>
            <p>认证密匙长度必须介于 8-16 个字符之间，数字、英文或混合，<br />可后续根据需要对密匙进行修改</p>
        </div>
    )
}
export
{
    InputList,
    KeysInputList
};