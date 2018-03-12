import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import compose from 'lodash/fp/compose'
import { Container } from 'muicss/react'

import { MdSearch } from 'react-icons/lib/md'

import HeaderView from './header'
import CmCard from './cmCard'
import Loading from './loading'

import _ from 'lodash'

import '../css/common.css'


class CmList extends Component {
  constructor(){
    super()
    this.state = {
      filteredData: null,
      fitlerOn: false,
      originalData: null
    }
    this.store = null
    this.handleFilterSwitch = this.handleFilterSwitch.bind(this)
    this.filterOnChange = this.filterOnChange.bind(this)
    this.state.filteredData = this.bind
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

  handleFilterSwitch() {
    (this.state.filterSwitch)
    ? this.setState({filterSwitch: false})
    : this.setState({filterSwitch: true})
  } 

  filterOnChange(event) {
    let filterPatt = RegExp(event.target.value.toLowerCase());
    this.setState({ filteredData: _.filter(this.state.originalData, (o) => { return o.currentGlgRecruiter.toLowerCase().match(filterPatt) }) });
    this.setState({fitlerOn: true})
    this.updateState;
  }

  render() {
    const store = this.props.store.cmStore
    if (!this.state.fitlerOn){ this.state.filteredData = store.cmlist }
    this.state.originalData = store.cmlist
    const CmCards = (this.state.filteredData).map((cm, index, cms) =>
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
        { store.loading 
          ? ''
          : <input className="debug_label_filter" placeholder="filter RM" onChange={this.filterOnChange} /> }
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
