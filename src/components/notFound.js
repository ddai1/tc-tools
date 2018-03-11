import React, { Component } from 'react';
import { Appbar, Container } from 'muicss/react'

import HeaderView from './header'

import '../css/common.css'

class NotFound extends Component {
  render() {
    return (<div className='container'>
      <HeaderView/>
      <Container>
      <Appbar>
        404 Not Found
      </Appbar>
    </Container>
    </div>
    );
  }
}

export default NotFound

