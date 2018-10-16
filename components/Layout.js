import Head from './Head'
import Header from './Header'
import Footer from './Footer'
import { Container } from 'semantic-ui-react'
import '../styles/Layout.scss'

import 'semantic-ui-css/semantic.min.css';

export default (props) => (
  <div>
    <Head/>
    <Header/>
     <Container>
      {props.children}
     </Container>
     <Footer/>
  </div>
)
