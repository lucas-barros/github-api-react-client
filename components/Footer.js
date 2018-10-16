import React, { Component } from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import Link from 'next/link'
import '../styles/Footer.scss'

export default (props) => (
  <div className="footer">
    <Grid container>
      <Grid.Row>
        <Grid.Column>
          Developed <Icon name='code'/>  by <strong>Lucas Barros Araújo</strong>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)
