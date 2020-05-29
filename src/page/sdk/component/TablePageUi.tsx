import React from 'react'
import { Table, Button, Modal } from 'antd'
import { Link } from 'react-router-dom'; 
const TablePageUi: React.SFC<any> = (props: any) =>
{
    let { columns, tableData, editSdkData } = props
    return (
        <div className="table-content ">
            <header className='page-header'>我的产品</header>
            <div className='content'>
                <Button
                    type='primary'
                    size='middle'
                    style={{ marginBottom: 15 }}
                    onClick={() => editSdkData(false)} //注册表单
                >
                    <Link to='/deve/sdk/registered'>注册</Link>
                </Button>
                <Table
                    loading={tableData === undefined}
                    size='middle'
                    columns={columns}
                    dataSource={tableData}
                    rowKey={(record, index: any) => index}
                />
            </div>
        </div>
    )
}

export default TablePageUi;