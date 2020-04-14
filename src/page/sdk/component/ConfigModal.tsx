import React from 'react';
import { Modal, Button, message } from 'antd';
import InputList from './InputList';
import './configModal.less';
import * as api from '../api.js'
interface Props
{
    visible: boolean,
    onCancel: any,
    setcontent: any,
}
let Istate =
{
    tes_pwd: '',       //生产证书密码
    dev_pwd: '',       //开发证书密码
    development: '',   //开发证书
    testopment: '',     //生产证书
    developmentName: '',
    testopmentName: '',
    loading: false
}

class ConfigModal extends React.Component<Props>
{
    readonly state = Istate;
    setData = (type: string, value: any) =>
    {
        this.setState({
            [ type ]: value,
        });
    }
    selectFile = (fileName: string, type: string, file: any) =>
    {
        if (!file[ 0 ]) return;
        if (!/\.(p12)$/.test(file[ 0 ].name)) {
            message.error('文件类型必须是.p12');
        } else if (file[ 0 ].size > 10 * 1024) {
            message.error('证书文件不能大于10KB');
        } else {
            this.setState({
                [ type ]: file[ 0 ],
                [ fileName ]: file[ 0 ].name
            })

        }


    }

    render()
    {
        let {
            visible,
            onCancel,
            setcontent
        } = this.props
        let {
            tes_pwd,
            dev_pwd,
            development,
            testopment,
            developmentName,
            testopmentName,
            loading
        } = this.state
        let {
            setData,
            selectFile
        } = this
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
                    onOk={() =>
                    {
                        this.setState({
                            loading: true
                        })
                        let data: any = new FormData();
                        data.append('tes_pwd', tes_pwd);
                        data.append('dev_pwd', dev_pwd);
                        data.append('development', development);
                        data.append('testopment', testopment);
                        api.sdkUpload(data)
                            .then((res: any) =>
                            {
                                onCancel()
                                this.setState({
                                    ...Istate
                                })
                                setcontent('iOSPwd', tes_pwd)
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

                        <input id='tes-pwd' type='file' style={{ display: 'none' }} onChange={(e) => { selectFile('testopmentName', 'testopment', e.target.files) }} ></input>
                        <Button
                            size="large"
                            className='upload-btn'
                            onClick={() => { document.getElementById('tes-pwd')?.click() }}
                        > <span className="file-btn">上传文件</span></Button>
                        <div className="file-name" title={testopmentName}>{testopmentName}</div>
                    </div>
                    <div className="list">
                        <InputList
                            text='生产证书密码：'
                            type='tes_pwd'
                            value={tes_pwd}
                            setcontent={setData}
                            placeholder='请输入生产证书密码'
                        >
                        </InputList>
                    </div>
                    <div className="list">
                        <span className='text'>IOS开发证书：</span>
                        <input id='dev-pwd' type='file' style={{ display: 'none' }} onChange={(e) => selectFile('developmentName', 'development', e.target.files)}></input>
                        <Button
                            size="large"
                            type='default'
                            className='upload-btn'
                            onClick={() => { document.getElementById('dev-pwd')?.click() }}
                        > <span className="file-btn">上传文件</span> </Button>
                        <div className="file-name" title={developmentName}>{developmentName}</div>
                    </div>
                    <div className="list">
                        <InputList
                            text='开发证书密码：'
                            type='dev_pwd'
                            value={dev_pwd}
                            setcontent={setData}
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
