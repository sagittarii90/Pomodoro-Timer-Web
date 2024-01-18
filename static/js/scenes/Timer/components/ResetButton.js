import React from 'react'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import ReplayIcon from '@material-ui/icons/Replay'
import { useDispatch, useSelector } from 'react-redux'
import { resetTimer } from '../data/timer/actions'
import { TYPES, STATUSES } from '../data/timer/reducer'

export const ResetButton = () => {
  const { type, status } = useSelector((state) => state.timer)
  const {
    workDuration,
    shortBreakDuration,
    longBreakDuration,
    showTimerInTitle,
  } = useSelector((state) => state.settings)

  const dispatch = useDispatch()

  const handleClick = () => {
    let duration

    switch (type) {
      case TYPES.work:
        duration = workDuration
        break
      case TYPES.shortBreak:
        duration = shortBreakDuration
        break
      case TYPES.longBreak:
        duration = longBreakDuration
        break
      default:
        break
    }
    dispatch(resetTimer({ duration, showTimerInTitle }))
  }

  return (
    <>
      <ActionIcon
        disabled={status === STATUSES.onHold}
        aria-label="Reset timer"
        onClick={handleClick}
        size="small"
      >
        <ReplayIcon />
      </ActionIcon>
    </>
  )
}

export const ActionIcon = styled(IconButton)`
  border: 1px solid #bababa;
`
