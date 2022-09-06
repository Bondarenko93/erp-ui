import React, { useEffect, useState } from 'react'
import { Card, Typography, Button } from 'antd'
import { TagsOutlined, PlusOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import Avatar from '../../components/UserAvatar'

const BoardContainer = styled.div`
  display: flex;
  width: 100%;
`

const ColumnContainer = styled.div<ColumnContainerType>`
  width: 20%;
  min-width: 200px;
  margin-right: ${props => (props.isLast ? 0 : '10px')};
`

const Column = styled.div<ColumnBodyType>`
  background-color: ${props => (props.isDraggingOver ? '#d6e4ff' : '#f0f5ff')};
  transition: background-color 0.1s ease-in-out;
  border: 1px solid rgba(0, 0, 0, 0.1);
`

const ColumnTitle = styled.div`
  padding: 20px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #fff;
`

const ColumnBody = styled.div`
  padding: 10px;
  height: 69vh;
  overflow-y: scroll;
`

const CardBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

type TasksBoardProps = {
  tasks: TaskObject[] | []
  onAdd: () => void
  handleMore?: (task: TaskObject) => void
  order_snapshot: {
    backlog: string[]
    to_do: string[]
    in_progress: string[]
    in_review: string[]
    done: string[]
  }
  onUpdateOrder: (newOrder: any) => void
  onChangeColumn: (task: TaskObject, column: string) => void
  assignee?: string | null
}

const TasksBoard = ({
  tasks,
  onAdd,
  handleMore,
  order_snapshot,
  onUpdateOrder,
  onChangeColumn,
  assignee,
}: TasksBoardProps) => {
  const [columns, setColumns] = useState<BoardColumnsType | null>(null)

  useEffect(() => {
    if (tasks) {
      let filteredTasks = assignee ? tasks.filter(item => item.assignee._id === assignee) : tasks
      const splitTasks = (filteredTasks as any).reduce(
        (columns: any, item: any) => {
          columns[item.status].push(item)
          return columns
        },
        {
          backlog: [],
          to_do: [],
          in_progress: [],
          in_review: [],
          done: [],
        },
      )
      for (const column in splitTasks) {
        splitTasks[column] = splitTasks[column].slice().sort((a: any, b: any) => {
          return (order_snapshot as any)[column].indexOf(a._id) - (order_snapshot as any)[column].indexOf(b._id)
        })
      }
      setColumns(splitTasks)
    }
  }, [tasks, order_snapshot, assignee])

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const move = (source: any[], destination: any[], droppableSource: any, droppableDestination: any) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    removed.status = droppableDestination.droppableId
    destClone.splice(droppableDestination.index, 0, removed)

    const resultColumns: { [key: string]: any[] } = {}
    resultColumns[droppableSource.droppableId] = sourceClone
    resultColumns[droppableDestination.droppableId] = destClone

    let sourceCloneOrder = sourceClone.map(item => item._id)
    let destCloneOrder = destClone.map(item => item._id)
    const resultColumnsOrder: { [key: string]: any[] } = {}
    resultColumnsOrder[droppableSource.droppableId] = sourceCloneOrder
    resultColumnsOrder[droppableDestination.droppableId] = destCloneOrder

    return {
      columns: resultColumns,
      columnsOrder: resultColumnsOrder,
    }
  }

  const onDragEnd = (result: any) => {
    const { source, destination } = result
    if (!destination) {
      return
    }
    if (columns) {
      if (source.droppableId === destination.droppableId) {
        const items: any[] = reorder(columns[source.droppableId], source.index, destination.index)
        if (source.index !== destination.index) {
          setColumns({
            ...columns,
            [source.droppableId]: items,
          })
          onUpdateOrder({
            ...columns,
            [source.droppableId]: items.map(item => item._id),
          })
        }
      } else {
        const result = move(columns[source.droppableId], columns[destination.droppableId], source, destination)
        const movedTask = columns[source.droppableId][source.index]
        setColumns({
          ...columns,
          ...result.columns,
        })
        onChangeColumn(movedTask, destination.droppableId)
        onUpdateOrder({
          ...columns,
          ...result.columnsOrder,
        })
      }
    }
  }

  return (
    columns && (
      <BoardContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          {(Object.keys(columns) as any).map((column_name: string, column_index: number) => (
            <ColumnContainer key={column_index} isLast={column_index === Object.keys(columns).length - 1}>
              <Droppable droppableId={column_name}>
                {(provided, snapshot) => (
                  <Column ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
                    <ColumnTitle>
                      <div style={{ display: 'flex' }}>
                        <Typography.Title level={5} style={{ textTransform: 'capitalize', margin: 0 }}>
                          {column_name.replace('_', ' ')}
                        </Typography.Title>
                        {column_name === 'backlog' && (
                          <Button
                            onClick={onAdd}
                            size="small"
                            type="primary"
                            icon={<PlusOutlined />}
                            style={{ marginLeft: '10px' }}
                          >
                            Add
                          </Button>
                        )}
                      </div>
                      <div>
                        <Typography.Text style={{ marginRight: '3px' }}>{columns[column_name].length}</Typography.Text>
                        <TagsOutlined />
                      </div>
                    </ColumnTitle>
                    <ColumnBody>
                      {(columns[column_name] as any).map((task: any, task_index: number, tasks_list: any) => (
                        <Draggable key={task._id} draggableId={task._id} index={task_index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              style={provided.draggableProps.style}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card
                                style={{
                                  userSelect: 'none',
                                  background: snapshot.isDragging ? '#d9f7be' : '#fff',
                                  marginBottom: task_index === tasks_list.length - 1 ? 0 : '10px',
                                }}
                                title={task.title}
                                size="small"
                                extra={
                                  <Button onClick={() => handleMore && handleMore(task)} type="link" size="small">
                                    More
                                  </Button>
                                }
                              >
                                <CardBody>
                                  <Avatar avatar={task.assignee.avatar} name={task.assignee.name} size="small" />
                                  {task.estimate_hours && (
                                    <Typography.Text type="secondary">{task.estimate_hours}h</Typography.Text>
                                  )}
                                </CardBody>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </ColumnBody>
                    {provided.placeholder}
                  </Column>
                )}
              </Droppable>
            </ColumnContainer>
          ))}
        </DragDropContext>
      </BoardContainer>
    )
  )
}

export default TasksBoard
