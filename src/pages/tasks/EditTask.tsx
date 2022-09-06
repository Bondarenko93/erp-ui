import React from 'react'
import { Form, Input, Select, DatePicker } from 'antd'
import moment from 'moment'

type EditTaskProps = {
  onConfirmEdit: (values: any) => void
  task: TaskObject
  users: [
    {
      _id: string
      name: string
    },
  ]
}

const EditTask = ({ onConfirmEdit, task, users }: EditTaskProps) => {
  return (
    users && (
      <Form
        name="editTask"
        id="editTask"
        onFinish={onConfirmEdit}
        size="small"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 20 }}
        initialValues={{
          title: task.title,
          description: task.description,
          assignee: (task.assignee as any)._id,
          estimate_hours: task.estimate_hours,
          due_date: task.due_date ? moment.utc(task.due_date).local() : null,
        }}
      >
        <Form.Item name="title" rules={[{ required: true, message: 'Please input title' }]} label="Title">
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} placeholder="Description" style={{ resize: 'none' }} />
        </Form.Item>
        <Form.Item name="assignee" rules={[{ required: true, message: 'Please choose assignee' }]} label="Assignee">
          <Select placeholder="Assignee">
            {(users as any).map((user: any, index: number) => (
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

export default EditTask
