import React from 'react'
import { Form, Input, Select, DatePicker } from 'antd'

type AddTaskProps = {
  onConfirmAdd: (values: any) => void
  users: [
    {
      _id: string
      name: string
    },
  ]
}

const AddTask = ({ onConfirmAdd, users }: AddTaskProps) => {
  return (
    users && (
      <Form
        name="addTask"
        id="addTask"
        onFinish={onConfirmAdd}
        size="small"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item name="title" rules={[{ required: true, message: 'Please input title' }]} label="Title">
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} placeholder="Description" style={{ resize: 'none' }} />
        </Form.Item>
        <Form.Item name="assignee" rules={[{ required: true, message: 'Please choose assignee' }]} label="Assignee">
          <Select placeholder="Assignee">
            {(users as any).map((user: UserObject, index: number) => (
              <Select.Option key={index} value={user._id || 'null'}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="estimate_hours" label="Estimate">
          <Input placeholder="Estimate (hours)" type="number" />
        </Form.Item>
        <Form.Item name="due_date" label="Due Date">
          <DatePicker placeholder="Choose date" style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    )
  )
}

export default AddTask
