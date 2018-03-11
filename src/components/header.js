import React, { Component } from 'react';
//import { Link } from 'react-router'

import '../css/common.css'
import { Appbar, Container } from 'muicss/react'

class HeaderView extends Component {
  componentDidUpdate() {
  }

  componentDidMount() {
  }

  render() {
    return (<Container>
      <Appbar>
        <table className="default_background" width="100%">
          <tr>
            <td className="mui--appbar-height mui--text-left mui-appbar-line-height mui--text-headline">
              <span><svg className="glg_logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 141 56.4"><title>GLG Logo</title><path style={{fill:'#323241'}} d="M0,28.3C0,12.3,10.1,0,26.9,0,41,0,50,7.3,51.7,19.4H36.4c-.8-3.5-4.1-6.4-8.9-6.4-7.6,0-11.4,6.4-11.4,15.2s4.4,15.4,12,15.4c5.8,0,8.6-3.1,9.5-6.7H27.5V25.8H52.8V55.1H42.3L41,49.4h-.2c-3.4,4.9-8.9,7-15.5,7S11.9,53.9,7.5,49.2,0,36.7,0,28.3"/><polygon style={{fill:'#323241'}} points="55 1 70.8 1 70.8 41.6 90 41.6 90 55.1 55 55.1 55 1"/><path style={{fill:'#323241'}} d="M129.3,49.4h-.2c-3.4,4.9-8.9,7-15.5,7s-13.5-2.5-17.9-7.2-7.5-12.6-7.5-21C88.2,12.3,98.4,0,115.1,0c14.2,0,23.1,7.3,24.8,19.4H124.7c-.8-3.5-4.1-6.4-8.9-6.4-7.6,0-11.4,6.4-11.4,15.2s4.4,15.4,12,15.4c5.8,0,8.6-3.1,9.5-6.7H115.7V25.8H141V55.1H130.5Z"/>
              </svg></span>
            </td>
            <td className="mui--appbar-height mui--text-right mui-appbar-line-height mui--text-headline">
              <span className="font_black">CM T&C expiration Checking Tool  </span><span>  </span>
            </td>
          </tr>
      </table>
      </Appbar>
      </Container>)
  }
}

export default HeaderView
