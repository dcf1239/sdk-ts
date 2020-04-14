import React from 'react'
import { Input } from 'antd';
interface Props
{
    text: string,
    value: string,
    setcontent: any,
    type: string,
    placeholder?:string
}
const InputList: React.SFC<Props> = ({ text, value, setcontent, type ,placeholder='请输入内容'}) =>
{
    return (
        <div className="input-list">
            <span className="text"> {text}</span>
            <Input
                // value={value}
                size="large"
                placeholder={placeholder}
                onChange={(e: any) => setcontent(type, e.target.value)}
            ></Input> 
        </div>
    )
}
export default InputList;