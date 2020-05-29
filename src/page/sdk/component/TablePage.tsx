import React, { PureComponent } from 'react'
import { Table, Button, Modal } from 'antd'
import { Link } from 'react-router-dom';
import * as api from '../api.js'
import { ColumnProps } from 'antd/es/table';
import { deepClone } from '../../../compon/commonFun';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import TablePageUi from './TablePageUi';
const { confirm } = Modal;
class TablePage extends PureComponent<any>
{
    constructor(props: any)
    {
        super(props)
    }
    readonly state = {
        tableData: undefined
    }
    columns: ColumnProps<any>[] = [
        {
            title: '产品名称',
            dataIndex: 'app_name',
            width: '25%'
        },
        {
            title: 'APPID',
            dataIndex: 'app_id',
            width: '50%'
        },
        {
            title: '操作',
            dataIndex: 'action',
            width: '25%',
            render: (text: any, record: any, index: any) => this.tableListAction(text, record, index)
        },
    ];
    delTableData = (element: any, idx: number) =>
    {
        let newTabledata = deepClone(this.state.tableData)
        newTabledata.splice(idx, 1)
        confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: '你确定删除该产品吗?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () =>
            {
                api.delProductList({ cmd: 'SDKDEL', app_id: element.app_id, company_id: window.company_id })
                    .then(() =>
                    {
                        this.setState({
                            tableData: newTabledata
                        })
                    })
            }
        });


    }
    //表格信息
    tableListAction = (text: any, record: any, index: any) =>
    {
        let { editSdkData } = this.props.params
        return <div className='products-actibe'>
            <a
                onClick={() =>
                {
                    editSdkData(record)
                }}
            >修改 </a>
            <a
                onClick={() => this.delTableData(record, index)}
            >  删除</a>
        </div>
    }
    componentDidMount = () =>
    {
        api.getProductList({ cmd: 'SDKAPPLIST', company_id: window.company_id })
            .then((res: any) =>
            {
                this.setState({
                    tableData: res.data.data
                })
            })
    }
    render()
    {
        let { columns } = this
        let { tableData } = this.state
        let { editSdkData } = this.props.params
        return (
            <TablePageUi
                columns={columns}
                tableData={tableData}
                editSdkData={editSdkData}
            />
        )
    }
}

export default TablePage;