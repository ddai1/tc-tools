import React, { Component } from 'react'
import { Container } from 'muicss/react'

class Loading extends Component {
  render() {
    return (<Container fluid={true}>
      <div className="mui--text-subhead mui--text-center">Loading...</div>
      </Container>
    )
  }
}

export default Loading