import React from 'react'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'

type ApprovedIconProps = {
  approved: boolean | undefined
}

const ApprovedIcon = ({ approved }: ApprovedIconProps): JSX.Element | null =>
  typeof approved === 'boolean' ? (
    approved ? (
      <CheckCircleTwoTone twoToneColor="#95de64" style={{ fontSize: '20px' }} />
    ) : (
      <CloseCircleTwoTone twoToneColor="#f5222d" style={{ fontSize: '20px' }} />
    )
  ) : null

export default ApprovedIcon
