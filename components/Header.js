import React, { Component } from 'react'
import { Menu, Grid, Icon } from 'semantic-ui-react'
import Link from 'next/link'

export default (props) => (
  <Menu fixed='top'>
    <Grid container>
      <Grid.Row>
        <Link href='/'>
          <Menu.Item>
            <img src='https://react.semantic-ui.com/logo.png'/>
          </Menu.Item>
        </Link>
        <Menu.Menu position='right'>
          <a href="https://github.com/lucas-barros/github-api-react-client">
            <Menu.Item>
              <Icon name='github' size='big'/>
            </Menu.Item>
          </a>
        </Menu.Menu>
      </Grid.Row>
    </Grid>
  </Menu>
)
