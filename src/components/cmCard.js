import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import compose from 'lodash/fp/compose'
import { Panel } from 'muicss/react'
import { MdSms, MdEmail, MdPersonAdd, MdPortrait } from 'react-icons/lib/md'
import WeChatInvited from '../images/WeChat_Invited.svg'
///import WeChatNotInvited from '../images/WeChat_Not.svg'

// select assignemnt
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import Iframe from 'react-iframe'
import { Popover, OverlayTrigger, Modal } from 'react-bootstrap'

import '../css/common.css'

import SMS from './sms'

import moment from 'moment'
import _ from 'lodash'

class CmCard extends Component {

  constructor() {
    super();

    this.state = {
      emailModalIsOpen: false,
      wechatModalIsOpen: false,
      smsModalIsOpen: false,
      assignmentSwitch: false,
      selectedOption: '',
      assignedCmId:null,
      assingedRmId:null,
      assingedRm:null,
      cmNumbers:[]
    };
    this.openEmailModal = this.openEmailModal.bind(this);
    this.closeEmailModal = this.closeEmailModal.bind(this);
    this.openWechatModal = this.openWechatModal.bind(this);
    this.closeWechatModal = this.closeWechatModal.bind(this);
    this.openSMSModal = this.openSMSModal.bind(this);
    this.closeSMSModal = this.closeSMSModal.bind(this);
    this.handleAssign = this.handleAssign.bind(this);
  };

  openEmailModal() {
    this.setState({emailModalIsOpen: true});
  }

  closeEmailModal() {
    this.setState({emailModalIsOpen: false});
  }

  openWechatModal() {
    this.setState({wechatModalIsOpen: true});
  }

  closeWechatModal() {
    this.setState({wechatModalIsOpen: false});
  }

  openSMSModal() {
    this.setState({smsModalIsOpen: true});
  }

  closeSMSModal() {
    this.setState({smsModalIsOpen: false});
  }

  handleAssign() {
    (this.state.assignmentSwitch) 
      ? this.setState({assignmentSwitch : false})
      : this.setState({assignmentSwitch : true})
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.state.assingedRmId = selectedOption.value;
    this.state.assingedRm = selectedOption.label;
    this.props.store.rmStore.upsertAssignRM(this.state.assignedCmId,
                                            this.state.assingedRmId,
                                            this.props.store.appStore.currentUserId);
    this.handleAssign();
  }

  render() {
    const { cm, rms, assignedRm } = this.props
    , tcUrl = (cm.nationality == 899)
    ? `https://vega2.glgroup.com/Vega/terms_conditions_email.asp?international=true&cmid=${cm.councilMemberId}`
    : `https://vega2.glgroup.com/Vega/terms_conditions_email.asp?cmid=${cm.councilMemberId}`
    
    , weChatUrl =`https://services.glgresearch.com/wechat-onboard/fetch-people.html?personIds=${cm.cmPersonId}`

    cm.weChatUrl = weChatUrl

    const popoverEmailTC = (
      <Popover id="popover-trigger-click" title="">Email Intl TC to CM</Popover>
    ) 

    const popoverWechat = (
      <Popover id="popover-trigger-click" title="">Click here to send via Wechat</Popover>
    ) 

    const popoverSMS = (
      <Popover id="popover-trigger-click" title="">Click here to send SMS to CM</Popover>
    ) 

    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

    this.state.assignedCmId = cm.councilMemberId;

    const init_number = _.compact([
                                    cm.cmMobile,
                                    cm.cmPhone,
                                    cm.cmPhone2
                                  ]);
    
    this.state.cmNumbers = _.uniq(init_number);



    return (<div>
      <Panel>
      <div className="cm_cards_label">
        <span className="cm_cards_name" >{ cm.cmFullname} <a href={ `https://services.glgresearch.com/advisors/#/cm/${cm.councilMemberId}` }  target="_blank"><MdPortrait/></a></span>
        <span className="cm_cards_iprojects">Invited:{ cm.invitedProjects}</span>
        <span className="cm_cards_pprojects">Paid:{ cm.paidCalledProjects }</span>
      </div>
      <div className="cm_cards_grid">
        <div className="cm_cards_expiration">TC will be expired on: {moment.utc(cm.xpirationDate).format('DD MMM YYYY')}</div>
        <div className="cm_cards_rm">{ (cm.currentGlgRecruiter === "System Process") ? "self_signed" :  cm.currentGlgRecruiter }</div>
        
        { this.props.store.appStore.isManager 
          ? (( this.state.assingedRm == null ) 
              ? ((this.state.assignmentSwitch) 
                ? <div className="cm_cards_assignedRm">
                  <Select                   
                  value={value}
                  onChange={this.handleChange}
                  options={rms}
                  clearable={false}
                  /></div>
                : <div className="cm_cards_assignedRm" onClick={this.handleAssign}><MdPersonAdd /></div>)
              : ((this.state.assignmentSwitch) 
                  ? <div className="cm_cards_assignedRm">
                    <Select                   
                    value={value}
                    onChange={this.handleChange}
                    options={rms}
                    clearable={false}
                    /></div>
                  : <div className="cm_cards_assignedRm" onClick={this.handleAssign}>{ this.state.assingedRm } <MdPersonAdd /></div>)
            )
          : (( this.state.assingedRm !== null) 
              ? <div className="cm_cards_assignedRm">{ this.state.assingedRm }</div>
              : <div className="cm_cards_assignedRm">{ cm.assignedTo }</div>
            )
        }

        <div className="cm_cards_bio">{ cm.shortBio }</div>
        <div className="cm_cards_action">

        <OverlayTrigger 
          trigger={[ 'hover', 'focus' ]}
          placement="top"
          overlay={ popoverEmailTC }
        >
          <span className="cm_cards_TC" onClick={this.openEmailModal}><MdEmail /> </span>
        </OverlayTrigger>
          <Modal
            show={this.state.emailModalIsOpen}
            onHide={this.closeEmailModal}
            bsSize="large"
            dialogClassName="height: 95%;"
          >
            <Modal.Header closeButton>
              <Modal.Title>Email Intl TC</Modal.Title>
            </Modal.Header>
            <Modal.Body className="cm_cards_content">
              <Iframe url={tcUrl}/>
            </Modal.Body>
          </Modal>

        <OverlayTrigger 
          trigger={[ 'hover', 'focus' ]}
          placement="top"
          overlay={ popoverSMS }
        >
          <span onClick={this.openSMSModal}><MdSms /> </span>
        </OverlayTrigger>
          <Modal
            show={this.state.smsModalIsOpen}
            onHide={this.closeSMSModal}
            bsSize="large"
          >
            <Modal.Header closeButton>
              <Modal.Title>Send SMS to CM</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SMS cmnumbers={this.state.cmNumbers} cmId={ cm.councilMemberId }/>
            </Modal.Body>  

          </Modal>
        
        <OverlayTrigger 
          trigger={[ 'hover', 'focus' ]}
          placement="top"
          overlay={ popoverWechat }
        >
          <span onClick={this.openWechatModal}><img src={ WeChatInvited } className="cm_cards_weChat" /> </span> 
        </OverlayTrigger>
          <Modal
            show={this.state.wechatModalIsOpen}
            onHide={this.closeWechatModal}
            bsSize="large"
            dialogClassName="height: 95%;"
          >
            <Modal.Header closeButton>
              <Modal.Title>{ (cm.nationality == 899) ? 'Email Intl TC' : 'Email TC'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="cm_cards_content">
              <Iframe url={weChatUrl}/>
            </Modal.Body>
          </Modal>

        <WeChatIcon wechat={ cm } /> 

        </div>
      </div>
    </Panel>
  </div>);
  }
}

const WeChatIcon = ({wechat}) => {

if (wechat.wechatStatusId == 1) {
    return (
      <span>
        Joined
      </span>
    )
  } else {
    return (
      <span>
        <a href={ wechat.weChatUrl }>Invited</a>
      </span>
    )
  }
}

export default compose(
  inject((allStores) => ({ ...allStores })),
  observer
)(CmCard)
