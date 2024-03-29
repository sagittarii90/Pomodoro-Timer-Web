import React from 'react'
import styled from 'styled-components'
import { Box, useTheme } from '@material-ui/core'
import TwitterIcon from '@material-ui/icons/Twitter'
import GitHubIcon from '@material-ui/icons/GitHub'
import coffee from '../../../../../assets/images/coffee.jpg'

export const Footer = () => {
  const theme = useTheme()

  return (
    <Container>
      <Text align="center">Made with love by Sasha Drmic</Text>

      <CoffeeLink
        href="https://www.buymeacoffee.com/sashadrmic"
        target="_blank"
        rel="noopener noreferrer"
      >
        <CoffeeImage src={coffee} alt="Buy me a coffee" />
      </CoffeeLink>

      <Box display="flex" justifyContent="space-between" width={60} m="auto">
        <a
          href="https://twitter.com/PomodorApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter theme={theme} />
        </a>
        <a
          href="https://github.com/sasa95/pomodor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub theme={theme} />
        </a>
      </Box>
    </Container>
  )
}

const Container = styled.footer`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 5px;
  padding-top: 20px;
`

const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  font-weight: 600;
  margin: 0;
`

const CoffeeLink = styled.a`
  width: 150px;
  margin-bottom: 5px;
  margin: 16px auto;
`

const CoffeeImage = styled.img`
  width: 100%;
  border-radius: 5px;
`

const Twitter = styled(TwitterIcon)`
  fill: ${({ theme }) =>
    theme.palette.type === 'dark' ? '#a0a0a0' : '#757575'};
`

const GitHub = styled(GitHubIcon)`
  fill: ${({ theme }) =>
    theme.palette.type === 'dark' ? '#a0a0a0' : '#757575'};
`
