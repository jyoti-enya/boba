import MUIMenu from '@mui/material/Menu'
import MUIMenuItem from '@mui/material/MenuItem'
import React, { FC } from 'react'
import { StyleMenuButton } from './styles'
import { MenuProps } from './types'
import { useTheme } from 'styled-components'

const Menu: FC<MenuProps> = ({ label, name, children, options }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const theme: any = useTheme()

  return (
    <>
      <StyleMenuButton onClick={handleClick}>
        {label || children}
      </StyleMenuButton>
      <MUIMenu
        anchorEl={anchorEl}
        id={name}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {options.map((opt, index) => {
          return (
            <MUIMenuItem
              sx={{
                margin: '5px',
                borderRadius: '10px',
              }}
              key={index}
              onClick={opt.onClick}
            >
              {opt.component}
            </MUIMenuItem>
          )
        })}
      </MUIMenu>
    </>
  )
}

export default Menu
