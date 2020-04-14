import React, { Component } from "react";
import { Radio, Button } from "antd";
import "./index.less";
import InputList from "./component/InputList";
import { AppleFilled, AndroidFilled } from '@ant-design/icons';
import ConfigModal from "./component/ConfigModal";
import * as api from './api.js'
import { deepClone } from '../../compon/commonFun';


let Istate = {
    visible: false,
    loading: false,
    type: 1,
    url: '',
    iOSId: '',
    iOSPwd: '',
    androidMi_appSecret: '',
    androidMi_appName: '',
    androidMZ_appSecret: '',
    androidMZ_appId: '',
    androidOPPO_appKey: '',
    androidOPPO_appSecret: '',
    androidHuaWei_appName: '',
    androidHuaWei_appId: '',
    androidHuaWei_appSecret: ''
}
export default class index extends Component
{
    readonly state = Istate;
    androidData: Array<
        {
            androidType: string,
            children: Array<
                {
                    text: string,
                    type: string,
                    value: any,
                    placeholder: string
                }>
        }
    > = [
            {
                androidType: 'mi',
                children: [ {

                    text: 'APPSECRET：',
                    type: 'androidMi_appSecret',
                    value: this.state.androidMi_appSecret,
                    placeholder: '请输入应用密匙'
                },
                {
                    text: 'PACKAGE_NAME：',
                    type: 'androidMi_appName',
                    value: this.state.androidMi_appName,
                    placeholder: '请输入包名'
                },
                ]
            },

            {
                androidType: 'meizu',
                children: [ {

                    text: 'APPSECRET：',
                    type: 'androidMZ_appSecret',
                    value: this.state.androidMZ_appSecret,
                    placeholder: '请输入应用密匙'
                },
                {
                    text: 'APPID：',
                    type: 'androidMZ_appId',
                    value: this.state.androidMZ_appId,
                    placeholder: '请输入id'
                },
                ]
            },

            {
                androidType: 'oppo',
                children: [ {
                    text: 'APPKEY：',
                    type: 'androidOPPO_appKey',
                    value: this.state.androidOPPO_appKey,
                    placeholder: '请输入接口密匙'
                },
                {
                    text: 'APPSECRET：',
                    type: 'androidOPPO_appSecret',
                    value: this.state.androidOPPO_appSecret,
                    placeholder: '请输入应用密匙'
                },
                ]

            },
            {
                androidType: 'huawei',
                children: [ {
                    text: 'PACKAGE_NAME：',
                    type: 'androidHuaWei_appName',
                    value: this.state.androidHuaWei_appName,
                    placeholder: '请输入包名'
                },
                {
                    text: 'APPID：',
                    type: 'androidHuaWei_appId',
                    value: this.state.androidHuaWei_appId,
                    placeholder: '请输入id'
                },

                {
                    text: 'APPSECRET：',
                    type: 'androidHuaWei_appSecret',
                    value: this.state.androidHuaWei_appSecret,
                    placeholder: '请输入应用密匙'
                },
                ]

            }
        ]
    setcontent = (type: string, value: string) =>
    {
        this.setState({
            [ type ]: value,
        });
    }
    setRadio = (value: boolean) =>
    {
        let type = value ? 1 : 2
        this.setState({
            type
        });
    }
    sdkSubmit = () =>
    {
        this.setState({
            loading: true
        })
        let data1 = {
            type: 1,
            url: this.state.url
        }
        let data2 = deepClone(this.state)
        delete data2.visible
        delete data2.loading
        delete data2.url

        let okData = this.state.type === 1 ? data1 : data2
        api.sdkSubmit(okData)
            .then((res: any) =>
            {
                this.setState({
                    ...Istate
                })
            })
            .finally(() =>
            {
                this.setState({
                    loading: false,
                })
            })
    }
    render()
    {
        let { setcontent, setRadio, androidData, sdkSubmit } = this;
        let { url, type, visible, iOSId, iOSPwd, loading } = this.state;
        return (
            <div className="page-sdk">
                <header>SDK 注册</header>
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
                                <InputList
                                    text="Url:"
                                    value={url}
                                    type='url'
                                    setcontent={setcontent}
                                ></InputList>
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
                                    <div className='ios-card phone-card'>
                                        <span>
                                            <AppleFilled style={{ fontSize: 20 }} /> IOS
                                        </span>
                                        <div className="config-row">
                                            <span>证书和密码配置：</span>
                                            <Button
                                                // style={{width:113}}
                                                // size="large"
                                                type='primary'
                                                onClick={() => this.setState({ visible: true })}
                                            > 配 置 </Button>
                                            <span className="confige-clue">
                                                {
                                                    iOSPwd ? '已配置' : '未配置'
                                                }
                                            </span>
                                            <InputList
                                                text="bundle Id："
                                                type='iOSId'
                                                value={iOSId}
                                                setcontent={setcontent}
                                            ></InputList>

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
                                                    <img src={`./img/${ele.androidType}-logo.png`} alt={ele.androidType} />
                                                    {
                                                        ele.children &&
                                                        ele.children.map((item: any, index: any) =>
                                                        {
                                                            return <React.Fragment key={index}>
                                                                <InputList
                                                                    text={item.text}
                                                                    type={item.type}
                                                                    value={item.value}
                                                                    setcontent={setcontent}
                                                                    placeholder={item.placeholder}
                                                                >
                                                                </InputList>
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
                                disabled={type === 2 && (iOSPwd ? false : true)}
                                type='primary'
                                onClick={() => sdkSubmit()}
                                loading={loading}
                                size="large"
                            >保存</Button>
                        </div>
                    </main>
                </article>
                <ConfigModal
                    visible={visible}
                    onCancel={() => this.setState({ visible: false })}
                    setcontent={setcontent}
                >

                </ConfigModal>
            </div>
        );
    }
}
