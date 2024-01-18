import React from 'react'
import Box from '@material-ui/core/Box'
import { Helmet } from 'react-helmet'
import { CountdownCircle } from './components/CountdownCircle'
import { ToggleButton } from './components/ToggleButton'
import { RoundsCounter } from './components/RoundsCounter'
import { ResetButton } from './components/ResetButton'
import { SkipButton } from './components/SkipButton'
import { useMediaQuery, useTheme } from '@material-ui/core'

export const Timer = () => {
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
    <Box width={getCircleSize()} m="auto">
      <Helmet>
        <link rel="canonical" href="https://pomodor.app" />
      </Helmet>
      <CountdownCircle />

      <Box display="flex" justifyContent="center" alignItems="center" my={3}>
        <ResetButton />

        <Box display="flex" flexDirection="column" alignItems="center" mx={3}>
          <ToggleButton />
        </Box>

        <SkipButton />
      </Box>

      <Box display="flex" justifyContent="center">
        <RoundsCounter />
      </Box>
    </Box>
  )
}
