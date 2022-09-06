import React, { FC, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Space, Select, Typography, Empty, Divider, Modal, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import moment from 'moment'

import { fetchTasks, taskChooseProject, tasksAddItem, updateTaskObject } from '../../redux/actions/tasks'
import { fetchProjects, updateProjectObject } from '../../redux/actions/projects'
import { tasksSelector, projectsSelector } from '../../redux/selectors'
import { addTask, editTask } from '../../api/tasks'
import { editProject, getSingleProject } from '../../api/projects'

import TasksBoard from './TasksBoard'
import AddTask from './AddTask'
import ViewTask from './ViewTask'
import EditTask from './EditTask'

const EmptyContainer = styled.div<{ height?: string }>`
  width: 100%;
  height: ${props => props.height || '78vh'};
  display: flex;
  justify-content: center;
  padding-top: 100px;
`

type SelectedTaskType = TaskObject | null
type FullProjectType = ProjectObject | null

const Tasks: FC = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isViewModalVisible, setIsViewModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedTask, setSelectedTask] = useState<SelectedTaskType>(null)
  const [fullProject, setFullProject] = useState<FullProjectType>(null)
  const [assignee, setAssignee] = useState<string | null>(null)

  const { tasks, selectedProject } = useSelector(tasksSelector)
  const { projects } = useSelector(projectsSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
    if (projects.length === 0) {
      dispatch(fetchProjects())
    }
  }, [])

  useEffect(() => {
    if (selectedProject && projects.length > 0) {
      dispatch(fetchTasks(selectedProject))
      setFullProject(projects.find(item => item._id === selectedProject) || null)
    }
  }, [selectedProject, dispatch, projects.length]) // do not put "projects" in dependency here! ignore react warning!

  const handleMore = (task: TaskObject) => {
    setSelectedTask(task)
    setIsViewModalVisible(true)
  }

  const onConfirmAdd = async (values: any) => {
    const taskBody = {
      ...values,
      due_date: values.due_date ? moment.utc(values.due_date).format() : null,
      project: selectedProject,
      status: 'backlog',
    }
    setLoading(true)
    try {
      const newTask = await addTask(taskBody)
      const updatedProject = selectedProject && (await getSingleProject(selectedProject))
      console.log('updatedProject = ', updatedProject)
      dispatch(tasksAddItem(newTask))
      setFullProject(updatedProject)
      setLoading(false)
      setIsAddModalVisible(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const onConfirmEdit = async (values: any) => {
    const taskBody = {
      ...values,
      due_date: values.due_date ? moment.utc(values.due_date).format() : null,
    }
    setLoading(true)
    try {
      const editedTask = await editTask(selectedTask!._id, taskBody)
      dispatch(updateTaskObject(editedTask))
      setLoading(false)
      setIsEditModalVisible(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const onUpdateOrder = async (newOrder: any) => {
    try {
      const body = {
        order_snapshot: newOrder,
      }
      const updatedProject = selectedProject && (await editProject(selectedProject, body))
      dispatch(updateProjectObject(updatedProject))
    } catch (err) {
      console.log(err)
    }
  }

  const onChangeColumn = async (task: TaskObject, column: string) => {
    try {
      const body = {
        status: column,
      }
      const updatedTask = await editTask(task._id, body)
      dispatch(updateTaskObject(updatedTask))
    } catch (err) {
      console.log(err)
    }
  }

  return projects.length > 0 ? (
    <>
      <Space>
        <Typography.Text>Project: </Typography.Text>
        <Select
          placeholder="Choose project"
          onChange={(value: string) => dispatch(taskChooseProject(value))}
          defaultValue={selectedProject ? selectedProject : undefined}
          style={{ minWidth: '150px', marginRight: '20px' }}
        >
          {(projects as any).map((project: ProjectObject, index: number) => (
            <Select.Option key={index} value={project._id || 'null'}>
              {project.name}
            </Select.Option>
          ))}
        </Select>
        {fullProject && fullProject.members && (
          <>
            <Typography.Text>Assignee: </Typography.Text>
            <Select
              placeholder="Filter assignee"
              onChange={(value: string) => setAssignee(value)}
              style={{ minWidth: '150px' }}
              allowClear
              onClear={() => setAssignee(null)}
            >
              {([...fullProject.members, fullProject.manager] as any).map(
                (assignee: { _id: string; name: string }, index: number) => (
                  <Select.Option key={index} value={assignee._id || 'null'}>
                    {assignee.name}
                  </Select.Option>
                ),
              )}
            </Select>
          </>
        )}
      </Space>
      <Divider />
      {selectedProject && fullProject ? (
        <TasksBoard
          tasks={tasks}
          onAdd={() => setIsAddModalVisible(true)}
          handleMore={handleMore}
          order_snapshot={fullProject!.order_snapshot}
          onUpdateOrder={onUpdateOrder}
          onChangeColumn={onChangeColumn}
          assignee={assignee}
        />
      ) : (
        <EmptyContainer>
          <Empty description="Choose project first" />
        </EmptyContainer>
      )}
      <Modal
        title="Add Task"
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={[
          <Button key="cancel_add" onClick={() => setIsAddModalVisible(false)}>
            Cancel
          </Button>,
          <Button type="primary" form="addTask" key="submit_add" htmlType="submit" loading={loading}>
            Submit
          </Button>,
        ]}
      >
        {isAddModalVisible && fullProject && fullProject.members && (
          <AddTask
            onConfirmAdd={onConfirmAdd}
            users={
              [...fullProject.members, fullProject.manager] as [
                {
                  _id: string
                  name: string
                },
              ]
            }
          />
        )}
      </Modal>
      <Modal
        title="View Task"
        visible={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={[
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setIsViewModalVisible(false)
              setIsEditModalVisible(true)
            }}
            key="edit"
          >
            Edit
          </Button>,
        ]}
      >
        {isViewModalVisible && selectedTask && <ViewTask {...selectedTask} />}
      </Modal>
      <Modal
        title="Edit Task"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={[
          <Button key="cancel_edit" onClick={() => setIsEditModalVisible(false)}>
            Cancel
          </Button>,
          <Button type="primary" form="editTask" key="submit_edit" htmlType="submit" loading={loading}>
            Submit
          </Button>,
        ]}
      >
        {isEditModalVisible && selectedTask && fullProject && fullProject.members && (
          <EditTask
            onConfirmEdit={onConfirmEdit}
            task={selectedTask}
            users={
              [...fullProject.members, fullProject.manager] as [
                {
                  _id: string
                  name: string
                },
              ]
            }
          />
        )}
      </Modal>
    </>
  ) : (
    <EmptyContainer height="85vh">
      <Empty description="No available projects. Create project first" />
    </EmptyContainer>
  )
}

export default Tasks
