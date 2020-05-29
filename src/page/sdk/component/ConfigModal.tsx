import React from 'react';
import { Modal, Button, message } from 'antd';
import InputList from './InputList'
import './configModal.less';
import * as api from '../api.js'

let Istate =
{
    tes_pwd: '',       //生产证书密码
    testopment: '',     //生产证书
    iOS_p12Name: '',
    loading: false
}

class ConfigModal extends React.Component<any>
{
    constructor(props: any)
    {
        super(props)
    }
    tesPow: HTMLInputElement | null = null;
    readonly state = Istate;

    render()
    {
        let {
            visible,
            onCancel,
            iOSPwd,
            testopment,
            iOS_p12Name,
            loading,
            setcontent,
            selectFile
        } = this.props
        return (
            <React.Fragment>
                <Modal
                    centered
                    style={{ minWidth: 520 }}
                    className='config-modal'
                    visible={visible}
                    maskClosable={false}
                    onCancel={() => onCancel()}
                    title='证书和密码配置'
                    confirmLoading={loading}
                    okButtonProps={(iOS_p12Name && iOSPwd) ? { disabled: false } : { disabled: true }}
                    onOk={() =>
                    {
                        this.setState({
                            loading: true
                        })
                        let data: any = new FormData();
                        data.append('tes_pwd', iOSPwd);
                        data.append('testopment', testopment);
                        api.sdkUpload(data)
                            .then((res: any) =>
                            {
                                onCancel()
                                this.setState({
                                    ...Istate
                                })
                                setcontent('iOSPwdOk', iOSPwd)
                            })
                            .finally(() =>
                            {
                                this.setState({
                                    loading: false
                                })
                            })
                    }}
                >
                    <div className="list">
                        <span className='text'>IOS生产证书：</span>

                        <input
                            ref={input => (this.tesPow = input)}
                            type='file'
                            style={{ display: 'none' }}
                            onChange={(e) => { selectFile('iOS_p12Name', 'testopment', e.target.files) }} ></input>
                        <Button
                            size="large"
                            className='upload-btn'
                            onClick={() => { this.tesPow?.click() }}
                        > <span className="file-btn">上传文件</span></Button>
                        <div className="file-name" title={iOS_p12Name}>{iOS_p12Name}</div>
                    </div>
                    <div className="list">
                        <InputList
                            text='生产证书密码：'
                            type='iOSPwd'
                            value={iOSPwd}
                            setcontent={setcontent}
                            placeholder='请输入生产证书密码'
                        >
                        </InputList>
                    </div>
                </Modal>
            </React.Fragment >
        );
    }
}

export default ConfigModal;
