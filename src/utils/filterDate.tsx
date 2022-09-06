import React from 'react'
import { Button, Space, DatePicker } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import moment from 'moment'

export const filterDate = (dataIndex: string) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
    <div style={{ padding: 6 }}>
      <DatePicker
        onChange={date => setSelectedKeys(date ? [date] : [])}
        style={{ width: 150, marginBottom: 8, display: 'block' }}
        // size="small"
        value={selectedKeys[0]}
        allowClear={false}
        format="DD.MM.YYYY"
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
    <CalendarOutlined style={{ color: filtered ? '#1890ff' : undefined, fontSize: '16px' }} />
  ),
  onFilter: (value: string, record: any) =>
    record[dataIndex] ? moment.utc(record[dataIndex]).local().isSame(value, 'd') : '',
})
