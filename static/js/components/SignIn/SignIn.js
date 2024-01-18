import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import FaceIcon from '@material-ui/icons/Face'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SvgIcon from '@material-ui/core/SvgIcon'
import { GoogleIcon } from './components/GoogleIcon'
import { linkAccount } from '../../data/auth/actions'
import { googleAuthProvider } from '../../firebase/firebase'
import { setProgressVisibility } from '../../data/progress/actions'

export const SignIn = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()

  const googleAuth = async () => {
    dispatch(setProgressVisibility(true))
    handleClose()
    await dispatch(linkAccount(googleAuthProvider))
    dispatch(setProgressVisibility(false))
  }

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        aria-controls="sign-in-menu"
        aria-haspopup="true"
        onClick={openMenu}
        startIcon={<FaceIcon />}
        variant="outlined"
        id="signin"
      >
        Sign In
      </Button>
      <Menu
        id="sign-in-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={googleAuth}>
          <ListItemIcon>
            <SvgIcon>
              <GoogleIcon />
            </SvgIcon>
          </ListItemIcon>
          <ListItemText primary="Sign in via Google" />
        </MenuItem>
      </Menu>
    </>
  )
}
