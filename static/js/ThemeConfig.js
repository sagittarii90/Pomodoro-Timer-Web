import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import { createTheme } from '@material-ui/core/styles'
import pink from '@material-ui/core/colors/pink'

export const ThemeConfig = ({ children }) => {
  const darkModeCached = +localStorage.getItem('darkMode')
  const [darkTheme, setDarkTheme] = useState(darkModeCached)

  const darkMode = useSelector((state) => +state.settings.darkMode)
  const progress = useSelector((state) => state.progress)

  const userTheme = createTheme({
    palette: {
      type: darkTheme ? 'dark' : 'light',
      primary: {
        main: '#2D27DC',
        light: '#543EF6',
        dark: 'brown',
      },
      secondary: {
        main: pink[300],
      },
      background: {
        default: darkTheme ? '#111' : '#fdfcfe',
      },
      text: {
        primary: darkTheme ? '#fff' : '#121212',
        secondary: darkTheme ? '#fff9' : '#575757',
      },
    },
    typography: {
      fontFamily: ['Inter', 'sans-serif'],
    },
  })

  useEffect(() => {
    if (!progress) {
      localStorage.setItem('darkMode', darkMode)
      setDarkTheme(darkMode)
    }
  }, [darkMode, progress])

  return <ThemeProvider theme={userTheme}>{children || <></>}</ThemeProvider>
}
