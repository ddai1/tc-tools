import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import compose from 'lodash/fp/compose'
import { Container } from 'muicss/react'


import HeaderView from './header'
import CmCard from './cmCard'
import Loading from './loading'

import '../css/common.css'


class CmList extends Component {
  constructor(){
    super()
    this.state = {}
    this.store = null
  }

  loadCm(){
    return this.props.store.cmStore.getCmlist(this.props.store.appStore.currentUser,this.props.store.appStore.isManager)
  }

  loadRm(){
    return this.props.store.rmStore.getRmlist(this.props.store.appStore.currentUser)
  }

  componentWillMount(){
    this.props.store.appStore.checkUserLevel()
    this.loadCm()
    this.loadRm()
  }


  render() {
    const store = this.props.store.cmStore
    const CmCards = (store.cmlist).map((cm, index, cms) =>
      <div key={ cm.councilMemberId }>
        <CmCard cm={ cm } rms={ this.props.store.rmStore.avalaibleRms } assignedRm={ cm.assignedTo } expandByDefault={ cms.length === 1 }/>
      </div>
  )

    return (<div>
      <HeaderView/>
      <Container>
      <div className="debug_label">
        <div>Version 1.0</div>
        <div>Login: { this.props.store.appStore.currentUser }</div>
        { this.props.store.appStore.isManager ? <div>in Manager View</div> : <div>in RM View</div> }
      </div>
      { store.loading ? <Loading/> :
      <div>{ CmCards }</div>
      }
    </Container>
  </div>);
  }
}

export default compose(
  inject((allStores) => ({ ...allStores })),
  observer
)(CmList)
