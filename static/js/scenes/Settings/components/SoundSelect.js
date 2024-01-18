import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import Box from '@material-ui/core/Box'
import MatFormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { startSetNotificationSound } from '../../../data/settings/actions'
import { useTheme } from '@material-ui/core'
import { sounds } from '../../../data/sounds'

export const SoundSelect = () => {
  const [sound, setSound] = useState('')
  const [currentAudio, setCurrentAudio] = useState(null)

  const notificationSound = useSelector(
    (state) => state.settings.notificationSound
  )

  const darkMode = useSelector((state) => +state.settings.darkMode)

  useEffect(() => {
    if (notificationSound !== null && notificationSound !== undefined) {
      setSound(notificationSound)
    }
  }, [notificationSound])

  const dispatch = useDispatch()

  const handleChange = (event) => {
    if (currentAudio) {
      currentAudio.pause()
    }

    const sound = event.target.value

    const audio = new Audio(sounds[sound])
    audio.play()
    setCurrentAudio(audio)

    setSound(sound)
    dispatch(startSetNotificationSound(sound))
  }

  const theme = useTheme()

  return (
    <Box my={2}>
      <FormControl variant="outlined" dark={darkMode} theme={theme}>
        <InputLabel id="sound-select">Notification sound</InputLabel>
        <Select
          labelId="sound-select"
          value={sound}
          onChange={handleChange}
          label="Notification sound"
        >
          <MenuItem value="long">Long</MenuItem>
          <MenuItem value="simple">Simple</MenuItem>
          <MenuItem value="bell">Bell</MenuItem>
          <MenuItem value="clear">Clear</MenuItem>
          <MenuItem value="fairy">Fairy</MenuItem>
          <MenuItem value="guitar">Guitar</MenuItem>
          <MenuItem value="happy">Happy</MenuItem>
          <MenuItem value="positive">Positive</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

const FormControl = styled(MatFormControl)`
  width: 100%;

  ${({ dark, theme }) =>
    dark &&
    css`
      .MuiFormLabel-root.Mui-focused {
        color: ${theme.palette.primary.light};
      }

      .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: ${theme.palette.primary.light};
      }
    `}
`
