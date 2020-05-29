import React, { PureComponent } from "react";
import "./index.less";
import ConfigModal from "./component/ConfigModal";
import { deepClone } from '../../compon/commonFun';
import { SDKRoutes } from "../../router/router";
import { message } from 'antd';
import * as api from './api.js'

/**
 * ios证书和密码配置部分未完成； 接口需要改，
 * 配置时上传文件和密码；后端返回是否成功，（需要与后端协商字段等
 * 根据配置是否成功显示保存按钮是否可用，
 * 
 */

let Istate = {
    company_id: window.company_id,
    visible: false, 
    sdkPageLoading: false, //保存按钮的loading
    type: 1,                //是否使用第三方推送  1：是  2：否
    app_name: '',  
    url: '',
    app_id: '',
    iOSId: '',              //bundle Id
    iOS_credential: '',     //生产证书
    iOS_p12Name: '',        //生产证书名
    iOSPwd: '',             //生产证书密码
    iOSPwdOk:'',            //有参数表示已配置   (后端可能更改字段)
    modalLoading: false,    //配置的确定键loading
    androidMi_appSecret: '',
    androidMi_appName: '',
    androidMZ_appSecret: '',
    androidMZ_appId: '',
    androidOPPO_appKey: '',
    androidOPPO_appSecret: '',
    androidHuaWei_appName: '',
    androidHuaWei_appId: '',
    androidHuaWei_appSecret: '',
}
export default class index extends PureComponent<any>
{
    constructor(props: any)
    {
        super(props)
    }
    readonly state = Istate;
    androidData: Array<
        {
            androidType: string,
            children: Array<
                {
                    text: string,
                    type: string,
                    placeholder: string
                }>
        }
    > = [
            {
                androidType: 'mi',
                children: [ {

                    text: 'APPSECRET：',
                    type: 'androidMi_appSecret',
                    placeholder: '请输入应用密匙'
                },
                {
                    text: 'PACKAGE_NAME：',
                    type: 'androidMi_appName',
                    placeholder: '请输入包名'
                },
                ]
            },

            {
                androidType: 'meizu',
                children: [ {

                    text: 'APPSECRET：',
                    type: 'androidMZ_appSecret',
                    placeholder: '请输入应用密匙'
                },
                {
                    text: 'APPID：',
                    type: 'androidMZ_appId',
                    placeholder: '请输入id'
                },
                ]
            },

            {
                androidType: 'oppo',
                children: [ {
                    text: 'APPKEY：',
                    type: 'androidOPPO_appKey',
                    placeholder: '请输入接口密匙'
                },
                {
                    text: 'APPSECRET：',
                    type: 'androidOPPO_appSecret',
                    placeholder: '请输入应用密匙'
                },
                ]

            },
            {
                androidType: 'huawei',
                children: [ {
                    text: 'PACKAGE_NAME：',
                    type: 'androidHuaWei_appName',
                    placeholder: '请输入包名'
                },
                {
                    text: 'APPID：',
                    type: 'androidHuaWei_appId',
                    placeholder: '请输入id'
                },

                {
                    text: 'APPSECRET：',
                    type: 'androidHuaWei_appSecret',
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
            sdkPageLoading: true
        })
        let data1 = {
            app_id: this.state.app_id,
            app_name: this.state.app_name,
            type: 1,
            url: this.state.url,
            company_id: window.company_id,
        }
        let data2 = deepClone(this.state)
        delete data2.visible
        delete data2.sdkPageLoading
        delete data2.url
        delete data2.modalLoading

        let okData = this.state.type === 1 ? data1 : data2
        let subData = new FormData
        for (const key in okData) {
            subData.append(key, okData[ key ])
        }
        api.sdkSubmit({ ...okData, cmd: 'SDKR' })
            .then((res: any) =>
            {
                this.removeLocalStorage()
                this.props.history.push('products')
            })
            .finally(() =>
            {
                this.setState({
                    sdkPageLoading: false,
                })
            })
    }
    editSdkData = (sdkData: any) =>
    {
        if (sdkData === false) {
            this.removeLocalStorage()
            this.setState(() => (
                {
                    ...Istate
                }
            ))
        } else {
            this.setLocalStorage(sdkData)
            this.setState(() => (
                {
                    ...sdkData
                }
            ))
            this.props.history.push('registered')
        }
    }
    selectFile = (fileName: string, startlist: string, file: any) =>
    { 
        if (!file[ 0 ]) return;
        if (!/\.(p12)$/.test(file[ 0 ].name)) {
            message.error('文件类型必须是.p12');
        } else if (file[ 0 ].size > 4 * 1024) {
            message.error('证书文件不能大于4KB');
        } else {
            this.setState({
                [ startlist ]: file[ 0 ],
                [ fileName ]: file[ 0 ].name
            })
        }
    }
    componentDidMount = () =>
    {
        let sdkData = localStorage.getItem('SDK_DATA') || JSON.stringify(Istate)
        let jsonSdkData = JSON.parse(sdkData)
        this.setState({
            ...jsonSdkData
        })
    }
    setLocalStorage = (newState: any) =>
    {
        localStorage.setItem('SDK_DATA', JSON.stringify(newState))
    }
    removeLocalStorage = () =>
    {
        localStorage.removeItem('SDK_DATA');
    }
    render()
    {
        let { setcontent, setRadio, androidData, sdkSubmit, removeLocalStorage, setLocalStorage, editSdkData, selectFile } = this;
        let { visible, iOS_credential, iOSPwd, modalLoading, iOS_p12Name } = this.state;
        return (
            <div className="page-sdk">
                <SDKRoutes
                    //注册
                    someProps={this.state}
                    setRadio={setRadio}
                    androidData={androidData}
                    sdkSubmit={sdkSubmit}
                    setcontent={setcontent}
                    //列表 
                    setLocalStorage={setLocalStorage}
                    removeLocalStorage={removeLocalStorage}
                    editSdkData={editSdkData}
                />
                <ConfigModal
                    visible={visible}
                    onCancel={() => this.setState({ visible: false })}
                    setcontent={setcontent}
                    testopment={iOS_credential}
                    iOSPwd={iOSPwd}
                    loading={modalLoading}
                    selectFile={selectFile}
                    iOS_p12Name={iOS_p12Name} 
                />
            </div>
        );
    }
}
