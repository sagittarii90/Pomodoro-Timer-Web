import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

export const RoundsCounter = () => {
  const { currentRound, timeLeft } = useSelector((state) => state.timer)
  const { rounds } = useSelector((state) => state.settings)

  return (
    <CounterLabel>
      {timeLeft && currentRound} of {timeLeft && rounds} sessions
    </CounterLabel>
  )
}

export const CounterLabel = styled.span`
  text-align: center;
  font-weight: 600;
  width: 60px;
`
