/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useSelector, useDispatch } from 'react-redux'
import { setTimeLeft } from '../data/timer/actions'
import { STATUSES, TYPES } from '../data/timer/reducer'
import { Typography, useMediaQuery, useTheme } from '@material-ui/core'
import Box from '@material-ui/core/Box'

export const CountdownCircle = () => {
  const { timeLeft, progress, status, type } = useSelector(
    (state) => state.timer
  )

  const { workDuration, shortBreakDuration, longBreakDuration } = useSelector(
    (state) => state.settings
  )

  const darkMode = useSelector((state) => +state.settings.darkMode)
  const darkModeCached = +JSON.parse(localStorage.getItem('darkMode'))

  const dispatch = useDispatch()

  useEffect(() => {
    if (
      status === STATUSES.onHold &&
      type === TYPES.work &&
      workDuration &&
      (!timeLeft || timeLeft.minutes !== workDuration)
    ) {
      dispatch(setTimeLeft({ minutes: workDuration, seconds: 0 }))
    }
  }, [workDuration])

  useEffect(() => {
    if (
      status === STATUSES.onHold &&
      type === TYPES.shortBreak &&
      timeLeft &&
      timeLeft.minutes !== shortBreakDuration
    ) {
      dispatch(setTimeLeft({ minutes: shortBreakDuration, seconds: 0 }))
    }
  }, [shortBreakDuration])

  useEffect(() => {
    if (
      status === STATUSES.onHold &&
      type === TYPES.longBreak &&
      timeLeft &&
      timeLeft.minutes !== longBreakDuration
    ) {
      dispatch(setTimeLeft({ minutes: longBreakDuration, seconds: 0 }))
    }
  }, [longBreakDuration])

  const theme = useTheme()
  const isMD = useMediaQuery(theme.breakpoints.up('md'))
  const isLG = useMediaQuery(theme.breakpoints.up('lg'))
  const isXL = useMediaQuery(theme.breakpoints.up('xl'))

  const getCircleSize = () => {
    if (isXL) return 400
    if (isLG) return 340
    if (isMD) return 300

    return 200
  }

  return (
    <CircleContainer size={getCircleSize() + 'px'}>
      <Circle
        variant="determinate"
        value={100}
        size={getCircleSize()}
        color="secondary"
        dark={darkMode || darkModeCached}
        theme={theme}
      />
      <Circle
        variant={timeLeft ? 'determinate' : 'indeterminate'}
        value={progress}
        size={getCircleSize()}
        color="primary"
        dark={darkMode || darkModeCached}
        theme={theme}
      />
      {timeLeft && (
        <Time theme={theme}>
          {timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes}:
          {timeLeft.seconds < 10 ? '0' + timeLeft.seconds : timeLeft.seconds}
        </Time>
      )}

      <TimerTypeContainer theme={theme}>
        <TimerType
          fontWeight="fontWeightBold"
          variant="subtitle2"
          // color="textSecondary"
          theme={theme}
        >
          {type === 'WORK' ? 'FOCUS' : 'BREAK'}
        </TimerType>
      </TimerTypeContainer>
    </CircleContainer>
  )
}

const CircleContainer = styled.div`
  position: relative;
  margin: 20px auto 0;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`

const Circle = styled(CircularProgress)`
  position: absolute;
  top: 0;
  ${({ dark, theme }) =>
    dark &&
    css`
      &.MuiCircularProgress-colorPrimary {
        color: ${theme.palette.primary.light};
      }

      &.MuiCircularProgress-colorSecondary {
        color: ${theme.palette.secondary.light};
      }
    `}
`

const Time = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  white-space: pre;
  font-weight: 600;

  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 3.6rem;
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    font-size: 4.2rem;
  }

  ${({ theme }) => theme.breakpoints.up('xl')} {
    font-size: 5rem;
  }
`
const TimerTypeContainer = styled(Box)`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);

  ${({ theme }) => theme.breakpoints.up('md')} {
    top: 70%;
    transform: translate(-50%, -70%);
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    top: 72%;
  }
`

const TimerType = styled(Typography)`
  letter-spacing: 1px;
  font-weight: bold;

  ${({ theme }) => theme.breakpoints.up('lg')} {
    font-size: 1.5rem;
  }
`

export { Time, TimerType }
