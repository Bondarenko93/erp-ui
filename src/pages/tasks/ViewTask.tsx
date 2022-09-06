import React from 'react'
import { Descriptions } from 'antd'
import moment from 'moment'

import Avatar from '../../components/UserAvatar'

const ViewTask = ({
  title,
  description,
  assignee,
  estimate_hours,
  due_date,
  date_created,
}: TaskObject): JSX.Element => (
  <Descriptions bordered column={1} className="setlabelwidth">
    <Descriptions.Item label="Title:">{title}</Descriptions.Item>
    <Descriptions.Item label="Description:">{description}</Descriptions.Item>
    {typeof assignee === 'object' && (
      <Descriptions.Item label="Assignee:">
        <Avatar avatar={assignee.avatar as any} name={assignee.name} />
        {assignee.name}
      </Descriptions.Item>
    )}
    <Descriptions.Item label="Estimate:">{estimate_hours ? `${estimate_hours}h` : ''}</Descriptions.Item>
    <Descriptions.Item label="Due Date:">
      {due_date && moment.utc(due_date).local().format('DD.MM.YYYY')}
    </Descriptions.Item>
    <Descriptions.Item label="Date Created:">
      {date_created && moment.utc(date_created).local().format('DD.MM.YYYY')}
    </Descriptions.Item>
  </Descriptions>
)

export default ViewTask
