import React from 'react'
import { Input } from 'antd';
interface Props
{
    text: string,
    value: string,
    setcontent: any,
    type: string,
    placeholder?: string,
    style?: any
    classname?: string
}
const InputList: React.SFC<Props> = ({ classname='', style, text, value, setcontent, type, placeholder = '请输入内容' }) =>
{
    return (
        <div className={`input-list ${classname}`}>
            <span className="text"> {text}</span>
            <Input
                style={style}
                defaultValue={value}
                size="large"
                value={value}
                placeholder={placeholder}
                onChange={(e: any) => setcontent(type, e.target.value)}
            ></Input>
        </div>
    )
}
export default InputList;