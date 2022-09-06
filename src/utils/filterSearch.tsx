import React from 'react'
import { Input, Button, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

export const filterSearch = (dataIndex: string, nestedDataIndex?: string, isArray?: boolean) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
    <div style={{ padding: 6 }}>
      <Input
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => confirm()}
        style={{ width: 150, marginBottom: 8, display: 'block' }}
      />
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <Button onClick={() => clearFilters()} size="small" style={{ width: 60 }}>
          Reset
        </Button>
        <Button type="primary" onClick={() => confirm()} size="small" style={{ width: 40 }}>
          OK
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined, fontSize: '16px' }} />
  ),
  onFilter: (value: string, record: any) =>
    isArray
      ? record[dataIndex]
        ? // for array ob objects
          record[dataIndex].filter((item: any) =>
            nestedDataIndex && item[nestedDataIndex]
              ? item[nestedDataIndex].toString().toLowerCase().includes(value.toLowerCase())
              : false,
          ).length > 0
        : ''
      : record[dataIndex]
      ? nestedDataIndex && record[dataIndex][nestedDataIndex]
        ? // for object
          record[dataIndex][nestedDataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : // for string
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      : '',
})
