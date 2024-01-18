import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import TimerIcon from '@material-ui/icons/AccessAlarms'
import SettingsIcon from '@material-ui/icons/SettingsOutlined'
import SunIcon from '@material-ui/icons/WbSunnyOutlined'
import MoonIcon from '@material-ui/icons/NightsStay'
import { useTheme } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import { STATUSES } from '../../../../../scenes/Timer/data/timer/reducer'
import { startSetDarkMode } from '../../../../../data/settings/actions'

export const NavList = ({ closeDrawer }) => {
  const theme = useTheme()
  const isDesktop = +useMediaQuery('(min-width:900px) and (min-height:550px)')

  const timerRunning = useSelector(
    (state) => state.timer.status !== STATUSES.onHold
  )

  const darkMode = useSelector((state) => +state.settings.darkMode)
  const darkModeCached = +JSON.parse(localStorage.getItem('darkMode'))

  const dispatch = useDispatch()

  const toggleDarkMode = () => {
    dispatch(startSetDarkMode(!darkMode))
  }

  return (
    <Box bgcolor="background.default" height="100%">
      <MatNavList
        component="nav"
        className="NavList"
        aria-label="Main navigation"
        theme={theme}
        desktop={isDesktop}
      >
        <Box>
          <Link to="/timer" theme={theme}>
            <NavListItem
              button
              disableRipple
              theme={theme}
              onClick={closeDrawer()}
            >
              <NavItemIcon>
                <TimerIcon />
              </NavItemIcon>
              <ListItemText primary="Timer" />
            </NavListItem>
          </Link>

          <Tooltip
            title="Reset timer to access the settings"
            disableHoverListener={!timerRunning}
            disableTouchListener
            disableFocusListener
            placement={isDesktop ? 'right' : 'left'}
          >
            <Link
              to={timerRunning ? '#' : '/settings'}
              data-disabled={timerRunning && 'true'}
              theme={theme}
            >
              <NavListItem
                theme={theme}
                button
                disabled={timerRunning}
                data-item="settings"
                disableRipple
                onClick={closeDrawer()}
              >
                <NavItemIcon>
                  <SettingsIcon />
                </NavItemIcon>
                <ListItemText primary="Settings" />
              </NavListItem>
            </Link>
          </Tooltip>
        </Box>

        <Tooltip
          title="Toggle dark mode"
          disableTouchListener
          disableFocusListener
          placement={isDesktop ? 'right' : 'left'}
        >
          <NavListItem
            theme={theme}
            button
            data-item="dark-mode"
            disableRipple
            onClick={toggleDarkMode}
          >
            <NavItemIcon>
              {darkMode || darkModeCached ? <MoonIcon /> : <SunIcon />}
            </NavItemIcon>
            <ListItemText
              primary={
                (darkMode || darkModeCached ? 'Dark' : 'Light') + ' mode'
              }
            />
          </NavListItem>
        </Tooltip>
      </MatNavList>
    </Box>
  )
}

const MatNavList = styled(List)`
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 254px;
  height: 100%;

  ${({ desktop }) =>
    desktop
      ? css`
          padding-top: 200px;
          justify-content: space-between;
          padding-bottom: 55px;
        `
      : css`
          justify-content: center;
        `}
`

const NavItemIcon = styled(ListItemIcon)`
  /* color: rgba(255, 255, 255, 0.75); */
  min-width: initial;
  margin-right: 20px;

  .MuiSvgIcon-root {
    font-size: 32px;
  }
`

const NavListItem = styled(ListItem)`
  /* display: flex;
  flex-direction: column; */

  margin-bottom: 50px;
  padding-left: 60px;

  &[data-item='dark-mode'] {
    margin-bottom: 0;
  }

  .MuiListItemText-primary {
    /* color: rgba(255, 255, 255, 0.75); */
    font-size: 1rem;
    letter-spacing: 1px;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  ${NavItemIcon} {
    color: ${({ theme }) => theme.palette.text.secondary};
  }
`

const Link = styled(NavLink)`
  text-decoration: none;
  font-size: 1rem;

  &.active:not([data-disabled='true'])
    ${NavItemIcon},
    &.active:not([data-disabled='true'])
    .MuiListItemText-primary {
    color: ${({ theme }) => theme.palette.text.primary};
  }

  &.active:not([data-disabled='true']) {
    color: red;
  }

  &.active .MuiListItemText-primary {
    /* color: #fff; */
  }
`
export { NavListItem }
