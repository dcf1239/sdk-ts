import React from 'react'
import { Radio, Button } from "antd";
import InputList from "./InputList";
import { AppleFilled, AndroidFilled } from '@ant-design/icons';
const SdkPage: React.SFC<any> = (props) =>
{
    let { someProps, setcontent, setRadio, androidData, sdkSubmit } = props.params;
    let { url, type, iOSId, iOSPwdOk, loading, app_name } = someProps

    return (
        <React.Fragment>
            <header className='page-header'>SDK 注册</header>
            <article className="content">
                <span className="title">是否使用第三方推送：</span>
                <main>
                    <div className="select-item select-item-true">
                        <div className='radio-list'>
                            <Radio
                                checked={type === 1}
                                value={true}
                                onChange={(e) => setRadio(e.target.value)}
                            >
                                是（使用第三方推送，请写入自己服务接口地址由第三方推送）
                            </Radio>
                        </div>
                        {
                            type === 1
                            &&
                            <React.Fragment>
                                <InputList
                                    text="产品名称:"
                                    placeholder='请输入产品名称'
                                    classname='app-name'
                                    value={app_name}
                                    type='app_name'
                                    setcontent={setcontent}
                                ></InputList>
                                <InputList
                                    text="Url:"
                                    value={url}
                                    type='url'
                                    setcontent={setcontent}
                                ></InputList>
                            </React.Fragment>
                        }
                    </div>
                    <div className="select-item select-item-false">
                        <div className='radio-list'>
                            <Radio
                                checked={type === 2}
                                value={false}
                                onChange={(e) => setRadio(e.target.value)}
                            >否（上传对应的APP信息获取对应的离线推送）</Radio>
                        </div>
                        {
                            type === 2
                            &&
                            <div className='content'>
                                <InputList
                                    classname='app-name'
                                    text="产品名称:"
                                    placeholder='请输入产品名称'
                                    value={app_name}
                                    type='app_name'
                                    setcontent={setcontent}
                                ></InputList>
                                <div className='ios-card phone-card'>
                                    <span>
                                        <AppleFilled style={{ fontSize: 20 }} /> IOS
                                </span>
                                    <div className="config-row">
                                        <span>证书和密码配置：</span>
                                        <Button
                                            // style={{width:113}}
                                            size='middle'
                                            type='primary'
                                            onClick={() => setcontent('visible', true)}
                                        > 配 置 </Button>
                                        <span className="confige-clue">
                                            {
                                                iOSPwdOk ? '已配置' : '未配置'
                                            }
                                        </span>
                                        <InputList
                                            text="bundle Id："
                                            type='iOSId'
                                            value={iOSId}
                                            setcontent={setcontent}
                                        />

                                    </div>
                                </div>
                                <div className='android-card phone-card'>
                                    <span >
                                        <AndroidFilled style={{ fontSize: 20, color: '#A4C439' }} /> Android
                                        </span>
                                    {
                                        androidData.map((ele: any, idx: any) =>
                                        {

                                            return <div key={idx} className={`config-row config-row-${ele.androidType} `}>
                                                <img src={`/deve/img/${ele.androidType}-logo.png`} alt={ele.androidType} />
                                                {
                                                    ele.children &&
                                                    ele.children.map((item: any, index: any) =>
                                                    {
                                                        return <React.Fragment key={index}>
                                                            <InputList
                                                                text={item.text}
                                                                type={item.type}
                                                                value={someProps[ item.type ]}
                                                                setcontent={setcontent}
                                                                placeholder={item.placeholder}
                                                            />
                                                        </React.Fragment>
                                                    })
                                                }
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <div className="config-row" style={type === 1 ? { marginLeft: 25 } : {}}>
                        <Button
                            style={{ width: 153 }}
                            disabled={type === 2 && (iOSPwdOk ? false : true)}
                            type='primary'
                            onClick={() => sdkSubmit()}
                            loading={loading}
                            size="large"
                        >保存</Button>
                    </div>
                </main>
            </article>
        </React.Fragment>
    )
}
export default SdkPage