/*
Copyright 2021-present Boba Network.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */

import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Box, useMediaQuery } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles'

import { setTheme } from 'actions/uiAction'
import { selectTheme } from 'selectors'

import Router from './routes'
import CustomThemeProvider from 'themes'
import { Background } from 'components/global/background'
import FallbackLoader from './FallbackLoader'

function App() {
  const dispatch = useDispatch()

  const theme = useSelector(selectTheme)
  const light = theme === 'light'

  const radioGreen = '#BAE21A'
  // const darkGrey = '#1b1c1f'
  // const cyan = '#1CD6D1'

  const buttonColor = '#BAE21A' //radioGreen
  const buttonColorLightmode = '#1CD6D1' //cyan

  let MUItheme = createTheme({
    palette: {
      mode: theme === 'light' ? 'light' : 'dark',
      primary: {
        main: buttonColor,
        gradient: 'linear-gradient(131.81deg, #4A6FEF 2.66%, #4251F0 124.21%)',
        contrastText: '#fff',
        border: light ? 'solid 1px rgba(0, 0, 0, 0.12)' : 'solid 1px #2d2f3a',
        borderRadius: '12px',
        borderBottom: light
          ? 'solid 1px rgba(0, 0, 0, 0.08)'
          : '1px solid rgba(255, 255, 255, 0.04)',
        tabBorderBottom: light
          ? `solid 2px ${buttonColor}`
          : `solid 2px ${buttonColor}`,
        alert: light ? 'black' : '#FFD88D',
        tooltip: light ? '#5E6058' : '#545454',
        info: light ? 'rgba(3, 19, 19, 0.65)' : 'rgba(255, 255, 255, 0.65)',
      },
      secondary: {
        main: light ? buttonColorLightmode : buttonColor,
        borderRadius: '20px',
        border: light
          ? 'solid 1px rgba(3, 19, 19, 0.06)'
          : 'solid 1px rgba(255, 255, 255, 0.06)',
        gradient: light
          ? '#1CD6D1'
          : '-webkit-linear-gradient(0deg, #CBFE00 15.05%, #1CD6D1 79.66%)',
        text: light ? 'rgba(3, 19, 19, 0.85)' : 'rgba(255, 255, 255, 0.85)',
      },
      background: {
        default: light ? '#E5E5E1' : '#191919',
        secondary: light
          ? 'rgba(3, 19, 19, 0.04)'
          : 'rgba(255, 255, 255, 0.06)',
        secondaryLight: light
          ? 'rgba(0, 0, 0, 0.08)'
          : 'rgba(255, 255, 255, 0.14)',
        dropdown: light ? '#dadada' : '#142031',
        modal: light ? '#fff' : '#1A1D1F',
        modalTransparent: light ? '#fff' : 'transparent',
        input: light ? 'rgba(3, 19, 19, 0.04)' : 'rgba(255, 255, 255, 0.04)',
        footer: light ? '#1A1D1F' : '#1A1D1F',
        glassy: light ? 'rgba(253, 255, 248, 0.9)' : 'linear-gradient(129deg, rgba(48, 48, 48, 0.60) 0%, rgba(48, 48, 48, 0.60) 46.35%, rgba(37, 37, 37, 0.60) 94.51%)',
        glassyBorder: light? 'rgba(253, 255, 248, 0.9)' : 'rgba(84, 84, 84, 1)',
        tooltip: light ? '#5E6058' : '#545454',
        alert: light ? 'rgba(3, 19, 19, 0.06)' : 'rgba(255, 216, 141, 0.1)',
      },
      neutral: {
        main: '#fff',
        contrastText: buttonColor,
      },
      spacing: {
        toFooter: '80px',
      },
    },
    typography: {
      h1: {
        fontSize: 42,
        fontWeight: 700,
      },
      h2: {
        fontSize: 32,
        fontWeight: 300,
      },
      h3: {
        fontSize: 24,
        fontWeight: 300,
      },
      h4: {
        fontSize: 20,
        fontWeight: 300,
      },
      body1: {
        fontSize: 18,
        display: 'block',
      },
      body2: {
        fontSize: 16,
        fontWeight: 400,
        lineHeight: '1.0em',
        display: 'block',
      },
      body3: {
        fontSize: 14,
        lineHeight: '1.1em',
        display: 'block',
      },
      body4: {
        fontSize: 12,
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius:'12px',
            "& $notchedOutline": {
              padding:'15px 16px'
            }
          }
        }
      },
      ReactSelect: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            minWidth: '96px',
            boxShadow: 'none',
            backgroundColor: light
              ? 'rgba(3, 19, 19, 0.04)'
              : 'rgba(255, 255, 255, 0.04)',
            border: light
              ? '1px solid rgba(3, 19, 19, 0.06)'
              : '1px solid rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(50px)',
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            borderRadius: '12px',
            minWidth: '96px',
            boxShadow: 'none',
            backgroundColor: light
              ? 'rgba(3, 19, 19, 0.04)'
              : 'rgba(255, 255, 255, 0.04)',
            border: light
              ? '1px solid rgba(3, 19, 19, 0.06)'
              : '1px solid rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(50px)',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: light
              ? 'rgba(0, 0, 0, 0.08)'
              : 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(50px)',
            borderRadius: '12px',
          },
          arrow: {
            color: light ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.06)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            textTransform: 'none',
            boxShadow: 'none !important',
            minWidth: '0',
            color: '#031313',
            '&.Mui-disabled': {
              background: light ? 'transparent' : 'rgba(255, 255, 255, 0.04)',
              color: light ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
              border: light ? '1px solid rgba(0, 0, 0, 0.5)' : 'none',
            },
          },
        },
        variants: [
          {
            props: { variant: 'contained', color: 'primary' },
            style: {
              // background: 'linear-gradient(131.81deg, #4A6FEF 2.66%, #4251F0 124.21%)',
              background: !light ? radioGreen : buttonColorLightmode,
              borderWidth: '1.4px',
              borderColor: !light ? radioGreen : buttonColorLightmode,
              fontWeight: 500,
              fontSize: '16px',
              font: 'Roboto',
              color: '#031313',
              '&:hover': {
                boxShadow: 'inset 0px 0px 0px 3px rgba(255, 255, 255, 0.2)',
                transition: 'box-shadow 0.3s ease-in-out',
                backgroundColor: !light ? radioGreen : buttonColorLightmode,
              },
            },
          },
          {
            props: { variant: 'outlined', color: 'primary' },
            style: {
              color: !light ? radioGreen : buttonColorLightmode,
              borderColor: !light ? radioGreen : buttonColorLightmode,
              background: light ? '#fff' : 'none',
              borderWidth: '1.4px',
              fontWeight: 700,
              '&:hover': {
                color: '#000',
                borderColor: !light ? radioGreen : buttonColorLightmode,
                backgroundColor: !light ? radioGreen : buttonColorLightmode,
                borderWidth: '1.4px',
                boxShadow: 'inset 2px 2px 13px rgba(0, 0, 0, 0.15)',
              },
            },
          },
          {
            props: { variant: 'standard', color: 'primary' },
            style: {
              color: light
                ? 'rgba(0, 0, 0, 0.45)'
                : 'rgba(255, 255, 255, 0.45)',
              background: light
                ? 'rgba(0, 0, 0, 0.06)'
                : 'rgba(255, 255, 255, 0.06)',
              borderWidth: '1.4px',
              borderColor: buttonColor,
              filter: 'drop-shadow(0px 0px 7px rgba(73, 107, 239, 0.35))',
              '&:hover': {
                color: buttonColor,
                boxShadow: light
                  ? 'none'
                  : 'inset 2px 2px 13px rgba(0, 0, 0, 0.15)',
              },
            },
          },
          {
            props: { variant: 'standard', color: 'secondary' },
            style: {
              color: light
                ? 'rgba(0, 0, 0, 0.45)'
                : 'rgba(255, 255, 255, 0.45)',
              background: light
                ? 'rgba(0, 0, 0, 0.06)'
                : 'rgba(255, 255, 255, 0.06)',
              borderWidth: '1.4px',
              borderColor: buttonColor,
              '&:hover': {
                color: !light ? buttonColor : buttonColorLightmode,
                boxShadow: 'none',
              },
            },
          },
          {
            props: { variant: 'outlined', color: 'secondary' },
            style: {
              color: !light ? buttonColor : buttonColorLightmode,
              borderWidth: '1.4px',
              borderColor: !light ? buttonColor : buttonColorLightmode,
              '&:hover': {
                opacity: 0.9,
                borderWidth: '1.4px',
                transition: 'opacity 0.3s ease-in-out',
                borderColor: !light ? buttonColor : buttonColorLightmode,
                boxShadow: 'inset 2px 2px 13px rgba(0, 0, 0, 0.15)',
              },
            },
          },
          {
            props: { variant: 'contained', color: 'neutral' },
            style: {
              '&:hover': {
                opacity: 0.9,
                transition: 'opacity 0.3s ease-in-out',
              },
            },
          },
          {
            props: { variant: 'outlined', color: 'neutral' },
            style: {
              color: light
                ? 'rgba(0, 0, 0, 0.85)'
                : 'rgba(255, 255, 255, 0.85)',
              borderWidth: '1.4px',
              borderColor: light
                ? 'rgba(0, 0, 0, 0.85)'
                : 'rgba(255, 255, 255, 0.85)',
              '&:hover': {
                opacity: 0.9,
                borderWidth: '1.4px',
                transition: 'opacity 0.3s ease-in-out',
                borderColor: light ? '#000' : buttonColor,
                boxShadow: 'inset 2px 2px 13px rgba(0, 0, 0, 0.15)',
              },
            },
          },
          {
            props: { variant: 'small' },
            style: {
              fontSize: '14px',
              background:
                'linear-gradient(131.81deg, #4A6FEF 2.66%, #4251F0 124.21%)',
              textTransform: 'uppercase',
              borderRadius: '12px',
              minWidth: '0',
              '&:hover': {
                boxShadow: 'inset 0px 0px 0px 2px rgba(255, 255, 255, 0.2)',
                transition: 'box-shadow 0.3s ease-in-out',
              },
            },
          },
          {
            props: { size: 'large' },
            style: {
              fontSize: '1rem',
            },
          },
          {
            props: { size: 'small' },
            style: {
              fontSize: '0.8rem',
            },
          },
        ],
      },
      MuiInputBase: {
        backgroundColor: '#f00',
      },
      MuiAlert: {
        variants: [
          {
            props: { variant: 'simple' },
            style: {
              padding: 0,
              backgroundColor: 'transparent',
            },
          },
        ],
      },
      MuiTypography: {
        variants: [
          {
            props: { variant: 'body2', color: 'fade' },
            style: {
              lineHeight: '1.1em',
              color: light ? 'rgba(0,0,0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
            },
          },
          {
            props: { variant: 'body3', color: 'fade' },
            style: {
              lineHeight: '0.7em',
              color: light ? 'rgba(0,0,0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
            },
          },
        ],
      },
    },
  })

  MUItheme = responsiveFontSizes(MUItheme)

  const isMobile = useMediaQuery(MUItheme.breakpoints.down('md'))

  useEffect(() => {
    const themeFromLocalStorage = localStorage.getItem('theme')
    dispatch(setTheme(themeFromLocalStorage))
  }, [dispatch])

  return (
    <ThemeProvider theme={MUItheme}>
      <CustomThemeProvider>
        <CssBaseline />
        <BrowserRouter>
        <Background />

          <Box
            sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', zIndex:1, position:'relative' }}
          >
            <div
              style={{
                display: 'flex',
                flex: '1 0',
                flexDirection: 'column',
                minHeight: `100vh`,
                backgroundColor: `linear-gradient(180deg, #061122 0%, #08162C 100%)`,
              }}
            >
              <Suspense fallback={<FallbackLoader />}>
                <Router />
              </Suspense>
            </div>
          </Box>
        </BrowserRouter>
      </CustomThemeProvider>
    </ThemeProvider>
  )
}

export default App
